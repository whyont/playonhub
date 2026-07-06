import { blogPosts } from "@/lib/games";
import Link from "next/link";
import AdSlot from "@/components/AdSlot";

export const metadata = {
  title: "Blog - Game Guides & Tips",
  description: "Read the latest game guides, tips, and articles about browser games on PlayOnHub.",
};

export default function BlogPage() {
  return (
    <div>
      <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.5rem" }}>
        Game Guides &amp; Tips
      </h1>
      <p style={{ color: "var(--color-muted)", marginBottom: "1.5rem" }}>
        Learn how to play, discover tips, and stay updated with the latest browser games.
      </p>

      <AdSlot style={{ marginBottom: "1.5rem" }} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            style={{
              display: "block",
              padding: "1.5rem",
              background: "var(--color-surface)",
              borderRadius: "10px",
              border: "1px solid var(--color-surface-2)",
              textDecoration: "none",
            }}
          >
            <span
              style={{
                fontSize: "0.65rem",
                textTransform: "uppercase",
                color: "var(--color-brand-light)",
                fontWeight: 600,
              }}
            >
              {post.category}
            </span>
            <h2 style={{ fontSize: "1.05rem", fontWeight: 600, marginTop: "0.5rem", color: "var(--color-text)" }}>
              {post.title}
            </h2>
            <p style={{ fontSize: "0.85rem", color: "var(--color-muted)", marginTop: "0.5rem" }}>
              {post.excerpt}
            </p>
            <span style={{ fontSize: "0.75rem", color: "var(--color-muted)", marginTop: "0.75rem", display: "block" }}>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
