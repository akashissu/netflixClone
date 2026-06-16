'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiSearch, FiBell, FiChevronDown } from 'react-icons/fi';
import { FaPlay } from 'react-icons/fa';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-netflix-black shadow-lg' : 'bg-transparent'
      }`}
    >
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          isScrolled ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%)',
        }}
      />
      <div className="relative flex items-center justify-between px-4 md:px-12 py-4">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center">
              <FaPlay className="text-netflix-red text-2xl" />
              <span className="text-netflix-red font-black text-2xl ml-1 tracking-tight">STREAMFLIX</span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-5">
            <Link href="/" className="text-white text-sm font-medium hover:text-netflix-lightgray transition-colors">
              Home
            </Link>
            <Link href="/tv-shows" className="text-netflix-lightgray text-sm hover:text-white transition-colors">
              TV Shows
            </Link>
            <Link href="/movies" className="text-netflix-lightgray text-sm hover:text-white transition-colors">
              Movies
            </Link>
            <Link href="/browse" className="text-netflix-lightgray text-sm hover:text-white transition-colors">
              New &amp; Popular
            </Link>
            <Link href="/my-list" className="text-netflix-lightgray text-sm hover:text-white transition-colors">
              My List
            </Link>
          </nav>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="flex items-center">
            {searchOpen ? (
              <div className="flex items-center bg-black border border-white rounded px-3 py-1">
                <FiSearch className="text-white mr-2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Titles, people, genres"
                  className="bg-transparent text-white text-sm outline-none w-48"
                  autoFocus
                  onBlur={() => {
                    if (!searchQuery) setSearchOpen(false);
                  }}
                />
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="text-white hover:text-netflix-lightgray transition-colors"
              >
                <FiSearch size={20} />
              </button>
            )}
          </div>

          {/* Notifications */}
          <button className="text-white hover:text-netflix-lightgray transition-colors relative">
            <FiBell size={20} />
            <span className="absolute -top-1 -right-1 bg-netflix-red text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>

          {/* Profile */}
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-8 h-8 rounded bg-netflix-red flex items-center justify-center text-white font-bold text-sm">
              U
            </div>
            <FiChevronDown className="text-white text-sm group-hover:rotate-180 transition-transform duration-200" />
          </div>
        </div>
      </div>
    </header>
  );
}
