// app/api/lead/route.js
import { NextResponse } from 'next/server';

const ZAP_URL =
  process.env.ZAPIER_HOOK_URL ||
  'https://hooks.zapier.com/hooks/catch/25013320/u5vmpeb/';

export async function POST(req) {
  try {
    // 1) Parse JSON body safely
    let data;
    try {
      data = await req.json();
    } catch {
      return NextResponse.json(
        { ok: false, error: 'Invalid JSON body' },
        { status: 400 }
      );
    }

    // 2) TEMP: remove strict field requirements (we’ll re-enable later)
    // If you want a soft check, uncomment:
    // if (!data?.firstName || !data?.phone) {
    //   return NextResponse.json(
    //     { ok: false, error: 'Please include at least first name and phone' },
    //     { status: 400 }
    //   );
    // }

    // 3) Forward payload to Zapier
    const upstream = await fetch(ZAP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const text = await upstream.text(); // read body either way

    if (!upstream.ok) {
      // Pass through upstream status + text so you see the real cause
      return NextResponse.json(
        { ok: false, error: `Zapier error (${upstream.status}): ${text || 'No body'}` },
        { status: 502 }
      );
    }

    // 4) Success
    return NextResponse.json({ ok: true, zapier: text || 'OK' });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err?.message || 'Unknown server error' },
      { status: 500 }
    );
  }
}
