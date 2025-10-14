export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-gray-900">
      {/* HEADER (consistent with rest of site) */}
      <header className="bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="font-semibold text-lg">Milam Industries LLC</div>
          <nav className="space-x-6 text-sm">
            <a href="/" className="hover:text-gray-300">Home</a>
            <a href="/services" className="hover:text-gray-300">Services</a>
            <a href="/how-it-works" className="hover:text-gray-300">How It Works</a>
            <a href="/about" className="hover:text-gray-300">About</a>
            <a href="/faq" className="hover:text-gray-300">FAQ</a>
            <a href="/contact" className="text-green-400 font-semibold">Contact</a>
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
          <p className="text-gray-700 max-w-2xl mb-12">
            We’re here to help. Whether you have questions about selling your property,
            want a free cash offer, or simply need guidance — our team is ready to assist you nationwide.
          </p>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Form submitted! We'll reach out shortly.");
              }}
              className="space-y-4 bg-gray-50 p-6 rounded-2xl border"
            >
              <label className="block text-sm">
                <span className="text-gray-700">Full Name *</span>
                <input required className="mt-1 w-full rounded-xl border px-3 py-2" />
              </label>

              <label className="block text-sm">
                <span className="text-gray-700">Email *</span>
                <input type="email" required className="mt-1 w-full rounded-xl border px-3 py-2" />
              </label>

              <label className="block text-sm">
                <span className="text-gray-700">Phone *</span>
                <input required className="mt-1 w-full rounded-xl border px-3 py-2" />
              </label>

              <label className="block text-sm">
                <span className="text-gray-700">Message</span>
                <textarea rows="4" className="mt-1 w-full rounded-xl border px-3 py-2"></textarea>
              </label>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gray-900 text-white text-sm hover:bg-gray-800"
              >
                Send Message
              </button>
            </form>

            {/* Contact Info */}
            <div className="bg-gray-50 p-6 rounded-2xl border">
              <h2 className="font-semibold text-lg mb-3">Our Contact Information</h2>
              <p className="text-gray-700 mb-4">
                <b>Phone:</b> 678-807-8133<br />
                <b>Email:</b> info@milamindustries.com<br />
                <b>Office:</b> 300 Colonial Center Pkwy Ste 100, Roswell GA 30076
              </p>

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
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-100 py-10 mt-10">
        <div className="max-w-6xl mx-auto px-6 text-center space-y-6">
          <nav className="flex flex-wrap justify-center gap-6 font-semibold text-white text-base">
            <a href="/" className="hover:text-gray-300">Home</a>
            <a href="/services" className="hover:text-gray-300">Services</a>
            <a href="/how-it-works" className="hover:text-gray-300">How It Works</a>
            <a href="/about" className="hover:text-gray-300">About</a>
            <a href="/faq" className="hover:text-gray-300">FAQ</a>
            <a href="/contact" className="hover:text-gray-300">Contact</a>
          </nav>

          <p className="text-gray-300 text-sm max-w-3xl mx-auto leading-relaxed">
            We are a real estate solutions and investment firm helping homeowners sell
            quickly and stress-free. Get a fair cash offer, no repairs, no commissions — just results.
          </p>

          <p className="text-gray-400 text-sm mt-4">
            © {new Date().getFullYear()} Milam Industries LLC — All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
