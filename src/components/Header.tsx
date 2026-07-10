"use client";

import Link from "next/link";
import { useState } from "react";
import { getAllCategories, games } from "@/lib/games";
import { Gamepad2, Menu, X, Search } from "lucide-react";

const CATEGORY_EMOJI: Record<string, string> = {
  io: "🌐",
  platformer: "🏃",
  driving: "🏎️",
  puzzle: "🧩",
  casual: "🎯",
  action: "⚔️",
  arcade: "🕹️",
  sports: "🏆",
};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const categories = getAllCategories();

  const searchResults = searchQuery
    ? games
        .filter(
          (g) =>
            g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            g.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        .slice(0, 5)
    : [];

  return (
    <header className="site-header">
      <div className="container site-header-inner">
        {/* Logo */}
        <Link href="/" className="site-logo">
          <Gamepad2 size={24} className="site-logo-icon" strokeWidth={2.5} />
          <span className="site-logo-mark">Play</span>
          <span className="site-logo-text">On</span>
          <span className="site-logo-accent">Hub</span>
        </Link>

        {/* Search */}
        <div className="header-search">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
            className="search-input"
          />
          {searchFocused && searchResults.length > 0 && (
            <div className="search-dropdown">
              {searchResults.map((game) => (
                <Link
                  key={game.slug}
                  href={`/games/${game.slug}`}
                  className="search-result-item"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/thumbnails/${game.slug}.jpg`}
                    alt={game.title}
                    className="search-result-thumb"
                  />
                  <div className="search-result-info">
                    <span className="search-result-title">{game.title}</span>
                    <span className="search-result-cat">{game.category}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="nav-item"
            >
              <span className="nav-item-emoji">
                {CATEGORY_EMOJI[cat.slug] || "🎮"}
              </span>
              <span className="nav-item-label">{cat.name}</span>
            </Link>
          ))}
          <Link href="/blog" className="nav-item nav-item-blog">
            <span className="nav-item-emoji">📝</span>
            <span className="nav-item-label">Blog</span>
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <nav className={menuOpen ? "mobile-nav open" : "mobile-nav"}>
        <div className="mobile-search">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="mobile-nav-grid">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              onClick={() => setMenuOpen(false)}
              className="mobile-nav-card"
            >
              <span className="mobile-nav-emoji">
                {CATEGORY_EMOJI[cat.slug] || "🎮"}
              </span>
              <span className="mobile-nav-name">{cat.name}</span>
              <span className="mobile-nav-count">{cat.count}</span>
            </Link>
          ))}
        </div>
        <Link
          href="/blog"
          onClick={() => setMenuOpen(false)}
          className="mobile-nav-link"
        >
          📝 Blog
        </Link>
      </nav>

      <style>{`
        .site-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(10, 10, 20, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(124, 58, 237, 0.15);
        }

        .site-header-inner {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          height: 60px;
        }

        /* Logo */
        .site-logo {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-family: "Outfit", sans-serif;
          font-weight: 800;
          font-size: 1.25rem;
          letter-spacing: -0.02em;
          text-decoration: none;
          flex-shrink: 0;
          filter: drop-shadow(0 0 10px rgba(124, 58, 237, 0.3));
        }

        .site-logo-icon {
          color: var(--color-secondary);
          filter: drop-shadow(0 0 6px rgba(6, 182, 212, 0.5));
        }

        .site-logo-mark,
        .site-logo-text,
        .site-logo-accent {
          background: linear-gradient(120deg, var(--color-brand) 0%, var(--color-secondary) 70%, var(--color-accent) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

        /* Search */
        .header-search {
          position: relative;
          flex: 1;
          max-width: 320px;
        }

        .search-icon {
          position: absolute;
          left: 0.85rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--color-muted);
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          height: 38px;
          padding: 0 0.85rem 0 2.5rem;
          border-radius: var(--radius-pill);
          border: 1px solid rgba(124, 58, 237, 0.2);
          background: rgba(19, 19, 31, 0.6);
          color: var(--color-text);
          font-size: 0.85rem;
          font-family: "Inter", sans-serif;
          outline: none;
          transition: border-color var(--transition), box-shadow var(--transition);
        }

        .search-input::placeholder {
          color: var(--color-muted-soft);
        }

        .search-input:focus {
          border-color: rgba(124, 58, 237, 0.5);
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.12);
        }

        .search-dropdown {
          position: absolute;
          top: calc(100% + 6px);
          left: 0;
          right: 0;
          background: rgba(19, 19, 31, 0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(124, 58, 237, 0.2);
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.5);
        }

        .search-result-item {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          padding: 0.55rem 0.85rem;
          text-decoration: none;
          transition: background var(--transition);
        }

        .search-result-item:hover {
          background: rgba(124, 58, 237, 0.15);
        }

        .search-result-thumb {
          width: 48px;
          height: 28px;
          border-radius: 6px;
          object-fit: cover;
          flex-shrink: 0;
        }

        .search-result-info {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
        }

        .search-result-title {
          font-family: "Outfit", sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-text);
        }

        .search-result-cat {
          font-size: 0.72rem;
          color: var(--color-muted);
          text-transform: capitalize;
        }

        /* Desktop Nav */
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 0.15rem;
          flex-shrink: 0;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-family: "Outfit", sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--color-muted);
          padding: 0.4rem 0.7rem;
          border-radius: var(--radius-sm);
          text-decoration: none;
          transition: color var(--transition), background var(--transition);
        }

        .nav-item:hover {
          color: var(--color-text);
          background: rgba(124, 58, 237, 0.12);
        }

        .nav-item-emoji {
          font-size: 0.95rem;
          line-height: 1;
        }

        .nav-item-blog {
          margin-left: 0.4rem;
          border-left: 1px solid rgba(124, 58, 237, 0.15);
          padding-left: 0.85rem;
        }

        /* Mobile */
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.4rem;
          color: var(--color-text);
        }

        .mobile-nav {
          display: none;
          flex-direction: column;
          gap: 0.75rem;
          padding: 0 1.25rem 1.25rem;
          background: rgba(10, 10, 20, 0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(124, 58, 237, 0.15);
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.35s ease, padding 0.35s ease;
        }

        .mobile-nav.open {
          display: flex;
          max-height: 600px;
          padding: 0.75rem 1.25rem 1.25rem;
        }

        .mobile-search {
          position: relative;
          margin-bottom: 0.5rem;
        }

        .mobile-search .search-icon {
          left: 0.85rem;
        }

        .mobile-search .search-input {
          height: 42px;
        }

        .mobile-nav-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem;
        }

        .mobile-nav-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.3rem;
          padding: 0.7rem 0.5rem;
          border-radius: var(--radius-sm);
          background: rgba(19, 19, 31, 0.6);
          border: 1px solid rgba(124, 58, 237, 0.12);
          text-decoration: none;
          transition: background var(--transition);
        }

        .mobile-nav-card:hover {
          background: rgba(124, 58, 237, 0.15);
        }

        .mobile-nav-emoji {
          font-size: 1.3rem;
        }

        .mobile-nav-name {
          font-family: "Outfit", sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--color-text);
        }

        .mobile-nav-count {
          font-size: 0.7rem;
          color: var(--color-muted);
        }

        .mobile-nav-link {
          font-family: "Outfit", sans-serif;
          font-weight: 600;
          color: var(--color-text);
          padding: 0.7rem 0.9rem;
          border-radius: var(--radius-sm);
          text-decoration: none;
          transition: background var(--transition);
        }

        .mobile-nav-link:hover {
          background: rgba(124, 58, 237, 0.15);
        }

        @media (max-width: 960px) {
          .desktop-nav {
            display: none;
          }
          .mobile-menu-btn {
            display: inline-flex;
          }
          .header-search {
            max-width: none;
          }
        }

        @media (max-width: 580px) {
          .site-logo {
            font-size: 1.1rem;
          }
          .header-search {
            display: none;
          }
          .mobile-nav-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </header>
  );
}
