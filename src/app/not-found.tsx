import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-emoji">👾</div>
      <div className="not-found-code">404</div>
      <h1 className="not-found-title">Game Over - Page Not Found</h1>
      <p className="not-found-text">
        Oops! The page you&apos;re looking for doesn&apos;t exist or has been
        moved. Let&apos;s get you back to the games.
      </p>
      <div className="not-found-actions">
        <Link href="/" className="btn-primary">
          Back to Home
        </Link>
        <Link href="/category/action" className="btn-secondary">
          Browse Games
        </Link>
      </div>

      <style>{`
        .not-found {
          min-height: 60vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 1rem;
          padding: 2rem 1rem;
        }

        .not-found-emoji {
          font-size: 4rem;
          line-height: 1;
          filter: drop-shadow(0 0 18px rgba(124, 58, 237, 0.6));
          animation: floatY 2.6s ease-in-out infinite;
        }

        .not-found-code {
          font-family: "Outfit", sans-serif;
          font-size: clamp(4rem, 14vw, 7rem);
          font-weight: 800;
          line-height: 1;
          background: linear-gradient(120deg, var(--color-brand), var(--color-secondary), var(--color-accent));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          filter: drop-shadow(0 0 24px rgba(124, 58, 237, 0.45));
        }

        .not-found-title {
          font-family: "Outfit", sans-serif;
          font-size: clamp(1.4rem, 4vw, 2rem);
          font-weight: 700;
          color: var(--color-text);
          margin: 0;
        }

        .not-found-text {
          color: var(--color-muted);
          max-width: 28rem;
          font-size: 0.95rem;
          line-height: 1.7;
        }

        .not-found-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 0.5rem;
        }

        @keyframes floatY {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}
