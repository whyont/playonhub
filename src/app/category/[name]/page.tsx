import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getGamesByCategory, getAllCategories } from "@/lib/games";
import GameCard from "@/components/GameCard";
import AdSlot from "@/components/AdSlot";

export async function generateStaticParams() {
  return getAllCategories().map((cat) => ({ name: cat.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const catName = name.charAt(0).toUpperCase() + name.slice(1);
  return {
    title: `${catName} Games - Play Free Online`,
    description: `Play the best free ${catName.toLowerCase()} games online. No downloads required. Browse our collection of ${catName.toLowerCase()} games.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const catGames = getGamesByCategory(name);

  if (catGames.length === 0) {
    notFound();
  }

  const catName = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div>
      <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.5rem" }}>
        {catName} Games
      </h1>
      <p style={{ color: "var(--color-muted)", marginBottom: "1.5rem" }}>
        Play {catGames.length} free {catName.toLowerCase()} games online. No downloads required.
      </p>

      <AdSlot style={{ marginBottom: "1.5rem" }} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: "1rem",
        }}
      >
        {catGames.map((game) => (
          <GameCard key={game.slug} game={game} />
        ))}
      </div>
    </div>
  );
}
