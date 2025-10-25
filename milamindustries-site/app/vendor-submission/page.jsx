// app/vendor-submission/page.jsx
'use client';

import { useState } from 'react';

export default function VendorSubmissionPage() {
  // same toggles as your main form
  const [improvements, setImprovements] = useState('No');
  const [repairs, setRepairs] = useState('No');
  const [mortgage, setMortgage] = useState('No');
  const [liens, setLiens] = useState('No');
  const [offerReceived, setOfferReceived] = useState('No');

  // UI state
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  // auto-fill current date (YYYY-MM-DD)
  const today = new Date().toISOString().split('T')[0];

  async function onSubmit(e) {
    e.preventDefault();
    const formEl = e.currentTarget;
    setStatus(null);
    setLoading(true);

    const form = new FormData(formEl);
    const data = Object.fromEntries(form.entries());

    // ---- MP3 upload (optional) ----
    let audioUrl = '';
    const audioInput = formEl.querySelector('input[name="audioFile"]');
    const file = audioInput?.files?.[0];

    try {
      if (file) {
        const MAX_BYTES = 10 * 1024 * 1024; // 10MB
        const validTypes = ['audio/mpeg', 'audio/mp3'];

        if (!validTypes.includes(file.type) && !file.name.toLowerCase().endsWith('.mp3')) {
          throw new Error('Audio must be an .mp3 file.');
        }
        if (file.size > MAX_BYTES) {
          throw new Error('Audio file must be 10MB or smaller.');
        }

        const fd = new FormData();
        fd.append('file', file);

        const uploadRes = await fetch('/api/vendor-audio', {
          method: 'POST',
          body: fd,
        });
        const uploadJson = await uploadRes.json();

        if (!uploadRes.ok || !uploadJson?.ok || !uploadJson?.url) {
          throw new Error(uploadJson?.error || 'Audio upload failed.');
        }
        audioUrl = uploadJson.url;
      }
    } catch (uploadErr) {
      console.error(uploadErr);
      setStatus({
        type: 'error',
        msg: uploadErr?.message || 'Audio upload failed. Please check the file and try again.',
      });
      setLoading(false);
      return;
    }
    // --------------------------------

    // Normalize phone to digits only so it won’t trip any patterns downstream
    const phoneRaw = data.phone || '';
    const normalizedPhone = phoneRaw.replace(/\D+/g, '');

    const payload = {
      ...data,
      phone: normalizedPhone, // normalized
      submittedAt: new Date().toISOString(),
      fullName: [data.firstName, data.lastName].filter(Boolean).join(' ').trim(),
      flags: {
        improvements: { value: data.improvements === 'Yes', notes: data.improvementsNotes || '' },
        repairs: { value: data.repairs === 'Yes', notes: data.repairsNotes || '' },
        mortgage: { value: data.mortgage === 'Yes', notes: data.mortgageNotes || '' },
        liens: { value: data.liens === 'Yes', notes: data.liensNotes || '' },
        offerReceived: { value: data.offerReceived === 'Yes', notes: data.offerNotes || '' },
      },
      address: {
        street: data.propertyAddress || '',
        city: data.city || '',
        state: data.state || '',
        zip: data.zip || '',
      },
      property: {
        type: data.propertyType || '',
        bedrooms: data.bedrooms || '',
        bathrooms: data.bathrooms || '',
        sqFt: data.sqft || '',
        yearBuilt: data.yearBuilt || '',
      },
      leadSource: 'Vendor Submission Form',
      isVendorSubmission: true,
      audioUrl, // may be empty string if no upload
    };

    try {
      const res = await fetch('/api/vendor-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (!res.ok || !json?.ok) throw new Error(json?.error || 'Submit failed');

      setStatus({ type: 'success', msg: 'Thanks—submitted successfully.' });

      formEl.reset();
      setImprovements('No'); setRepairs('No'); setMortgage('No'); setLiens('No'); setOfferReceived('No');
    } catch (err) {
      console.error(err);
      setStatus({
        type: 'error',
        msg: err?.message || 'There was an error submitting the form. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-center">
        Vendor Submission Form
      </h1>

      <div className="mt-10 flex justify-center">
        <form onSubmit={onSubmit} className="w-full space-y-5 bg-gray-50 p-6 rounded-2xl border shadow-sm">
          {/* 1) Vendor info */}
          <Select
            label="Vendor info *"
            name="vendorInfo"
            required
            options={['LeadBanc', 'No Accent Callers', 'Pineapple', 'REVA']}
          />

          {/* 2) Lead status */}
          <Select
            label="Lead status *"
            name="leadStatus"
            required
            options={['Cold', 'Warm', 'Hot']}
          />

          {/* Contact details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="First Name *" name="firstName" required />
            <Field label="Last Name *" name="lastName" required />
          </div>

          {/* Property address */}
          <Field label="Property Address *" name="propertyAddress" required />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="City *" name="city" required />
            <Field label="State *" name="state" required />
            <Field label="Zip Code *" name="zip" required inputMode="numeric" />
          </div>

          {/* Contact info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Email *" name="email" type="email" required />
            <Field
              label="Phone *"
              name="phone"
              type="tel"
              inputMode="tel"
              required
              placeholder="e.g., 5551234567"
              autoComplete="tel"
            />
          </div>

          {/* Date */}
          <Field label="Date *" name="leadDate" type="date" required defaultValue={today} />

          {/* Preferred contact method */}
          <div>
            <span className="block text-sm text-gray-700 mb-1">Preferred Contact Method *</span>
            <div className="flex flex-wrap gap-4 text-sm">
              {['Email', 'Phone', 'Text'].map((opt) => (
                <label key={opt} className="inline-flex items-center gap-2">
                  <input type="radio" name="preferredContact" value={opt} required />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>

          <TextArea label="Why Sell?" name="whySell" rows={4} placeholder="Tell us what’s going on (optional)" />

          {/* Property type */}
          <Select
            label="Type of Property *"
            name="propertyType"
            required
            options={['Single Family', 'Multi Family', 'Condo', 'Land/Lot', 'Commercial', 'Other']}
          />

          {/* Beds / Baths */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select label="How many bedrooms? *" name="bedrooms" required options={['1','2','3','4','5','6','7','8+']} />
            <Select label="How many bathrooms? *" name="bathrooms" required options={['1','2','3','4','5','6','7','8+']} />
          </div>

          {/* Size / Year built */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Approx. square feet" name="sqft" inputMode="numeric" placeholder="e.g., 1650" />
            <Field label="Year the home was built" name="yearBuilt" inputMode="numeric" placeholder="e.g., 1994" />
          </div>

          {/* Condition / toggles with conditional notes */}
          <YesNoWithText
            label="Any property improvements?"
            name="improvements"
            value={improvements}
            setValue={setImprovements}
            textareaName="improvementsNotes"
            placeholder="Briefly describe improvements…"
          />
          <YesNoWithText
            label="Any known repairs needed?"
            name="repairs"
            value={repairs}
            setValue={setRepairs}
            textareaName="repairsNotes"
            placeholder="What repairs are needed?"
          />
          <YesNoWithText
            label="Is there a current mortgage?"
            name="mortgage"
            value={mortgage}
            setValue={setMortgage}
            textareaName="mortgageNotes"
            placeholder="Optional details (balance, behind, etc.)"
          />
          <YesNoWithText
            label="Are there any liens against the property?"
            name="liens"
            value={liens}
            setValue={setLiens}
            textareaName="liensNotes"
            placeholder="Describe any liens…"
          />
          <YesNoWithText
            label="Have you already received an offer on the property?"
            name="offerReceived"
            value={offerReceived}
            setValue={setOfferReceived}
            textareaName="offerNotes"
            placeholder="Optional—who/what was offered?"
          />

          {/* Timeline */}
          <Select
            label="Desired sale timeline *"
            name="timeline"
            required
            options={['7–14 days', '30-60 days', '60–90 days', 'Within the next 6 months', 'No timeframe']}
          />

          {/* Notes */}
          <TextArea
            label="Notes"
            name="notes"
            rows={4}
            placeholder="Anything else worth noting (optional)"
          />

          {/* MP3 upload */}
          <label className="block text-sm">
            <span className="text-gray-700">Upload Audio (MP3, max 10MB)</span>
            <input
              className="mt-1 w-full rounded-xl border px-3 py-2 bg-white"
              type="file"
              name="audioFile"
              accept=".mp3,audio/mpeg"
            />
            <span className="mt-1 block text-xs text-gray-500">
              Optional. Only .mp3 files are accepted. Max size 10MB.
            </span>
          </label>

          {/* Status / errors */}
          {status && (
            <div
              className={`text-sm rounded-md p-3 ${
                status.type === 'success'
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}
            >
              {status.msg}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gray-900 text-white text-sm disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Submitting…' : 'Submit'}
          </button>

          <p className="text-xs text-gray-500 text-center">
            Direct link only. By submitting, you agree to be contacted by Milam Industries LLC.
          </p>
        </form>
      </div>
    </section>
  );
}

/* ---------- Small form primitives ---------- */
function Field({ label, name, type = 'text', required, inputMode, placeholder, defaultValue, autoComplete }) {
  return (
    <label className="block text-sm">
      <span className="text-gray-700">{label}</span>
      <input
        className="mt-1 w-full rounded-xl border px-3 py-2"
        type={type}
        name={name}
        required={required}
        inputMode={inputMode}
        placeholder={placeholder}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
      />
    </label>
  );
}

function TextArea({ label, name, rows = 3, placeholder }) {
  return (
    <label className="block text-sm">
      <span className="text-gray-700">{label}</span>
      <textarea className="mt-1 w-full rounded-xl border px-3 py-2" name={name} rows={rows} placeholder={placeholder} />
    </label>
  );
}

function Select({ label, name, options = [], required }) {
  return (
    <label className="block text-sm">
      <span className="text-gray-700">{label}</span>
      <select className="mt-1 w-full rounded-xl border px-3 py-2 bg-white" name={name} required={required} defaultValue="">
        <option value="" disabled>Select…</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </label>
  );
}

function YesNoWithText({ label, name, value, setValue, textareaName, placeholder }) {
  return (
    <div>
      <span className="block text-sm text-gray-700 mb-1">{label}</span>
      <div className="flex gap-6 text-sm">
        {['Yes', 'No'].map((opt) => (
          <label key={opt} className="inline-flex items-center gap-2">
            <input
              type="radio"
              name={name}
              value={opt}
              checked={value === opt}
              onChange={(e) => setValue(e.target.value)}
              required
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>
      {value === 'Yes' && (
        <textarea
          className="mt-3 w-full rounded-xl border px-3 py-2 text-sm"
          name={textareaName}
          rows={3}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
