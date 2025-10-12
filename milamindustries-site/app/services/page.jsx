export const metadata = {
  title: 'Services | Milam Industries LLC',
  description:
    'The services we offer homeowners and investors — fast, transparent solutions for any situation.',
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
    title: "Creative Solutions",
    blurb:
      "Subject-to, seller-financing, novations, and more—tailored structures for unique situations.",
  },
  {
    title: "Tenant Relocation Help",
    blurb: "We coordinate cash-for-keys and smooth transitions to minimize downtime and disputes.",
  },
  {
    title: "Light Repairs & Turnover",
    blurb: "Quick, cost-effective refreshes to prepare properties for listing or rental.",
  },
  {
    title: "Probate & Inherited Properties",
    blurb: "We handle the details when you inherit a property—fast, stress-free sales with no repairs needed.",
  },
];

export default function ServicesPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl md:text-4xl font-bold">Services</h1>
      <p className="mt-4 text-gray-700">
        We solve real-estate problems with speed and transparency. Here’s how we can help:
      </p>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        {services.map((s) => (
          <article key={s.title} className="rounded-xl border p-6">
            <h2 className="text-xl font-semibold">{s.title}</h2>
            <p className="mt-2 text-gray-700">{s.blurb}</p>
          </article>
        ))}
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">FAQ</h2>
        <details className="mt-4 rounded-lg border p-4">
          <summary className="cursor-pointer font-medium">How fast can we close?</summary>
          <p className="mt-2 text-gray-700">
            Often in as little as 7–14 days—your timeline drives the process.
          </p>
        </details>
      </section>
    </main>
  );
}

