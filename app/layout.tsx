import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import PlayerBar from '@/components/PlayerBar';
import MobileNav from '@/components/MobileNav';

export const metadata: Metadata = {
  title: 'Spotify Clone — Music Streaming',
  description: 'A Spotify-style music streaming application built with Next.js 14',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎵</text></svg>',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-spotify-darkgray text-white font-sans">
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar - hidden on mobile */}
          <aside className="hidden md:flex md:w-64 lg:w-72 flex-shrink-0">
            <Sidebar />
          </aside>

          {/* Main content area */}
          <main className="flex-1 overflow-y-auto pb-24 md:pb-28">
            {children}
          </main>
        </div>

        {/* Player bar - fixed at bottom */}
        <PlayerBar />

        {/* Mobile navigation */}
        <MobileNav />
      </body>
    </html>
  );
}
