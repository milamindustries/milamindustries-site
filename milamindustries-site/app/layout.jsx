import './(styles)/globals.css'
export const metadata = {
  title: 'Milam Industries LLC',
  description: 'Real estate solutions | Nationwide coverage',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800">{children}</body>
    </html>
  )
}
