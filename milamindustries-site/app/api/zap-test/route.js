// app/api/zap-test/route.js  (or src/app/api/zap-test/route.js)
import { NextResponse } from 'next/server';
export const runtime = 'nodejs';

export async function GET() {
  try {
    const url = process.env.ZAPIER_VENDOR_HOOK_URL || '';
    if (!url) {
      return NextResponse.json({ ok:false, step:'env', error:'Missing ZAPIER_VENDOR_HOOK_URL' }, { status:200 });
    }
    let host='(invalid)'; try { host = new URL(url).host; } catch {}

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ test:true, source:'vercel-server', ts:new Date().toISOString() }),
    }).catch(e => ({ ok:false, status:0, _neterr:String(e) }));

    if (!res || res.status === 0) {
      return NextResponse.json({ ok:false, step:'network', host, error:res?._neterr||'Network error' }, { status:200 });
    }

    const text = await res.text().catch(()=>'');

    return NextResponse.json({
      ok: res.ok,
      step: 'zap',
      host,
      status: res.status,
      body: text.slice(0, 400)
    }, { status:200 });

  } catch (e) {
    return NextResponse.json({ ok:false, step:'server', error:String(e) }, { status:200 });
  }
}
