type TriggerLeadRunInput = Record<string, unknown> & {
  sync?: boolean
}

type TriggerLeadRunResult = {
  runId: string
  status: "processing" | "completed" | "failed"
  leads?: unknown[]
  metrics?: Record<string, unknown>
  message?: string
}

const WEBHOOK_URL = process.env.N8N_WEBHOOK_URL
const STATUS_URL = process.env.N8N_STATUS_URL || `${WEBHOOK_URL?.replace(/\/get-leads$/, "")}/status`
const WEBHOOK_SECRET = process.env.LEADVIO_WEBHOOK_SECRET

if (!WEBHOOK_URL || !WEBHOOK_SECRET) {
  console.warn("LeadVio: N8N_WEBHOOK_URL and LEADVIO_WEBHOOK_SECRET must be set")
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

async function resilientFetch(input: RequestInfo, init: RequestInit, retries = 3): Promise<Response> {
  let attempt = 0
  let lastError: unknown

  while (attempt <= retries) {
    try {
      const res = await fetch(input, init)
      if (res.status >= 500 || res.status === 429) {
        throw new Error(`Remote error: ${res.status}`)
      }
      return res
    } catch (error) {
      lastError = error
      attempt += 1
      if (attempt > retries) break
      const backoff = Math.min(2000, 200 * 2 ** attempt)
      await sleep(backoff)
    }
  }

  throw lastError ?? new Error("Unknown fetch error")
}

export async function triggerLeadRun(
  payload: TriggerLeadRunInput,
  options: { retries?: number } = {}
): Promise<TriggerLeadRunResult> {
  if (!WEBHOOK_URL) {
    throw new Error("N8N_WEBHOOK_URL not configured")
  }

  const res = await resilientFetch(
    WEBHOOK_URL,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-leadvio-secret": WEBHOOK_SECRET ?? "",
      },
      body: JSON.stringify(payload),
    },
    options.retries ?? 2
  )

  const data = (await res.json()) as TriggerLeadRunResult
  return {
    runId: data.runId,
    status: data.status,
    leads: data.leads,
    metrics: data.metrics,
    message: data.message,
  }
}

export async function fetchRunStatus(runId: string) {
  if (!STATUS_URL) {
    throw new Error("N8N_STATUS_URL not configured")
  }

  const url = new URL(STATUS_URL)
  url.searchParams.set("runId", runId)

  const res = await resilientFetch(
    url.toString(),
    {
      method: "GET",
      headers: {
        "x-leadvio-secret": WEBHOOK_SECRET ?? "",
      },
    },
    2
  )

  return res.json()
}

