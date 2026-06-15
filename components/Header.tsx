'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Bell, ChevronDown, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/tv-shows', label: 'TV Shows' },
  { href: '/movies', label: 'Movies' },
  { href: '/my-list', label: 'My List' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-netflix-black shadow-lg'
          : 'bg-gradient-to-b from-black/80 to-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex-shrink-0">
              <span className="text-netflix-red font-black text-2xl tracking-tight">
                STREAM<span className="text-white">FLIX</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-white',
                    pathname === link.href ? 'text-white' : 'text-gray-300'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <Link
              href="/search"
              className="text-gray-300 hover:text-white transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </Link>

            <button className="text-gray-300 hover:text-white transition-colors relative" aria-label="Notifications">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-netflix-red rounded-full"></span>
            </button>

            {/* Profile */}
            <div className="hidden md:flex items-center gap-2 cursor-pointer group">
              <div className="w-8 h-8 rounded bg-amber-600 flex items-center justify-center text-sm font-bold">
                U
              </div>
              <ChevronDown className="w-4 h-4 text-gray-300 group-hover:text-white transition-all group-hover:rotate-180 duration-200" />
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-gray-300 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-netflix-black border-t border-zinc-800 animate-fade-in">
          <nav className="flex flex-col px-4 py-4 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'text-base font-medium py-2 transition-colors',
                  pathname === link.href ? 'text-white' : 'text-gray-400 hover:text-white'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/search"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium py-2 text-gray-400 hover:text-white transition-colors"
            >
              Search
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
