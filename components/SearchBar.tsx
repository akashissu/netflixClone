'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  initialValue?: string;
  placeholder?: string;
  autoFocus?: boolean;
}

export function SearchBar({
  onSearch,
  initialValue = '',
  placeholder = 'Titles, people, genres',
  autoFocus = true,
}: SearchBarProps) {
  const [value, setValue] = useState(initialValue);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();
  const router = useRouter();

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (onSearch) {
        onSearch(newValue);
      }
    }, 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (onSearch) {
      onSearch(value);
    } else {
      router.push(`/search?q=${encodeURIComponent(value)}`);
    }
  };

  const handleClear = () => {
    setValue('');
    if (onSearch) onSearch('');
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div
        className={`flex items-center gap-3 bg-black border rounded px-4 py-3 transition-all duration-300 ${
          focused ? 'border-white' : 'border-gray-600'
        }`}
      >
        <svg
          className="w-5 h-5 text-gray-400 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-base"
          aria-label="Search"
        />

        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
            aria-label="Clear search"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </form>
  );
}
