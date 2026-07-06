import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogPostBySlug, blogPosts } from "@/lib/games";
import AdSlot from "@/components/AdSlot";
import Link from "next/link";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Render content as paragraphs
  const paragraphs = post.content.split("\n\n");

  // JSON-LD Article schema
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    keywords: post.keywords.join(", "),
    author: { "@type": "Organization", name: "PlayOnHub" },
    publisher: { "@type": "Organization", name: "PlayOnHub" },
  };

  return (
    <div style={{ maxWidth: "720px", margin: "0 auto" }}>
      {/* Breadcrumb */}
      <nav style={{ fontSize: "0.8rem", color: "var(--color-muted)", marginBottom: "1rem" }}>
        <Link href="/">Home</Link> {" / "}
        <Link href="/blog">Blog</Link> {" / "}
        <span>{post.title.substring(0, 30)}...</span>
      </nav>

      {/* Article header */}
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
      <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginTop: "0.5rem", marginBottom: "0.5rem" }}>
        {post.title}
      </h1>
      <p style={{ color: "var(--color-muted)", fontSize: "0.8rem", marginBottom: "1.5rem" }}>
        {new Date(post.publishedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      {/* Top Ad */}
      <AdSlot style={{ marginBottom: "1.5rem" }} />

      {/* Article content */}
      <article style={{ color: "var(--color-text)", fontSize: "0.95rem", lineHeight: 1.8 }}>
        {paragraphs.map((para, i) => {
          if (para.startsWith("## ")) {
            return (
              <h2 key={i} style={{ fontSize: "1.25rem", fontWeight: 700, marginTop: "1.5rem", marginBottom: "0.75rem" }}>
                {para.replace("## ", "")}
              </h2>
            );
          }
          if (para.startsWith("- ")) {
            const items = para.split("\n").filter((l) => l.startsWith("- "));
            return (
              <ul key={i} style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
                {items.map((item, j) => (
                  <li key={j} style={{ marginBottom: "0.3rem" }}>{item.replace("- ", "")}</li>
                ))}
              </ul>
            );
          }
          return (
            <p key={i} style={{ marginBottom: "1rem" }}>
              {para}
            </p>
          );
        })}
      </article>

      {/* Bottom Ad */}
      <AdSlot style={{ marginTop: "2rem", marginBottom: "2rem" }} />

      {/* Related game link */}
      {post.gameSlug && (
        <div
          style={{
            padding: "1rem 1.25rem",
            background: "var(--color-surface)",
            borderRadius: "10px",
            border: "1px solid var(--color-surface-2)",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "0.9rem", color: "var(--color-muted)", marginBottom: "0.5rem" }}>
            Ready to play?
          </p>
          <Link
            href={`/games/${post.gameSlug}`}
            style={{
              display: "inline-block",
              padding: "0.6rem 1.5rem",
              background: "var(--color-brand)",
              color: "#fff",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "0.9rem",
              textDecoration: "none",
            }}
          >
            Play Now →
          </Link>
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
    </div>
  );
}
