// app/api/vendor-lead/route.js
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

// Make sure this is set in Vercel env:
// ZAPIER_VENDOR_HOOK_URL = https://hooks.zapier.com/hooks/catch/xxx/yyy
const ZAPIER_HOOK = process.env.ZAPIER_VENDOR_HOOK_URL;

export async function GET() {
  return NextResponse.json({
    ok: true,
    route: '/api/vendor-lead',
    forwardsTo: ZAPIER_HOOK ? 'ZAPIER_VENDOR_HOOK_URL' : '(not configured)',
    expects: 'POST application/json',
  });
}

export async function POST(req) {
  try {
    const ct = (req.headers.get('content-type') || '').toLowerCase();
    if (!ct.includes('application/json')) {
      return NextResponse.json({ ok: false, error: 'Use application/json.' }, { status: 400 });
    }

    const body = await req.json();

    // ---- Normalize & defaults ----
    const toStr = v => (v == null ? '' : String(v));
    const yesNoToBool = v => String(v).toLowerCase() === 'yes';

    const firstName = toStr(body.firstName);
    const lastName  = toStr(body.lastName);
    const fullName  = toStr(body.fullName || `${firstName} ${lastName}`.trim());

    // ⬇️ Key change: sanitize email (blank -> null)
    const emailRaw  = body.email;
    const email     = (emailRaw && String(emailRaw).trim() !== '') ? String(emailRaw).trim() : null;

    const phone     = toStr(body.phone);
    const phoneDigits = phone.replace(/\D+/g, '');
    const vendorName  = toStr(body.vendorName);
    const leadStatus  = toStr(body.leadStatus);
    const leadDate    = toStr(body.leadDate);
    const preferredContact = toStr(body.preferredContact);

    const addr = body.address || {};
    const prop = body.property || {};
    const flags = body.flags || {};

    const addressStreet = toStr(addr.street);
    const addressCity   = toStr(addr.city);
    const addressState  = toStr(addr.state);
    const addressZip    = toStr(addr.zip);

    const propertyType  = toStr(prop.type);
    const bedrooms      = toStr(prop.bedrooms);
    const bathrooms     = toStr(prop.bathrooms);
    const askingPrice   = toStr(prop.askingPrice);   // NEW
    const marketValue   = toStr(prop.marketValue);   // NEW
    const sqFt          = toStr(prop.sqFt);
    const yearBuilt     = toStr(prop.yearBuilt);

    const whySell       = toStr(body.whySell);
    const timeline      = toStr(body.timeline);
    const notes         = toStr(body.notes);

    const submittedAt   = toStr(body.submittedAt || new Date().toISOString());

    const audioUrl      = toStr(body.audioUrl);
    const onedriveFolder= toStr(body.onedriveFolder);

    // Individual flags (ensure presence even if "No")
    const f = (k) => (flags[k] || {});
    const improvementsValue = !!f('improvements').value ? 'Yes' : 'No';
    const repairsValue      = !!f('repairs').value ? 'Yes' : 'No';
    const mortgageValue     = !!f('mortgage').value ? 'Yes' : 'No';
    const liensValue        = !!f('liens').value ? 'Yes' : 'No';
    const offerValue        = !!f('offerReceived').value ? 'Yes' : 'No';

    const improvementsNotes = toStr(f('improvements').notes);
    const repairsNotes      = toStr(f('repairs').notes);
    const mortgageNotes     = toStr(f('mortgage').notes);
    const liensNotes        = toStr(f('liens').notes);
    const offerNotes        = toStr(f('offerReceived').notes);

    // ---- Build payload for Zapier ----
    const flat = {
      Vendor_Name: vendorName,
      Lead_Status: leadStatus,
      Lead_Date: leadDate,
      Preferred_Contact: preferredContact,

      First_Name: firstName,
      Last_Name: lastName,
      Full_Name: fullName,
      // Email: (conditionally added below)
      Phone: phone,
      Phone_Digits: phoneDigits,

      Address_Street: addressStreet,
      Address_City: addressCity,
      Address_State: addressState,
      Address_Zip: addressZip,

      Property_Type: propertyType,
      Property_Bedrooms: bedrooms,
      Property_Bathrooms: bathrooms,
      Property_Asking_Price: askingPrice, // NEW
      Property_Market_Value: marketValue, // NEW
      Property_SqFt: sqFt,
      Property_Year_Built: yearBuilt,

      Why_Sell: whySell,
      Timeline: timeline,
      Notes: notes,

      Improvements: improvementsValue,
      Improvements_Notes: improvementsNotes,
      Repairs: repairsValue,
      Repairs_Notes: repairsNotes,
      Mortgage: mortgageValue,
      Mortgage_Notes: mortgageNotes,
      Liens: liensValue,
      Liens_Notes: liensNotes,
      Offer_Received: offerValue,
      Offer_Notes: offerNotes,

      Audio_URL: audioUrl,
      OneDrive_Folder: onedriveFolder,

      Submitted_At: submittedAt,
      Is_Vendor_Submission: !!body.isVendorSubmission,
      Lead_Source: toStr(body.leadSource || 'Vendor Submission Form'),
    };

    // ⬇️ Only include Email if present (prevents “pattern” errors)
    if (email) {
      flat.Email = email;
    }

    // Structured copy
    const structured = {
      vendorName, leadStatus, leadDate, preferredContact,
      firstName, lastName, fullName,
      email: email ?? null,
      phone, phoneDigits,
      address: { street: addressStreet, city: addressCity, state: addressState, zip: addressZip },
      property: {
        type: propertyType,
        bedrooms,
        bathrooms,
        askingPrice,  // NEW
        marketValue,  // NEW
        sqFt,
        yearBuilt
      },
      whySell, timeline, notes,
      flags: {
        improvements: { value: yesNoToBool(improvementsValue), notes: improvementsNotes },
        repairs:      { value: yesNoToBool(repairsValue),      notes: repairsNotes },
        mortgage:     { value: yesNoToBool(mortgageValue),     notes: mortgageNotes },
        liens:        { value: yesNoToBool(liensValue),        notes: liensNotes },
        offerReceived:{ value: yesNoToBool(offerValue),        notes: offerNotes },
      },
      audioUrl, onedriveFolder,
      submittedAt,
      isVendorSubmission: !!body.isVendorSubmission,
      leadSource: toStr(body.leadSource || 'Vendor Submission Form'),
    };

    const toZapier = {
      ...flat,
      _structured: structured,
    };

    if (!ZAPIER_HOOK) {
      console.error('ZAPIER_VENDOR_HOOK_URL not configured');
      return NextResponse.json({ ok: false, error: 'Server not configured (missing Zapier hook URL).' }, { status: 500 });
    }

    const fw = await fetch(ZAPIER_HOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(toZapier),
    });

    if (!fw.ok) {
      const text = await fw.text();
      throw new Error(`Zapier forward failed (${fw.status}). ${text || ''}`);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('vendor-lead error:', err);
    return NextResponse.json({ ok: false, error: err?.message || 'Submit failed.' }, { status: 500 });
  }
}
