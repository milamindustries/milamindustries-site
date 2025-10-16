// app/api/lead/route.js
import { NextResponse } from 'next/server';

const ZAP_URL =
  process.env.ZAPIER_HOOK_URL ||
  'https://hooks.zapier.com/hooks/catch/25013320/u5vmpeb/';

export async function POST(req) {
  try {
    const data = await req.json();

    // minimal validation (tweak as you like)
    if (!data?.firstName || !data?.lastName || !data?.phone) {
      return NextResponse.json(
        { ok: false, error: 'Missing required fields (name/phone)' },
        { status: 400 }
      );
    }

    // forward to Zapier
    const resp = await fetch(ZAP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err?.message || 'Unknown server error' },
      { status: 500 }
    );
  }
}
