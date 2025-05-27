import Link from 'next/link';

export default function page() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        <p className="text-gray-600 mb-6">Last Updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-indigo max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
            <p className="text-gray-600 mb-4">
              When you use TagTrace, we may collect:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Contact information (email, phone number) you provide when creating tags</li>
              <li>Item details (descriptions, photos) you add to your tags</li>
              <li>Scan location data when someone scans your QR/NFC tags</li>
              <li>Device information (browser type, IP address) for analytics</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">2. How We Use Your Data</h2>
            <p className="text-gray-600 mb-4">
              We use collected information to:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Facilitate item recovery when tags are scanned</li>
              <li>Improve our services and user experience</li>
              <li>Send important account notifications</li>
              <li>Prevent fraud and abuse</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">3. Data Sharing</h2>
            <p className="text-gray-600">
              We <span className="font-medium">do not sell</span> your personal data. Information may be shared with:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 mt-2">
              <li>Finders who scan your tags (only contact methods you approve)</li>
              <li>Service providers (hosting, analytics) under confidentiality agreements</li>
              <li>Law enforcement if required by legal process</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Your Rights</h2>
            <p className="text-gray-600 mb-2">
              You can:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Access, update, or delete your account information</li>
              <li>Disable tags at any time</li>
              <li>Opt out of non-essential communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Contact Us</h2>
            <p className="text-gray-600">
              For privacy concerns, email <Link href="mailto:privacy@tagtrace.com" className="text-indigo-600 hover:underline">privacy@tagtrace.com</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}