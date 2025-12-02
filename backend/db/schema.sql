CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS workflow_runs (
  run_id text PRIMARY KEY,
  user_id text,
  status text NOT NULL DEFAULT 'processing',
  payload jsonb,
  result jsonb,
  metrics jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz
);

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id text REFERENCES workflow_runs(run_id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  user_id text,
  name text,
  first_name text,
  last_name text,
  email text UNIQUE,
  apollo_id text UNIQUE,
  company text,
  title text,
  domain text,
  linkedin_url text,
  location text,
  industry text,
  company_size integer,
  email_status text,
  lead_score integer,
  score_breakdown jsonb,
  pain_points jsonb,
  email_templates jsonb,
  follow_ups jsonb,
  competitor_gap jsonb,
  zerobounce_response jsonb,
  linkedin_profile jsonb,
  source text,
  status text,
  idempotency_key text UNIQUE,
  raw jsonb
);

CREATE TABLE IF NOT EXISTS lead_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid REFERENCES leads(id),
  run_id text REFERENCES workflow_runs(run_id),
  event_type text,
  payload jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS leads_run_id_idx ON leads(run_id);
CREATE INDEX IF NOT EXISTS lead_events_run_id_idx ON lead_events(run_id);
CREATE INDEX IF NOT EXISTS lead_events_lead_id_idx ON lead_events(lead_id);

