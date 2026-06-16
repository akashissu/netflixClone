import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Netflix Clone — Watch Movies & TV Shows Online',
  description:
    'Watch Netflix movies and TV shows online or stream right to your smart TV, game console, PC, Mac, mobile, tablet and more.',
  keywords: 'netflix, movies, tv shows, streaming, watch online',
  authors: [{ name: 'Netflix Clone' }],
  openGraph: {
    title: 'Netflix Clone',
    description: 'Watch unlimited movies and TV shows.',
    type: 'website',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
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
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
