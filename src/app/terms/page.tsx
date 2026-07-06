export const metadata = { title: "Terms of Service", description: "PlayOnHub terms of service and user agreement." };

export default function TermsPage() {
  return (
    <div style={{ maxWidth: "720px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "1rem" }}>Terms of Service</h1>
      <p style={{ color: "var(--color-muted)", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
        Last updated: July 6, 2026
      </p>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>1. Acceptance of Terms</h2>
        <p style={{ color: "var(--color-text)", lineHeight: 1.7, fontSize: "0.9rem" }}>
          By accessing and using PlayOnHub (the &quot;Service&quot;), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service.
        </p>
      </section>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>2. Use of the Service</h2>
        <p style={{ color: "var(--color-text)", lineHeight: 1.7, fontSize: "0.9rem", marginBottom: "0.5rem" }}>
          You agree to use PlayOnHub only for lawful purposes. You must not:
        </p>
        <ul style={{ color: "var(--color-text)", lineHeight: 1.7, fontSize: "0.9rem", paddingLeft: "1.5rem" }}>
          <li>Use the Service in any way that violates applicable laws or regulations</li>
          <li>Attempt to disrupt, overload, or interfere with the Service</li>
          <li>Use automated systems (bots, scrapers) to access the Service without permission</li>
          <li>Attempt to gain unauthorized access to any part of the Service</li>
          <li>Engage in click fraud or any form of advertising abuse</li>
        </ul>
      </section>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>3. Intellectual Property</h2>
        <p style={{ color: "var(--color-text)", lineHeight: 1.7, fontSize: "0.9rem" }}>
          The Service and its original content (excluding games) are the property of PlayOnHub. Games featured on our platform are owned by their respective developers and are used under license or are publicly available. All trademarks and service marks are the property of their respective owners.
        </p>
      </section>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>4. Third-Party Content</h2>
        <p style={{ color: "var(--color-text)", lineHeight: 1.7, fontSize: "0.9rem" }}>
          Our Service may contain links to third-party websites or display content from third parties. We are not responsible for the content, accuracy, or practices of any third-party websites. You access third-party content at your own risk.
        </p>
      </section>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>5. Advertising</h2>
        <p style={{ color: "var(--color-text)", lineHeight: 1.7, fontSize: "0.9rem" }}>
          The Service is supported by advertising revenue. By using the Service, you acknowledge that advertisements will be displayed. You agree not to click on advertisements in a fraudulent or abusive manner.
        </p>
      </section>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>6. Disclaimer of Warranties</h2>
        <p style={{ color: "var(--color-text)", lineHeight: 1.7, fontSize: "0.9rem" }}>
          The Service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied. We do not guarantee that the Service will be uninterrupted, error-free, or free of harmful components.
        </p>
      </section>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>7. Limitation of Liability</h2>
        <p style={{ color: "var(--color-text)", lineHeight: 1.7, fontSize: "0.9rem" }}>
          To the fullest extent permitted by law, PlayOnHub shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of the Service.
        </p>
      </section>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>8. Changes to Terms</h2>
        <p style={{ color: "var(--color-text)", lineHeight: 1.7, fontSize: "0.9rem" }}>
          We reserve the right to modify these Terms of Service at any time. We will update the &quot;Last updated&quot; date when changes are made. Your continued use of the Service constitutes acceptance of the updated terms.
        </p>
      </section>

      <section>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>9. Contact</h2>
        <p style={{ color: "var(--color-text)", lineHeight: 1.7, fontSize: "0.9rem" }}>
          If you have questions about these Terms, please contact us at: <strong>contact@playonhub.com</strong>
        </p>
      </section>
    </div>
  );
}
