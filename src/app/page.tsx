import { getFeaturedGames, games, getAllCategories, blogPosts } from "@/lib/games";
import GameCard from "@/components/GameCard";
import Link from "next/link";
import { Globe, Footprints, Car, Target, Puzzle, Swords, Gamepad2, Trophy, ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  io: Globe,
  platformer: Footprints,
  driving: Car,
  casual: Target,
  puzzle: Puzzle,
  action: Swords,
  arcade: Gamepad2,
  shooter: Trophy,
  sports: Trophy,
};

function CategoryIcon({ slug }: { slug: string }) {
  const Icon = CATEGORY_ICONS[slug] || Gamepad2;
  return <Icon size={20} strokeWidth={2} />;
}

export default function HomePage() {
  const featured = getFeaturedGames();
  const categories = getAllCategories();
  const recentBlog = blogPosts.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section fade-up">
        <span className="hero-eyebrow">Instant Play · No Downloads · 100% Free</span>
        <h1 className="hero-title">
          <span className="hero-gradient">Play Free Online Games</span>
        </h1>
        <p className="hero-subtitle">
          Jump into the best browser games instantly. IO battles, brain-teasing
          puzzles, high-octane driving, and more - all free to play on PlayOnHub.
        </p>
        <div className="hero-actions">
          <Link href="#featured" className="btn-primary">
            Start Playing
          </Link>
          <Link href="#categories" className="btn-secondary">
            Browse Categories
          </Link>
        </div>
      </section>

      {/* Featured Games */}
      <section id="featured" className="home-section">
        <h2 className="section-title">Featured Games</h2>
        <div className="grid-games">
          {featured.map((game) => (
            <GameCard key={game.slug} game={game} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="home-section">
        <h2 className="section-title">Browse by Category</h2>
        <div className="grid-categories">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="category-pill"
            >
              <span className="category-pill-icon">
                <CategoryIcon slug={cat.slug} />
              </span>
              <span className="category-pill-name">{cat.name}</span>
              <span className="category-pill-count">{cat.count} games</span>
            </Link>
          ))}
        </div>
      </section>

      {/* All Games */}
      <section className="home-section">
        <h2 className="section-title">All Games</h2>
        <div className="grid-games">
          {games.map((game) => (
            <GameCard key={game.slug} game={game} />
          ))}
        </div>
      </section>

      {/* Latest Articles */}
      <section className="home-section">
        <div className="section-header-row">
          <h2 className="section-title">Latest Articles</h2>
          <Link href="/blog" className="view-all-link">
            View all <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid-blog">
          {recentBlog.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
              <span className="blog-card-category">{post.category}</span>
              <h3 className="blog-card-title">{post.title}</h3>
              <p className="blog-card-excerpt">{post.excerpt}</p>
              <span className="blog-card-date">
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <style>{`
        .hero-section {
          text-align: center;
          padding: 3.5rem 0 2.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .hero-eyebrow {
          display: inline-block;
          font-family: "Outfit", sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-secondary-light);
          padding: 0.4rem 1rem;
          border-radius: var(--radius-pill);
          background: rgba(6, 182, 212, 0.1);
          border: 1px solid rgba(6, 182, 212, 0.3);
        }

        .hero-title {
          font-family: "Outfit", sans-serif;
          font-size: clamp(2.2rem, 6vw, 3.75rem);
          font-weight: 800;
          line-height: 1.05;
          margin: 0;
          max-width: 900px;
        }

        .hero-subtitle {
          color: var(--color-muted);
          font-size: clamp(0.95rem, 2vw, 1.1rem);
          line-height: 1.7;
          max-width: 640px;
          margin: 0 auto;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 0.5rem;
        }

        .home-section {
          margin-bottom: 3.5rem;
        }

        .section-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .section-header-row .section-title {
          margin-bottom: 0;
        }

        .view-all-link {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-family: "Outfit", sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-secondary-light);
          text-decoration: none;
          transition: gap var(--transition);
        }

        .view-all-link:hover {
          gap: 0.5rem;
          color: var(--color-secondary);
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 2.5rem 0 2rem;
          }
          .home-section {
            margin-bottom: 2.75rem;
          }
        }
      `}</style>
    </div>
  );
}
