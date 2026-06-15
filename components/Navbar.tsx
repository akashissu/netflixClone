'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiSearch, FiBell, FiUser, FiBookmark } from 'react-icons/fi';
import { getMyList } from '@/lib/myList';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [myListCount, setMyListCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateCount = () => {
      setMyListCount(getMyList().length);
    };
    updateCount();
    window.addEventListener('myListUpdated', updateCount);
    return () => window.removeEventListener('myListUpdated', updateCount);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-netflix-black shadow-lg'
          : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-4 md:px-8 lg:px-16 py-4">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="netflix-logo flex-shrink-0">
            NETFLIX
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-white ${
                pathname === '/' ? 'text-white' : 'text-netflix-lightgray'
              }`}
            >
              Home
            </Link>
            <Link
              href="/search"
              className={`text-sm font-medium transition-colors hover:text-white ${
                pathname === '/search' ? 'text-white' : 'text-netflix-lightgray'
              }`}
            >
              Movies
            </Link>
            <Link
              href="/search"
              className="text-sm font-medium text-netflix-lightgray hover:text-white transition-colors"
            >
              TV Shows
            </Link>
            <Link
              href="/my-list"
              className={`text-sm font-medium transition-colors hover:text-white ${
                pathname === '/my-list' ? 'text-white' : 'text-netflix-lightgray'
              }`}
            >
              My List
            </Link>
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4">
          <Link
            href="/search"
            className="text-white hover:text-netflix-lightgray transition-colors"
            aria-label="Search"
          >
            <FiSearch size={20} />
          </Link>

          <Link
            href="/my-list"
            className="relative text-white hover:text-netflix-lightgray transition-colors"
            aria-label="My List"
          >
            <FiBookmark size={20} />
            {myListCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-netflix-red text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                {myListCount > 9 ? '9+' : myListCount}
              </span>
            )}
          </Link>

          <button
            className="text-white hover:text-netflix-lightgray transition-colors"
            aria-label="Notifications"
          >
            <FiBell size={20} />
          </button>

          <button
            className="flex items-center gap-1 text-white hover:text-netflix-lightgray transition-colors"
            aria-label="Profile"
          >
            <div className="w-8 h-8 bg-netflix-red rounded flex items-center justify-center">
              <FiUser size={16} />
            </div>
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="space-y-1">
              <span className="block w-5 h-0.5 bg-white"></span>
              <span className="block w-5 h-0.5 bg-white"></span>
              <span className="block w-5 h-0.5 bg-white"></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-netflix-black border-t border-gray-800 px-4 py-4 space-y-3">
          <Link
            href="/"
            className="block text-white hover:text-netflix-lightgray py-2"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/search"
            className="block text-white hover:text-netflix-lightgray py-2"
            onClick={() => setMenuOpen(false)}
          >
            Search
          </Link>
          <Link
            href="/my-list"
            className="block text-white hover:text-netflix-lightgray py-2"
            onClick={() => setMenuOpen(false)}
          >
            My List {myListCount > 0 && `(${myListCount})`}
          </Link>
        </div>
      )}
    </nav>
  );
}
