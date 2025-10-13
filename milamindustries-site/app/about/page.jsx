export const metadata = {
  title: 'About | Milam Industries LLC',
  description:
    'Learn about Milam Industries LLC — a trusted nationwide real estate company helping homeowners sell fast with fair, transparent cash offers.',
};

export default function AboutPage() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-6">About Milam Industries LLC</h1>
      <p className="text-gray-700 leading-relaxed mb-6">
        At Milam Industries LLC, we specialize in providing homeowners across the United States with fast,
        fair, and reliable real estate solutions. Our mission is simple — to help property owners navigate
        challenging situations and sell their homes quickly, without the stress of traditional listings,
        agent fees, or repair costs.
      </p>

      <p className="text-gray-700 leading-relaxed mb-6">
        Whether you’re dealing with foreclosure, inherited property, a divorce, or a vacant home, our
        team provides straightforward options to get you a fair cash offer and peace of mind. We buy
        houses <strong>as-is</strong>, nationwide, and handle every detail from start to finish — including
        title coordination, paperwork, and closing on your schedule.
      </p>

      <div className="bg-gray-50 border rounded-2xl p-8 my-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">
          Why Homeowners Choose Us
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>No commissions, no hidden fees, and no closing costs</li>
          <li>We buy homes nationwide — any condition, any situation</li>
          <li>Fast and transparent process from offer to closing</li>
          <li>Local expertise backed by a nationwide team</li>
          <li>Compassionate support and honest communication every step of the way</li>
        </ul>
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-gray-900">
        Our Commitment
      </h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        We believe every homeowner deserves a fair and respectful experience when selling their home.
        Our goal is to simplify the process, provide clear communication, and offer real solutions that
        fit your timeline and needs. At Milam Industries, integrity and transparency are at the core of
        everything we do.
      </p>

      <p className="text-gray-700 leading-relaxed mb-16">
        From start to finish, we handle the details so you can focus on what matters most.
        <strong> We’re here to make selling your home simple, secure, and stress-free — nationwide.</strong>
      </p>

      {/* Our Values Section */}
      <div className="bg-white border-t border-gray-200 pt-12">
        <h2 className="text-3xl font-bold text-center mb-10">Our Core Values</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-6 rounded-2xl border shadow-sm">
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Integrity</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              We’re committed to honesty in every conversation and every offer. No gimmicks,
              no hidden terms — just transparent communication from start to finish.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl border shadow-sm">
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Compassion</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              We understand selling a home can be emotional. Our team listens first and
              tailors every solution to fit each client’s unique situation and goals.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl border shadow-sm">
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Reliability</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              We deliver on our word — from initial contact to closing day. Our clients trust
              us to provide consistent, dependable service every step of the way.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl border shadow-sm">
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Innovation</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              We use modern tools and technology to simplify the selling process, offering
              homeowners a faster, smoother experience without unnecessary hurdles.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl border shadow-sm">
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Community</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Beyond buying houses, we’re focused on revitalizing neighborhoods and helping
              communities thrive through respectful, fair real estate practices.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl border shadow-sm">
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Excellence</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Every transaction is handled with care, precision, and professionalism —
              ensuring a smooth experience that reflects our high standards.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
