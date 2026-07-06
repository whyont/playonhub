import gamesData from "@/data/games.json";
import blogData from "@/data/blog-posts.json";

export type Game = {
  slug: string;
  title: string;
  category: string;
  description: string;
  embedUrl: string;
  tags: string[];
  featured: boolean;
  howToPlay: string;
  tips: string[];
  faq: { question: string; answer: string }[];
};

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  gameSlug: string | null;
  excerpt: string;
  content: string;
  publishedAt: string;
  keywords: string[];
};

export const games = gamesData as Game[];
export const blogPosts = blogData as BlogPost[];

export function getGameBySlug(slug: string): Game | undefined {
  return games.find((g) => g.slug === slug);
}

export function getGamesByCategory(category: string): Game[] {
  return games.filter((g) => g.category === category);
}

export function getFeaturedGames(): Game[] {
  return games.filter((g) => g.featured);
}

export function getRelatedGames(game: Game, limit = 4): Game[] {
  return games
    .filter((g) => g.slug !== game.slug && (g.category === game.category || g.tags.some((t) => game.tags.includes(t))))
    .slice(0, limit);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllCategories(): { slug: string; name: string; count: number }[] {
  const categories = new Map<string, number>();
  games.forEach((g) => {
    categories.set(g.category, (categories.get(g.category) || 0) + 1);
  });
  return Array.from(categories.entries()).map(([slug, count]) => ({
    slug,
    name: slug.charAt(0).toUpperCase() + slug.slice(1),
    count,
  }));
}
