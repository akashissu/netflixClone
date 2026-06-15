import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Netflix Clone - Watch Movies & TV Shows',
  description: 'A Netflix-style streaming UI built with Next.js 14, TypeScript, and Tailwind CSS. Browse movies and TV shows, watch trailers, and manage your personal list.',
  keywords: 'netflix, movies, tv shows, streaming, trailers',
  openGraph: {
    title: 'Netflix Clone',
    description: 'Browse movies and TV shows in a Netflix-style interface',
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
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
