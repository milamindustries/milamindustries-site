// app/how-it-works/page.jsx
export const metadata = {
  title: 'How It Works | Milam Industries LLC',
  description:
    'Selling your Atlanta home can be a quick & easy process. Learn how our all-cash, no-fee approach works and get answers to common questions.',
};

export default function HowItWorksPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">
      {/* Hero / Intro */}
      <section className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Selling Your Atlanta Home Can Be A Quick & Easy Process
        </h1>

        <p className="text-lg md:text-xl">
          Milam Industries LLC buys houses in and around Atlanta (and other areas, too!).
          <strong> We&apos;re not listing your house</strong>, we’re actually the ones buying your home.
          Because <strong>we pay cash</strong> and are buying your Atlanta home directly from you,
          we’re able to close quickly (or on your schedule).
        </p>

        <p className="text-lg md:text-xl">
          When you work with us there are no fees and no commissions like there are when you list
          your house with a traditional agent. You never have to worry about any extra costs to
          sell your house fast coming out of your pocket or even getting your house “market-ready”
          to sell. We want to buy your house as-is.
        </p>

        <p className="text-lg md:text-xl">
          No matter how ugly or pretty it is and no matter the location, we buy houses in Atlanta in
          <em> any</em> condition.
        </p>
      </section>

      {/* From offer to close */}
      <section className="space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold">
          From offer to close and cash in your hand in as little as 7 days.
        </h2>
        <p className="text-lg md:text-xl">
          You can get rid of the headache of that property fast and{' '}
          <strong>avoid paying one more utility payment</strong>, tax payment, insurance payment,
          <strong> mortgage</strong> payment, or any of the other costs associated with a home.
          If you list your house and wait 90+ days to close, you have to figure in all of the costs
          of holding that property during the time you have it listed and are waiting for the property to close.
        </p>
      </section>

      {/* Don’t worry about fixing */}
      <section className="space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold">
          Don’t worry about fixing anything
        </h2>
        <p className="text-lg md:text-xl">
          We don’t care how dirty your house is (<em>we’ve seen worse!</em>) or how many repairs are needed.
          <em> Is it a complete fixer? Great! We love projects.</em>{' '}
          <strong>We want to make an offer on your house today.</strong>{' '}
          Let us save you time and put more money in your pocket.
        </p>
      </section>

      {/* Quick links to Q&A */}
      <section className="space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold">I have some questions…</h2>
        <ul className="list-disc pl-6 space-y-2 text-red-500 font-semibold">
          <li><a href="#as-is">What does “as-is” mean?</a></li>
          <li><a href="#all-cash">What does an “all-cash offer” mean?</a></li>
          <li><a href="#fast-closing">How fast is a fast closing?</a></li>
          <li><a href="#no-fast">What if I don’t need a fast closing?</a></li>
          <li><a href="#lowball">Will I get a lowball offer?</a></li>
          <li><a href="#legit">Is this even legit?</a></li>
        </ul>
      </section>

      {/* Q&A Sections */}
      <section id="as-is" className="space-y-4 scroll-mt-24">
        <h3 className="text-3xl font-bold">What does “as-is” mean?</h3>
        <p className="text-lg md:text-xl">
          We buy your Atlanta home as-is, meaning you don’t have to worry about doing repairs,
          fixing your home up, or getting it ready for showings. We’ll handle all repairs,
          inspections, and more after we purchase your home. We factor this into our offer, of course,
          but it saves you the money and the headache associated with getting your home ready to sell.
        </p>
      </section>

      <section id="all-cash" className="space-y-4 scroll-mt-24">
        <h3 className="text-3xl font-bold">What does an “all-cash offer” mean?</h3>
        <p className="text-lg md:text-xl">
          “All-cash” means exactly that — all cash for your Atlanta home! Because we are real estate
          investors who are purchasing your home directly, we don’t rely on traditional financing
          like retail homebuyers. When you sell to us, there’s no risk of the financing falling
          through, or closing being delayed. When we make you an offer, that’s the full amount
          you’ll receive at closing.
        </p>
      </section>

      <section id="fast-closing" className="space-y-4 scroll-mt-24">
        <h3 className="text-3xl font-bold">How fast is a fast closing?</h3>
        <p className="text-lg md:text-xl">
          After you send us information about your home, we can make you a no-obligation, fair
          all-cash offer in as little as 24 hours. Once you accept, we close at a local, reputable
          title company in as little as 7 days. Compare that to the 30+ days it can take to close
          when listing your house the traditional way, and the benefits are obvious!
        </p>
      </section>

      <section id="no-fast" className="space-y-4 scroll-mt-24">
        <h3 className="text-3xl font-bold">What if I don’t need a fast closing?</h3>
        <p className="text-lg md:text-xl">
          At Milam Industries LLC, we work on your time frame. If you don’t need a fast closing due
          to the need to make arrangements, explore your future options, etc., we will schedule the
          closing on the day that works best for you!
        </p>
      </section>

      <section id="lowball" className="space-y-4 scroll-mt-24">
        <h3 className="text-3xl font-bold">Will I get a lowball offer?</h3>
        <p className="text-lg md:text-xl">
          Our goal is to provide you with the fairest offer possible. Unlike other buyers or big tech
          giants, we’re transparent with how we arrive at an offer amount. What we offer is based on
          what the value of the property may be once we make the necessary improvements and upgrades.
          We’re entirely transparent with this offer process and happy to walk you through how it works.
        </p>
      </section>

      <section id="legit" className="space-y-4 scroll-mt-24">
        <h3 className="text-3xl font-bold">Is this even legit?</h3>
        <p className="text-lg md:text-xl">
          Yes, it is! The real estate industry is rapidly changing, and thousands of homeowners are
          exploring their options when it comes to selling their house in the fastest, easiest, and
          most transparent way. That’s where we come in. We offer an alternative for those homeowners
          who may not have the time or ability to list their house on the market for top dollar.
          We’ll work with you to assess your situation, make you a transparent all-cash offer, and
          close on your timeline.
        </p>
      </section>
    </main>
  );
}
