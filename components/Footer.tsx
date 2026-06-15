import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const footerLinks = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#' },
      { label: 'Jobs', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Blog', href: '#' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '#' },
      { label: 'Contact Us', href: '#' },
      { label: 'Account', href: '#' },
      { label: 'Devices', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Use', href: '#' },
      { label: 'Cookie Preferences', href: '#' },
      { label: 'Corporate Info', href: '#' },
    ],
  },
  {
    title: 'Browse',
    links: [
      { label: 'Movies', href: '/movies' },
      { label: 'TV Shows', href: '/tv-shows' },
      { label: 'My List', href: '/my-list' },
      { label: 'Search', href: '/search' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-netflix-black border-t border-zinc-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Social Links */}
        <div className="flex gap-6 mb-10">
          <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
            <Facebook className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
            <Twitter className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
            <Instagram className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="YouTube">
            <Youtube className="w-6 h-6" />
          </a>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-gray-400 font-semibold text-sm mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Service Code */}
        <div className="mb-6">
          <button className="border border-gray-600 text-gray-400 text-sm px-4 py-2 hover:border-gray-400 hover:text-gray-300 transition-colors">
            Service Code
          </button>
        </div>

        {/* Copyright */}
        <p className="text-gray-600 text-sm">
          © {new Date().getFullYear()} StreamFlix, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
