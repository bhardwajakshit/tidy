'use client';

export default function PrivacyPolicy() {
  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-10">
      <h1 className="mb-6 text-2xl font-semibold text-gray-800">
        Privacy Policy
      </h1>
      <div className="max-w-2xl space-y-6 text-sm leading-relaxed text-gray-700">
        <p>
          Welcome to <strong>Tidy</strong>. This Privacy Policy explains how we
          collect, use, and protect your information when you use our
          application.
        </p>

        <section>
          <h2 className="mb-2 text-lg font-medium text-gray-800">
            1. Information We Collect
          </h2>
          <p>When you sign in using Google OAuth, we may collect:</p>
          <ul className="list-disc space-y-1 pl-4">
            <li>Your email address</li>
            <li>
              Your Google profile information (e.g., name, profile picture)
            </li>
          </ul>
          <p>
            We do not access additional Google account data beyond this
            information.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-medium text-gray-800">
            2. How We Use Your Information
          </h2>
          <p>Your information is used for:</p>
          <ul className="list-disc space-y-1 pl-4">
            <li>Authenticating and logging you into the app</li>
            <li>Personalizing your experience</li>
            <li>Communicating updates or important information</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-medium text-gray-800">
            3. Data Sharing
          </h2>
          <p>We do not share your data with third parties, except:</p>
          <ul className="list-disc space-y-1 pl-4">
            <li>When required by law</li>
            <li>To protect the rights and safety of our users or others</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-medium text-gray-800">
            4. Data Retention
          </h2>
          <p>
            Your data is retained only as long as needed for the purposes
            outlined. You can request deletion of your account and data by
            contacting us.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-medium text-gray-800">
            5. Your Rights
          </h2>
          <ul className="list-disc space-y-1 pl-4">
            <li>Access and update your information</li>
            <li>Delete your account and data</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-medium text-gray-800">
            6. Security
          </h2>
          <p>
            We use industry-standard measures to protect your information from
            unauthorized access, alteration, or disclosure.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-medium text-gray-800">
            7. Changes to This Privacy Policy
          </h2>
          <p>
            This Privacy Policy may be updated occasionally. Changes are
            effective upon posting.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-medium text-gray-800">
            8. Contact Us
          </h2>
          <p>For questions or concerns, contact us at:</p>
          <p>
            Email:{' '}
            <a
              href="mailto:support@tidy.run"
              className="text-blue-500 hover:underline"
            >
              support@tidy.run
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
