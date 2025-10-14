import './(styles)/globals.css';
// app/layout.jsx
export const metadata = {
  title: 'Milam Industries LLC',
  description: 'Real estate solutions | Nationwide coverage',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">
        {/* Site-wide header */}
        <header className="border-b bg-gray-900 text-gray-100">
          <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
            <a href="/" className="text-lg font-semibold tracking-tight hover:opacity-80">
              Milam Industries LLC
            </a>
            <nav className="flex gap-6 text-sm">
              <a className="hover:text-white text-gray-300" href="/">Home</a>
              <a className="hover:text-white text-gray-300" href="/services">Services</a>
              <a className="hover:text-white text-gray-300" href="/how-it-works">How It Works</a>
              <a className="hover:text-white text-gray-300" href="/about">About</a>
              <a className="hover:text-white text-gray-300" href="/faq">FAQ</a>
              <a className="hover:text-white text-gray-300" href="/#contact">Contact</a>
            </nav>
          </div>
        </header>

        {/* Page content */}
        <main className="mx-auto max-w-6xl px-6 pt-8 pb-6">{children}</main>

       <footer className="bg-gray-900 text-gray-100 py-10">
  <div className="max-w-6xl mx-auto px-6 text-center space-y-6">
    <nav className="flex flex-wrap justify-center gap-6 font-semibold text-white text-base">
      <a href="/" className="hover:text-gray-300">Home</a>
      <a href="/services" className="hover:text-gray-300">Services</a>
      <a href="/how-it-works" className="hover:text-gray-300">How It Works</a>
      <a href="/about" className="hover:text-gray-300">About</a>
      <a href="/faq" className="hover:text-gray-300">FAQ</a>
      <a href="#contact" className="hover:text-gray-300">Contact</a>
    </nav>

    <p className="text-gray-300 text-sm max-w-3xl mx-auto leading-relaxed">
      We are a real estate solutions and investment firm that specializes in helping homeowners 
      get rid of burdensome houses fast. We are investors and problem solvers who can buy your 
      house quickly with a fair, all-cash offer.
    </p>

    <p className="text-gray-400 text-sm mt-4">
      © {new Date().getFullYear()} Milam Industries LLC — All rights reserved.
    </p>
  </div>
</footer>

      </body>
    </html>
  );
}
