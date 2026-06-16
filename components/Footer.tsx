import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-netflix-black border-t border-netflix-dark py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <p className="text-netflix-gray text-sm mb-6">
          Questions? Call{' '}
          <a href="tel:1-800-585-7265" className="underline hover:text-white transition-colors">
            1-800-585-7265
          </a>
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="space-y-3">
            <Link href="/faq" className="block text-netflix-gray text-xs hover:underline">
              FAQ
            </Link>
            <Link href="/investor-relations" className="block text-netflix-gray text-xs hover:underline">
              Investor Relations
            </Link>
            <Link href="/privacy" className="block text-netflix-gray text-xs hover:underline">
              Privacy
            </Link>
            <Link href="/speed-test" className="block text-netflix-gray text-xs hover:underline">
              Speed Test
            </Link>
          </div>
          <div className="space-y-3">
            <Link href="/help" className="block text-netflix-gray text-xs hover:underline">
              Help Center
            </Link>
            <Link href="/jobs" className="block text-netflix-gray text-xs hover:underline">
              Jobs
            </Link>
            <Link href="/cookie-preferences" className="block text-netflix-gray text-xs hover:underline">
              Cookie Preferences
            </Link>
            <Link href="/legal-notices" className="block text-netflix-gray text-xs hover:underline">
              Legal Notices
            </Link>
          </div>
          <div className="space-y-3">
            <Link href="/account" className="block text-netflix-gray text-xs hover:underline">
              Account
            </Link>
            <Link href="/ways-to-watch" className="block text-netflix-gray text-xs hover:underline">
              Ways to Watch
            </Link>
            <Link href="/corporate-info" className="block text-netflix-gray text-xs hover:underline">
              Corporate Information
            </Link>
            <Link href="/only-on-netflix" className="block text-netflix-gray text-xs hover:underline">
              Only on Netflix
            </Link>
          </div>
          <div className="space-y-3">
            <Link href="/media-center" className="block text-netflix-gray text-xs hover:underline">
              Media Center
            </Link>
            <Link href="/terms" className="block text-netflix-gray text-xs hover:underline">
              Terms of Use
            </Link>
            <Link href="/contact" className="block text-netflix-gray text-xs hover:underline">
              Contact Us
            </Link>
          </div>
        </div>

        <p className="text-netflix-gray text-xs">
          &copy; {currentYear} Netflix Clone. All rights reserved. This is a fan-made project for
          educational purposes only.
        </p>
      </div>
    </footer>
  );
}
