import Link from "next/link";
import { Gamepad2, Mail, Send, Code } from "lucide-react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand + Social */}
          <div className="footer-brand">
            <h3 className="footer-logo">
              <Gamepad2 size={22} className="footer-logo-icon" strokeWidth={2.5} />
              <span className="footer-logo-text">PlayOnHub</span>
            </h3>
            <p className="footer-tagline">
              Play the best free online games in your browser. No downloads, no
              installations. Pure arcade fun, anytime.
            </p>
            <div className="footer-social">
              <a
                href="https://twitter.com"
                className="footer-social-link"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Send size={18} />
              </a>
              <a
                href="https://github.com/whyont/playonhub"
                className="footer-social-link"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Code size={18} />
              </a>
              <a
                href="/contact"
                className="footer-social-link"
                aria-label="Contact"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-list">
              <li><Link href="/" className="footer-link">Home</Link></li>
              <li><Link href="/blog" className="footer-link">Blog</Link></li>
              <li><Link href="/about" className="footer-link">About Us</Link></li>
              <li><Link href="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="footer-col">
            <h4 className="footer-col-title">Legal</h4>
            <ul className="footer-list">
              <li><Link href="/privacy" className="footer-link">Privacy Policy</Link></li>
              <li><Link href="/terms" className="footer-link">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} PlayOnHub. All rights reserved. Play
          free games online.
        </div>
      </div>

      <style>{`
        .site-footer {
          margin-top: 4rem;
          padding: 3rem 0 1.5rem;
          background: rgba(13, 13, 25, 0.7);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          position: relative;
        }

        .site-footer::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(124, 58, 237, 0.6),
            rgba(6, 182, 212, 0.6),
            rgba(236, 72, 153, 0.6),
            transparent
          );
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 2.5rem;
        }

        .footer-logo {
          margin: 0 0 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .footer-logo-icon {
          color: var(--color-secondary);
          filter: drop-shadow(0 0 6px rgba(6, 182, 212, 0.4));
        }

        .footer-logo-text {
          font-family: "Outfit", sans-serif;
          font-weight: 800;
          font-size: 1.5rem;
          letter-spacing: -0.02em;
          background: linear-gradient(
            120deg,
            var(--color-brand),
            var(--color-secondary),
            var(--color-accent)
          );
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

        .footer-tagline {
          color: var(--color-muted);
          font-size: 0.875rem;
          line-height: 1.7;
          max-width: 360px;
        }

        .footer-social {
          display: flex;
          gap: 0.6rem;
          margin-top: 1.25rem;
        }

        .footer-social-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          color: var(--color-muted);
          background: rgba(124, 58, 237, 0.12);
          border: 1px solid rgba(124, 58, 237, 0.25);
          transition: color var(--transition), background var(--transition),
            border-color var(--transition), transform var(--transition),
            box-shadow var(--transition);
        }

        .footer-social-link:hover {
          color: var(--color-secondary-light);
          background: rgba(6, 182, 212, 0.18);
          border-color: var(--color-secondary);
          transform: translateY(-3px);
          box-shadow: 0 0 16px rgba(6, 182, 212, 0.35);
        }

        .footer-col-title {
          font-family: "Outfit", sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-secondary-light);
          margin: 0 0 1rem;
        }

        .footer-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .footer-link {
          font-size: 0.875rem;
          color: var(--color-muted);
          text-decoration: none;
          transition: color var(--transition), padding-left var(--transition);
        }

        .footer-link:hover {
          color: var(--color-secondary-light);
          padding-left: 4px;
        }

        .footer-bottom {
          margin-top: 2.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(124, 58, 237, 0.15);
          text-align: center;
          color: var(--color-muted-soft);
          font-size: 0.8rem;
          letter-spacing: 0.02em;
        }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
          .footer-brand {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
}
