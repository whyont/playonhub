"use client";

import Link from "next/link";
import { useState } from "react";
import { getAllCategories } from "@/lib/games";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const categories = getAllCategories();

  return (
    <header className="site-header">
      <div className="container site-header-inner">
        {/* Logo */}
        <Link href="/" className="site-logo">
          <span className="site-logo-mark">Play</span>
          <span className="site-logo-text">On</span>
          <span className="site-logo-accent">Hub</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          <Link href="/" className="nav-pill">
            Home
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="nav-pill"
            >
              {cat.name}
            </Link>
          ))}
          <Link href="/blog" className="nav-pill">
            Blog
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={menuOpen ? "hamburger open" : "hamburger"}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      <nav className={menuOpen ? "mobile-nav open" : "mobile-nav"}>
        <Link href="/" onClick={() => setMenuOpen(false)} className="mobile-nav-link">
          Home
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            onClick={() => setMenuOpen(false)}
            className="mobile-nav-link"
          >
            {cat.name} <span className="mobile-nav-count">({cat.count})</span>
          </Link>
        ))}
        <Link href="/blog" onClick={() => setMenuOpen(false)} className="mobile-nav-link">
          Blog
        </Link>
      </nav>

      <style>{`
        .site-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(10, 10, 20, 0.72);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(124, 58, 237, 0.18);
        }

        .site-header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 68px;
        }

        .site-logo {
          display: flex;
          align-items: center;
          gap: 0.15rem;
          font-family: "Outfit", sans-serif;
          font-weight: 800;
          font-size: 1.35rem;
          letter-spacing: -0.02em;
          text-decoration: none;
          background: linear-gradient(120deg, var(--color-brand), var(--color-secondary));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          filter: drop-shadow(0 0 12px rgba(124, 58, 237, 0.35));
        }

        .site-logo-mark,
        .site-logo-text,
        .site-logo-accent {
          -webkit-text-fill-color: transparent;
          background: linear-gradient(120deg, var(--color-brand) 0%, var(--color-secondary) 70%, var(--color-accent) 100%);
          -webkit-background-clip: text;
          background-clip: text;
        }

        .desktop-nav {
          display: flex;
          gap: 0.4rem;
          align-items: center;
        }

        .nav-pill {
          font-family: "Outfit", sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-muted);
          padding: 0.45rem 0.95rem;
          border-radius: var(--radius-pill);
          text-decoration: none;
          transition: color var(--transition), background var(--transition),
            box-shadow var(--transition);
        }

        .nav-pill:hover {
          color: var(--color-text);
          background: rgba(124, 58, 237, 0.18);
          box-shadow: 0 0 16px rgba(124, 58, 237, 0.3);
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.4rem;
        }

        .hamburger {
          display: flex;
          flex-direction: column;
          gap: 5px;
          width: 26px;
        }

        .hamburger span {
          display: block;
          height: 2px;
          width: 100%;
          background: var(--color-text);
          border-radius: 2px;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }

        .hamburger.open span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }
        .hamburger.open span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        .mobile-nav {
          display: none;
          flex-direction: column;
          gap: 0.25rem;
          padding: 0.75rem 1.25rem 1.25rem;
          background: rgba(10, 10, 20, 0.96);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(124, 58, 237, 0.18);
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.35s ease, padding 0.35s ease;
        }

        .mobile-nav.open {
          display: flex;
          max-height: 480px;
          padding: 0.75rem 1.25rem 1.25rem;
        }

        .mobile-nav-link {
          font-family: "Outfit", sans-serif;
          font-weight: 600;
          color: var(--color-text);
          padding: 0.7rem 0.9rem;
          border-radius: var(--radius-sm);
          text-decoration: none;
          transition: background var(--transition), color var(--transition);
        }

        .mobile-nav-link:hover {
          background: rgba(124, 58, 237, 0.18);
          color: var(--color-secondary-light);
        }

        .mobile-nav-count {
          color: var(--color-muted);
          font-weight: 500;
          font-size: 0.8rem;
        }

        @media (max-width: 860px) {
          .desktop-nav {
            display: none;
          }
          .mobile-menu-btn {
            display: inline-flex;
          }
          .mobile-nav {
            display: flex;
            max-height: 0;
            padding-top: 0;
            padding-bottom: 0;
          }
          .mobile-nav.open {
            max-height: 480px;
            padding-top: 0.75rem;
            padding-bottom: 1.25rem;
          }
        }
      `}</style>
    </header>
  );
}
