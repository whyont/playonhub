import { getFeaturedGames, games, getAllCategories } from "@/lib/games";
import { blogPosts } from "@/lib/games";
import GameCard from "@/components/GameCard";
import AdSlot from "@/components/AdSlot";
import Link from "next/link";

export default function HomePage() {
  const featured = getFeaturedGames();
  const categories = getAllCategories();
  const recentBlog = blogPosts.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          textAlign: "center",
          padding: "2rem 0 1.5rem",
        }}
      >
        <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>
          Play Free Online Games
        </h1>
        <p style={{ color: "var(--color-muted)", maxWidth: "600px", margin: "0 auto 1rem" }}>
          Play the best browser games instantly. No downloads, no installations. IO games, puzzles,
          racing, and more - all free to play.
        </p>
      </section>

      {/* Top Ad */}
      <AdSlot style={{ marginBottom: "2rem" }} />

      {/* Featured Games */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1rem" }}>
          🔥 Featured Games
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: "1rem",
          }}
        >
          {featured.map((game) => (
            <GameCard key={game.slug} game={game} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1rem" }}>
          📂 Browse by Category
        </h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "1rem 1.5rem",
                background: "var(--color-surface)",
                borderRadius: "10px",
                border: "1px solid var(--color-surface-2)",
                minWidth: "120px",
                textDecoration: "none",
              }}
            >
              <span style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--color-text)" }}>
                {cat.name}
              </span>
              <span style={{ fontSize: "0.75rem", color: "var(--color-muted)" }}>
                {cat.count} games
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* All Games */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1rem" }}>
          🎮 All Games
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: "1rem",
          }}
        >
          {games.map((game) => (
            <GameCard key={game.slug} game={game} />
          ))}
        </div>
      </section>

      {/* Middle Ad */}
      <AdSlot style={{ marginBottom: "2rem" }} />

      {/* Blog Section */}
      <section>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1rem" }}>
          📝 Latest Articles
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1rem",
          }}
        >
          {recentBlog.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              style={{
                display: "block",
                padding: "1.25rem",
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
              <h3 style={{ fontSize: "0.95rem", fontWeight: 600, marginTop: "0.4rem", color: "var(--color-text)" }}>
                {post.title}
              </h3>
              <p style={{ fontSize: "0.8rem", color: "var(--color-muted)", marginTop: "0.4rem" }}>
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
