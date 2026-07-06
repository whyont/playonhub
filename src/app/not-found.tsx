import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: "1.5rem",
      }}
    >
      <div style={{ fontSize: "6rem", fontWeight: 800, lineHeight: 1, color: "var(--color-brand)" }}>
        404
      </div>
      <h1 style={{ fontSize: "1.75rem", fontWeight: 700 }}>Page Not Found</h1>
      <p style={{ color: "var(--color-muted)", maxWidth: "28rem" }}>
        Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back to the games.
      </p>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
        <Link
          href="/"
          style={{
            padding: "0.6rem 1.5rem",
            background: "var(--color-brand)",
            color: "#fff",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Back to Home
        </Link>
        <Link
          href="/category/action"
          style={{
            padding: "0.6rem 1.5rem",
            background: "var(--color-surface)",
            color: "var(--color-text)",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: 600,
            border: "1px solid var(--color-surface-2)",
          }}
        >
          Browse Games
        </Link>
      </div>
    </div>
  );
}
