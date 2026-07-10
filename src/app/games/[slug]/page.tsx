import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getGameBySlug, getBlogPostsForGame, getTop10Games } from "@/lib/games";
import GameCard from "@/components/GameCard";
import Link from "next/link";

export async function generateStaticParams() {
  const { games } = await import("@/lib/games");
  return games.map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { getGameBySlug } = await import("@/lib/games");
  const game = getGameBySlug(slug);
  if (!game) return {};

  const title = `Play ${game.title} Online Free — No Download | PlayOnHub`;
  const description = `Play ${game.title} instantly in your browser. No download, no signup required. ${game.description}`;

  return {
    title,
    description,
    keywords: [...game.tags, "play online", "free", "browser game", "no download"],
    openGraph: {
      title: `${game.title} — Play Free Online | PlayOnHub`,
      description,
      type: "website",
    },
  };
}

export default async function GamePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = getGameBySlug(slug);

  if (!game) {
    notFound();
  }

  const gameGuides = getBlogPostsForGame(game.slug);
  const top10Games = getTop10Games(game.slug).slice(0, 6);

  // JSON-LD structured data
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: game.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  const gameJsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: game.title,
    description: game.description,
    genre: game.category,
    keywords: game.tags.join(", "),
    playMode: "SinglePlayer",
    applicationCategory: "Game",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <div className="game-page">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href={`/category/${game.category}`}>{game.category}</Link>
        <span aria-hidden="true">/</span>
        <span>{game.title}</span>
      </nav>

      {/* Game Header */}
      <header className="game-header">
        <div className="game-header-meta">
          <span className="category-badge">{game.category}</span>
          <span className="game-header-tag" style={{ color: "var(--color-muted)" }}>
            {game.tags.slice(0, 3).join(" · ")}
          </span>
        </div>
        <h1 className="game-title">{game.title}</h1>
        <p className="game-description">{game.description}</p>
      </header>

      {/* Game iframe - contained & complete */}
      <div className="game-iframe-container">
        <div className="game-iframe-wrapper">
          <iframe
            src={game.embedUrl}
            title={game.title}
            allowFullScreen
          />
        </div>
      </div>

      {/* Game Guide Articles */}
      {gameGuides.length > 0 && (
        <section className="game-guides">
          <h2 className="section-title">
            <span className="section-title-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
            </span>
            <span className="section-title-accent">{game.title}</span> Guides
          </h2>
          <div className="guides-list">
            {gameGuides.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="guide-card">
                <div className="guide-card-content">
                  <span className="guide-card-category">{post.category.toUpperCase()}</span>
                  <h3 className="guide-card-title">{post.title}</h3>
                  <p className="guide-card-excerpt">{post.excerpt}</p>
                  <span className="guide-card-read">Read Guide &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* How to Play + Tips */}
      <div className="game-info-grid">
        <section className="info-card">
          <h2 className="info-card-title">How to Play {game.title}</h2>
          <p className="info-card-text">{game.howToPlay}</p>
        </section>

        <section className="info-card">
          <h2 className="info-card-title">Tips &amp; Tricks</h2>
          <ul className="tips-list">
            {game.tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </section>
      </div>

      {/* FAQ */}
      <section className="game-faq">
        <h2 className="section-title">
          <span className="section-title-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </span>
          <span className="section-title-accent">FAQ</span>
        </h2>
        <div className="faq-list">
          {game.faq.map((f, i) => (
            <div key={i} className="info-card faq-item">
              <h3 className="faq-question">{f.question}</h3>
              <p className="faq-answer">{f.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Top 10 Recommended Games */}
      <section className="game-related">
        <h2 className="section-title">
          <span className="section-title-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5C7 4 7 7 7 7"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5C17 4 17 7 17 7"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
          </span>
          <span className="section-title-accent">Top Picks</span> You Might Also Like
        </h2>
        <div className="all-games-grid">
          {top10Games.map((g) => (
            <GameCard key={g.slug} game={g} size="medium" />
          ))}
        </div>
      </section>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gameJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <style>{`
        .game-page {
          padding-top: 1rem;
        }

        .game-header {
          margin-bottom: 1.75rem;
        }

        .game-header-meta {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-bottom: 0.75rem;
        }

        .game-header-tag {
          font-size: 0.78rem;
          text-transform: capitalize;
          letter-spacing: 0.02em;
        }

        .game-title {
          font-family: "Outfit", sans-serif;
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          font-weight: 800;
          margin: 0 0 0.6rem;
          background: linear-gradient(120deg, var(--color-text), var(--color-secondary-light));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

        .game-description {
          color: var(--color-muted);
          font-size: 0.95rem;
          line-height: 1.7;
          max-width: 760px;
        }

        /* Game iframe - contained to show full game */
        .game-iframe-container {
          display: flex;
          justify-content: center;
          margin-bottom: 2.5rem;
        }

        .game-iframe-wrapper {
          position: relative;
          width: 100%;
          max-width: 900px;
          height: 560px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.08);
          background: var(--color-surface);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
        }

        .game-iframe-wrapper iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: none;
        }

        @media (max-width: 768px) {
          .game-iframe-wrapper {
            height: 420px;
          }
        }

        @media (max-width: 480px) {
          .game-iframe-wrapper {
            height: 340px;
          }
        }

        /* Game Guides */
        .game-guides {
          margin-bottom: 2.5rem;
        }

        .guides-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .guide-card {
          display: block;
          padding: 1.25rem 1.5rem;
          border-radius: var(--radius-md);
          background: var(--color-surface);
          border: 1.5px solid rgba(255,255,255,0.06);
          transition: all var(--transition);
          text-decoration: none;
        }

        .guide-card:hover {
          background: var(--color-surface-2);
          border-color: rgba(124, 58, 237, 0.3);
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
        }

        .guide-card-category {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--color-yellow);
        }

        .guide-card-title {
          font-family: "Outfit", sans-serif;
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--color-text);
          margin: 0.4rem 0 0.5rem;
          line-height: 1.35;
        }

        .guide-card-excerpt {
          font-size: 0.88rem;
          color: var(--color-muted);
          line-height: 1.6;
          margin: 0 0 0.6rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .guide-card-read {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--color-blue);
        }

        /* Info grid */
        .game-info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .info-card-title {
          font-family: "Outfit", sans-serif;
          font-size: 1.15rem;
          font-weight: 700;
          margin: 0 0 0.85rem;
          color: var(--color-text);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .info-card-title::before {
          content: "";
          display: inline-block;
          width: 4px;
          height: 1.1rem;
          border-radius: 4px;
          background: linear-gradient(var(--color-brand), var(--color-secondary));
          box-shadow: 0 0 10px rgba(124, 58, 237, 0.6);
        }

        .info-card-text {
          color: var(--color-text);
          font-size: 0.95rem;
          line-height: 1.75;
          margin: 0;
        }

        .tips-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .tips-list li {
          position: relative;
          padding-left: 1.5rem;
          color: var(--color-text);
          font-size: 0.92rem;
          line-height: 1.6;
        }

        .tips-list li::before {
          content: "▹";
          position: absolute;
          left: 0;
          top: 0;
          color: var(--color-secondary);
          font-size: 1rem;
        }

        /* FAQ */
        .game-faq {
          margin-bottom: 2.5rem;
        }

        .faq-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .faq-item {
          transition: border-color var(--transition), box-shadow var(--transition);
        }

        .faq-item:hover {
          border-color: rgba(6, 182, 212, 0.4);
          box-shadow: 0 0 18px rgba(6, 182, 212, 0.18);
        }

        .faq-question {
          font-family: "Outfit", sans-serif;
          font-size: 0.98rem;
          font-weight: 700;
          color: var(--color-text);
          margin: 0 0 0.5rem;
        }

        .faq-answer {
          color: var(--color-muted);
          font-size: 0.88rem;
          line-height: 1.65;
          margin: 0;
        }

        /* Related Games */
        .game-related {
          margin-bottom: 2rem;
        }

        @media (max-width: 768px) {
          .game-info-grid {
            grid-template-columns: 1fr;
          }
          .faq-list {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
