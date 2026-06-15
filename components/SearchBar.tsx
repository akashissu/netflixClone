'use client';

import { useRef } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = 'Search...' }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative flex items-center">
      <FiSearch
        className="absolute left-4 text-netflix-gray"
        size={20}
      />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-netflix-dark border border-gray-700 text-white placeholder-netflix-gray rounded-lg pl-12 pr-12 py-3 text-base focus:outline-none focus:border-white transition-colors"
        autoFocus
        aria-label="Search"
      />
      {value && (
        <button
          onClick={() => {
            onChange('');
            inputRef.current?.focus();
          }}
          className="absolute right-4 text-netflix-gray hover:text-white transition-colors"
          aria-label="Clear search"
        >
          <FiX size={20} />
        </button>
      )}
    </div>
  );
}
