export const metadata = {
  title: 'Privacy Policy | Milam Industries LLC',
  description: 'SMS Privacy Policy for Milam Industries LLC.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">SMS Privacy Policy</h1>
      <p className="text-gray-600 mb-6">Last Updated: October 2025</p>

      <p className="mb-4">
        Milam Industries LLC (“we,” “us,” or “our”) respects your privacy and is committed to protecting
        the personal information you share with us. This SMS Privacy Policy explains how we collect,
        use, and safeguard your information when you opt in to receive text messages (SMS) from us.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>Your name</li>
        <li>Your mobile phone number</li>
        <li>Property or inquiry details submitted through our website forms</li>
        <li>Optional details such as email or preferred contact times</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>Send property-related updates, confirmations, or follow-ups</li>
        <li>Respond to your requests or messages</li>
        <li>Provide updates about transactions, offers, or services</li>
        <li>Improve communication and customer experience</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Sharing of Information</h2>
      <p className="mb-4">
        We do not sell, rent, or share your personal information or SMS consent with third parties or
        affiliates. Information is shared only with trusted service providers who operate our communication
        systems, and solely to deliver messages on our behalf. These providers are required to keep your
        data secure and confidential.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. SMS Consent</h2>
      <p className="mb-4">
        By providing your number and opting in, you consent to receive SMS messages from Milam Industries LLC.
        Message and data rates may apply. You can opt out anytime by replying “STOP.” <br />
        <strong>SMS consent is not shared with third parties.</strong>
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Data Security</h2>
      <p className="mb-4">
        We implement reasonable technical and organizational measures to protect your information from
        unauthorized access, disclosure, alteration, or misuse.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Your Choices</h2>
      <p className="mb-4">
        You can opt out of SMS communications at any time by replying “STOP” to any message.
        For help, text “HELP” or contact us using the information below.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Contact Us</h2>
      <p>
        <strong>Milam Industries LLC</strong><br />
        Email: info@milamindustries.com<br />
        Website: <a href="https://www.milamindustries.com" className="text-blue-600 underline">www.milamindustries.com</a>
      </p>
    </div>
  );
}
