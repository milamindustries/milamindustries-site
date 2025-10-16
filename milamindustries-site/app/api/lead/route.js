// app/api/lead/route.js
import { NextResponse } from 'next/server';

/**
 * IMPORTANT:
 * - Put your Zapier Catch Hook URL in Vercel env var "ZAPIER_HOOK_URL".
 * - Project → Settings → Environment Variables → ZAPIER_HOOK_URL
 * - Enable in Production (and Preview if you use it), then REDEPLOY.
 *
 * If this env var is missing at runtime, we return a clear error
 * so you see it on the page instead of a vague failure.
 */
const ZAP_URL = process.env.ZAPIER_HOOK_URL; // <- single source of truth

// ---------- OPTIONAL DEBUG ENDPOINT ----------
// Visit https://YOUR_DOMAIN/api/lead in the browser to see if the server
// can read the env var. Remove this when you're done debugging.
export async function GET() {
  const hook = process.env.ZAPIER_HOOK_URL || '';
  return NextResponse.json({
    ok: true,
    // Mask most of it for safety in case you leave this on accidentally.
    hookPreview: hook ? hook.slice(0, 40) + '…' : null,
  });
}
// --------------------------------------------

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
      return NextResponse.json(
        { ok: false, error: 'Invalid JSON body' },
        { status: 400 }
      );
    }

    // Forward to Zapier. Even if Zapier is down, we still return ok:false with details.
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
