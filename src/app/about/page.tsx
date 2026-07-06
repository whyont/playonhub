export const metadata = { title: "About Us", description: "Learn about PlayOnHub - your destination for free online browser games." };

export default function AboutPage() {
  return (
    <div style={{ maxWidth: "720px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "1rem" }}>About PlayOnHub</h1>
      <p style={{ color: "var(--color-text)", lineHeight: 1.8, marginBottom: "1rem" }}>
        PlayOnHub is a free online gaming platform where you can play the best browser games
        instantly. No downloads, no installations, no sign-ups required. Just visit our site, pick a
        game, and start playing.
      </p>
      <p style={{ color: "var(--color-text)", lineHeight: 1.8, marginBottom: "1rem" }}>
        Our mission is to provide a fun, safe, and accessible gaming experience for everyone. We
        feature a wide variety of games including IO games, puzzle games, driving games, and more.
      </p>
      <p style={{ color: "var(--color-text)", lineHeight: 1.8, marginBottom: "1rem" }}>
        All games on PlayOnHub are free to play. We support our platform through advertising, which
        allows us to keep providing quality games at no cost to you.
      </p>
      <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginTop: "1.5rem", marginBottom: "0.75rem" }}>
        What We Offer
      </h2>
      <ul style={{ color: "var(--color-text)", lineHeight: 1.8, paddingLeft: "1.5rem" }}>
        <li>100+ free browser games across multiple categories</li>
        <li>Instant play - no downloads or installations needed</li>
        <li>Games that work on both desktop and mobile devices</li>
        <li>Regular updates with new games and content</li>
        <li>Game guides and tips to help you improve</li>
      </ul>
      <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginTop: "1.5rem", marginBottom: "0.75rem" }}>
        Contact Us
      </h2>
      <p style={{ color: "var(--color-muted)" }}>
        Have questions or suggestions? Visit our <a href="/contact">Contact page</a> to get in touch.
      </p>
    </div>
  );
}
