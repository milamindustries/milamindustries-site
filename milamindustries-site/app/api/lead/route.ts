// app/api/lead/route.ts
import { NextResponse } from "next/server";

// Put your Zapier hook in an env var if you want, but we also include a safe fallback.
const ZAP_URL =
  process.env.ZAPIER_HOOK_URL ||
  "https://hooks.zapier.com/hooks/catch/25013320/u5vmpeb/";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Optional: simple required checks (tweak to taste)
    if (!data?.firstName || !data?.lastName || !data?.phone) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields (name/phone)" },
        { status: 400 }
      );
    }

    // Forward to Zapier
    const resp = await fetch(ZAP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!resp.ok) {
      const text = await resp.text();
      return NextResponse.json(
        { ok: false, error: `Upstream error: ${text || resp.status}` },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Unknown server error" },
      { status: 500 }
    );
  }
}
