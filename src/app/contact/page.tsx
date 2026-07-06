export const metadata = { title: "Contact Us", description: "Get in touch with the PlayOnHub team." };

export default function ContactPage() {
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "1rem" }}>Contact Us</h1>
      <p style={{ color: "var(--color-muted)", marginBottom: "1.5rem" }}>
        Have questions, feedback, or game requests? We&apos;d love to hear from you.
      </p>

      <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", fontSize: "0.85rem", color: "var(--color-muted)", marginBottom: "0.4rem" }}>
            Name
          </label>
          <input
            type="text"
            placeholder="Your name"
            style={{
              width: "100%",
              padding: "0.6rem 0.8rem",
              background: "var(--color-surface)",
              border: "1px solid var(--color-surface-2)",
              borderRadius: "8px",
              color: "var(--color-text)",
              fontSize: "0.9rem",
            }}
          />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "0.85rem", color: "var(--color-muted)", marginBottom: "0.4rem" }}>
            Email
          </label>
          <input
            type="email"
            placeholder="your@email.com"
            style={{
              width: "100%",
              padding: "0.6rem 0.8rem",
              background: "var(--color-surface)",
              border: "1px solid var(--color-surface-2)",
              borderRadius: "8px",
              color: "var(--color-text)",
              fontSize: "0.9rem",
            }}
          />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "0.85rem", color: "var(--color-muted)", marginBottom: "0.4rem" }}>
            Message
          </label>
          <textarea
            placeholder="Your message..."
            rows={5}
            style={{
              width: "100%",
              padding: "0.6rem 0.8rem",
              background: "var(--color-surface)",
              border: "1px solid var(--color-surface-2)",
              borderRadius: "8px",
              color: "var(--color-text)",
              fontSize: "0.9rem",
              resize: "vertical",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "0.7rem 1.5rem",
            background: "var(--color-brand)",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontWeight: 600,
            fontSize: "0.9rem",
            cursor: "pointer",
          }}
        >
          Send Message
        </button>
      </form>

      <div style={{ marginTop: "2rem", padding: "1rem", background: "var(--color-surface)", borderRadius: "8px" }}>
        <p style={{ fontSize: "0.85rem", color: "var(--color-muted)" }}>
          You can also reach us at: <strong style={{ color: "var(--color-text)" }}>contact@playonhub.com</strong>
        </p>
      </div>
    </div>
  );
}
