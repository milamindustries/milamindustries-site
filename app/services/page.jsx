export const metadata = {
  title: 'Services — Milam Industries LLC',
  description:
    'We help homeowners nationwide with fast, transparent solutions: cash offers, vetted buyers, mortgage assistance, pre-foreclosure help, overages, inherited property, and more.',
};

export default function ServicesPage() {
  return (
    <main className="bg-white text-gray-900">
      {/* Page Hero */}
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <p className="text-sm font-medium tracking-wide text-gray-500 uppercase">
          Services
        </p>
        <h1 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">
          How we can help — in any condition, any situation
        </h1>
        <p className="mt-4 max-w-3xl text-gray-600">
          At <span className="font-semibold">Milam Industries LLC</span>, we provide clear options
          with no obligation, no commissions, and no repairs required. Choose what fits your goals —
          we’ll handle the details and close on your timeline.
        </p>

        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <a href="/contact" className="inline-flex items-center rounded-lg border border-gray-300 px-3 py-2 hover:bg-gray-50">
            Contact Us
          </a>
          <a href="/#get-offer" className="inline-flex items-center rounded-lg bg-gray-900 px-3 py-2 text-white hover:bg-gray-800">
            Request Offer
          </a>
          <a href="/how-it-works" className="inline-flex items-center rounded-lg border border-gray-300 px-3 py-2 hover:bg-gray-50">
            How It Works
          </a>
        </div>
      </section>

      {/* Services Grid */}
      <section className="border-t">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            <ServiceCard
              title="Cash Offer"
              blurb="Get a no-obligation, all-cash offer. No repairs, no showings, and no agent fees."
              goodFor="Speed, certainty, properties needing work."
              deliverable="Clear written offer and hassle-free closing (often in as little as 7 days)."
            />
            <ServiceCard
              title="Vetted Buyers Program"
              blurb="We match you with pre-screened retail or investor buyers and coordinate the moving parts."
              goodFor="Sellers who want options beyond a cash offer."
              deliverable="Qualified interest, transparent offers, smooth coordination."
            />
            <ServiceCard
              title="Mortgage Assistance Program"
              blurb="Behind on payments? We help you understand timelines and relief options that protect your credit."
              goodFor="Pre-foreclosure, payment changes, financial hardship."
              deliverable="Clarity on options and a practical plan forward."
            />
            <ServiceCard
              title="Split Equity Program"
              blurb="Partner with us to share in upside after improvements or repositioning."
              goodFor="Properties with strong upside where you don’t want to front the work."
              deliverable="Aligned incentives and clear terms."
            />
            <ServiceCard
              title="Pre-Foreclosure Assistance"
              blurb="We map your deadlines and act quickly to prevent last-minute surprises."
              goodFor="Notice of default, auction on calendar."
              deliverable="Rapid options, timeline management, calm execution."
            />
            <ServiceCard
              title="Inherited Property"
              blurb="Probate/estate sale made simple: we buy as-is and can handle clean-out and paperwork."
              goodFor="Out-of-state owners, multiple heirs, properties needing work."
              deliverable="Respectful sale with clear next steps."
            />
            <ServiceCard
              title="Divorce"
              blurb="Neutral, documented offers with flexible timing to reduce stress."
              goodFor="Situations where fairness, speed, and clarity matter."
              deliverable="A discreet sale option that fits both parties."
            />
            <ServiceCard
              title="Tired Landlord"
              blurb="Sell with tenants in place or vacant — no repairs needed."
              goodFor="Deferred maintenance, month-to-month, or difficult rentals."
              deliverable="Clean exit and predictable closing."
            />
            <ServiceCard
              title="Distressed Property"
              blurb="Major rehab, fire, mold, or code issues — we buy as-is."
              goodFor="Heavy repairs or incomplete projects."
              deliverable="Direct solution and fast close."
            />
            <ServiceCard
              title="Overages (Excess Proceeds)"
              blurb="After foreclosure/tax sale, surplus funds may be owed to the prior owner. We help verify and claim those funds."
              goodFor="Former owners who may be due funds they didn’t realize existed."
              deliverable="Eligibility check and a clear, compliant claim process."
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold">Frequently Asked Questions</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-6 lg:gap-8">
            <Faq q="Do you charge fees or commissions?" a="No. There are no commissions and no hidden fees when you sell to us directly." />
            <Faq q="How fast can you close?" a="As quickly as 7 days, or on the date that works best for you." />
            <Faq q="Do I need to make repairs or clean up?" a="No. We buy as-is — no repairs or cleaning required." />
            <Faq q="Can I sell with tenants?" a="Yes. We frequently buy occupied properties and handle transition logistics." />
            <Faq q="What if I’m in pre-foreclosure?" a="We can move quickly, coordinate with the timeline, and present options tailored to your deadlines." />
            <Faq q="How do you come up with an offer?" a="We evaluate recent sales, property condition, your timeline, and market factors to present a fair, no-obligation offer." />
            <Faq q="Are you nationwide?" a="Yes. We operate nationwide and close with reputable local title companies." />
            <Faq q="What are overages and how do they work?" a="If a property sells for more than what’s owed during a foreclosure/tax sale, surplus funds may be available to the prior owner. We help verify and claim where eligible." />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <div className="rounded-2xl border bg-white p-6 md:p-8 shadow-sm">
            <h3 className="text-xl md:text-2xl font-bold">Ready to talk?</h3>
            <p className="mt-2 text-gray-600">
              Get a free, no-obligation offer or ask us anything. We’re here to help.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href="/#get-offer" className="inline-flex items-center rounded-lg bg-gray-900 px-4 py-2 text-white hover:bg-gray-800">
                Request Offer
              </a>
              <a href="/contact" className="inline-flex items-center rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50">
                Contact Us
              </a>
            </div>
            <dl className="mt-6 grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <dt className="font-semibold">Phone</dt>
                <dd><a href="tel:16788078133" className="hover:underline">678-807-8133</a></dd>
              </div>
              <div>
                <dt className="font-semibold">Email</dt>
                <dd><a href="mailto:info@milamindustries.com" className="hover:underline">info@milamindustries.com</a></dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="font-semibold">HQ Office</dt>
                <dd>300 Colonial Center Pkwy Ste 100, Roswell GA 30076</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ------- Small presentational components ------- */
function ServiceCard({ title, blurb, goodFor, deliverable }) {
  return (
    <article className="rounded-2xl border bg-white p-5 md:p-6 shadow-sm hover:shadow transition-shadow">
      <h3 className="text-lg md:text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-gray-600">{blurb}</p>
      <ul className="mt-4 space-y-1 text-sm text-gray-700">
        <li><span className="font-medium">Good for:</span> {goodFor}</li>
        <li><span className="font-medium">What you get:</span> {deliverable}</li>
      </ul>
    </article>
  );
}

function Faq({ q, a }) {
  return (
    <details className="group rounded-xl border bg-white p-5 shadow-sm open:shadow transition-shadow">
      <summary className="cursor-pointer list-none">
        <span className="text-base font-semibold">{q}</span>
      </summary>
      <p className="mt-2 text-gray-600">{a}</p>
    </details>
  );
}
