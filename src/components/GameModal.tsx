"use client";

import { useEffect } from "react";
import { X, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { Game } from "@/lib/games";
import { getGameThumbnail } from "@/lib/games";

interface GameModalProps {
  game: Game | null;
  onClose: () => void;
}

export default function GameModal({ game, onClose }: GameModalProps) {
  useEffect(() => {
    if (game) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [game]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!game) return null;

  return (
    <div className="game-modal-overlay" onClick={onClose}>
      <div className="game-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="game-modal-header">
          <div className="game-modal-title">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getGameThumbnail(game)}
              alt={game.title}
              className="game-modal-thumb"
            />
            <div>
              <h3>{game.title}</h3>
              <span className="game-modal-category">{game.category}</span>
            </div>
          </div>
          <div className="game-modal-actions">
            <Link
              href={`/games/${game.slug}`}
              className="game-modal-btn"
              onClick={onClose}
            >
              <ExternalLink size={16} />
              Full Page
            </Link>
            <button className="game-modal-close" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Game iframe */}
        <div className="game-modal-frame">
          <iframe
            src={game.embedUrl}
            title={game.title}
            allow="fullscreen; gamepad; autoplay"
            loading="eager"
          />
        </div>
      </div>

      <style>{`
        .game-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          animation: modalFadeIn 0.2s ease;
        }
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .game-modal {
          width: 100%;
          max-width: 1100px;
          height: 90vh;
          background: var(--color-surface);
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: modalSlideIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes modalSlideIn {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .game-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          flex-shrink: 0;
        }
        .game-modal-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .game-modal-thumb {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-sm);
          object-fit: cover;
        }
        .game-modal-title h3 {
          font-family: "Outfit", sans-serif;
          font-size: 1rem;
          font-weight: 800;
          margin: 0;
          color: var(--color-text);
        }
        .game-modal-category {
          font-size: 0.75rem;
          color: var(--color-muted);
          text-transform: capitalize;
        }
        .game-modal-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .game-modal-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--color-blue);
          padding: 0.4rem 0.8rem;
          border-radius: var(--radius-pill);
          background: rgba(96, 165, 250, 0.1);
          border: 1px solid rgba(96, 165, 250, 0.2);
          text-decoration: none;
          transition: all 0.2s;
        }
        .game-modal-btn:hover {
          background: rgba(96, 165, 250, 0.2);
          color: #fff;
        }
        .game-modal-close {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          color: var(--color-muted);
          cursor: pointer;
          transition: all 0.2s;
        }
        .game-modal-close:hover {
          background: rgba(255,255,255,0.12);
          color: #fff;
          transform: rotate(90deg);
        }
        .game-modal-frame {
          flex: 1;
          min-height: 0;
          position: relative;
        }
        .game-modal-frame iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: none;
        }
        @media (max-width: 640px) {
          .game-modal-overlay {
            padding: 0;
          }
          .game-modal {
            height: 100vh;
            max-width: 100%;
            border-radius: 0;
          }
          .game-modal-header {
            padding: 0.6rem 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}
