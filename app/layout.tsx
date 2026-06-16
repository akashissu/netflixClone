import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'NetflixClone — Watch TV Shows & Movies Online',
    template: '%s | NetflixClone',
  },
  description:
    'Stream thousands of movies and TV shows. Watch anywhere, cancel anytime. Join NetflixClone today.',
  keywords: ['streaming', 'movies', 'tv shows', 'watch online', 'netflix clone'],
  authors: [{ name: 'NetflixClone Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://netflixclone.vercel.app',
    siteName: 'NetflixClone',
    title: 'NetflixClone — Watch TV Shows & Movies Online',
    description: 'Stream thousands of movies and TV shows. Watch anywhere, cancel anytime.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NetflixClone — Watch TV Shows & Movies Online',
    description: 'Stream thousands of movies and TV shows. Watch anywhere, cancel anytime.',
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
      <body className="bg-netflix-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
