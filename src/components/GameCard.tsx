import Link from "next/link";
import type { Game } from "@/lib/games";
import { getGameThumbnail } from "@/lib/games";

export default function GameCard({ game }: { game: Game }) {
  const thumbnail = getGameThumbnail(game);

  return (
    <Link href={`/games/${game.slug}`} className="game-card">
      <div className="game-card-thumb">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbnail}
          alt={`${game.title} thumbnail`}
          loading="lazy"
        />
        <div className="game-card-overlay">
          <span className="game-card-title">{game.title}</span>
        </div>
      </div>

      <div className="game-card-body">
        <span className="category-badge">{game.category}</span>
        {game.tags[0] && <span className="tag-badge">{game.tags[0]}</span>}
      </div>
    </Link>
  );
}
