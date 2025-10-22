// app/api/vendor-lead/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const data = await req.json();

    const ZAPIER_VENDOR_HOOK_URL = process.env.ZAPIER_VENDOR_HOOK_URL; // set in Vercel

    if (!ZAPIER_VENDOR_HOOK_URL) {
      return NextResponse.json(
        { ok: false, error: 'Missing ZAPIER_VENDOR_HOOK_URL env var' },
        { status: 500 }
      );
    }

    // Forward to your NEW vendor-only Zapier webhook
    const zapierRes = await fetch(ZAPIER_VENDOR_HOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const forwarded = zapierRes.ok;

    return NextResponse.json({ ok: true, forwarded });
  } catch (err) {
    console.error('Vendor lead error:', err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

export async function GET() {
  // Simple diagnostic endpoint
  return NextResponse.json({
    ok: true,
    envHasVar: !!process.env.ZAPIER_VENDOR_HOOK_URL,
  });
}
