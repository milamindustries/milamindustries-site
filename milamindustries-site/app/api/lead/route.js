// app/api/lead/route.js
import { NextResponse } from 'next/server';

const ZAP_URL = process.env.ZAPIER_HOOK_URL; // env only

export async function GET() {
  // TEMP: helps verify the server can see the env var
  const hook = process.env.ZAPIER_HOOK_URL || '';
  return NextResponse.json({
    ok: true,
    // mask most of it for safety
    hookPreview: hook ? hook.slice(0, 40) + '…' : null
  });
}

export async function POST(req) {
  if (!ZAP_URL) {
    return NextResponse.json(
      { ok: false, error: 'Missing ZAPIER_HOOK_URL env var on the server.' },
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

    let forwarded = false;
    let upstreamStatus = null;
    let upstreamBody = '';

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
