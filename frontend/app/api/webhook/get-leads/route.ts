import { NextRequest, NextResponse } from "next/server"
import { triggerLeadRun } from "@/lib/n8n-client"

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json()
    const syncMode = Boolean(payload?.sync)

    const result = await triggerLeadRun(
      {
        ...payload,
        sync: syncMode,
      },
      { retries: 3 }
    )

    const statusCode = result.status === "processing" ? 202 : 200

    return NextResponse.json(
      {
        runId: result.runId,
        status: result.status,
        leads: result.leads,
        metrics: result.metrics,
        message: result.message,
      },
      {
        status: statusCode,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    )
  } catch (error) {
    console.error("LeadVio webhook error", error)
    return NextResponse.json(
      {
        error: "Unable to submit lead run",
      },
      { status: 500 }
    )
  }
}

