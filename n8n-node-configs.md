## LeadVio n8n Node Configuration

> Workflow export: `backend/LeadVio - Lead Gen & Cold Email.json`

| # | Node | Purpose | Key Config / Secrets |
| --- | --- | --- | --- |
| 1 | `Webhook - GetLeads` | Vercel-facing POST endpoint at `/webhook/get-leads`. Requires `x-leadvio-secret` header and returns JSON. Response mode `responseNode` to allow custom ack/final nodes. | No creds. Configure allowed headers/origin to match Vercel domain. |
| 2 | `Function - Validate Secret` | Ensures the incoming header matches `N8N_WEBHOOK_SECRET`, throws `401` otherwise. | Accesses env var `N8N_WEBHOOK_SECRET`. |
| 3 | `Set - Normalizer` | Normalizes payload, sets `runId`, `userId`, `timestamp`, `maxLeads`, `syncMode`, questionnaire + preferences JSON blobs. | No creds. Uses `$uuid()` helper. |
| 4 | `IF - Sync Mode?` | Routes synchronous requests (skip early ack) vs async default (sends `{runId,status}` and continues). | `syncMode` boolean from Set node. |
| 5 | `Respond - Ack (Async)` | Sends `202 Accepted` with `{runId,status:"processing"}` for async runs. | No creds; response headers set in webhook node. |
| 6 | `Postgres - Upsert Run` | Inserts workflow run row (`workflow_runs` table) with status `processing`. | Credentials: `LeadVio Postgres`. Requires env `DATABASE_URL` (see secrets). |
| 7 | `LLM - Filter Builder` | Groq (OpenAI-compatible) chat completion with structured JSON schema. Converts questionnaire to Apollo filters. Temperature 0.2. | Credential: `Groq OpenAI-Compatible` (points to Groq API key). |
| 8 | `Function - Prepare Apollo Payload` | Attaches `apolloFilters` object to each item. | No creds. |
| 9 | `SplitInBatches - Apollo Pages` | Handles pagination (per batch = 1 page). Batches iterate until Apollo results exhausted. | No creds; `output2` loops back for next page. |
|10 | `HTTP - Apollo Search` | Calls `https://api.apollo.io/v1/mixed_people/search` with filters, per_page=50. | Uses `APOLLO_API_KEY` via header auth. Enable Retry-on-fail (configure to 3 tries, exponential 500ms). |
|11 | `Wait - Apollo Rate Guard` | 750 ms pause between Apollo calls to stay under 5 req/s limit. | No creds. |
|12 | `Function - Normalize Leads` | Maps Apollo payload into canonical lead JSON (lowercase email/domain, attach run metadata). | No creds. |
|13 | `Postgres - Existing Leads Lookup` | Checks `leads` table for existing `email/apollo_id` to support dedupe. | Postgres creds. |
|14 | `Function - Deduplicate` | In-memory + DB dedupe, assigns `idempotency_key` (`sha256(runId:email)`) and flags duplicates. | No creds. |
|15 | `IF - Drop Duplicates` | Filters duplicates out of downstream flow (true branch dropped, false continues). | No creds. |
|16 | `SplitInBatches - Verification` | Batches 25 leads for ZeroBounce verification loop. | No creds. |
|17 | `HTTP - ZeroBounce` | Calls `https://api.zerobounce.net/v2/validate?api_key=...&email=...`. Retries on 429 with exponential backoff (configure 3 retries, base 1s). | Env `ZEROBOUNCE_API_KEY`. |
|18 | `Wait - ZeroBounce Guard` | 350 ms delay to respect 100/min API guideline. | No creds. |
|19 | `Function - Merge Verification` | Merges ZeroBounce response with original lead (status, raw payload). | No creds. |
|20 | `IF - Email Valid?` | Branch: valid emails continue to enrichment; invalid ones go directly to DB with status `invalid_email` (score=0). | No creds. |
|21 | `HTTP - LinkedIn Enrich` | Calls ScrapingDog (or similar) to fetch profile data when `linkedin_url` exists. Response errors ignored but logged. | Env `LINKEDIN_SCRAPER_KEY`. Configure rate limit 1 req/s with Wait node upstream if needed. |
|22 | `Function - Merge LinkedIn` | Combines scraper payload with lead info for AI agent. | No creds. |
|23 | `AI Agent - Lead Intelligence` | Groq-based Tools Agent with four explicit tools (ScoreLeadTool, ExtractPainPoints, GenerateEmails, ChooseAction). Each has JSON schema; agent instructions enforce tool order. | Groq credential. Configure max tokens 2500, temperature 0.4. |
|24 | `Function - Format & Safety` | Applies guard rails: zero score if invalid status, attaches agent outputs, sets final status string, redacts sensitive logs. | No creds. |
|25 | `Google Sheets - Append Lead` | Writes structured row per lead (Lead sheet). | Credential: `LeadVio Sheets` (service account). |
|26 | `Postgres - Upsert Lead` | Upserts into `public.leads` (unique on `email`). Stores JSON columns (score_breakdown, pain_points, emails, follow_ups, raw). | Postgres creds. |
|27 | `HTTP - Observability` | Sends redacted event to logging endpoint (DataDog, OpenSearch, etc.). | Uses env `LOGGING_ENDPOINT`. Set to ignore response code. |
|28 | `Function - Collect Response` | Aggregates leads per run into workflow static data for synchronous responses + run status update. | No creds. |
|29 | `Respond - Final (Sync)` | Returns aggregated summary (top N) when sync mode requested. Not executed for async runs. | No creds. |
|30 | `Postgres - Update Run Status` | Marks `workflow_runs` row as completed + saves summary JSON. | Postgres creds. |
|31 | `HTTP - Observability` | (Same as #27; triggered per lead). | Env `LOGGING_ENDPOINT`. |
|32 | `Error Trigger - LeadVio` | Global handler for any node failure. | n/a |
|33 | `HTTP - Slack Alert` | Posts failure message to Slack webhook. | Env `SLACK_WEBHOOK_URL`. |
|34 | `Google Sheets - Dead Letter` | Appends failed payloads to `DeadLetter` sheet for manual review. | `LeadVio Sheets` credential. |

### Agent Prompts (copy into node descriptions for reference)

**Filter Builder system prompt:** included directly in node (see workflow).  
**ScoreLeadTool prompt snippet (tools agent)**  
```
Evaluate lead seniority, title, company context, LinkedIn insights, and questionnaire preferences.
Weights: decision_making 35, growth_intent 25, fit 25, engagement 15.
Return integers only; justify in <=3 bullet strings.
```

**Pain point extraction prompt:**  
```
Given the lead metadata + LinkedIn summary, infer up to 3 pains.
Each pain must cite evidence (either direct quote or derived metric) and urgency high/medium/low.
```

**Email generation prompt:**  
```
Write three emails (value-based, problem-based, competitor-gap) capped at 140 words, same tone/style from preferences.
Structure with `subject` + `body`. Add 2 follow-ups referencing earlier context; keep CTA clear.
```

**Persona extraction / LinkedIn usage prompt:**  
```
Use LinkedIn summary and recent posts to personalize intros, cite content when available; otherwise rely on company news.
```

These prompts are embedded in the `AI Agent - Lead Intelligence` node instructions/tool descriptions to maintain deterministic outputs.

