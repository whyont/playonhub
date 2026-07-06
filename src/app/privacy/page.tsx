export const metadata = { title: "Privacy Policy", description: "PlayOnHub privacy policy and data collection practices." };

export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: "720px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "1rem" }}>Privacy Policy</h1>
      <p style={{ color: "var(--color-muted)", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
        Last updated: July 6, 2026
      </p>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>1. Introduction</h2>
        <p style={{ color: "var(--color-text)", lineHeight: 1.7, fontSize: "0.9rem" }}>
          PlayOnHub (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the website playonhub.com (the &quot;Service&quot;).
          This Privacy Policy explains how we collect, use, and protect your information when you use our Service.
        </p>
      </section>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>2. Information We Collect</h2>
        <p style={{ color: "var(--color-text)", lineHeight: 1.7, fontSize: "0.9rem", marginBottom: "0.5rem" }}>
          We collect the following types of information:
        </p>
        <ul style={{ color: "var(--color-text)", lineHeight: 1.7, fontSize: "0.9rem", paddingLeft: "1.5rem" }}>
          <li><strong>Usage Data:</strong> IP address, browser type, pages visited, time spent on pages, and referring website.</li>
          <li><strong>Cookies:</strong> We use cookies to improve user experience and serve relevant ads.</li>
          <li><strong>Contact Information:</strong> If you contact us, we collect the information you provide (name, email, message).</li>
        </ul>
      </section>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>3. Google AdSense & Cookies</h2>
        <p style={{ color: "var(--color-text)", lineHeight: 1.7, fontSize: "0.9rem" }}>
          We use Google AdSense to display advertisements. Google, as a third-party vendor, uses cookies to serve ads based on your prior visits to this and other websites. Google&apos;s use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site and/or other sites on the Internet.
        </p>
        <p style={{ color: "var(--color-text)", lineHeight: 1.7, fontSize: "0.9rem", marginTop: "0.5rem" }}>
          You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>. You can also opt out of third-party vendors&apos; use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">www.aboutads.info/choices</a>.
        </p>
      </section>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>4. Google Analytics</h2>
        <p style={{ color: "var(--color-text)", lineHeight: 1.7, fontSize: "0.9rem" }}>
          We use Google Analytics to understand how visitors interact with our website. This helps us improve our content and user experience. Google Analytics collects anonymous usage data including page views, session duration, and bounce rate.
        </p>
      </section>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>5. Data Storage and Security</h2>
        <p style={{ color: "var(--color-text)", lineHeight: 1.7, fontSize: "0.9rem" }}>
          Your data is stored securely and is only accessible to authorized personnel. We implement appropriate technical and organizational measures to protect your information.
        </p>
      </section>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>6. Your Rights</h2>
        <p style={{ color: "var(--color-text)", lineHeight: 1.7, fontSize: "0.9rem" }}>
          You have the right to request access to, correction of, or deletion of your personal data. To exercise these rights, please contact us at contact@playonhub.com.
        </p>
      </section>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>7. Children&apos;s Privacy</h2>
        <p style={{ color: "var(--color-text)", lineHeight: 1.7, fontSize: "0.9rem" }}>
          Our Service is not directed to children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us.
        </p>
      </section>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>8. Changes to This Policy</h2>
        <p style={{ color: "var(--color-text)", lineHeight: 1.7, fontSize: "0.9rem" }}>
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
        </p>
      </section>

      <section>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>9. Contact Us</h2>
        <p style={{ color: "var(--color-text)", lineHeight: 1.7, fontSize: "0.9rem" }}>
          If you have questions about this Privacy Policy, please contact us at: <strong>contact@playonhub.com</strong>
        </p>
      </section>
    </div>
  );
}
