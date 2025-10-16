// app/api/lead/route.js
import { NextResponse } from 'next/server';

// Make sure this API route is never cached and always runs on the server.
export const dynamic = 'force-dynamic';

// Single source of truth: Zapier hook URL must come from env.
const ZAP_URL = process.env.ZAPIER_HOOK_URL;

/**
 * GET /api/lead  (TEMP DIAGNOSTIC)
 * Lets you confirm the server can see the env var,
 * and which host/domain this deployment is serving.
 * Remove this once things are working.
 */
export async function GET(request) {
  const host = request.headers.get('host') || null;
  const envHasVar = Boolean(process.env.ZAPIER_HOOK_URL);
  const masked =
    envHasVar ? (process.env.ZAPIER_HOOK_URL.slice(0, 40) + '…') : null;

  return NextResponse.json(
    {
      ok: true,
      host,                         // which domain you hit (helps spot the wrong project)
      vercelUrl: process.env.VERCEL_URL || null,
      envHasVar,                    // true/false
      hookPreview: masked,          // masked value or null
    },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}

/**
 * POST /api/lead
 * Forwards JSON form payloads to Zapier.
 */
export async function POST(req) {
  if (!ZAP_URL) {
    return NextResponse.json(
      { ok: false, error: 'Missing ZAPIER_HOOK_URL env var on the server.' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  try {
    let data = {};
    try {
      data = await req.json();
    } catch {
      return NextResponse.json(
        { ok: false, error: 'Invalid JSON body' },
        { status: 400, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    let forwarded = false;
    let upstreamStatus = null;
    let upstreamBody = '';

    try {
      const resp = await fetch(ZAP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        cache: 'no-store',
      });
      forwarded = resp.ok;
      upstreamStatus = resp.status;
      upstreamBody = await resp.text();
    } catch (e) {
      forwarded = false;
      upstreamBody = e?.message || 'Network error sending to Zapier';
    }

    return NextResponse.json(
      {
        ok: true,
        forwarded,
        upstreamStatus,
        upstreamBody: upstreamBody?.slice(0, 500),
      },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err?.message || 'Unknown server error' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
