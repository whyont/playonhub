import { blogPosts } from "@/lib/games";
import Link from "next/link";

export const metadata = {
  title: "Blog - Game Guides & Tips",
  description:
    "Read the latest game guides, tips, and articles about browser games on PlayOnHub.",
};

export default function BlogPage() {
  return (
    <div className="blog-page">
      {/* Header */}
      <header className="blog-header">
        <span className="blog-header-eyebrow">PlayOnHub Blog</span>
        <h1 className="blog-header-title">
          <span className="hero-gradient">Game Guides &amp; Tips</span>
        </h1>
        <p className="blog-header-subtitle">
          Learn how to play, discover tips, and stay updated with the latest
          browser games.
        </p>
      </header>

      {/* Blog Grid */}
      <div className="grid-blog">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="blog-card"
          >
            <span className="blog-card-category">{post.category}</span>
            <h2 className="blog-card-title">{post.title}</h2>
            <p className="blog-card-excerpt">{post.excerpt}</p>
            <span className="blog-card-date">
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </Link>
        ))}
      </div>

      <style>{`
        .blog-page {
          padding-top: 1rem;
        }

        .blog-header {
          text-align: center;
          padding: 1.5rem 0 2.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.6rem;
        }

        .blog-header-eyebrow {
          font-family: "Outfit", sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-secondary-light);
        }

        .blog-header-title {
          font-family: "Outfit", sans-serif;
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 800;
          margin: 0;
        }

        .blog-header-subtitle {
          color: var(--color-muted);
          font-size: 0.95rem;
          line-height: 1.7;
          max-width: 560px;
        }

        @media (max-width: 768px) {
          .blog-header {
            padding: 1rem 0 2rem;
          }
        }
      `}</style>
    </div>
  );
}
