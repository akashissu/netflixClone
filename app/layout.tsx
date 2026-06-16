import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Netflix Clone — Watch Movies & TV Shows Online',
  description:
    'Stream thousands of movies and TV shows. Watch anywhere. Cancel anytime.',
  keywords: ['netflix', 'streaming', 'movies', 'tv shows', 'watch online'],
  openGraph: {
    title: 'Netflix Clone',
    description: 'Stream thousands of movies and TV shows.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-netflix-black text-white min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
