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
        {/* Large Logo */}
        <div className="hero-logo-wrapper">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="PlayOnHub Logo" className="hero-logo-img" />
        </div>

        <h1 className="hero-title">
          Play <span className="hero-title-fun">Free Online</span>{" "}
          <span className="hero-title-games">Games</span>
        </h1>
        <p className="hero-subtitle">
          Jump into the best browser games instantly. IO battles, brain-teasing
          puzzles, high-octane driving, and more — all in one place!
        </p>

      </section>

      {/* ===== FEATURED GAMES ===== */}
      <section className="home-section fade-up" id="featured" style={{ animationDelay: "0.1s" }}>
        <div className="section-header">
          <h2 className="section-title">
            <span className="section-title-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </span>
            <span className="section-title-accent">Featured</span> Games
          </h2>
          <Link href="/games" className="section-link">
            View All &rarr;
          </Link>
        </div>
        <div className="featured-grid">
          {featured.slice(0, 4).map((game) => (
            <GameCard key={game.slug} game={game} size="large" />
          ))}
        </div>
      </section>

      {/* ===== TOP 10 ===== */}
      <section className="home-section fade-up" id="top10" style={{ animationDelay: "0.15s" }}>
        <div className="section-header">
          <h2 className="section-title">
            <span className="section-title-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5C7 4 7 7 7 7"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5C17 4 17 7 17 7"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
            </span>
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
      <section className="home-section fade-up" style={{ animationDelay: "0.2s" }}>
        <div className="section-header">
          <h2 className="section-title">
            <span className="section-title-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </span>
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
      <section className="home-section fade-up" style={{ animationDelay: "0.25s" }}>
        <div className="section-header">
          <h2 className="section-title">
            <span className="section-title-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            </span>
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
      <section className="home-section fade-up" style={{ animationDelay: "0.3s" }}>
        <div className="section-header">
          <h2 className="section-title">
            <span className="section-title-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
            </span>
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
