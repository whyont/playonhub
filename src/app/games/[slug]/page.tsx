import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getGameBySlug, getRelatedGames, games } from "@/lib/games";
import GameCard from "@/components/GameCard";
import Link from "next/link";

export async function generateStaticParams() {
  return games.map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) return {};

  return {
    title: `${game.title} - Play Free Online`,
    description: game.description,
    openGraph: {
      title: `${game.title} - Play Free Online | PlayOnHub`,
      description: game.description,
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

  const related = getRelatedGames(game);

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

      {/* Game iframe */}
      <div className="game-iframe-wrapper" style={{ marginBottom: "2.5rem" }}>
        <iframe
          src={game.embedUrl}
          title={game.title}
          allowFullScreen
          loading="lazy"
        />
      </div>

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
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="faq-list">
          {game.faq.map((f, i) => (
            <div key={i} className="info-card faq-item">
              <h3 className="faq-question">{f.question}</h3>
              <p className="faq-answer">{f.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Games */}
      {related.length > 0 && (
        <section className="game-related">
          <h2 className="section-title">Related Games</h2>
          <div className="grid-games">
            {related.map((g) => (
              <GameCard key={g.slug} game={g} />
            ))}
          </div>
        </section>
      )}

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

        .game-info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 3rem;
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

        .game-faq {
          margin-bottom: 3rem;
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
