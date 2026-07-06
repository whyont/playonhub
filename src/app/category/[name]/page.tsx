import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getGamesByCategory, getAllCategories } from "@/lib/games";
import GameCard from "@/components/GameCard";
import Link from "next/link";

export async function generateStaticParams() {
  return getAllCategories().map((cat) => ({ name: cat.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const catName = name.charAt(0).toUpperCase() + name.slice(1);
  return {
    title: `${catName} Games - Play Free Online`,
    description: `Play the best free ${catName.toLowerCase()} games online. No downloads required. Browse our collection of ${catName.toLowerCase()} games.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const catGames = getGamesByCategory(name);

  if (catGames.length === 0) {
    notFound();
  }

  const catName = name.charAt(0).toUpperCase() + name.slice(1);
  const allCategories = getAllCategories();

  return (
    <div className="category-page">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span>{catName} Games</span>
      </nav>

      {/* Category Header */}
      <header className="category-header">
        <span className="category-header-eyebrow">Category</span>
        <h1 className="category-header-title">
          <span className="hero-gradient">{catName} Games</span>
        </h1>
        <p className="category-header-subtitle">
          Play {catGames.length} free {catName.toLowerCase()} games online. No
          downloads required - jump straight into the action.
        </p>
      </header>

      {/* Category switcher */}
      <div className="category-switcher">
        {allCategories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className={cat.slug === name ? "category-chip active" : "category-chip"}
          >
            {cat.name}
            <span className="category-chip-count">{cat.count}</span>
          </Link>
        ))}
      </div>

      {/* Games Grid */}
      <div className="grid-games">
        {catGames.map((game) => (
          <GameCard key={game.slug} game={game} />
        ))}
      </div>

      <style>{`
        .category-page {
          padding-top: 1rem;
        }

        .category-header {
          text-align: center;
          padding: 1.5rem 0 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.6rem;
        }

        .category-header-eyebrow {
          font-family: "Outfit", sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-secondary-light);
        }

        .category-header-title {
          font-family: "Outfit", sans-serif;
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 800;
          margin: 0;
        }

        .category-header-subtitle {
          color: var(--color-muted);
          font-size: 0.95rem;
          line-height: 1.7;
          max-width: 560px;
        }

        .category-switcher {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: center;
          margin-bottom: 2.5rem;
        }

        .category-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 1rem;
          font-family: "Outfit", sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--color-muted);
          text-decoration: none;
          border-radius: var(--radius-pill);
          background: rgba(26, 26, 46, 0.5);
          border: 1px solid rgba(124, 58, 237, 0.2);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          transition: color var(--transition), background var(--transition),
            border-color var(--transition), box-shadow var(--transition);
        }

        .category-chip:hover {
          color: var(--color-text);
          border-color: var(--color-secondary);
        }

        .category-chip.active {
          color: #fff;
          background: linear-gradient(120deg, var(--color-brand), var(--color-secondary));
          border-color: transparent;
          box-shadow: 0 0 18px rgba(124, 58, 237, 0.45);
        }

        .category-chip-count {
          font-size: 0.7rem;
          padding: 0.05rem 0.4rem;
          border-radius: var(--radius-pill);
          background: rgba(255, 255, 255, 0.12);
          color: inherit;
        }

        .category-chip.active .category-chip-count {
          background: rgba(255, 255, 255, 0.25);
        }

        @media (max-width: 768px) {
          .category-header {
            padding: 1rem 0 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
