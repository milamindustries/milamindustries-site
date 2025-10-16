// app/api/lead/route.js
import { NextResponse } from 'next/server';

const ZAP_URL =
  process.env.ZAPIER_HOOK_URL ||
  'https://hooks.zapier.com/hooks/catch/25013320/u5vmpeb/';

export async function POST(req) {
  // Always respond with a clear, friendly JSON so the frontend can show success.
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

    // Soft requirements only (commented out for now)
    // if (!data?.firstName || !data?.phone) {
    //   return NextResponse.json(
    //     { ok: false, error: 'Please include first name and phone' },
    //     { status: 400 }
    //   );
    // }

    // Try to forward to Zapier but DO NOT fail the whole request if it errors.
    let upstreamOk = false;
    let upstreamStatus = null;
    let upstreamBody = '';

    try {
      const resp = await fetch(ZAP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      upstreamStatus = resp.status;
      upstreamBody = await resp.text();
      upstreamOk = resp.ok;
    } catch (e) {
      upstreamOk = false;
      upstreamBody = e?.message || 'Network error sending to Zapier';
    }

    // Return success to the browser so the user sees a success state.
    // Include debug info so you (not the visitor) can inspect if needed.
    return NextResponse.json({
      ok: true,
      forwarded: upstreamOk,
      upstreamStatus,
      upstreamBody: upstreamBody?.slice(0, 500), // trim
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err?.message || 'Unknown server error' },
      { status: 500 }
    );
  }
}
