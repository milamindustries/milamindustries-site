// app/api/lead/route.js
import { NextResponse } from 'next/server';

// Make sure this route always runs server-side and is never cached
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const ZAP_URL = process.env.ZAPIER_HOOK_URL ?? null;

// Optional quick check in browser: https://YOUR_DOMAIN/api/lead
export async function GET() {
  return NextResponse.json({
    ok: true,
    envHasVar: Boolean(ZAP_URL),
  }, { headers: { 'Cache-Control': 'no-store' } });
}

export async function POST(req) {
  // Parse JSON body
  let data;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid JSON body' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  // ⬇️ Sanitize email: blank -> null (avoids downstream pattern checks)
  if (typeof data.email === 'string' && data.email.trim() === '') {
    data.email = null;
  }

  // Try to forward to Zapier if the env var is set.
  // If it's missing or fails, still return ok:true so the user sees success.
  let forwarded = false;
  let upstreamStatus = null;
  let upstreamBody = null;

  if (ZAP_URL) {
    try {
      const resp = await fetch(ZAP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        cache: 'no-store',
      });
      forwarded = resp.ok;
      upstreamStatus = resp.status;
      upstreamBody = (await resp.text())?.slice(0, 500) || null;
    } catch (e) {
      forwarded = false;
      upstreamBody = e?.message || 'Network error sending to Zapier';
    }
  }

  return NextResponse.json(
    { ok: true, forwarded, upstreamStatus, upstreamBody },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}
