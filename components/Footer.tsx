import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  const footerLinks = [
    ['Audio Description', 'Help Center', 'Gift Cards', 'Media Center'],
    ['Investor Relations', 'Jobs', 'Terms of Use', 'Privacy'],
    ['Legal Notices', 'Cookie Preferences', 'Corporate Information', 'Contact Us'],
  ];

  return (
    <footer className="bg-netflix-black text-netflix-lightgray py-16 px-4 md:px-12 border-t border-gray-800">
      <div className="max-w-5xl">
        {/* Social Links */}
        <div className="flex gap-5 mb-8">
          <a href="#" className="text-netflix-lightgray hover:text-white transition-colors">
            <FaFacebook size={24} />
          </a>
          <a href="#" className="text-netflix-lightgray hover:text-white transition-colors">
            <FaInstagram size={24} />
          </a>
          <a href="#" className="text-netflix-lightgray hover:text-white transition-colors">
            <FaTwitter size={24} />
          </a>
          <a href="#" className="text-netflix-lightgray hover:text-white transition-colors">
            <FaYoutube size={24} />
          </a>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {footerLinks.flat().map((link) => (
            <Link
              key={link}
              href="#"
              className="text-sm hover:text-white transition-colors py-1"
            >
              {link}
            </Link>
          ))}
        </div>

        {/* Service Code */}
        <button className="border border-netflix-lightgray text-netflix-lightgray text-sm px-4 py-2 mb-6 hover:border-white hover:text-white transition-colors">
          Service Code
        </button>

        {/* Copyright */}
        <p className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()} StreamFlix, Inc. All rights reserved.
        </p>
        <p className="text-xs text-gray-700 mt-2">
          StreamFlix is a demo application built with Next.js and Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
