export const metadata = {
  title: 'Terms & Conditions | Milam Industries LLC',
  description: 'SMS Terms of Service for Milam Industries LLC.',
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">SMS Terms of Service</h1>
      <p className="text-gray-600 mb-6">Last Updated: October 2025</p>

      <p className="mb-4">
        By opting into SMS messages from Milam Industries LLC (“we,” “us,” “our”) through our web forms or
        other channels, you agree to receive SMS communications from us. These may include, but are not limited to:
      </p>

      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>Appointment reminders or confirmations</li>
        <li>Property updates or new offer alerts</li>
        <li>Lead or inquiry follow-ups</li>
        <li>Service, scheduling, or transaction notifications</li>
      </ul>

      <p className="mb-4">
        Message frequency may vary. Message and data rates may apply. To opt out at any time, text <strong>STOP</strong>.
        For assistance, text <strong>HELP</strong> or visit{' '}
        <a href="https://www.milamindustries.com" className="text-blue-600 underline">
          www.milamindustries.com
        </a>.
      </p>

      <p className="mb-4">
        Visit our{' '}
        <a href="/privacy-policy" className="text-blue-600 underline">
          Privacy Policy
        </a>{' '}
        for details on how we collect, use, and protect your personal information.
      </p>

      <p className="mb-4">
        By providing your mobile number and opting in, you confirm that you are the authorized owner of the
        phone number and consent to receive text messages as described above.
      </p>

      <p className="mt-6 text-sm text-gray-500">
        © {new Date().getFullYear()} Milam Industries LLC — All rights reserved.
      </p>
    </div>
  );
}
