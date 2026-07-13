"use client";

import { useState, useCallback } from "react";
import { Shuffle } from "lucide-react";
import {
  getFeaturedGames,
  games,
  blogPosts,
  getGameBySlug,
} from "@/lib/games";
import type { Game } from "@/lib/games";
import GameCard from "@/components/GameCard";
import GameModal from "@/components/GameModal";
import Link from "next/link";
import { useRecentGames } from "@/hooks/useGameHistory";

export default function HomePage() {
  const featured = getFeaturedGames();
  const recentBlog = blogPosts.slice(0, 3);
  const { recent, addRecent } = useRecentGames();

  /* Top 10 = first 10 games by array order */
  const top10 = games.slice(0, 10);

  /* New games = last 4 added */
  const newGames = games.slice(-4).reverse();

  /* All games excluding featured and new */
  const featuredSlugs = new Set(featured.map((g) => g.slug));
  const newSlugs = new Set(newGames.map((g) => g.slug));
  const allOtherGames = games.filter(
    (g) => !featuredSlugs.has(g.slug) && !newSlugs.has(g.slug)
  );

  /* Modal state */
  const [modalGame, setModalGame] = useState<Game | null>(null);

  const handlePlay = useCallback(
    (game: Game) => {
      setModalGame(game);
      addRecent(game.slug, game.title, game.thumbnail);
    },
    [addRecent]
  );

  const handleCloseModal = useCallback(() => {
    setModalGame(null);
  }, []);

  /* Random game */
  const handleRandom = useCallback(() => {
    const random = games[Math.floor(Math.random() * games.length)];
    if (random) handlePlay(random);
  }, [handlePlay]);

  /* Continue playing: filter recent games that still exist */
  const continueGames = recent
    .map((r) => getGameBySlug(r.slug))
    .filter((g): g is Game => g !== undefined);

  return (
    <div className="homepage">
      {/* ===== HERO ===== */}
      <section className="hero-section fade-up">
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

        {/* Random game button */}
        <button className="hero-random-btn" onClick={handleRandom}>
          <Shuffle size={18} />
          Surprise Me!
        </button>
      </section>

      {/* ===== CONTINUE PLAYING ===== */}
      {continueGames.length > 0 && (
        <section className="home-section fade-up" style={{ animationDelay: "0.05s" }}>
          <div className="section-header">
            <h2 className="section-title">
              <span className="section-title-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </span>
              <span className="section-title-accent">Continue</span> Playing
            </h2>
          </div>
          <div className="continue-grid">
            {continueGames.slice(0, 4).map((game) => (
              <GameCard
                key={game.slug}
                game={game}
                size="medium"
                onPlay={handlePlay}
              />
            ))}
          </div>
        </section>
      )}

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
            <GameCard key={game.slug} game={game} size="large" onPlay={handlePlay} />
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
                <GameCard game={game} size="small" rank={i + 1} onPlay={handlePlay} />
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
            <GameCard key={game.slug} game={game} size="medium" onPlay={handlePlay} />
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
            <GameCard key={game.slug} game={game} size="medium" onPlay={handlePlay} />
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

      {/* Game Modal */}
      <GameModal game={modalGame} onClose={handleCloseModal} />

      <style>{`
        .hero-random-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.5rem;
          font-family: "Outfit", sans-serif;
          font-size: 0.95rem;
          font-weight: 800;
          padding: 0.7rem 1.5rem;
          border-radius: var(--radius-pill);
          background: linear-gradient(135deg, var(--color-pink), var(--color-purple));
          color: #fff;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(236, 72, 153, 0.3);
          transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .hero-random-btn:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 8px 32px rgba(236, 72, 153, 0.45);
        }
        .continue-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        @media (min-width: 640px) {
          .continue-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}
