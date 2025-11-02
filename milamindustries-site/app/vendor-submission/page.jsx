export default function VendorSubmissionDisabled() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <h1 className="text-2xl font-bold mb-4">This page is no longer available</h1>
      <p className="mb-6">
        Vendor submissions are now handled internally. Please use the contact form for all inquiries.
      </p>
      <a
        href="/contact"
        className="text-green-600 underline hover:text-green-500"
      >
        Go to Contact Page
      </a>
    </main>
  );
}
