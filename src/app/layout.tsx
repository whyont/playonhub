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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense - Replace ca-pub-XXXX with your publisher ID after approval */}
        {/* <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXX"
          crossOrigin="anonymous"
        ></script> */}
        {/* Google Analytics 4 - Replace G-XXXX with your measurement ID */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXX"></script> */}
      </head>
      <body>
        <Header />
        <main className="container" style={{ minHeight: "70vh", padding: "1.5rem 1rem 3rem" }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
