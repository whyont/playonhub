import Link from "next/link";
import type { Game } from "@/lib/games";
import { getGameThumbnail } from "@/lib/games";

interface GameCardProps {
  game: Game;
  size?: "large" | "medium" | "small" | "list";
  rank?: number;
}

export default function GameCard({ game, size = "medium", rank }: GameCardProps) {
  const thumbnail = getGameThumbnail(game);

  if (size === "list") {
    return (
      <Link href={`/games/${game.slug}`} className="game-card-list">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbnail}
          alt={`${game.title} thumbnail`}
          loading="lazy"
          className="game-card-list-thumb"
        />
        <div className="game-card-list-info">
          <span className="game-card-list-title">{game.title}</span>
          <span className="game-card-list-desc">
            {game.description.slice(0, 60).trim()}...
          </span>
        </div>
      </Link>
    );
  }

  const aspectClass = size === "large" ? "game-card-thumb-lg" : size === "small" ? "game-card-thumb-sm" : "game-card-thumb-md";

  return (
    <Link href={`/games/${game.slug}`} className={`game-card game-card-${size}`}>
      <div className={`game-card-thumb ${aspectClass}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbnail}
          alt={`${game.title} thumbnail`}
          loading="lazy"
        />
        {rank !== undefined && (
          <span className="game-card-rank" data-rank={rank <= 3 ? rank : undefined}>{rank}</span>
        )}
      </div>
      <div className="game-card-body">
        <span className="game-card-title-text">{game.title}</span>
        {size !== "small" && (
          <span className="game-card-desc-short">
            {size === "large"
              ? game.description.slice(0, 80).trim() + "..."
              : game.description.slice(0, 50).trim() + "..."}
          </span>
        )}
      </div>
    </Link>
  );
}
