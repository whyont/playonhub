import {
  getFeaturedGames,
  games,
  blogPosts,
} from "@/lib/games";
import GameCard from "@/components/GameCard";
import Link from "next/link";

export default function HomePage() {
  const featured = getFeaturedGames();
  const recentBlog = blogPosts.slice(0, 3);

  /* Top 10 = first 10 games by array order (popular ones first) */
  const top10 = games.slice(0, 10);

  /* New games = last 4 added */
  const newGames = games.slice(-4).reverse();

  /* All games excluding featured and new (to avoid duplicates) */
  const featuredSlugs = new Set(featured.map((g) => g.slug));
  const newSlugs = new Set(newGames.map((g) => g.slug));
  const allOtherGames = games.filter(
    (g) => !featuredSlugs.has(g.slug) && !newSlugs.has(g.slug)
  );

  return (
    <div className="homepage">
      {/* ===== HERO ===== */}
      <section className="hero-section fade-up">
        <span className="hero-eyebrow">Instant Play &middot; No Downloads &middot; 100% Free</span>
        <h1 className="hero-title">
          Play <span>Free Online Games</span>
        </h1>
        <p className="hero-subtitle">
          Jump into the best browser games instantly. IO battles, brain-teasing
          puzzles, high-octane driving, and more.
        </p>
      </section>

      {/* ===== FEATURED GAMES ===== */}
      <section className="home-section">
        <div className="section-header">
          <h2 className="section-title">
            <span className="section-title-accent">Featured</span> Games
          </h2>
        </div>
        <div className="featured-grid">
          {featured.slice(0, 4).map((game) => (
            <GameCard key={game.slug} game={game} size="large" />
          ))}
        </div>
      </section>

      {/* ===== TOP 10 ===== */}
      <section className="home-section">
        <div className="section-header">
          <h2 className="section-title">
            <span className="section-title-accent">Top 10</span> Most Played
          </h2>
          <Link href="/games" className="section-link">
            View All &rarr;
          </Link>
        </div>
        <div className="top10-scroll-wrapper">
          <div className="top10-scroll">
            {top10.map((game, i) => (
              <div key={game.slug} className="top10-item">
                <GameCard game={game} size="small" rank={i + 1} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NEW GAMES ===== */}
      <section className="home-section">
        <div className="section-header">
          <h2 className="section-title">
            <span className="section-title-accent">New</span> This Week
          </h2>
        </div>
        <div className="featured-grid">
          {newGames.map((game) => (
            <GameCard key={game.slug} game={game} size="medium" />
          ))}
        </div>
      </section>

      {/* ===== ALL GAMES ===== */}
      <section className="home-section">
        <div className="section-header">
          <h2 className="section-title">
            <span className="section-title-accent">All</span> Games
          </h2>
          <Link href="/games" className="section-link">
            View All &rarr;
          </Link>
        </div>
        <div className="all-games-grid">
          {allOtherGames.map((game) => (
            <GameCard key={game.slug} game={game} size="medium" />
          ))}
        </div>
      </section>

      {/* ===== LATEST ARTICLES ===== */}
      <section className="home-section">
        <div className="section-header">
          <h2 className="section-title">
            <span className="section-title-accent">Latest</span> Articles
          </h2>
          <Link href="/blog" className="section-link">
            View All &rarr;
          </Link>
        </div>
        <div className="grid-blog">
          {recentBlog.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
              <span className="blog-card-category">{post.category}</span>
              <h3 className="blog-card-title">{post.title}</h3>
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
      </section>
    </div>
  );
}
