

export default function page() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms & Conditions</h1>
        <p className="text-gray-600 mb-6">Effective: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-indigo max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Account Responsibilities</h2>
            <p className="text-gray-600">
              By using TagTrace, you agree to:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 mt-2">
              <li>Provide accurate information when creating tags</li>
              <li>Not use the service for illegal items or harassment</li>
              <li>Maintain the security of your account credentials</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Tag Usage</h2>
            <p className="text-gray-600 mb-2">
              You acknowledge that:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>TagTrace cannot guarantee item recovery</li>
              <li>Rewards offered through tags are your responsibility</li>
              <li>Misuse of tags may result in account termination</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">3. Intellectual Property</h2>
            <p className="text-gray-600">
              All TagTrace-generated QR/NFC codes and software are owned by us. You retain rights to your personal data and item information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Limitation of Liability</h2>
            <p className="text-gray-600">
              TagTrace is not liable for:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 mt-2">
              <li>Lost, stolen, or damaged items</li>
              <li>Actions of third parties who scan your tags</li>
              <li>Service interruptions beyond our control</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Changes to Terms</h2>
            <p className="text-gray-600">
              We may update these terms periodically. Continued use constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">6. Governing Law</h2>
            <p className="text-gray-600">
              These terms are governed by the laws of [Your Country/State]. Disputes will be resolved in [Jurisdiction] courts.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}