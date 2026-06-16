'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-netflix-black shadow-lg'
          : 'bg-gradient-to-b from-black/80 to-transparent'
      )}
    >
      <div className="flex items-center justify-between px-4 md:px-8 lg:px-16 py-4">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <span className="text-netflix-red font-bold text-3xl tracking-tight select-none">
            NETFLIX
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="text-white hover:text-netflix-lightgray transition-colors text-sm font-medium"
          >
            Home
          </Link>
          <Link
            href="/tv-shows"
            className="text-netflix-lightgray hover:text-white transition-colors text-sm"
          >
            TV Shows
          </Link>
          <Link
            href="/movies"
            className="text-netflix-lightgray hover:text-white transition-colors text-sm"
          >
            Movies
          </Link>
          <Link
            href="/my-list"
            className="text-netflix-lightgray hover:text-white transition-colors text-sm"
          >
            My List
          </Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          <Link
            href="/search"
            className="text-netflix-lightgray hover:text-white transition-colors"
            aria-label="Search"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </Link>

          <div className="w-8 h-8 rounded bg-netflix-red flex items-center justify-center cursor-pointer">
            <span className="text-white text-xs font-bold">U</span>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-netflix-black border-t border-netflix-dark px-4 py-4 space-y-3">
          <Link
            href="/"
            className="block text-white hover:text-netflix-lightgray transition-colors py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/tv-shows"
            className="block text-netflix-lightgray hover:text-white transition-colors py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            TV Shows
          </Link>
          <Link
            href="/movies"
            className="block text-netflix-lightgray hover:text-white transition-colors py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Movies
          </Link>
          <Link
            href="/my-list"
            className="block text-netflix-lightgray hover:text-white transition-colors py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            My List
          </Link>
        </div>
      )}
    </header>
  );
}
