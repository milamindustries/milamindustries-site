// app/faq/page.jsx
export const metadata = {
  title: 'FAQ | Milam Industries LLC',
  description:
    'Frequently asked questions about selling your house for cash with Milam Industries LLC. No fees, no commissions, we pay all standard closing costs. Close in as little as 7–14 days.',
};

export default function FAQPage() {
  const faqs = [
    {
      q: 'Will you be listing my house on the MLS or actually buying it?',
      a: `We’re not agents and we don’t list houses. Milam Industries LLC is a professional home buyer. 
We purchase houses directly with our own funds—no banks or agents—so you can skip showings, repairs, and uncertainty. 
After we buy, we may repair the home and resell it, or keep it as a rental.`,
    },
    {
      q: 'How are you different from a real estate agent?',
      a: `Agents list your property and hope a buyer comes along, often charging 3–6% commissions and taking months to close. 
We buy your house directly for cash. Because we use our own funds, we can close quickly (often in 7–14 days) with no fees, 
no commissions, and we pay all standard closing costs.`,
    },
    {
      q: 'Do you pay fair prices for properties?',
      a: `Yes. Our offers are based on the property’s condition, needed repairs, and comparable sales. 
While our price reflects that we handle repairs, cleaning, and resale risk, sellers choose us for the speed, certainty, and 
simplicity—cash in hand without fees, commissions, or showings.`,
    },
    {
      q: 'How do you determine the price to offer on my house?',
      a: `We review the property’s location, condition, repair needs, and recent comparable sales. 
Using that info, we make a clear, transparent cash offer that reflects current market data—no games, no pressure.`,
    },
    {
      q: 'Are there any fees or commissions to work with you?',
      a: `No. There are **no fees and no commissions**, and **we pay all standard closing costs**. 
What we offer is what you get.`,
    },
    {
      q: 'Is there any commitment when I provide my information?',
      a: `None at all. We’ll review your property and present a no-obligation cash offer. 
You decide what’s best for you—no pressure.`,
    },
    {
      q: 'Who handles repairs or cleaning?',
      a: `We do. You can sell completely **as-is**—no cleaning, no repairs, no junk removal. 
Take what you want and leave the rest.`,
    },
    {
      q: 'How fast can you close?',
      a: `We can often close in as little as **7–14 days** (or on the date you choose). 
Because we buy with cash, there are no financing delays.`,
    },
    {
      q: 'What types of properties do you buy?',
      a: `Single-family homes, condos, townhomes, duplexes, inherited houses, vacant homes, rentals (even with tenants), and 
properties needing major repairs—we buy in almost any condition.`,
    },
    {
      q: 'What areas do you buy in?',
      a: `We buy houses **nationwide**. Whether you’re in a major city, small town, or rural area, 
we can make a fair cash offer and work on your timeline.`,
    },
  ];

  return (
    <div className="bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl">
            Here are answers to the questions we hear most often about selling a
            house for cash. If you don’t see your question, just reach out —
            we’re happy to help.
          </p>
        </header>

        <section className="space-y-6">
          {faqs.map((item, i) => (
            <article key={i} className="bg-white border rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg md:text-xl font-semibold">{item.q}</h2>
              <p className="mt-2 text-gray-700 whitespace-pre-line">{item.a}</p>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
