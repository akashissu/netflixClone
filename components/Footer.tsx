import Link from 'next/link';

const FOOTER_LINKS = [
  ['FAQ', '/faq'],
  ['Help Centre', '/help'],
  ['Account', '/account'],
  ['Media Centre', '/media'],
  ['Investor Relations', '/investors'],
  ['Jobs', '/jobs'],
  ['Ways to Watch', '/ways-to-watch'],
  ['Terms of Use', '/terms'],
  ['Privacy', '/privacy'],
  ['Cookie Preferences', '/cookies'],
  ['Corporate Information', '/corporate'],
  ['Contact Us', '/contact']
];

export function Footer() {
  return (
    <footer className="bg-netflix-black border-t border-gray-800 px-8 md:px-16 py-12 mt-8">
      <div className="max-w-5xl">
        <p className="text-gray-500 mb-6">
          Questions? Call{' '}
          <a href="tel:000-800-919-1694" className="underline hover:text-gray-300 transition-colors">
            000-800-919-1694
          </a>
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
          {FOOTER_LINKS.map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4 mb-6">
          <select className="bg-transparent border border-gray-600 text-gray-500 text-sm px-3 py-2 rounded cursor-pointer hover:border-gray-400 transition-colors">
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
          </select>
        </div>

        <p className="text-gray-600 text-sm">
          Netflix Clone © {new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
