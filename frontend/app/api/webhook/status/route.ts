import { NextRequest, NextResponse } from "next/server"
import { fetchRunStatus } from "@/lib/n8n-client"

export async function GET(req: NextRequest) {
  try {
    const runId = req.nextUrl.searchParams.get("runId")
    if (!runId) {
      return NextResponse.json({ error: "runId query param required" }, { status: 400 })
    }

    const status = await fetchRunStatus(runId)
    return NextResponse.json(status, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    })
  } catch (error) {
    console.error("LeadVio status error", error)
    return NextResponse.json({ error: "Unable to fetch status" }, { status: 500 })
  }
}

