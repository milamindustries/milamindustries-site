// app/api/vendor-lead/route.js
import { NextResponse } from 'next/server';

function toE164(digits) {
  const d = String(digits || '').replace(/\D+/g, '');
  if (d.length === 11 && d.startsWith('1')) return `+${d}`;
  if (d.length === 10) return `+1${d}`;
  return d ? `+${d}` : '';
}
function toUsDate(isoYmd) {
  if (!isoYmd || typeof isoYmd !== 'string' || !/^\d{4}-\d{2}-\d{2}/.test(isoYmd)) return '';
  const [y, m, d] = isoYmd.slice(0, 10).split('-');
  return `${m}/${d}/${y}`;
}

export async function POST(req) {
  try {
    const raw = await req.json();
    const url = process.env.ZAPIER_VENDOR_HOOK_URL;

    if (!url) {
      return NextResponse.json({ ok:false, where:'server', error:'Missing ZAPIER_VENDOR_HOOK_URL' }, { status:200 });
    }

    // Normalize the usual offenders
    const phoneDigits = String(raw.phone ?? raw.phoneDigits ?? '').replace(/\D+/g, '');
    const phoneE164 = raw.phoneE164 || toE164(phoneDigits);
    const leadDateIso = raw.leadDate || raw.lead_date || raw.leadDateIso || '';
    const leadDateUs = raw.leadDateUs || toUsDate(leadDateIso);
    const audioUrl = (typeof raw.audioUrl === 'string' && raw.audioUrl.startsWith('http')) ? raw.audioUrl : undefined;

    // Build a SAFE payload for Zapier (text/urls only, no data: URIs)
    const safe = {
      // minimal identity + routing
      vendorName: raw.vendorName || raw.vendorInfo || (raw.fullName || '').trim(),
      fullName: (raw.fullName || `${raw.firstName || ''} ${raw.lastName || ''}`).trim(),
      email: raw.email || '',
      phone: phoneE164,            // <- send the E.164 to any "Phone" typed fields
      phoneDigits,                 // <- available if your Zap wants just digits
      leadDate: leadDateUs || '',  // <- send US style which most “Date” fields accept
      submittedAt: raw.submittedAt || new Date().toISOString(),

      // address / property (as plain text)
      addressStreet: raw?.address?.street || raw.propertyAddress || '',
      addressCity: raw?.address?.city || '',
      addressState: raw?.address?.state || '',
      addressZip: String(raw?.address?.zip || raw.zip || ''),

      propertyType: raw?.property?.type || raw.propertyType || '',
      bedrooms: String(raw?.property?.bedrooms || ''),
      bathrooms: String(raw?.property?.bathrooms || ''),
      sqFt: String(raw?.property?.sqFt || raw.sqft || ''),
      yearBuilt: String(raw?.property?.yearBuilt || raw.yearBuilt || ''),

      // clean URL only (Zap-friendly)
      ...(audioUrl ? { audioUrl } : {}),

      // useful tags
      leadSource: raw.leadSource || 'Vendor Submission Form',
      isVendorSubmission: true,

      // optional for logs
      onedriveFolder: raw.onedriveFolder || '',
      notes: raw.notes || '',
      whySell: raw.whySell || '',
      timeline: raw.timeline || '',
      vendorInfo: raw.vendorInfo || '',
    };

    // Never forward data: URLs
    if (typeof safe.audioUrl === 'string' && safe.audioUrl.startsWith('data:')) {
      delete safe.audioUrl;
    }

    const zap = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type':'application/json', 'Accept':'application/json' },
      body: JSON.stringify(safe),
    }).catch(e => ({ ok:false, status:0, _neterr:String(e) }));

    if (!zap || zap.status === 0) {
      return NextResponse.json({ ok:false, where:'network', error: zap?._neterr || 'Network error to Zapier' }, { status:200 });
    }

    const bodyText = await zap.text().catch(()=>'');

    if (!zap.ok) {
      // Surface the exact Zapier complaint
      return NextResponse.json({ ok:false, where:'zapier', status: zap.status, error: bodyText }, { status:200 });
    }

    return NextResponse.json({ ok:true, forwarded:true, zapier: bodyText, sent: safe }, { status:200 });
  } catch (err) {
    return NextResponse.json({ ok:false, where:'server', error:String(err) }, { status:200 });
  }
}

export async function GET() {
  return NextResponse.json({ ok:true, envHasVar: !!process.env.ZAPIER_VENDOR_HOOK_URL });
}
