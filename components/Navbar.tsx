'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/search', label: 'TV Shows' },
  { href: '/search', label: 'Movies' },
  { href: '/my-list', label: 'My List' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 md:px-8 py-4',
        scrolled
          ? 'bg-netflix-black shadow-lg'
          : 'bg-gradient-to-b from-black/80 to-transparent'
      )}
    >
      <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex-shrink-0">
            <svg
              className="h-6 md:h-8 w-auto"
              viewBox="0 0 111 30"
              fill="#E50914"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M105.06 0l-6.77 19.27L91.52 0H84.3l10.01 28.44-1.07 3.04C92.43 33.85 91.2 34 89.4 34H87v6.14h3.43c5.2 0 7.7-1.9 9.6-7.2L111 0h-5.94zM73.34 0v40.14h6.1V0h-6.1zM50.82 0v6.14h8.6V40.14h6.1V6.14h8.6V0H50.82zM32.35 0v40.14h18.3v-6.14H38.45V23.4h10.7v-6.14h-10.7V6.14h12.2V0H32.35zM0 0v40.14h6.1V8.1l9.96 32.04h5.2L31.22 8.1v32.04h6.1V0h-8.6L19.6 28.44 10.6 0H0z" />
            </svg>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  'text-sm transition-colors duration-200',
                  pathname === link.href
                    ? 'text-white font-semibold'
                    : 'text-gray-300 hover:text-white'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <Link
            href="/search"
            className="text-gray-300 hover:text-white transition-colors duration-200"
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

          <Link
            href="/my-list"
            className="text-gray-300 hover:text-white transition-colors duration-200 hidden md:block"
            aria-label="My List"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </Link>

          {/* Avatar */}
          <div className="w-8 h-8 rounded bg-netflix-red flex items-center justify-center cursor-pointer">
            <span className="text-white text-sm font-bold">U</span>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden mt-4 bg-netflix-black border-t border-gray-800 py-4 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
