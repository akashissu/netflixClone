import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-netflix-black border-t border-gray-800 py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-5xl mx-auto">
        <p className="text-netflix-gray mb-6">
          Questions? Call{' '}
          <a href="tel:1-800-585-7265" className="underline hover:text-white">
            1-800-585-7265
          </a>
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            ['FAQ', 'Help Center', 'Account', 'Media Center'],
            ['Investor Relations', 'Jobs', 'Ways to Watch', 'Terms of Use'],
            ['Privacy', 'Cookie Preferences', 'Corporate Information', 'Contact Us'],
            ['Speed Test', 'Legal Notices', 'Only on Netflix', 'Ad Choices'],
          ].map((column, i) => (
            <ul key={i} className="space-y-3">
              {column.map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-netflix-gray text-sm hover:text-white transition-colors underline"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>

        <div className="flex items-center gap-4 mb-4">
          <select className="bg-netflix-dark border border-gray-600 text-white text-sm px-3 py-2 rounded">
            <option>English</option>
            <option>Español</option>
          </select>
        </div>

        <p className="text-netflix-gray text-sm">Netflix Clone &copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
