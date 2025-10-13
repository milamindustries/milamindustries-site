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
              <a className="hover:text-white text-gray-300" href="/#contact">Contact</a>
            </nav>
          </div>
        </header>

        {/* Page content */}
        <main className="mx-auto max-w-6xl px-6 pt-8 pb-6">{children}</main>

       <footer className="bg-gray-900 text-gray-300">
  <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-6">
    <div>
      <div className="font-semibold text-white">Milam Industries LLC</div>
      <p className="text-sm mt-2 max-w-md">
        Real estate solutions | Nationwide coverage
      </p>
    </div>
    <div className="text-sm md:text-right space-y-1">
      <a href="/" className="block hover:text-white">Home</a>
      <a href="/services" className="block hover:text-white">Services</a>
      <a href="/how-it-works" className="block hover:text-white">How It Works</a>
      <a href="/about" className="block hover:text-white">About</a>
      <a href="/#contact" className="block hover:text-white">Contact</a>
    </div>
  </div>
  <div className="border-t border-white/10">
    <div className="max-w-6xl mx-auto px-4 py-4 text-xs text-gray-400">
      © {new Date().getFullYear()} Milam Industries LLC. All rights reserved.
    </div>
  </div>
</footer>
      </body>
    </html>
  );
}
