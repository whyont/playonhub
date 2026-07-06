import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-surface)",
        borderTop: "1px solid var(--color-surface-2)",
        padding: "2rem 0",
        marginTop: "2rem",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
          }}
        >
          {/* Brand */}
          <div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.75rem" }}>
              <span style={{ color: "var(--color-brand)" }}>Play</span>
              <span style={{ color: "var(--color-text)" }}>On</span>
              <span style={{ color: "var(--color-accent)" }}>Hub</span>
            </h3>
            <p style={{ color: "var(--color-muted)", fontSize: "0.85rem" }}>
              Play the best free online games in your browser. No downloads, no installations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: "0.8rem", textTransform: "uppercase", color: "var(--color-muted)", marginBottom: "0.75rem" }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <li><Link href="/" style={{ fontSize: "0.85rem", color: "var(--color-muted)" }}>Home</Link></li>
              <li><Link href="/blog" style={{ fontSize: "0.85rem", color: "var(--color-muted)" }}>Blog</Link></li>
              <li><Link href="/about" style={{ fontSize: "0.85rem", color: "var(--color-muted)" }}>About Us</Link></li>
              <li><Link href="/contact" style={{ fontSize: "0.85rem", color: "var(--color-muted)" }}>Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ fontSize: "0.8rem", textTransform: "uppercase", color: "var(--color-muted)", marginBottom: "0.75rem" }}>
              Legal
            </h4>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <li><Link href="/privacy" style={{ fontSize: "0.85rem", color: "var(--color-muted)" }}>Privacy Policy</Link></li>
              <li><Link href="/terms" style={{ fontSize: "0.85rem", color: "var(--color-muted)" }}>Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div
          style={{
            marginTop: "2rem",
            paddingTop: "1rem",
            borderTop: "1px solid var(--color-surface-2)",
            textAlign: "center",
            color: "var(--color-muted)",
            fontSize: "0.8rem",
          }}
        >
          © {new Date().getFullYear()} PlayOnHub. All rights reserved. Play free games online.
        </div>
      </div>
    </footer>
  );
}
