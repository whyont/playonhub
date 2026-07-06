"use client";

import Link from "next/link";
import { useState } from "react";
import { getAllCategories } from "@/lib/games";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const categories = getAllCategories();

  return (
    <header
      style={{
        background: "var(--color-surface)",
        borderBottom: "1px solid var(--color-surface-2)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "60px",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: "1.25rem",
          }}
        >
          <span style={{ color: "var(--color-brand)" }}>Play</span>
          <span style={{ color: "var(--color-text)" }}>On</span>
          <span style={{ color: "var(--color-accent)" }}>Hub</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav" style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <Link href="/" style={{ color: "var(--color-muted)", fontSize: "0.9rem" }}>
            Home
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              style={{ color: "var(--color-muted)", fontSize: "0.9rem" }}
            >
              {cat.name}
            </Link>
          ))}
          <Link href="/blog" style={{ color: "var(--color-muted)", fontSize: "0.9rem" }}>
            Blog
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            color: "var(--color-text)",
            cursor: "pointer",
            fontSize: "1.5rem",
          }}
          className="mobile-menu-btn"
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          className="mobile-nav"
          style={{
            background: "var(--color-surface)",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          <Link href="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/category/${cat.slug}`} onClick={() => setMenuOpen(false)}>
              {cat.name} ({cat.count})
            </Link>
          ))}
          <Link href="/blog" onClick={() => setMenuOpen(false)}>
            Blog
          </Link>
        </nav>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
