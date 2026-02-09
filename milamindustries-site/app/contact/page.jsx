// app/contact/page.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link'; // ✅ ADDED

export default function ContactPage() {
  // Yes/No toggles
  const [improvements, setImprovements] = useState('No');
  const [repairs, setRepairs] = useState('No');
  const [mortgage, setMortgage] = useState('No');
  const [liens, setLiens] = useState('No');
  const [offerReceived, setOfferReceived] = useState('No');

  // ✅ ADDED: Required consent checkboxes
  const [consentNonMarketing, setConsentNonMarketing] = useState(false);
  const [consentMarketing, setConsentMarketing] = useState(false);
  const [consentError, setConsentError] = useState(null);

  // UI state
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🗓️ Automatically fill current date (YYYY-MM-DD)
  const today = new Date().toISOString().split('T')[0];

  async function onSubmit(e) {
    e.preventDefault();
    const formEl = e.currentTarget;
    setStatus(null);

    // ✅ ADDED: Enforce required checkboxes BEFORE submission
    if (!consentNonMarketing || !consentMarketing) {
      setConsentError('Please check both consent boxes to submit the form.');
      return;
    }
    setConsentError(null);

    setLoading(true);

    const form = new FormData(formEl);
    const data = Object.fromEntries(form.entries());

    const payload = {
      ...data,
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

      // ✅ ADDED: include consent data in payload (does not affect anything else)
      consents: {
        nonMarketingText: true,
        marketingText: true,
        consentTimestamp: new Date().toISOString(),
      },
    };

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok || !json?.ok) throw new Error(json?.error || 'Submit failed');

      if (json.forwarded !== true) {
        setStatus({
          type: 'success',
          msg: 'Thanks—got it! We’ll contact you shortly. (Heads up: forwarding to Zapier failed; check server logs/Zapier.)',
        });
      } else {
        setStatus({ type: 'success', msg: 'Thanks—got it! We’ll contact you shortly.' });
      }

      formEl.reset();
      setImprovements('No'); setRepairs('No'); setMortgage('No'); setLiens('No'); setOfferReceived('No');

      // ✅ ADDED: reset the new checkbox states too
      setConsentNonMarketing(false);
      setConsentMarketing(false);
      setConsentError(null);

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
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Contact Us</h1>
      <p className="mt-3 text-gray-700 max-w-2xl">
        Have questions or want a free, no-obligation cash offer? Tell us a bit about the property
        below. We buy houses nationwide, in any condition, and work on <b>your</b> timeline.
      </p>

      <div className="mt-10 grid md:grid-cols-2 gap-8">
        {/* FORM */}
        <form onSubmit={onSubmit} className="space-y-5 bg-gray-50 p-6 rounded-2xl border shadow-sm">
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
            {/* 🔧 Email now optional */}
            <Field label="Email" name="email" type="email" />
            {/* ✅ Numeric-only phone field */}
            <Field
              label="Phone *"
              name="phone"
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              required
              placeholder="Numbers only"
            />
          </div>

          {/* 🗓️ Auto-filled Date */}
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

          <Select
            label="Type of Property *"
            name="propertyType"
            required
            options={['Single Family', 'Multi Family', 'Condo', 'Land/Lot', 'Commercial', 'Other']}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select label="How many bedrooms? *" name="bedrooms" required options={['1','2','3','4','5','6','7','8+']} />
            <Select label="How many bathrooms? *" name="bathrooms" required options={['1','2','3','4','5','6','7','8+']} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Approx. square feet" name="sqft" inputMode="numeric" placeholder="e.g., 1650" />
            <Field label="Year the home was built" name="yearBuilt" inputMode="numeric" placeholder="e.g., 1994" />
          </div>

          {/* Condition */}
          <YesNoWithText label="Any property improvements?" name="improvements" value={improvements} setValue={setImprovements} textareaName="improvementsNotes" placeholder="Briefly describe improvements…" />
          <YesNoWithText label="Any known repairs needed?" name="repairs" value={repairs} setValue={setRepairs} textareaName="repairsNotes" placeholder="What repairs are needed?" />
          <YesNoWithText label="Is there a current mortgage?" name="mortgage" value={mortgage} setValue={setMortgage} textareaName="mortgageNotes" placeholder="Optional details (balance, behind, etc.)" />
          <YesNoWithText label="Are there any liens against the property?" name="liens" value={liens} setValue={setLiens} textareaName="liensNotes" placeholder="Describe any liens…" />
          <YesNoWithText label="Have you already received an offer on the property?" name="offerReceived" value={offerReceived} setValue={setOfferReceived} textareaName="offerNotes" placeholder="Optional—who/what was offered?" />

          <Select label="Desired sale timeline *" name="timeline" required options={['7–14 days', '30-60 days', '60–90 days', 'Within the next 6 months', 'No timeframe']} />
          <Select label="How did you hear about us?" name="referralSource" options={['Google/Internet Search', 'Social Media', 'Referral', 'Advertisement', 'Other']} />

          {status && (
            <div className={`text-sm rounded-md p-3 ${status.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {status.msg}
            </div>
          )}

          {/* ✅ ADDED: Consent checkboxes ABOVE the submit button */}
          <div className="space-y-4 pt-2">
            <label className="flex items-start gap-3 text-sm text-gray-700">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-gray-300"
                checked={consentNonMarketing}
                onChange={(e) => setConsentNonMarketing(e.target.checked)}
                required
              />
              <span>
                By checking this box, I consent to receive transactional SMS messages from <b>Milam Industries LLC</b> related to my inquiry, including appointment confirmations, property updates, and service notifications. 
                Message frequency varies. Message & data rates may apply. Reply <b>STOP</b> to opt out. Text <b>HELP</b> for assistance.
              </span>
            </label>

            <label className="flex items-start gap-3 text-sm text-gray-700">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-gray-300"
                checked={consentMarketing}
                onChange={(e) => setConsentMarketing(e.target.checked)}
                required
              />
              <span>
                By checking this box, I consent to receive marketing and promotional SMS messages from <b>Milam Industries LLC</b> including offers and follow-ups. Message frequency varies. Message & data rates may apply.
                Reply <b>STOP</b> to opt out. Text <b>HELP</b> for assistance.
              </span>
            </label>

            {consentError && (
              <p className="text-sm text-red-600">{consentError}</p>
            )}
          </div>

          <button type="submit" className="w-full py-3 rounded-xl bg-gray-900 text-white text-sm disabled:opacity-60" disabled={loading}>
            {loading ? 'Submitting…' : 'Submit'}
          </button>

          <p className="mt-2 text-xs text-gray-500 text-center">
  SMS consent is not a condition of purchase.
</p>
          
          {/* ✅ ADDED: Privacy Policy | Terms links UNDER the submit button */}
          <div className="text-center text-sm">
            <Link href="/privacy-policy" className="text-blue-600 underline">
              Privacy Policy
            </Link>
            <span className="mx-2 text-gray-400">|</span>
            <Link href="/terms" className="text-blue-600 underline">
              Terms of Service
            </Link>
          </div>

          <p className="text-xs text-gray-500">By submitting, you agree to be contacted by Milam Industries LLC.</p>
        </form>

        {/* ✅ Sidebar */}
        <aside className="bg-white p-6 rounded-2xl border shadow-sm">
          <h2 className="font-semibold text-lg">Talk to a team member</h2>
          <div className="mt-3 text-sm text-gray-700 space-y-1">
            <p><b>Phone:</b> 888-929-3632</p>
            <p><b>Email:</b> info@milamindustries.com</p>
            <p><b>HQ Office:</b> 300 Colonial Center Pkwy Ste 100, Roswell, GA 30076</p>
          </div>

          <div className="mt-6">
            <iframe
              title="Milam Industries HQ"
              width="100%"
              height="220"
              style={{ border: 0, borderRadius: '0.75rem' }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3313.285367286422!2d-84.32251812358677!3d34.023970573167655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f56e24eeacb06f%3A0xe15ac09e122fa05f!2s300%20Colonial%20Center%20Pkwy%20%23%20100%2C%20Roswell%2C%20GA%2030076!5e0!3m2!1sen!2sus!4v1728654170541!5m2!1sen!2sus"
            />
          </div>

          <div className="mt-6 bg-gray-900 text-white p-5 rounded-xl text-center shadow-sm">
            <p className="text-base font-semibold">Prefer to speak directly?</p>
            <p className="mt-1 text-sm">
              <a href="tel:+18889293632" className="underline hover:text-gray-300" aria-label="Call Milam Industries LLC now">📞 Call us now</a>{' '}
              or{' '}
              <a href="sms:+18889293632" className="underline hover:text-gray-300" aria-label="Text Milam Industries LLC">💬 Text us</a>.
            </p>
            <p className="mt-1 text-xs text-gray-300">
              Our team is available 7 days a week to answer your questions.
            </p>
          </div>

          <div className="mt-6 border-t pt-4 text-sm text-gray-600 space-y-2">
            <p>✅ 100% confidential — your information is never shared.</p>
            <p>🏠 We buy houses nationwide, in any condition.</p>
            <p>🤝 Over a decade of trusted customer service and client-focused solutions.</p>
          </div>

          <div className="mt-6 bg-gray-50 p-4 rounded-xl border text-sm">
            <p className="font-semibold text-gray-800 mb-2">How It Works</p>
            <ol className="list-decimal list-inside space-y-1 text-gray-700">
              <li>Submit your property details above.</li>
              <li>Receive a cash offer within 24–48 hours.</li>
              <li>Pick your closing date and get paid fast.</li>
            </ol>
          </div>
        </aside>
      </div>
    </section>
  );
}

/* ---------- Small form primitives ---------- */
function Field({ label, name, type = 'text', required, inputMode, placeholder, defaultValue }) {
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
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </label>
  );
}

function YesNoWithText({ label, name, value, setValue, textareaName, placeholder }) {
  return (
    <div>
      <span className="block text-sm text-gray-700 mb-1">{label}</span>
      <div className="flex gap-6 text-sm">
        {['Yes', 'No'].map(opt => (
          <label key={opt} className="inline-flex items-center gap-2">
            <input type="radio" name={name} value={opt} checked={value === opt} onChange={e => setValue(e.target.value)} required />
            <span>{opt}</span>
          </label>
        ))}
      </div>
      {value === 'Yes' && (
        <textarea className="mt-3 w-full rounded-xl border px-3 py-2 text-sm" name={textareaName} rows={3} placeholder={placeholder} />
      )}
    </div>
  );
}
