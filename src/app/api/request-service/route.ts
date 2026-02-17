import { NextRequest, NextResponse } from "next/server";

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;

export async function POST(req: NextRequest) {
  if (!N8N_WEBHOOK_URL) {
    return NextResponse.json(
      { error: "Webhook not configured" },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();

    // Validate required fields
    const { name, phone, service } = body;
    if (!name?.trim() || !phone?.trim() || !service?.trim()) {
      return NextResponse.json(
        { error: "Name, phone, and service are required" },
        { status: 400 }
      );
    }

    // Forward to n8n webhook
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: body.name,
        phone: body.phone,
        email: body.email || "",
        truck: body.truck || "",
        service: body.service,
        callback: body.callback || "Anytime",
        notes: body.notes || "",
        form_type: body.form_type || "service-request",
        submitted_at: body.submitted_at || new Date().toISOString(),
        page_url: body.page_url || "",
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("n8n webhook error:", response.status, text);
      return NextResponse.json(
        { error: "Failed to submit request" },
        { status: 502 }
      );
    }

    // Try to parse n8n response, but don't fail if it's not JSON
    let data;
    try {
      data = await response.json();
    } catch {
      data = { success: true };
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Request service error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
