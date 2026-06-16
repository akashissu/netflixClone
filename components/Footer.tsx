import Link from 'next/link';

const FOOTER_LINKS = [
  [
    { label: 'Audio Description', href: '#' },
    { label: 'Help Center', href: '#' },
    { label: 'Gift Cards', href: '#' },
    { label: 'Media Center', href: '#' },
  ],
  [
    { label: 'Investor Relations', href: '#' },
    { label: 'Jobs', href: '#' },
    { label: 'Terms of Use', href: '#' },
    { label: 'Privacy', href: '#' },
  ],
  [
    { label: 'Legal Notices', href: '#' },
    { label: 'Cookie Preferences', href: '#' },
    { label: 'Corporate Information', href: '#' },
    { label: 'Contact Us', href: '#' },
  ],
  [
    { label: 'Account', href: '#' },
    { label: 'Ways to Watch', href: '#' },
    { label: 'Speed Test', href: '#' },
    { label: 'Only on StreamFlix', href: '#' },
  ],
];

export default function Footer() {
  return (
    <footer className="bg-netflix-black border-t border-gray-800 px-4 md:px-8 lg:px-16 py-12">
      <div className="max-w-5xl">
        <p className="text-gray-500 mb-6">
          Questions? Call{' '}
          <a href="tel:1-800-555-0199" className="underline hover:text-gray-300">
            1-800-555-0199
          </a>
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {FOOTER_LINKS.map((column, colIdx) => (
            <ul key={colIdx} className="space-y-3">
              {column.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-500 text-xs hover:text-gray-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>

        <div className="flex items-center gap-4 mb-6">
          <select className="bg-transparent border border-gray-600 text-gray-400 text-sm px-3 py-2 rounded">
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
          </select>
        </div>

        <p className="text-gray-600 text-xs">
          StreamFlix © {new Date().getFullYear()} StreamFlix, Inc.
        </p>
      </div>
    </footer>
  );
}
