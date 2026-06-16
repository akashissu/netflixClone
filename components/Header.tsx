'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Bell, User } from './icons';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/tv-shows', label: 'TV Shows' },
  { href: '/movies', label: 'Movies' },
  { href: '/my-list', label: 'My List' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchValue)}`;
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 md:px-8 lg:px-16',
        scrolled ? 'bg-netflix-black' : 'bg-gradient-to-b from-black/80 to-transparent'
      )}
    >
      <div className="flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex-shrink-0">
            <span className="text-netflix-red font-black text-2xl md:text-3xl tracking-tight">
              STREAMFLIX
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm transition-colors hover:text-white',
                  pathname === link.href ? 'text-white font-semibold' : 'text-gray-300'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="flex items-center">
            {searchOpen ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <div className="flex items-center border border-white bg-black/80 px-3 py-1.5 rounded">
                  <Search size={16} className="text-white mr-2" />
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Titles, people, genres"
                    className="bg-transparent text-white text-sm outline-none w-40 md:w-56"
                    autoFocus
                    onBlur={() => {
                      if (!searchValue) setSearchOpen(false);
                    }}
                  />
                </div>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
            )}
          </div>

          <button className="text-white hover:text-gray-300 transition-colors relative" aria-label="Notifications">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-netflix-red text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>

          <button className="flex items-center gap-2 group" aria-label="Profile">
            <div className="w-8 h-8 rounded bg-red-700 flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <nav className="md:hidden flex items-center gap-4 pb-3 overflow-x-auto row-scroll">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'text-sm whitespace-nowrap transition-colors hover:text-white',
              pathname === link.href ? 'text-white font-semibold' : 'text-gray-300'
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
