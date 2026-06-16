import Link from 'next/link';

const footerLinks = [
  [
    { label: 'Audio Description', href: '#' },
    { label: 'Help Centre', href: '#' },
    { label: 'Gift Cards', href: '#' },
    { label: 'Media Centre', href: '#' },
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
    { label: 'Accessibility', href: '#' },
    { label: 'Speed Test', href: '#' },
    { label: 'Only on Netflix', href: '#' },
  ],
];

export function Footer() {
  return (
    <footer className="bg-netflix-black border-t border-gray-800 px-4 md:px-8 py-12">
      <div className="max-w-5xl mx-auto">
        <p className="text-gray-400 mb-6">
          Questions? Call{' '}
          <a href="tel:1-800-585-8131" className="hover:underline">
            1-800-585-8131
          </a>
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {footerLinks.map((column, colIdx) => (
            <ul key={colIdx} className="space-y-3">
              {column.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-gray-200 hover:underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="border border-gray-600 text-gray-400 text-sm px-3 py-1.5 rounded cursor-pointer hover:border-gray-400 transition-colors inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            English
          </div>
          <p className="text-gray-500 text-sm">Netflix Clone © {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
