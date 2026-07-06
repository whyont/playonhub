import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogPostBySlug, blogPosts } from "@/lib/games";
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
    <div className="article-page">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/blog">Blog</Link>
        <span aria-hidden="true">/</span>
        <span>{post.title.substring(0, 30)}...</span>
      </nav>

      {/* Article header */}
      <header className="article-header">
        <span className="blog-card-category">{post.category}</span>
        <h1 className="article-title">{post.title}</h1>
        <p className="article-meta">
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </header>

      {/* Article content */}
      <article className="article-content">
        {paragraphs.map((para, i) => {
          if (para.startsWith("## ")) {
            return (
              <h2 key={i} className="article-h2">
                {para.replace("## ", "")}
              </h2>
            );
          }
          if (para.startsWith("- ")) {
            const items = para.split("\n").filter((l) => l.startsWith("- "));
            return (
              <ul key={i} className="article-list">
                {items.map((item, j) => (
                  <li key={j}>{item.replace("- ", "")}</li>
                ))}
              </ul>
            );
          }
          return (
            <p key={i} className="article-p">
              {para}
            </p>
          );
        })}
      </article>

      {/* Related game CTA */}
      {post.gameSlug && (
        <div className="article-cta glass-card">
          <div className="article-cta-text">
            <h3 className="article-cta-title">Ready to play?</h3>
            <p className="article-cta-sub">
              Jump straight into the game and put these tips into action.
            </p>
          </div>
          <Link href={`/games/${post.gameSlug}`} className="btn-primary">
            Play Now
          </Link>
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <style>{`
        .article-page {
          max-width: 760px;
          margin: 0 auto;
          padding-top: 1rem;
        }

        .article-header {
          margin-bottom: 2.5rem;
        }

        .article-title {
          font-family: "Outfit", sans-serif;
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          font-weight: 800;
          line-height: 1.15;
          margin: 0.75rem 0 0.6rem;
          background: linear-gradient(120deg, var(--color-text), var(--color-secondary-light));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

        .article-meta {
          color: var(--color-muted);
          font-size: 0.85rem;
        }

        .article-content {
          color: var(--color-text);
          font-size: 1rem;
          line-height: 1.85;
        }

        .article-p {
          margin-bottom: 1.25rem;
          color: var(--color-text);
        }

        .article-h2 {
          font-family: "Outfit", sans-serif;
          font-size: 1.4rem;
          font-weight: 700;
          margin: 2rem 0 1rem;
          color: var(--color-text);
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .article-h2::before {
          content: "";
          display: inline-block;
          width: 4px;
          height: 1.3rem;
          border-radius: 4px;
          background: linear-gradient(var(--color-brand), var(--color-secondary));
          box-shadow: 0 0 10px rgba(124, 58, 237, 0.6);
        }

        .article-list {
          padding-left: 0;
          list-style: none;
          margin: 0 0 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .article-list li {
          position: relative;
          padding-left: 1.6rem;
          color: var(--color-text);
        }

        .article-list li::before {
          content: "▹";
          position: absolute;
          left: 0;
          top: 0;
          color: var(--color-secondary);
        }

        .article-cta {
          margin-top: 3rem;
          padding: 1.75rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
          background: rgba(124, 58, 237, 0.1);
          border-color: rgba(124, 58, 237, 0.35);
        }

        .article-cta-title {
          font-family: "Outfit", sans-serif;
          font-size: 1.2rem;
          font-weight: 700;
          margin: 0 0 0.3rem;
          color: var(--color-text);
        }

        .article-cta-sub {
          color: var(--color-muted);
          font-size: 0.9rem;
          margin: 0;
        }

        @media (max-width: 600px) {
          .article-cta {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}
