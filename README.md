# PlayOnHub - Free Online Browser Games

A Next.js 15 game portal website built for SEO and AdSense monetization. Features H5 game embedding, blog content, structured data, and zero-cost deployment on Vercel.

## Tech Stack

- **Framework**: Next.js 15.1 (App Router)
- **Language**: TypeScript 5.7
- **Styling**: Tailwind CSS 3.4 + CSS Variables
- **Data**: JSON files (no database required)
- **Hosting**: Vercel (free tier)
- **Domain**: playonhub.com

## Quick Start

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
playonhub/
├── src/
│   ├── app/
│   │   ├── about/          # AdSense required page
│   │   ├── blog/           # Blog listing + detail pages
│   │   ├── category/       # Category listing pages
│   │   ├── contact/        # AdSense required page
│   │   ├── games/[slug]/   # Game detail pages
│   │   ├── privacy/        # AdSense required page
│   │   ├── terms/          # AdSense required page
│   │   ├── globals.css     # Global styles + CSS variables
│   │   ├── layout.tsx      # Root layout with Header/Footer
│   │   ├── not-found.tsx   # 404 page
│   │   ├── page.tsx        # Homepage
│   │   ├── robots.ts       # robots.txt
│   │   └── sitemap.ts      # sitemap.xml
│   ├── components/
│   │   ├── AdSlot.tsx      # AdSense placeholder
│   │   ├── Footer.tsx      # Site footer
│   │   ├── GameCard.tsx    # Game card component
│   │   └── Header.tsx      # Sticky header with mobile menu
│   ├── data/
│   │   ├── blog-posts.json # Blog post data
│   │   └── games.json      # Game data (12 games)
│   └── lib/
│       └── games.ts        # Type definitions + utility functions
├── next.config.js
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## SEO Features

- Static Site Generation (SSG) for all pages
- JSON-LD structured data (VideoGame, FAQPage, Article schemas)
- Dynamic sitemap.xml and robots.txt
- Open Graph metadata
- Semantic HTML structure
- Mobile responsive design

## Adding New Games

Edit `src/data/games.json` and add a new entry:

```json
{
  "slug": "game-name",
  "title": "Game Name",
  "category": "action",
  "description": "Game description for SEO...",
  "embedUrl": "https://www.crazygames.com/embed/game-name",
  "tags": ["tag1", "tag2"],
  "featured": false,
  "howToPlay": "How to play instructions...",
  "tips": ["Tip 1", "Tip 2"],
  "faq": [
    { "question": "Q?", "answer": "A." }
  ]
}
```

## Adding Blog Posts

Edit `src/data/blog-posts.json`:

```json
{
  "slug": "post-slug",
  "title": "Post Title",
  "category": "Guides",
  "gameSlug": "related-game-slug",
  "excerpt": "Short excerpt...",
  "content": "Full content with ## headers and - list items",
  "publishedAt": "2026-01-01",
  "keywords": ["keyword1", "keyword2"]
}
```

## AdSense Setup

1. Apply for Google AdSense after site is live with quality content
2. Get your Publisher ID (ca-pub-XXXXXXXXXX)
3. Edit `src/app/layout.tsx` - uncomment the AdSense script tag and replace `ca-pub-XXXX`
4. Edit `src/components/AdSlot.tsx` - uncomment the `<ins>` tag and add your ad slot IDs

## Analytics Setup

1. Create a Google Analytics 4 property
2. Get your Measurement ID (G-XXXXXXXXXX)
3. Edit `src/app/layout.tsx` - uncomment the GA4 script tag and replace `G-XXXX`

## Deployment to Vercel

1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "New Project" and import the repository
4. Deploy (no environment variables needed)
5. Add custom domain: Settings > Domains > Add `playonhub.com`
6. Configure DNS at your domain registrar (Spaceship):
   - Add A record: `@` → `76.76.21.21`
   - Add CNAME: `www` → `cname.vercel-dns.com`

## License

MIT
