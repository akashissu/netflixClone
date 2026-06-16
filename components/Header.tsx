'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-spotify-darkgray/80 backdrop-blur-md">
      {/* Navigation arrows */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 bg-black/40 rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => router.forward()}
          className="w-8 h-8 bg-black/40 rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-3">
        <Link
          href="#"
          className="text-white text-sm font-semibold hover:scale-105 transition-transform"
        >
          Install App
        </Link>
        <button className="bg-white text-black text-sm font-bold px-4 py-1.5 rounded-full hover:scale-105 transition-transform">
          Log in
        </button>
        <div className="w-8 h-8 bg-spotify-green rounded-full flex items-center justify-center text-black font-bold text-sm hover:scale-105 transition-transform cursor-pointer">
          U
        </div>
      </div>
    </header>
  );
}
