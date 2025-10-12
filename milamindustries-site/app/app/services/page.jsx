export const metadata = {
  title: "Services | Milam Industries LLC",
  description:
    "The services we offer homeowners and investors — fast, transparent solutions for any situation.",
};

const services = [
  {
    title: "Cash Offer",
    blurb:
      "Get a fast, fair, all-cash offer with no repairs, showings, or agent fees. Close on your timeline.",
  },
  {
    title: "Vetted Buyers Program",
    blurb:
      "If our offer isn’t the best fit, we’ll match you with pre-qualified buyers to maximize your outcome.",
  },
  {
    title: "Mortgage Assistance Program",
    blurb:
      "Behind or stressed by payments? Explore options that can prevent foreclosure and protect your equity.",
  },
  {
    title: "Split Equity Program",
    blurb:
      "Partner with us to renovate and sell — you avoid upfront costs and share in the increased value.",
  },
  {
    title: "Pre-Foreclosure",
    blurb:
      "Time-sensitive solutions to stop the clock, settle the loan, or exit cleanly with less damage to credit.",
  },
  {
    title: "Inherited Property",
    blurb:
      "Probate, multiple heirs, or out-of-state? We make it simple to sell as-is with clear communication.",
  },
  {
    title: "Divorce",
    blurb:
      "Neutral, hassle-free sale so both parties can move forward quickly, with transparent net proceeds.",
  },
  {
    title: "Tired Landlord",
    blurb:
      "Tenant issues, deferred maintenance, or eviction concerns? Sell the property as-is, occupied or vacant.",
  },
  {
    title: "Distressed Property",
    blurb:
      "Fire, water, mold, code violations — we buy as-is and handle the heavy lifting after closing.",
  },
  {
    title: "Overages",
    blurb:
      "Owed surplus funds from a foreclosure or tax sale? We help verify and recover what may belong to you.",
  },
  {
    title: "Investors",
    blurb:
      "Reliable inventory, quick closes, and transparent numbers for flippers, BRRRR buyers, and landlords.",
  },
  {
    title: "FAQ",
    blurb:
      "Common questions about our process, timing, fees, and how offers are calculated — straight answers.",
  },
];

const faqs = [
  {
    q: "How fast can you close?",
    a: "As quickly as 7 days in many cases. If you need more time, we’ll close on the date that works for you.",
  },
  {
    q: "Do I need to clean or make repairs?",
    a: "No. We purchase as-is and handle repairs, clean-outs, and inspections after closing.",
  },
  {
    q: "Are there fees or commissions?",
    a: "No agent commissions when you sell directly to us. We present a clear net offer so you know your bottom line.",
  },
  {
    q: "How do you decide on an offer?",
    a: "We look at the home’s after-repair value, minus the realistic cost of renovations, holding, and resale.",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#E6EFE6] to-[#C9D7CC] text-[#0b1c13]">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-10 pt-16 sm:pt-20">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Services
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-black/70">
          At Milam Industries LLC, we offer flexible, transparent solutions for
          homeowners and investors. Whether you want a quick cash sale or help
          navigating a complex situation, our team makes the process simple and
          on your schedule.
        </p>

        <div className="mt-6">
          <a
            href="/#contact"
            className="inline-block rounded-xl bg-[#111827] px-5 py-3 text-sm font-medium text-white hover:bg-[#0c131c] transition"
          >
            Talk to us — no obligation
          </a>
        </div>
      </section>

      {/* Services grid */}
      <section className="mx-auto max-w-6xl px-6 pb-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.title}
              className="rounded-2xl border border-black/10 bg-white/80 p-5 shadow-sm backdrop-blur-sm"
            >
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-black/70">{s.blurb}</p>
              <div className="mt-4">
                <a
                  href="/#contact"
                  className="text-sm font-medium underline underline-offset-4 hover:no-underline"
                >
                  Get help with {s.title.toLowerCase()}
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <h2 className="text-2xl font-semibold">Questions & Answers</h2>
        <div className="mt-4 space-y-3">
          {faqs.map((f, idx) => (
            <details
              key={idx}
              className="rounded-2xl border border-black/10 bg-white/80 p-5 shadow-sm backdrop-blur-sm"
            >
              <summary className="cursor-pointer text-base font-medium list-none">
                {f.q}
              </summary>
              <p className="mt-2 text-black/70">{f.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-8">
          <a
            href="/#contact"
            className="inline-block rounded-xl bg-[#111827] px-5 py-3 text-sm font-medium text-white hover:bg-[#0c131c] transition"
          >
            Ask a question
          </a>
        </div>
      </section>
    </main>
  );
}
