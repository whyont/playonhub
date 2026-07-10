"use client";

import Link from "next/link";
import { useState } from "react";
import { getAllCategories, games } from "@/lib/games";
import { Menu, X, Search } from "lucide-react";

const CATEGORY_ICONS: Record<string, string> = {
  io: "IO",
  platformer: "Platform",
  driving: "Driving",
  puzzle: "Puzzle",
  casual: "Casual",
  action: "Action",
  arcade: "Arcade",
  sports: "Sports",
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
        .slice(0, 6)
    : [];

  return (
    <header className="site-header">
      {/* Top bar */}
      <div className="header-top">
        <div className="container header-top-inner">
          <Link href="/" className="site-logo">
            <span className="logo-part-1">Play</span>
            <span className="logo-part-2">On</span>
            <span className="logo-part-3">Hub</span>
          </Link>

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

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Category nav bar */}
      <div className="header-categories">
        <div className="container header-categories-inner">
          <nav className="category-nav">
            <Link href="/" className="cat-nav-item cat-nav-active">Home</Link>
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/category/${cat.slug}`} className="cat-nav-item">
                {CATEGORY_ICONS[cat.slug] || cat.name}
              </Link>
            ))}
            <Link href="/blog" className="cat-nav-item">Blog</Link>
          </nav>
        </div>
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
        <div className="mobile-nav-links">
          <Link href="/" onClick={() => setMenuOpen(false)} className="mobile-nav-link">Home</Link>
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/category/${cat.slug}`} onClick={() => setMenuOpen(false)} className="mobile-nav-link">
              {CATEGORY_ICONS[cat.slug] || cat.name}
            </Link>
          ))}
          <Link href="/blog" onClick={() => setMenuOpen(false)} className="mobile-nav-link">Blog</Link>
        </div>
      </nav>

      <style>{`
        .site-header {
          position: sticky;
          top: 0;
          z-index: 100;
        }

        /* Top bar */
        .header-top {
          background: #1a1a2e;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .header-top-inner {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          height: 56px;
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
          flex-shrink: 0;
        }

        .logo-part-1 { color: #fbbf24; }
        .logo-part-2 { color: #f472b6; }
        .logo-part-3 { color: #60a5fa; }

        /* Search */
        .header-search {
          position: relative;
          flex: 1;
          max-width: 360px;
          margin-left: auto;
        }

        .search-icon {
          position: absolute;
          left: 0.9rem;
          top: 50%;
          transform: translateY(-50%);
          color: #8892b0;
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          height: 38px;
          padding: 0 1rem 0 2.5rem;
          border-radius: 9999px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.06);
          color: #e2e8f0;
          font-size: 0.85rem;
          font-family: "Inter", sans-serif;
          outline: none;
          transition: all 0.2s ease;
        }

        .search-input::placeholder { color: #64748b; }
        .search-input:focus {
          border-color: rgba(96, 165, 250, 0.4);
          background: rgba(255,255,255,0.1);
        }

        .search-dropdown {
          position: absolute;
          top: calc(100% + 6px);
          left: 0;
          right: 0;
          background: #1e1e3f;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 16px 48px rgba(0,0,0,0.5);
          z-index: 200;
        }

        .search-result-item {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          padding: 0.55rem 0.85rem;
          text-decoration: none;
          transition: background 0.2s;
        }
        .search-result-item:hover { background: rgba(96,165,250,0.12); }

        .search-result-thumb {
          width: 52px;
          height: 30px;
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
          color: #e2e8f0;
        }

        .search-result-cat {
          font-size: 0.72rem;
          color: #64748b;
          text-transform: capitalize;
        }

        /* Category nav bar */
        .header-categories {
          background: #16162a;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .header-categories-inner {
          display: flex;
          align-items: center;
          height: 44px;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .header-categories-inner::-webkit-scrollbar { display: none; }

        .category-nav {
          display: flex;
          align-items: center;
          gap: 0.1rem;
        }

        .cat-nav-item {
          font-family: "Outfit", sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
          color: #94a3b8;
          padding: 0.35rem 0.85rem;
          border-radius: 8px;
          text-decoration: none;
          white-space: nowrap;
          transition: all 0.2s ease;
        }

        .cat-nav-item:hover {
          color: #e2e8f0;
          background: rgba(255,255,255,0.06);
        }

        .cat-nav-active {
          color: #fbbf24;
          background: rgba(251, 191, 36, 0.1);
        }

        /* Mobile */
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.4rem;
          color: #e2e8f0;
        }

        .mobile-nav {
          display: none;
          flex-direction: column;
          gap: 0.5rem;
          padding: 0 1.25rem;
          background: #16162a;
          max-height: 0;
          overflow: hidden;
          transition: all 0.35s ease;
        }

        .mobile-nav.open {
          display: flex;
          max-height: 500px;
          padding: 0.75rem 1.25rem 1.25rem;
        }

        .mobile-search {
          position: relative;
          margin-bottom: 0.5rem;
        }

        .mobile-search .search-input { height: 42px; }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .mobile-nav-link {
          font-family: "Outfit", sans-serif;
          font-weight: 600;
          font-size: 0.9rem;
          color: #94a3b8;
          padding: 0.6rem 0.8rem;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.2s;
        }

        .mobile-nav-link:hover {
          color: #e2e8f0;
          background: rgba(255,255,255,0.06);
        }

        @media (max-width: 768px) {
          .header-search { display: none; }
          .mobile-menu-btn { display: inline-flex; }
          .header-categories { display: none; }
        }
      `}</style>
    </header>
  );
}
