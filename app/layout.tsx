import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'StreamFlix - Watch Movies & TV Shows Online',
  description: 'Watch unlimited movies, TV shows, and more. Stream anywhere, anytime on StreamFlix.',
  keywords: 'streaming, movies, TV shows, watch online, entertainment',
  openGraph: {
    title: 'StreamFlix - Watch Movies & TV Shows Online',
    description: 'Watch unlimited movies, TV shows, and more. Stream anywhere, anytime on StreamFlix.',
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
      <body className="bg-netflix-black text-white min-h-screen">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
