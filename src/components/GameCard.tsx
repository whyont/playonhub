"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, Play } from "lucide-react";
import type { Game } from "@/lib/games";
import { getGameThumbnail } from "@/lib/games";
import { useFavorites } from "@/hooks/useGameHistory";

interface GameCardProps {
  game: Game;
  size?: "large" | "medium" | "small" | "list";
  rank?: number;
  onPlay?: (game: Game) => void;
}

export default function GameCard({ game, size = "medium", rank, onPlay }: GameCardProps) {
  const thumbnail = getGameThumbnail(game);
  const { isFavorite, toggleFavorite, mounted } = useFavorites();
  const [showPlay, setShowPlay] = useState(false);
  const favorited = mounted ? isFavorite(game.slug) : false;

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

  const aspectClass =
    size === "large"
      ? "game-card-thumb-lg"
      : size === "small"
        ? "game-card-thumb-sm"
        : "game-card-thumb-md";

  return (
    <div
      className={`game-card game-card-${size}`}
      onMouseEnter={() => setShowPlay(true)}
      onMouseLeave={() => setShowPlay(false)}
    >
      <Link href={`/games/${game.slug}`} className="game-card-link">
        <div className={`game-card-thumb ${aspectClass}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumbnail}
            alt={`${game.title} thumbnail`}
            loading="lazy"
          />
          {rank !== undefined && (
            <span
              className="game-card-rank"
              data-rank={rank <= 3 ? rank : undefined}
            >
              {rank}
            </span>
          )}
        </div>
        {/* Play Now overlay — outside thumb to avoid overflow:hidden clipping */}
        {onPlay && (
          <div
            className="game-card-play-overlay"
            style={{ opacity: showPlay ? 1 : 0 }}
          >
            <button
              className="game-card-play-btn"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onPlay(game);
              }}
            >
              <Play size={20} fill="currentColor" />
              <span>Play Now</span>
            </button>
          </div>
        )}
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

      {/* Favorite button */}
      {mounted && (
        <button
          className={`game-card-fav ${favorited ? "favorited" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(game.slug);
          }}
          aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart size={16} fill={favorited ? "currentColor" : "none"} />
        </button>
      )}

      <style>{`
        .game-card {
          position: relative;
        }
        .game-card-link {
          display: block;
          text-decoration: none;
          color: inherit;
        }
        /* Play overlay — outside the thumb container to avoid overflow clipping */
        .game-card-play-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.55);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.2s ease;
          border-radius: var(--radius-md) var(--radius-md) 0 0;
          z-index: 2;
          overflow: hidden;
        }
        .game-card-play-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, var(--color-yellow), var(--color-orange));
          color: #1a1a2e;
          font-family: "Outfit", sans-serif;
          font-size: 0.9rem;
          font-weight: 800;
          padding: 0.65rem 1.4rem;
          border-radius: var(--radius-pill);
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(251, 191, 36, 0.4);
          white-space: nowrap;
          transform: translateY(8px);
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s;
        }
        .game-card:hover .game-card-play-btn {
          transform: translateY(0);
        }
        .game-card-play-btn:hover {
          box-shadow: 0 6px 28px rgba(251, 191, 36, 0.55);
          filter: brightness(1.05);
        }
        .game-card-fav {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(0,0,0,0.45);
          border: 1px solid rgba(255,255,255,0.15);
          color: var(--color-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          z-index: 5;
          opacity: 0;
        }
        .game-card:hover .game-card-fav {
          opacity: 1;
        }
        .game-card-fav:hover {
          background: rgba(236, 72, 153, 0.3);
          border-color: rgba(236, 72, 153, 0.6);
          color: var(--color-pink);
          transform: scale(1.15);
        }
        .game-card-fav.favorited {
          opacity: 1;
          color: var(--color-pink);
          background: rgba(236, 72, 153, 0.25);
          border-color: rgba(236, 72, 153, 0.5);
        }
        @media (max-width: 640px) {
          .game-card-fav {
            opacity: 1;
            width: 28px;
            height: 28px;
          }
          .game-card-play-overlay {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
