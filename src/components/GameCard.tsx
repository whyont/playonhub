import Link from "next/link";
import type { Game } from "@/lib/games";

export default function GameCard({ game }: { game: Game }) {
  return (
    <Link href={`/games/${game.slug}`} className="game-card" style={{ display: "block", textDecoration: "none" }}>
      <div
        style={{
          background: "var(--color-surface)",
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid var(--color-surface-2)",
        }}
      >
        {/* Thumbnail placeholder */}
        <div
          style={{
            background: `linear-gradient(135deg, var(--color-brand) 0%, var(--color-accent) 100%)`,
            height: "120px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#fff",
          }}
        >
          {game.title.charAt(0).toUpperCase()}
        </div>

        {/* Info */}
        <div style={{ padding: "0.75rem" }}>
          <h3 style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--color-text)", margin: 0, lineHeight: 1.3 }}>
            {game.title}
          </h3>
          <div
            style={{
              display: "flex",
              gap: "0.4rem",
              marginTop: "0.4rem",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontSize: "0.65rem",
                padding: "0.15rem 0.5rem",
                background: "var(--color-surface-2)",
                borderRadius: "4px",
                color: "var(--color-muted)",
                textTransform: "capitalize",
              }}
            >
              {game.category}
            </span>
            {game.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "0.65rem",
                  padding: "0.15rem 0.5rem",
                  background: "var(--color-surface-2)",
                  borderRadius: "4px",
                  color: "var(--color-muted)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
