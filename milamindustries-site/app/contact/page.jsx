// app/contact/page.jsx
'use client';
import { useState } from 'react';

export const metadata = {
  title: 'Contact | Milam Industries LLC',
  description:
    'Contact Milam Industries LLC for a fair, no-obligation cash offer. We buy houses nationwide, as-is.',
};

export default function ContactPage() {
  // Yes/No toggles that reveal extra inputs
  const [improvements, setImprovements] = useState('No');
  const [repairs, setRepairs] = useState('No');
  const [mortgage, setMortgage] = useState('No');
  const [liens, setLiens] = useState('No');
  const [offerReceived, setOfferReceived] = useState('No');

  function onSubmit(e) {
    e.preventDefault();

    // Collect form data
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());

    // Coerce multi-select/radios as needed
    data.preferredContact = form.get('preferredContact');

    // Show a friendly confirmation for now.
    // Next step: wire this to REISift and Google Sheets/Zapier.
    alert("Thanks! Your info was submitted. We'll reach out shortly.");

    // console.log(data); // uncomment while testing
  }

  const year = new Date().getFullYear();

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
            <Field label="Email *" name="email" type="email" required />
            <Field label="Phone *" name="phone" inputMode="tel" required />
          </div>

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

          {/* Why sell */}
          <TextArea label="Why Sell" name="whySell" rows={4} placeholder="Tell us what’s going on (optional)" />

          {/* Property type */}
          <Select
            label="Type of Property *"
            name="propertyType"
            required
            options={['Single Family', 'Multi Family', 'Condo', 'Land/Lot', 'Commercial', 'Other']}
          />

          {/* Beds / Baths */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="How many bedrooms? *"
              name="bedrooms"
              required
              options={['1','2','3','4','5','6','7','8+']}
            />
            <Select
              label="How many bathrooms? *"
              name="bathrooms"
              required
              options={['1','2','3','4','5','6','7','8+']}
            />
          </div>

          {/* Size / Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Approx. Square Footage"
              name="sqft"
              inputMode="numeric"
              placeholder="e.g., 1850"
            />
            <Field
              label="Year the home was built"
              name="yearBuilt"
              inputMode="numeric"
              placeholder={`${year - 30}`}
            />
          </div>

          {/* Improvements (Y/N with reveal) */}
          <YesNo
            label="Any property improvements?"
            name="improvements"
            value={improvements}
            onChange={setImprovements}
          />
          {improvements === 'Yes' && (
            <TextArea label="Please describe improvements" name="improvementsDetails" rows={3} />
          )}

          {/* Repairs (Y/N with reveal) */}
          <YesNo
            label="Any known repairs needed?"
            name="repairs"
            value={repairs}
            onChange={setRepairs}
          />
          {repairs === 'Yes' && (
            <TextArea label="Please describe repairs" name="repairsDetails" rows={3} />
          )}

          {/* Mortgage (Y/N with reveal) */}
          <YesNo
            label="Is there a current mortgage?"
            name="mortgage"
            value={mortgage}
            onChange={setMortgage}
          />
          {mortgage === 'Yes' && (
            <TextArea label="Balance / details (optional)" name="mortgageDetails" rows={3} />
          )}

          {/* Liens (Y/N with reveal) */}
          <YesNo
            label="Any liens against the property?"
            name="liens"
            value={liens}
            onChange={setLiens}
          />
          {liens === 'Yes' && (
            <TextArea label="Lien details" name="liensDetails" rows={3} />
          )}

          {/* Offer received (Y/N with reveal) */}
          <YesNo
            label="Have you already received an offer on the property?"
            name="offerReceived"
            value={offerReceived}
            onChange={setOfferReceived}
          />
          {offerReceived === 'Yes' && (
            <TextArea label="Offer amount / details (optional)" name="offerDetails" rows={3} />
          )}

          {/* Timeline */}
          <Select
            label="Desired sale timeline *"
            name="timeline"
            required
            options={['7–14 days','Within 30 days','30–90 days','Within the next 6 months','No timeframe']}
          />

          {/* How did you hear about us */}
          <Select
            label="How did you hear about us?"
            name="source"
            options={['Google/Internet Search','Social Media','Referral','Advertisement','Other']}
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gray-900 text-white text-sm hover:bg-gray-800"
          >
            Submit
          </button>

          <p className="text-xs text-gray-500">
            By submitting, you agree to be contacted by Milam Industries LLC. We respect your privacy.
          </p>
        </form>

        {/* CONTACT INFO (matches your site style) */}
        <aside className="bg-gray-50 p-6 rounded-2xl border shadow-sm">
          <h2 className="font-semibold text-lg mb-3">Our Contact Information</h2>
          <div className="text-gray-700 text-sm space-y-1">
            <p><b>Phone:</b> 678-807-8133</p>
            <p><b>Email:</b> info@milamindustries.com</p>
            <p><b>HQ Office:</b> 300 Colonial Center Pkwy Ste 100, Roswell GA 30076</p>
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
        </aside>
      </div>
    </section>
  );
}

/* ---------- small field components to keep code tidy ---------- */
function Field({ label, name, type = 'text', required, inputMode, placeholder }) {
  return (
    <label className="block text-sm">
      <span className="text-gray-700">{label}</span>
      <input
        className="mt-1 w-full rounded-xl border px-3 py-2"
        name={name}
        type={type}
        required={required}
        inputMode={inputMode}
        placeholder={placeholder}
      />
    </label>
  );
}

function TextArea({ label, name, rows = 3, placeholder }) {
  return (
    <label className="block text-sm">
      <span className="text-gray-700">{label}</span>
      <textarea
        className="mt-1 w-full rounded-xl border px-3 py-2"
        name={name}
        rows={rows}
        placeholder={placeholder}
      />
    </label>
  );
}

function Select({ label, name, options = [], required }) {
  return (
    <label className="block text-sm">
      <span className="text-gray-700">{label}</span>
      <select
        className="mt-1 w-full rounded-xl border px-3 py-2 bg-white"
        name={name}
        required={required}
        defaultValue=""
      >
        <option value="" disabled hidden>
          Select…
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

function YesNo({ label, name, value, onChange }) {
  return (
    <div>
      <span className="block text-sm text-gray-700 mb-1">{label}</span>
      <div className="flex items-center gap-6 text-sm">
        {['Yes', 'No'].map((opt) => (
          <label key={opt} className="inline-flex items-center gap-2">
            <input
              type="radio"
              name={name}
              value={opt}
              checked={value === opt}
              onChange={(e) => onChange(e.target.value)}
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
