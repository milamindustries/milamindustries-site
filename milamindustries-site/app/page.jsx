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
// BEFORE
{ label: "Services", href: "#services" },

// AFTER
{ label: "Services", href: "/services" },

  hero: {
    title: "Sell your house fast, the hassle-free way.",
    subtitle:
      "We buy houses in any condition, in any situation, no closing cost, no fees, and quick closing. Get a free no risk, no obligation cash offer.",
    ctaPrimary: "Get a cash offer",
    ctaSecondary: "Learn more",
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
      for (let i=0;i<keys.length-1;i++) obj = obj[keys[i]];
      obj[keys.at(-1)] = value;
      return next;
    });
  }

  return (
    <div className="min-h-screen" style={{ '--accent': data.theme.accent }}>
      {/* NAV */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={data.brand.logoUrl} alt="logo" className="h-10 w-auto rounded" />
            <div>
              <div className="font-semibold text-lg">{data.brand.name}</div>
              <div className="text-xs text-gray-500">{data.brand.tagline}</div>
            </div>
          </div>
          <nav className="hidden md:flex gap-6 text-sm">
            {data.nav.map(n => (
              <a key={n.label} href={n.href} className="hover:text-gray-900 text-gray-600">{n.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href="#contact" className="px-4 py-2 rounded-xl border border-gray-300 text-sm">Get offer</a>
            <button onClick={()=>setEdit(e=>!e)} className="px-3 py-2 rounded-xl text-sm bg-gray-900 text-white">{edit ? 'Done' : 'Edit'}</button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden">
        <img src={data.hero.imageUrl} alt="home" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="relative max-w-6xl mx-auto px-4 py-24 md:py-32">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 max-w-3xl">{data.hero.title}</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl text-gray-700">{data.hero.subtitle}</p>
          <p className="mt-2 text-green-700 font-medium">We proudly operate Nationwide.</p>
          <div className="mt-8 flex gap-3">
            <a href="#contact" className="px-5 py-3 rounded-2xl bg-gray-900 text-white text-sm shadow">{data.hero.ctaPrimary}</a>
            <a href="#services" className="px-5 py-3 rounded-2xl border border-gray-300 text-sm">{data.hero.ctaSecondary}</a>
          </div>
        </div>
      </section>

      {/* QUICK EDIT PANEL */}
      {edit && (
        <div className="max-w-6xl mx-auto px-4 mt-6 mb-2">
          <div className="grid md:grid-cols-2 gap-4 bg-white p-4 rounded-2xl border">
            <Field label="Brand Name" value={data.brand.name} onChange={v=>update('brand.name', v)} />
            <Field label="Tagline" value={data.brand.tagline} onChange={v=>update('brand.tagline', v)} />
            <Field label="Logo URL" value={data.brand.logoUrl} onChange={v=>update('brand.logoUrl', v)} />
            <Field label="Hero Title" value={data.hero.title} onChange={v=>update('hero.title', v)} />
            <Field label="Hero Subtitle" value={data.hero.subtitle} onChange={v=>update('hero.subtitle', v)} />
            <Field label="Hero Image URL" value={data.hero.imageUrl} onChange={v=>update('hero.imageUrl', v)} />
          </div>
          <p className="text-xs text-gray-500 mt-2">Tip: paste your real logo & photos to instantly brand the site.</p>
        </div>
      )}

      {/* SERVICES */}
      <section id="services" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold">What we offer</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {data.services.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border shadow-sm">
              <div className="text-lg font-semibold">{s.title}</div>
              <p className="mt-2 text-gray-600 text-sm">{s.desc}</p>
            </div>
          ))}
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

      {/* PROCESS */}
      <section id="process" className="bg-white/60 border-y">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold">How it works</h2>
          <ol className="mt-8 grid md:grid-cols-3 gap-4">
            {data.process.map((p) => (
              <li key={p.step} className="rounded-2xl p-6 bg-white border">
                <div className="text-sm text-gray-500">Step {p.step}</div>
                <div className="font-semibold mt-1">{p.title}</div>
                <p className="text-gray-600 text-sm mt-2">{p.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">About us</h2>
            <p className="mt-4 text-gray-700">{data.about.blurb}</p>
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2">
              {data.about.highlights.map((h, i) => (
                <li key={i} className="text-sm bg-white border rounded-xl px-3 py-2">{h}</li>
              ))}
            </ul>
          </div>
          <div className="bg-gradient-to-br from-white to-gray-50 border rounded-2xl p-6">
            <h3 className="font-semibold">Why sellers choose us</h3>
            <ul className="mt-3 text-sm text-gray-700 list-disc list-inside space-y-1">
              <li>No agent commissions or hidden fees</li>
              <li>We buy as‑is—even with tenants or liens</li>
              <li>Fast, clear communication</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-white border-t">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold">Get your offer</h2>
          <p className="mt-2 text-gray-600 max-w-2xl">{data.contact.leadText}</p>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <form onSubmit={(e)=>{e.preventDefault(); alert('Form submitted (demo). We\'ll wire this to email/CRM next.');}} className="space-y-3 bg-gray-50 p-6 rounded-2xl border">
              <Input label="Full name" required/>
              <Input label="Phone" required/>
              <Input label="Email" type="email"/>
              <Input label="Property address" required/>
              <Input label="Best time to contact"/>
              <button type="submit" className="w-full py-3 rounded-xl bg-gray-900 text-white text-sm">Request offer</button>
              <p className="text-xs text-gray-500">By submitting, you agree to be contacted by {data.brand.name}.</p>
            </form>
            <div className="bg-gray-50 p-6 rounded-2xl border">
              <h3 className="font-semibold">Contact</h3>
              <div className="mt-3 text-sm text-gray-700 space-y-1">
                <p><b>Phone:</b> {data.contact.phone}</p>
                <p><b>Email:</b> {data.contact.email}</p>
                <p><b>HQ Office:</b> {data.contact.office}</p>
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
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-6">
          <div>
            <div className="font-semibold text-white">{data.brand.name}</div>
            <p className="text-sm mt-2 max-w-md">{data.brand.tagline}</p>
          </div>
          <div className="text-sm md:text-right space-y-1">
            <a href="#home" className="block hover:text-white">Home</a>
            <a href="#services" className="block hover:text-white">Services</a>
            <a href="#process" className="block hover:text-white">How it works</a>
            <a href="#about" className="block hover:text-white">About</a>
            <a href="#contact" className="block hover:text-white">Contact</a>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="max-w-6xl mx-auto px-4 py-4 text-xs text-gray-400">{data.footer.legal}</div>
        </div>
      </footer>
    </div>
  )
}

function Field({ label, value, onChange }) {
  return (
    <label className="text-sm block">
      <div className="text-gray-600 mb-1">{label}</div>
      <input className="w-full rounded-xl border px-3 py-2" value={value} onChange={(e)=>onChange(e.target.value)} />
    </label>
  )
}

function Input({ label, type='text', required }) {
  return (
    <label className="block text-sm">
      <span className="text-gray-700">{label}{required && ' *'}</span>
      <input type={type} required={required} className="mt-1 w-full rounded-xl border px-3 py-2" />
    </label>
  )
}
