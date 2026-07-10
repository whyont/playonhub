import Link from "next/link";
import type { Game } from "@/lib/games";
import { getGameThumbnail } from "@/lib/games";
import { Play } from "lucide-react";

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
        <div className="game-card-play">
          <Play size={24} fill="currentColor" className="play-icon" />
        </div>
      </div>

      <div className="game-card-body">
        <span className="game-card-name">{game.title}</span>
        <span className="game-card-desc">
          {game.description.length > 80
            ? game.description.slice(0, 77).trim() + "..."
            : game.description}
        </span>
      </div>

      <style>{`
        .game-card-play {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(124, 58, 237, 0.85);
          backdrop-filter: blur(4px);
          color: #fff;
          opacity: 0;
          transition: opacity 0.3s ease, transform 0.3s ease;
          box-shadow: 0 0 24px rgba(124, 58, 237, 0.6);
        }

        .game-card:hover .game-card-play {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }

        .play-icon {
          margin-left: 2px;
        }
      `}</style>
    </Link>
  );
}
