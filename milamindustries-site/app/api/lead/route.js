// app/api/lead/route.js
import { NextResponse } from 'next/server';

// Force dynamic so changes take effect immediately on Vercel
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// EASIEST PATH: hardcode your Zapier Catch Hook URL here.
// Replace the value below with YOUR real hook URL.
const ZAP_URL = 'https://hooks.zapier.com/hooks/catch/25013320/xxxxx/';

export async function POST(req) {
  if (!ZAP_URL.startsWith('https://hooks.zapier.com/')) {
    return NextResponse.json(
      { ok: false, error: 'ZAP_URL is not set to a Zapier catch hook.' },
      { status: 500 }
    );
  }

  try {
    let data = {};
    try {
      data = await req.json();
    } catch {
      return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 });
    }

    let forwarded = false, upstreamStatus = null, upstreamBody = '';
    try {
      const resp = await fetch(ZAP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      forwarded = resp.ok;
      upstreamStatus = resp.status;
      upstreamBody = await resp.text();
    } catch (e) {
      forwarded = false;
      upstreamBody = e?.message || 'Network error sending to Zapier';
    }

    // Always tell the frontend "ok" so the user sees success
    return NextResponse.json({
      ok: true,
      forwarded,
      upstreamStatus,
      upstreamBody: upstreamBody?.slice(0, 500),
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err?.message || 'Unknown server error' },
      { status: 500 }
    );
  }
}
