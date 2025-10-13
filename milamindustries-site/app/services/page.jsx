// app/services/page.jsx
export const metadata = {
  title: 'Services | Milam Industries LLC',
  description:
    'Fast, transparent real-estate solutions for any situation. Explore our services and how we help.',
};

const services = [
  {
    title: 'Cash Offer',
    blurb:
      'Sell quickly for a fair, all-cash price—no repairs, showings, or agent fees.',
    help:
      'We evaluate as-is and present a clear cash number with a closing date that fits your timeline.',
  },
  {
    title: 'Creative Financing',
    blurb:
      'Flexible terms when traditional financing won’t work (subject-to, seller financing, novations, etc.).',
    help:
      'We structure win-win terms to solve timing, credit, or repair hurdles—without bank delays.',
  },
  {
    title: 'Distressed Property',
    blurb:
      'Homes with major repairs, code issues, or damage are hard to list traditionally.',
    help:
      'We buy as-is and handle clean-up/repairs after closing—no inspections or repair concessions.',
  },
  {
    title: 'Divorce',
    blurb:
      'A fast, private sale can simplify division of assets and reduce stress.',
    help:
      'We coordinate paperwork and timelines with both parties for a smooth, neutral closing.',
  },
  {
    title: 'Land',
    blurb:
      'Raw or entitled land, infill lots, acreage, or problem parcels.',
    help:
      'We underwrite access, utilities, and comps to provide a straightforward offer and clean closing.',
  },
  {
    title: 'Mortgage Assistance Program',
    blurb:
      'Behind on payments or feeling the pressure? There are options beyond listing.',
    help:
      'We work with your lender on relief options or purchase as-is to stop the bleed and protect equity.',
  },
  {
    title: 'Overages',
    blurb:
      'Surplus funds may be available after tax or foreclosure sales—but they’re tricky to claim.',
    help:
      'We help identify and recover eligible overages and guide you through the claim process.',
  },
  {
    title: 'Pre-Foreclosure',
    blurb:
      'Time-sensitive situations need action to avoid a forced sale.',
    help:
      'We move quickly—buy outright, assume payments, or coordinate with your servicer to pause the clock.',
  },
  {
    title: 'Probate & Inherited Property',
    blurb:
      'Estate properties can be complex—especially out of state or with multiple heirs.',
    help:
      'We coordinate with your probate attorney, handle clean-outs, and purchase as-is on your timeline.',
  },
  {
    title: 'Split Equity Program',
    blurb:
      'Share in the upside without paying for repairs today.',
    help:
      'We fund improvements or disposition work and split net proceeds per a simple, transparent agreement.',
  },
  {
    title: 'Tired Landlord',
    blurb:
      'Problem tenants, constant maintenance, or vacancy headaches?',
    help:
      'We buy tenant-occupied properties and handle transition/relocation so you can exit cleanly.',
  },
  {
    title: 'Vacant Homes',
    blurb:
      'Vacant houses attract vandalism, liens, and rising holding costs.',
    help:
      'We secure and purchase the property quickly, removing risk and carrying costs.',
  },
  {
    title: 'Vetted Buyers Program',
    blurb:
      'When a cash offer isn’t the best fit, we still get you top results.',
    help:
      'We match you with pre-qualified buyers in our network and manage the process end-to-end.',
  },
];

export default function ServicesPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl md:text-4xl font-bold">Services</h1>
      <p className="mt-3 text-gray-600">
        We solve real-estate problems with speed and transparency. Here’s how we can help:
      </p>

      <section className="mt-8 grid gap-6 sm:grid-cols-2">
        {services.map((s) => (
          <article
            key={s.title}
            className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-gray-700">{s.blurb}</p>
            <p className="mt-2 text-sm text-gray-600">
              <span className="font-medium">How we help:</span> {s.help}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">FAQ</h2>
        <details className="mt-3 rounded-lg border bg-white p-4 open:shadow-sm">
          <summary className="cursor-pointer font-medium">How fast can we close?</summary>
          <p className="mt-2 text-gray-600">
            Often in as little as 7–14 days—your timeline drives the process.
          </p>
        </details>
      </section>
    </main>
  );
}
