import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getGameBySlug, getRelatedGames, games } from "@/lib/games";
import GameCard from "@/components/GameCard";
import AdSlot from "@/components/AdSlot";
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
    <div>
      {/* Breadcrumb */}
      <nav style={{ fontSize: "0.8rem", color: "var(--color-muted)", marginBottom: "1rem" }}>
        <Link href="/">Home</Link> {" / "}
        <Link href={`/category/${game.category}`}>{game.category}</Link> {" / "}
        <span>{game.title}</span>
      </nav>

      {/* Game Title */}
      <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.5rem" }}>
        {game.title}
      </h1>
      <p style={{ color: "var(--color-muted)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
        {game.description}
      </p>

      {/* Top Ad */}
      <AdSlot style={{ marginBottom: "1.5rem" }} />

      {/* Game iframe */}
      <div className="game-iframe-wrapper" style={{ marginBottom: "1.5rem" }}>
        <iframe
          src={game.embedUrl}
          title={game.title}
          allowFullScreen
          loading="lazy"
        />
      </div>

      {/* How to Play */}
      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.75rem" }}>
          How to Play {game.title}
        </h2>
        <p style={{ color: "var(--color-text)", fontSize: "0.95rem", lineHeight: 1.7 }}>
          {game.howToPlay}
        </p>
      </section>

      {/* Tips & Tricks */}
      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.75rem" }}>
          Tips &amp; Tricks
        </h2>
        <ul style={{ paddingLeft: "1.5rem", color: "var(--color-text)", fontSize: "0.95rem" }}>
          {game.tips.map((tip, i) => (
            <li key={i} style={{ marginBottom: "0.4rem", lineHeight: 1.6 }}>{tip}</li>
          ))}
        </ul>
      </section>

      {/* Middle Ad */}
      <AdSlot style={{ marginBottom: "2rem" }} />

      {/* FAQ */}
      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.75rem" }}>
          Frequently Asked Questions
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {game.faq.map((f, i) => (
            <div
              key={i}
              style={{
                padding: "1rem",
                background: "var(--color-surface)",
                borderRadius: "8px",
                border: "1px solid var(--color-surface-2)",
              }}
            >
              <h3 style={{ fontSize: "0.95rem", fontWeight: 600, marginBottom: "0.4rem" }}>
                {f.question}
              </h3>
              <p style={{ color: "var(--color-muted)", fontSize: "0.85rem", lineHeight: 1.6 }}>
                {f.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Games */}
      {related.length > 0 && (
        <section>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            Related Games
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: "1rem",
            }}
          >
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
    </div>
  );
}
