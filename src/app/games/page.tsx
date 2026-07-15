import { games, getAllCategories } from "@/lib/games";
import GameCard from "@/components/GameCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse All Games — Play 35+ Free Online Games | PlayOnHub",
  description:
    "Browse all 35+ free online games on PlayOnHub. IO games, FPS, racing, puzzles, sports and more. Play instantly in your browser with no download required.",
};

export default function GamesPage() {
  const categories = getAllCategories();

  return (
    <div className="games-page">
      {/* Hero */}
      <section className="category-hero fade-up">
        <h1>
          All <span>Games</span>
        </h1>
        <p>
          {games.length} free online games ready to play. Browse by category or
          jump right in!
        </p>
      </section>

      {/* Category pills */}
      <section className="games-categories fade-up">
        <a href="#all" className="cat-pill cat-pill-active">
          All ({games.length})
        </a>
        {categories.map((cat) => (
          <a
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="cat-pill"
          >
            {cat.name} ({cat.count})
          </a>
        ))}
      </section>

      {/* Game grid */}
      <section className="games-grid-section fade-up">
        <div className="all-games-grid">
          {games.map((game) => (
            <GameCard key={game.slug} game={game} size="medium" />
          ))}
        </div>
      </section>

      <style>{`
        .games-page {
          padding-bottom: 3rem;
        }
        .games-categories {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin: 1.5rem 0 2rem;
          justify-content: center;
        }
        .cat-pill {
          font-family: "Outfit", sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-pill);
          background: var(--color-surface);
          border: 1px solid rgba(255,255,255,0.08);
          color: var(--color-muted);
          text-decoration: none;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .cat-pill:hover {
          background: var(--color-surface-2);
          border-color: rgba(124, 58, 237, 0.3);
          color: var(--color-text);
          transform: translateY(-2px);
        }
        .cat-pill-active {
          background: rgba(124, 58, 237, 0.25);
          border-color: rgba(124, 58, 237, 0.5);
          color: #fff;
        }
        .games-grid-section {
          margin-top: 1rem;
        }
      `}</style>
    </div>
  );
}
