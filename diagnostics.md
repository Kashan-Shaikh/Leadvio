## LeadVio n8n Workflow Diagnostics

### Scope
Analysis of `backend/Lead Generation & Cold Email Automation.json` against the required production specs (webhook intake → Apollo search → ZeroBounce → LinkedIn enrichment → AI intelligence → Sheets/DB storage → response).

---

### Summary of Findings
1. **Missing environment manifest** – no `.env.example` or secrets registry in repo. Credentials referenced in the workflow (Groq, Apollo, Google Sheets, ZeroBounce, LinkedIn Scraper) cannot be provisioned deterministically.
2. **Webhook contract mismatch** – node `Webhook - Receive Lead Requirements (webhook-start)` exposes `POST /lead-requirements` with no `x-leadvio-secret` validation and responds synchronously only after the entire automation finishes. This is incompatible with Vercel API routes (needs immediate `{runId,status}` ack + optional status endpoint) and lacks CORS/header enforcement.
3. **Filter builder fragility** – LLM prompt lives inside the HTTP node body with no JSON schema enforcement. Parsing relies on regex inside `Function - Parse Persona Match (parse-persona-match)` which silently falls back to user input if parsing fails. No guard rails against hallucinated filters.
4. **Apollo search does not paginate or retry** – node `Apollo.io - Search Prospects (apollo-search)` submits a single request with `per_page = requested limit`. There is no `Loop`, `Wait`, or `Retry on Fail`, so partial pages or 429s will halt the run. Rate-limit control is missing.
5. **Lead data lost after ZeroBounce** – `Email Verification Service` returns the verification payload only. `Function - Filter Valid Emails (filter-qualified)` assumes the lead data is still present (`item.email` etc.) but the HTTP node response no longer contains the original lead fields, so verified leads cannot be reconstructed. Downstream nodes reference `$json.name`, `$json.company`, `$json.linkedin_url` etc., which are undefined – the entire enrichment section will fail.
6. **LinkedIn scraper blind spots** – node `Scrape LinkedIn Profile` is mandatory but there is no conditional logic for missing URLs, no batching, and no retry/backoff. Any 404/429 stops the workflow.
7. **LLM calls lack structure** – all Groq calls (lead scoring, competitor gap, pain points, email generation, humanizer, summary) ask for “valid JSON” but responses are parsed via ad‑hoc regex and `JSON.parse` with silent catch. No output schemas, no token/size guard, and no deterministic behavior.
8. **No deduplication or idempotency** – there is no Function node to prevent duplicate emails/domains across runs or to check Postgres/Sheets before insertion. Google Sheets append/update may create duplicates and violate data quality.
9. **Storage is incomplete** – Google Sheets nodes exist but Postgres persistence (required for production) is entirely missing. There is no transaction or upsert behavior.
10. **Response + status flow missing** – final response is built inside `Respond to Webhook` only after all nodes finish; there is no status endpoint, no partial return, and no telemetry payload for the frontend to poll.
11. **No centralized error handling** – there is no Error Trigger node, dead-letter queue, or Slack/email alerting. Retries/backoff are not configured on HTTP nodes, so transient failures abort the run without logging.
12. **PII logging risks** – intermediate Function nodes and Google Sheets writes store full JSON payloads (including emails and LLM narratives) without sanitization or redaction controls.

---

### Node-by-Node Issues & Remediation Suggestions

| Node | Problem | Recommendation |
| --- | --- | --- |
| `webhook-start` | Single `POST lead-requirements` path, no secret header validation, synchronous long-running response. | Move to `/webhook/get-leads`, validate `x-leadvio-secret`, immediately return `{runId,status}` while queueing async processing; add status webhook or DB lookup. |
| `persona-matching-llm` | Plain HTTP request to Groq with hard-coded prompt, no schema or retries. | Replace with n8n LLM node (or Tools Agent) using structured prompt + JSON schema enforcement; add retry/backoff. |
| `parse-persona-llm-response` / `parse-persona-match` | Relies on regex parsing; falls back silently, allowing malformed filters. | Use Output Parser (JSON schema) or switch to Tools Agent `FilterBuilder` tool with deterministic schema. |
| `apollo-search` | Single-page fetch, no pagination, no rate-limit handling, no dedupe, uses `per_page = limit` without loops. | Implement `Loop over Items` with page cursor, `Wait` between calls, exponential backoff via `Retry on Fail`. |
| `extract-leads` | Pushes knowledge to Sheets before verification; no normalization. | Defer persistence until after verification + scoring; lower-case email/domain; attach run metadata. |
| `split-batches` + `email-verify` + `filter-qualified` | Loses lead context; verification result is not merged back. | Carry the lead object throughout (e.g., via `Merge` node or `Function` storing state). |
| `scrape-linkedin` | No guard for missing URLs or rate limits. | Add `IF` or `Switch` to skip when `linkedin_url` absent; add Wait/backoff. |
| All Groq LLM nodes | Each prompt unstructured; parsing done manually; no schema validation; no tool separation. | Consolidate into a single Tools Agent with explicit tool schemas (`ScoreLeadTool`, `ExtractPainPoints`, `GenerateEmails`, etc.) per requirements. |
| `merge-research` / `prepare-humanizer` / `merge-humanized` | Cascade of parse attempts with regex; complicated, brittle, and lacks error handling. | Replace with deterministic JSON inputs/outputs; enforce schema at each stage; drop redundant humanizer step or integrate via dedicated tool. |
| `save-initial-leads` / `save-final-lead` | Writes to Google Sheets without dedupe or transactional control; missing Postgres writes. | Introduce Postgres upsert node; write to Sheets after DB success; ensure idempotency using `runId+email` hash. |
| `aggregate-results` / `respond-webhook` | Response only available after entire automation; no partial return or run status. | Return runId immediately from webhook; store status in DB; create `/status` endpoint for polling; optionally stream top 10 leads when ready. |
| **Global** | No Error Trigger, logging, or observability nodes. | Add `Error Trigger` → Slack/email alerts, dead-letter writes, metrics logging. |

---

### Static Validation & Config Gaps
1. **Environment template missing** – create `secrets.example.env` enumerating: `N8N_WEBHOOK_SECRET`, `APOLLO_API_KEY`, `ZEROBOUNCE_API_KEY`, `GROQ_API_KEY`, `LINKEDIN_SCRAPER_KEY`, `GOOGLE_SHEETS_CREDS_JSON`, `DATABASE_URL`, `SLACK_WEBHOOK_URL`, `OBS_ENDPOINT`, etc.
2. **Node parameter mismatches** – Verification node expects `email` but receives `{{ $json.email }}` even though upstream payload uses `person.email`. Apollo node expects `person_titles` array but receives either string or array depending on LLM response.
3. **No rate-limit/backoff settings** – All HTTP nodes default to n8n’s single attempt; risk of 429/5xx crashes.
4. **Lack of idempotency keys** – No `runId` or hash field is stored per lead, preventing safe retries or replays.
5. **Security** – Webhook open to public without auth; sensitive payloads logged and stored in plain text Sheets.

---

### Next Steps
- Rebuild the workflow following Phase B specs (Tools Agent pattern, pagination, dedupe, verification, storage, logging).
- Provide environment manifest + secrets instructions.
- Align Next.js webhook handlers with the new n8n contract.

This diagnostics report should be treated as Deliverable A.

