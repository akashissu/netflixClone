import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Netflix Clone — Stream Movies & TV Shows',
  description:
    'Watch unlimited movies, TV shows, and more. Stream anywhere, anytime on Netflix Clone.',
  keywords: ['netflix', 'streaming', 'movies', 'tv shows', 'watch online'],
  authors: [{ name: 'Netflix Clone Team' }],
  openGraph: {
    title: 'Netflix Clone',
    description: 'Watch unlimited movies, TV shows, and more.',
    type: 'website'
  }
};

export default function RootLayout({
  children
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
