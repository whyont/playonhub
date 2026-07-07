import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "PlayOnHub - Play Free Online Games | Browser Games",
    template: "%s | PlayOnHub",
  },
  description:
    "Play the best free online games in your browser. No downloads required. Play IO games, puzzle games, driving games, and more on PlayOnHub.",
  keywords: [
    "free online games",
    "browser games",
    "io games",
    "puzzle games",
    "play games online",
    "unblocked games",
  ],
  authors: [{ name: "PlayOnHub" }],
  openGraph: {
    title: "PlayOnHub - Play Free Online Games",
    description: "Play the best free online games in your browser. No downloads required.",
    type: "website",
    url: "https://playonhub.com",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.jpg",
    apple: "/favicon.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        {/* Google Analytics 4 */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-VFTLSFE4FE"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-VFTLSFE4FE');
            `,
          }}
        />
      </head>
      <body>
        <Header />
        <main className="container" style={{ minHeight: "70vh", padding: "1.5rem 1.25rem 3rem" }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
