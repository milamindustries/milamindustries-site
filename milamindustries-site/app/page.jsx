'use client'
import { useState } from 'react'

const defaultData = {
  brand: {
    name: "Milam Industries LLC",
    tagline: "Real estate solutions | Nationwide coverage",
    logoUrl: "https://placehold.co/200x60?text=Milam+Industries",
  },
  theme: {
    primary: "#111827",
    accent: "#22c55e",
  },
  nav: [
    { label: "Home", href: "#home" },
    { label: "Services", href: "/services" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],

  hero: {
    title: "Sell your house fast, the hassle-free way.",
    subtitle:
      "We buy houses in any condition, in any situation, no closing cost, no fees, and quick closing. Get a free no risk, no obligation cash offer.",
    ctaPrimary: "Get a cash offer",
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1600&auto=format&fit=crop",
  },
  services: [
    { title: "Cash Offers", desc: "Receive a fair cash offer within 24–48 hours." },
    { title: "No Repairs Needed", desc: "Sell as-is. We handle clean-out and closing cost." },
    { title: "Flexible Closing", desc: "Pick the closing date that works for you—days or weeks, not months." },
  ],
  process: [
    { step: 1, title: "Call or submit", desc: "Tell us about the property—address, condition, and timeline." },
    { step: 2, title: "Offer", desc: "Get a no-obligation cash offer. Transparent numbers, no pressure." },
    { step: 3, title: "Close", desc: "Choose your date. We coordinate title & paperwork." },
  ],
  about: {
    blurb:
      "At Milam Industries LLC, we help homeowners find simple and stress-free ways to sell their properties fast. Whether you're relocating, downsizing, facing foreclosure, or just need a quick sale, we focus on providing real solutions that fit your goals. Our mission is to deliver honest communication, fair offers, and a smooth closing experience from start to finish.",
    highlights: ["Nationwide reach", "Straightforward process", "Trusted buyers network"],
  },
  contact: {
    phone: "678-807-8133",
    email: "info@milamindustries.com",
    office: "300 Colonial Center Pkwy Ste 100, Roswell GA 30076",
    leadText: "Start with a free, no-obligation offer. Fill out the form and we’ll reach out today.",
  },
  footer: {
    legal: "© " + new Date().getFullYear() + " Milam Industries LLC. All rights reserved.",
  },
};

export default function Page() {
  const [data, setData] = useState(defaultData);
  const [edit, setEdit] = useState(false);

  function update(path, value) {
    setData(prev => {
      const next = structuredClone(prev);
      const keys = path.split('.');
      let obj = next;
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
      obj[keys.at(-1)] = value;
      return next;
    });
  }

  return (
    <div className="min-h-screen" style={{ '--accent': data.theme.accent }}>
      {/* NAV */}

      {/* HERO (full-bleed image — only change) */}
      <section id="home" className="relative overflow-hidden">
        {/* Full-bleed background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
            <img
              src={data.hero.imageUrl}
              alt="home"
              className="w-full h-[520px] md:h-[640px] object-cover"
            />
            {/* soft gradient for legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/70 to-transparent" />
          </div>
        </div>

        {/* Content container (unchanged) */}
        <div className="relative max-w-6xl mx-auto px-4 py-24 md:py-32">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 max-w-3xl">{data.hero.title}</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl text-gray-700">{data.hero.subtitle}</p>
          <p className="mt-2 text-green-700 font-medium">We proudly operate Nationwide.</p>
          <div className="mt-8 flex gap-3">
            {/* Route to the Contact page */}
            <a href="/contact" className="px-5 py-3 rounded-2xl bg-gray-900 text-white text-sm shadow">
              {data.hero.ctaPrimary}
            </a>
            {/* Secondary CTA removed */}
          </div>
        </div>
      </section>

      {/* QUICK EDIT PANEL */}
      {edit && (
        <div className="max-w-6xl mx-auto px-4 mt-6 mb-2">
          <div className="grid md:grid-cols-2 gap-4 bg-white p-4 rounded-2xl border">
            <Field label="Brand Name" value={data.brand.name} onChange={v => update('brand.name', v)} />
            <Field label="Tagline" value={data.brand.tagline} onChange={v => update('brand.tagline', v)} />
            <Field label="Logo URL" value={data.brand.logoUrl} onChange={v => update('brand.logoUrl', v)} />
            <Field label="Hero Title" value={data.hero.title} onChange={v => update('hero.title', v)} />
            <Field label="Hero Subtitle" value={data.hero.subtitle} onChange={v => update('hero.subtitle', v)} />
            <Field label="Hero Image URL" value={data.hero.imageUrl} onChange={v => update('hero.imageUrl', v)} />
          </div>
          <p className="text-xs text-gray-500 mt-2">Tip: paste your real logo & photos to instantly brand the site.</p>
        </div>
      )}

      {/* SERVICES */}
      <section id="services" className="max-w-6xl mx-auto px-4 pt-16 pb-12">
        <h2 className="text-2xl md:text-3xl font-bold">What we offer</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {data.services.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border shadow-sm">
              <div className="text-lg font-semibold">{s.title}</div>
              <p className="mt-2 text-gray-600 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* SITUATIONS WE HELP WITH */}
        <div className="mt-16">
          <h3 className="text-2xl md:text-3xl font-bold text-center">
            We buy houses in any situation
          </h3>
          <p className="mt-3 text-center text-gray-600 max-w-4xl mx-auto">
            There’s no issue we haven’t seen. Whether you’re facing repairs, life changes, or
            financial pressure, we buy houses nationwide — as-is, for cash, and on your schedule.
          </p>

          <div className="mt-10 grid md:grid-cols-2 gap-8">
            {/* LEFT COLUMN */}
            <ul className="space-y-6 text-gray-800">
              <li className="flex gap-3">
                <svg className="h-5 w-5 text-green-600 mt-1 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.704 5.29a1 1 0 010 1.42l-7.2 7.2a1 1 0 01-1.42 0l-3.2-3.2a1 1 0 111.42-1.42l2.49 2.49 6.49-6.49a1 1 0 011.42 0z" clipRule="evenodd"/>
                </svg>
                <div>
                  <p className="font-semibold">Too many repairs to deal with</p>
                  <p className="text-sm text-gray-600">
                    Got a big renovation quote or don’t want the hassle? Sell as-is. We handle the clean-out and repairs.
                  </p>
                </div>
              </li>

              <li className="flex gap-3">
                <svg className="h-5 w-5 text-green-600 mt-1 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.704 5.29a1 1 0 010 1.42l-7.2 7.2a1 1 0 01-1.42 0l-3.2-3.2a1 1 0 111.42-1.42l2.49 2.49 6.49-6.49a1 1 0 011.42 0z" clipRule="evenodd"/>
                </svg>
                <div>
                  <p className="font-semibold">Inherited a property</p>
                  <p className="text-sm text-gray-600">
                    Inherited a house and need to sell quickly? We can help simplify probate sales and buy as-is.
                  </p>
                </div>
              </li>

              <li className="flex gap-3">
                <svg className="h-5 w-5 text-green-600 mt-1 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.704 5.29a1 1 0 010 1.42l-7.2 7.2a1 1 0 01-1.42 0l-3.2-3.2a1 1 0 111.42-1.42l2.49 2.49 6.49-6.49a1 1 0 011.42 0z" clipRule="evenodd"/>
                </svg>
                <div>
                  <p className="font-semibold">Going through divorce</p>
                  <p className="text-sm text-gray-600">
                    Need a fast sale to move on? We make clear, fair offers with flexible closing options.
                  </p>
                </div>
              </li>
            </ul>

            {/* RIGHT COLUMN */}
            <ul className="space-y-6 text-gray-800">
              <li className="flex gap-3">
                <svg className="h-5 w-5 text-green-600 mt-1 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.704 5.29a1 1 0 010 1.42l-7.2 7.2a1 1 0 01-1.42 0l-3.2-3.2a1 1 0 111.42-1.42l2.49 2.49 6.49-6.49a1 1 0 011.42 0z" clipRule="evenodd"/>
                </svg>
                <div>
                  <p className="font-semibold">Stop foreclosure</p>
                  <p className="text-sm text-gray-600">
                    Behind on payments? We can make an immediate cash offer to help you avoid losing your property.
                  </p>
                </div>
              </li>

              <li className="flex gap-3">
                <svg className="h-5 w-5 text-green-600 mt-1 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.704 5.29a1 1 0 010 1.42l-7.2 7.2a1 1 0 01-1.42 0l-3.2-3.2a1 1 0 111.42-1.42l2.49 2.49 6.49-6.49a1 1 0 011.42 0z" clipRule="evenodd"/>
                </svg>
                <div>
                  <p className="font-semibold">Moving out of state</p>
                  <p className="text-sm text-gray-600">
                    Relocating? Close on your schedule and skip listings, agents, and showings.
                  </p>
                </div>
              </li>

              <li className="flex gap-3">
                <svg className="h-5 w-5 text-green-600 mt-1 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.704 5.29a1 1 0 010 1.42l-7.2 7.2a1 1 0 01-1.42 0l-3.2-3.2a1 1 0 111.42-1.42l2.49 2.49 6.49-6.49a1 1 0 011.42 0z" clipRule="evenodd"/>
                </svg>
                <div>
                  <p className="font-semibold">Tired of dealing with tenants</p>
                  <p className="text-sm text-gray-600">
                    Landlords, sell problem rentals without fixing, cleaning, or evicting. We’ll buy it directly.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        {/* COMPARISON SECTION */}
        <div className="mt-20 bg-gray-100 p-8 rounded-2xl border">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-6">What Are The Benefits Of Selling My House For Cash?</h3>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10">
            Milam Industries LLC provides the fastest option for selling your home. <b>No listing fees</b>, agent commissions, and a <b>quick and hassle-free</b> closing process. Getting rid of the headache and hassle of dealing with an unwanted property is our service to you.
          </p>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-white p-6 rounded-2xl border shadow-sm">
              <h4 className="text-xl font-semibold mb-2 text-green-700">Sell With Our Cash Offer Program</h4>
              <p className="italic text-gray-700 mb-4">Sell your house to Milam Industries LLC</p>
              <ul className="text-sm text-gray-700 list-disc list-inside space-y-2">
                <li><b>Competitive cash offer within 24 hours</b> – You choose your closing day.</li>
                <li><b>Zero fees, zero commissions, zero closing costs</b> – What we offer is what you get.</li>
                <li><b>No showings, no hassles</b> – Sell your home as-is without cleaning or repairs.</li>
                <li><b>We cover repairs</b> – You don’t have to lift a finger or spend a dime.</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-2xl border shadow-sm">
              <h4 className="text-xl font-semibold mb-2 text-red-600">Sell The Traditional Way</h4>
              <p className="italic text-gray-700 mb-4">Listing your house with an agent</p>
              <ul className="text-sm text-gray-700 list-disc list-inside space-y-2">
                <li><b>Could take months</b> to sell your house, all while paying holding costs.</li>
                <li><b>Fees and commissions add up</b> – 6% average agent fees reduce your profit.</li>
                <li><b>Open houses and showings</b> – Constant disruption to your daily life.</li>
                <li><b>You may be asked to make repairs</b> – Costly and time-consuming updates required.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- A QUICKER WAY TO SELL --- */}
      <section className="max-w-6xl mx-auto px-4 pt-0 pb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center">
          A Quicker Way To Sell Your House
        </h2>

        <p className="mt-4 text-gray-700 text-center max-w-3xl mx-auto">
          Is there a way to skip the uncertainty and lengthy process of a traditional home sale?
          Yes—sell directly to Milam Industries LLC. We buy houses for cash nationwide so you can
          sell fast without showings or paying an agent’s commission.
        </p>
        <p className="mt-2 text-gray-700 text-center max-w-3xl mx-auto">
          When you work with our Cash Home Buyer program, the process is simple, transparent, and on your timeline.
        </p>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border shadow-sm">
            <h3 className="text-xl font-semibold">No Commissions</h3>
            <p className="mt-3 text-gray-700 text-sm">
              No commissions (and we’ll pay standard closing costs). Our profit comes from
              fixing up the property and selling it later—we don’t charge you fees.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 border shadow-sm">
            <h3 className="text-xl font-semibold">Private Home Sale</h3>
            <p className="mt-3 text-gray-700 text-sm">
              Fully confidential. Avoid sharing your info with agents, dozens of buyers, and the MLS.
              Our process is discreet and straightforward.
            </p>
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border shadow-sm">
            <h3 className="text-xl font-semibold">Sell In As-Is Condition</h3>
            <p className="mt-3 text-gray-700 text-sm">
              When we say “we buy houses as-is,” we mean it. If there are repairs you don’t want to make,
              that’s fine—we’ll handle them after we buy.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 border shadow-sm">
            <h3 className="text-xl font-semibold">No Repairs Needed</h3>
            <p className="mt-3 text-gray-700 text-sm">
              We deal with repairs ourselves once we purchase your home—from small fixes to full renovations.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 border shadow-sm">
            <h3 className="text-xl font-semibold">Fast Cash Sale</h3>
            <p className="mt-3 text-gray-700 text-sm">
              We can make a decision quickly. No waiting around for buyer financing—we’re ready to buy now.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 border shadow-sm">
            <h3 className="text-xl font-semibold">No Cleaning Needed</h3>
            <p className="mt-3 text-gray-700 text-sm">
              We’ll handle the clean-out so you don’t have to prep for open houses or showings.
            </p>
          </div>
        </div>
      </section>

      {/* --- OPTIONS FOR SELLING --- */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="bg-gray-100 p-8 md:p-10 rounded-2xl border">
          <h2 className="text-2xl md:text-3xl font-bold text-center">
            Options For Selling Your House Fast
          </h2>
          <p className="mt-3 text-gray-700 text-center max-w-3xl mx-auto">
            You’ve got choices. Here are three common paths homeowners compare when they want to sell quickly.
          </p>

          <div className="mt-10 grid md:grid-cols-3 gap-8">
            {/* 1 */}
            <div className="bg-white rounded-2xl p-6 border shadow-sm">
              <div className="text-4xl font-bold text-gray-900">1</div>
              <h3 className="mt-4 text-lg font-semibold">
                List your house with a real estate agent
              </h3>
              <p className="mt-3 text-gray-700 text-sm">
                From listing to cash in hand is commonly 45–90+ days. You’ll handle showings,
                inspections, appraisals, buyer financing, and agent commissions.
              </p>
            </div>

            {/* 2 */}
            <div className="bg-white rounded-2xl p-6 border shadow-sm">
              <div className="text-4xl font-bold text-gray-900">2</div>
              <h3 className="mt-4 text-lg font-semibold">
                Sell the house yourself (FSBO)
              </h3>
              <p className="mt-3 text-gray-700 text-sm">
                Save on commissions, but take on all the work: marketing, showings, contracts,
                negotiating, and coordinating closing—often a big time commitment.
              </p>
            </div>

            {/* 3 */}
            <div className="bg-white rounded-2xl p-6 border shadow-sm">
              <div className="text-4xl font-bold text-gray-900">3</div>
              <h3 className="mt-4 text-lg font-semibold">
                Sell for cash to Milam Industries LLC
              </h3>
              <p className="mt-3 text-gray-700 text-sm">
                Skip listings and repairs. Pick your closing date, get a transparent all-cash
                offer, and close on your timeline. No obligations and no pressure.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

function Field({ label, value, onChange }) {
  return (
    <label className="text-sm block">
      <div className="text-gray-600 mb-1">{label}</div>
      <input className="w-full rounded-xl border px-3 py-2" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  )
}

function Input({ label, type = 'text', required }) {
  return (
    <label className="block text-sm">
      <span className="text-gray-700">{label}{required && ' *'}</span>
      <input
        type={type}
        required={required}
        className="mt-1 w-full rounded-xl border px-3 py-2"
      />
    </label>
  );
}
