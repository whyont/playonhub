"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { getAllCategories, games } from "@/lib/games";
import { Gamepad2, Menu, X, Search } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
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

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="site-header">
      <div className="container site-header-inner">
        {/* Logo */}
        <Link href="/" className="site-logo">
          <Gamepad2 size={26} className="site-logo-icon" strokeWidth={2.5} />
          <span className="site-logo-text">PlayOnHub</span>
        </Link>

        {/* Nav */}
        <nav className="main-nav">
          <Link
            href="/"
            className={`nav-link ${isActive("/") ? "nav-active" : ""}`}
          >
            Home
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className={`nav-link ${isActive(`/category/${cat.slug}`) ? "nav-active" : ""}`}
            >
              {cat.name}
            </Link>
          ))}
          <Link
            href="/blog"
            className={`nav-link ${isActive("/blog") ? "nav-active" : ""}`}
          >
            Blog
          </Link>
        </nav>

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

        {/* Mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
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
        <Link href="/" onClick={() => setMenuOpen(false)} className="mobile-nav-link">Home</Link>
        {categories.map((cat) => (
          <Link key={cat.slug} href={`/category/${cat.slug}`} onClick={() => setMenuOpen(false)} className="mobile-nav-link">
            {cat.name}
          </Link>
        ))}
        <Link href="/blog" onClick={() => setMenuOpen(false)} className="mobile-nav-link">Blog</Link>
      </nav>

      <style>{`
        .site-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(10, 10, 20, 0.92);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(124, 58, 237, 0.15);
        }

        .site-header-inner {
          display: flex;
          align-items: center;
          gap: 1rem;
          height: 64px;
        }

        /* Logo */
        .site-logo {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-family: "Outfit", sans-serif;
          font-weight: 800;
          font-size: 1.3rem;
          letter-spacing: -0.02em;
          text-decoration: none;
          flex-shrink: 0;
        }

        .site-logo-icon {
          color: var(--color-secondary);
          filter: drop-shadow(0 0 8px rgba(6, 182, 212, 0.5));
        }

        .site-logo-text {
          background: linear-gradient(120deg, var(--color-brand) 0%, var(--color-secondary) 70%, var(--color-accent) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

        /* Main nav */
        .main-nav {
          display: flex;
          align-items: center;
          gap: 0.15rem;
          flex: 1;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .main-nav::-webkit-scrollbar { display: none; }

        .nav-link {
          font-family: "Outfit", sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--color-muted);
          padding: 0.4rem 0.7rem;
          border-radius: var(--radius-pill);
          text-decoration: none;
          white-space: nowrap;
          transition: color var(--transition), background var(--transition);
        }

        .nav-link:hover {
          color: var(--color-text);
          background: rgba(124, 58, 237, 0.12);
        }

        .nav-active {
          color: #fff !important;
          background: rgba(124, 58, 237, 0.3) !important;
          box-shadow: 0 0 12px rgba(124, 58, 237, 0.2);
        }

        /* Search */
        .header-search {
          position: relative;
          flex-shrink: 0;
          width: 220px;
        }

        .search-icon {
          position: absolute;
          left: 0.8rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--color-muted);
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          height: 38px;
          padding: 0 0.8rem 0 2.4rem;
          border-radius: var(--radius-pill);
          border: 1px solid rgba(124, 58, 237, 0.2);
          background: rgba(19, 19, 31, 0.6);
          color: var(--color-text);
          font-size: 0.82rem;
          font-family: "Inter", sans-serif;
          outline: none;
          transition: border-color var(--transition), box-shadow var(--transition);
        }

        .search-input::placeholder { color: var(--color-muted-soft); }

        .search-input:focus {
          border-color: rgba(124, 58, 237, 0.5);
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
        }

        .search-dropdown {
          position: absolute;
          top: calc(100% + 6px);
          left: 0;
          right: 0;
          background: rgba(19, 19, 31, 0.98);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(124, 58, 237, 0.2);
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.5);
          z-index: 200;
        }

        .search-result-item {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          padding: 0.5rem 0.8rem;
          text-decoration: none;
          transition: background var(--transition);
        }
        .search-result-item:hover { background: rgba(124, 58, 237, 0.15); }

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
          color: var(--color-text);
        }

        .search-result-cat {
          font-size: 0.72rem;
          color: var(--color-muted);
          text-transform: capitalize;
        }

        /* Mobile */
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.4rem;
          color: var(--color-text);
          flex-shrink: 0;
        }

        .mobile-nav {
          display: none;
          flex-direction: column;
          gap: 0.4rem;
          padding: 0 1.25rem;
          background: rgba(10, 10, 20, 0.98);
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

        .mobile-search .search-input {
          height: 42px;
          width: 100%;
        }

        .mobile-nav-link {
          font-family: "Outfit", sans-serif;
          font-weight: 600;
          font-size: 0.88rem;
          color: var(--color-muted);
          padding: 0.55rem 0.8rem;
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.2s;
        }

        .mobile-nav-link:hover {
          color: var(--color-text);
          background: rgba(124, 58, 237, 0.15);
        }

        @media (max-width: 960px) {
          .main-nav { display: none; }
          .mobile-menu-btn { display: inline-flex; }
          .header-search { display: none; }
        }

        @media (max-width: 480px) {
          .site-logo {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </header>
  );
}
