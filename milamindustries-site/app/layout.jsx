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
        <header className="border-b bg-white">
          <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
            <a href="/" className="text-lg font-semibold tracking-tight hover:opacity-80">
              Milam Industries LLC
            </a>
            <nav className="flex gap-6 text-sm">
              <a className="hover:opacity-70" href="/#home">Home</a>
              <a className="hover:opacity-70" href="/services">Services</a>
              <a className="hover:opacity-70" href="/#process">How It Works</a>
              <a className="hover:opacity-70" href="/#about">About</a>
              <a className="hover:opacity-70" href="/#contact">Contact</a>
            </nav>
          </div>
        </header>

        {/* Page content */}
        <main className="mx-auto max-w-6xl px-6 pt-8 pb-6">{children}</main>

        {/* Simple footer (optional) */}
        <footer className="border-t bg-white">
          <div className="mx-auto max-w-6xl px-6 py-4 text-sm text-gray-600">
            © {new Date().getFullYear()} Milam Industries LLC. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
