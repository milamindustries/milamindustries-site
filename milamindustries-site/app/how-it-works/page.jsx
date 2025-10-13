// app/how-it-works/page.jsx
export const metadata = {
  title: 'How It Works | Milam Industries LLC',
  description: 'See exactly how our simple 3-step process works—then read answers to the most common questions homeowners ask.',
};

function StepCard({ step, title, blurb }) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <p className="text-sm text-gray-500">Step {step}</p>
      <h3 className="mt-2 text-xl font-semibold text-gray-900">{title}</h3>
      <p className="mt-3 text-gray-700 leading-relaxed">{blurb}</p>
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      {/* 3-Step summary (now at the very top) */}
      <section aria-labelledby="how-it-works-top">
        <h1 id="how-it-works-top" className="text-4xl font-extrabold tracking-tight text-gray-900">
          How it works
        </h1>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <StepCard
            step={1}
            title="Call or submit"
            blurb="Tell us about the property—address, condition, and timeline."
          />
          <StepCard
            step={2}
            title="Offer"
            blurb="Get a no-obligation cash offer. Transparent numbers, no pressure."
          />
          <StepCard
            step={3}
            title="Close"
            blurb="Choose your date. We coordinate title & paperwork."
          />
        </div>

        <hr className="mt-12 border-gray-200" />
      </section>

      {/* Long-form explainer pulled from your screenshots */}
      <section className="mt-12 space-y-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
  Selling Your Home Can Be A Quick & Easy Process
</h2>
<p className="text-gray-700 leading-relaxed">
  Milam Industries LLC buys houses across the nation — in any state, city, or condition.
  <strong> We&apos;re not listing your house</strong>, we’re actually the ones buying it directly.
  Because <strong>we pay cash</strong> and purchase homes nationwide, we’re able to close quickly
  and on your timeline—no waiting, no uncertainty.
</p>
<p className="text-gray-700 leading-relaxed">
  When you work with us, there are no fees or commissions like with a traditional real estate agent.
  You’ll never have to spend money fixing up your home or getting it “market-ready.” We buy houses
  as-is, anywhere in the U.S., in any situation or condition—making the process simple and stress-free
  from start to finish.
</p>

        <h3 className="mt-10 text-3xl font-extrabold tracking-tight text-gray-900">
          From offer to close and cash in your hand in as little as 7 days.
        </h3>
        <p className="text-gray-700 leading-relaxed">
          Avoid paying another <strong>utility</strong>, <strong>tax</strong>, <strong>insurance</strong>,
          or <strong>mortgage</strong> payment while you wait. We can make a fair, no-obligation all-cash
          offer in as little as 24 hours, and once you accept, we can close in as little as 7 days—often at a
          local, reputable title company.
        </p>

        <h3 className="mt-10 text-3xl font-extrabold tracking-tight text-gray-900">
          Don’t worry about fixing anything
        </h3>
        <p className="text-gray-700 leading-relaxed">
          We don’t care how dirty your house is or how many repairs are needed.
          <em> Is it a complete fixer? Great! We love projects.</em>{' '}
          <span className="text-red-600 font-semibold">We want to make an offer on your house today.</span>
        </p>

        {/* Questions index */}
        <div className="mt-12 rounded-2xl bg-gray-50 p-6">
          <h4 className="text-2xl font-bold text-gray-900">I have some questions…</h4>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-red-600">
            <li>What does “as-is” mean?</li>
            <li>What does an “all-cash offer” mean?</li>
            <li>How fast is a fast closing?</li>
            <li>What if I don’t need a fast closing?</li>
            <li>Will I get a lowball offer?</li>
            <li>Is this even legit?</li>
          </ul>
        </div>

        {/* Answers */}
        <div className="space-y-10">
          <div>
            <h5 className="text-3xl font-extrabold tracking-tight text-gray-900">
              What does “as-is” mean?
            </h5>
            <p className="text-gray-700 leading-relaxed">
  We buy homes nationwide <strong>as-is</strong>, meaning you don’t have to worry about
  doing repairs, cleaning, inspections, showings, or getting your property “market-ready.”
  We handle any needed repairs and improvements <em>after</em> we purchase your home.
  We factor this into our offer so you can skip the hassle and keep more time—and peace of mind.
</p>
          </div>

          <div>
            <h5 className="text-3xl font-extrabold tracking-tight text-gray-900">
              What does an “all-cash offer” mean?
            </h5>
            <p className="text-gray-700 leading-relaxed">
  “All-cash” means exactly that—no bank financing. We’re real estate buyers purchasing your
  home directly, so there’s no risk of financing falling through or a delayed closing.
  When we make you an offer, that’s the amount you’ll receive at closing.
</p>
          </div>

          <div>
            <h5 className="text-3xl font-extrabold tracking-tight text-gray-900">
              How fast is a fast closing?
            </h5>
            <p className="text-gray-700 leading-relaxed">
  After you share a few details about your property, we can make a no-obligation, fair
  all-cash offer in as little as 24 hours. Once you accept, we close with a reputable title
  company in your area in as little as 7 days. Compare that to the 30+ days a traditional
  listing can take—and the difference is obvious.
</p>
          </div>

          <div>
            <h5 className="text-3xl font-extrabold tracking-tight text-gray-900">
              What if I don’t need a fast closing?
            </h5>
            <p className="text-gray-700 leading-relaxed">
  We work on <strong>your</strong> timeline. If you don’t need a fast closing—maybe you’re
  arranging your next move or waiting on a specific date—we’ll schedule the closing for
  the day that works best for you.
</p>
          </div>

          <div>
            <h5 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Will I get a lowball offer?
            </h5>
            <p className="text-gray-700 leading-relaxed">
  Our goal is to provide you with the fairest offer possible. Unlike some buyers or big-tech
  platforms, we’re transparent about how we arrive at our offer. It’s based on the property’s
  value after the repairs and improvements we’ll handle. We’re happy to walk you through our
  numbers so you can feel confident in the process.
</p>
          </div>

          <div>
            <h5 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Is this even legit?
            </h5>
            <p className="text-gray-700 leading-relaxed">
  Yes. Homeowners across the country are exploring faster, easier, and more transparent
  ways to sell—especially when a traditional listing isn’t a good fit. That’s where we come
  in. We offer a trusted alternative for sellers who want certainty and convenience: we
  assess your situation, make a clear all-cash offer, and close on <em>your</em> timeline.
</p>
          </div>
        </div>
      </section>
    </main>
  );
}
