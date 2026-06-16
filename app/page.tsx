import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-netflix-black">
      {/* Hero Section */}
      <div
        className="relative min-h-screen flex flex-col"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%), url(https://picsum.photos/seed/netflix-hero/1920/1080)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Top nav */}
        <nav className="flex items-center justify-between px-8 md:px-16 py-6">
          <span className="text-netflix-red font-bold text-3xl md:text-4xl tracking-tight">
            NETFLIX
          </span>
          <div className="flex items-center gap-4">
            <select className="bg-transparent border border-white text-white text-sm px-3 py-1 rounded cursor-pointer">
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
            </select>
            <Link
              href="/browse"
              className="bg-netflix-red hover:bg-netflix-red-hover text-white font-semibold px-5 py-2 rounded text-sm transition-colors"
            >
              Sign In
            </Link>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 max-w-3xl leading-tight">
            Unlimited movies, TV shows, and more
          </h1>
          <p className="text-xl md:text-2xl text-white mb-3">
            Watch anywhere. Cancel anytime.
          </p>
          <p className="text-lg text-white mb-8">
            Ready to watch? Enter your email to create or restart your membership.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xl">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 px-5 py-4 rounded text-black text-base outline-none border-2 border-gray-400 focus:border-netflix-red"
            />
            <Link
              href="/browse"
              className="bg-netflix-red hover:bg-netflix-red-hover text-white font-bold px-8 py-4 rounded text-lg transition-colors whitespace-nowrap flex items-center gap-2"
            >
              Get Started
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t-8 border-gray-800" />

      {/* Feature 1 */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-24 py-16 gap-8">
        <div className="max-w-lg">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Enjoy on your TV
          </h2>
          <p className="text-xl text-gray-300">
            Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.
          </p>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-72 h-48 bg-netflix-dark-gray rounded-xl flex items-center justify-center border border-gray-700">
            <svg className="w-24 h-24 text-netflix-red" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z" />
            </svg>
          </div>
        </div>
      </section>

      <div className="border-t-8 border-gray-800" />

      {/* Feature 2 */}
      <section className="flex flex-col md:flex-row-reverse items-center justify-between px-8 md:px-24 py-16 gap-8">
        <div className="max-w-lg">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Download your shows to watch offline
          </h2>
          <p className="text-xl text-gray-300">
            Save your favourites easily and always have something to watch.
          </p>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-72 h-48 bg-netflix-dark-gray rounded-xl flex items-center justify-center border border-gray-700">
            <svg className="w-24 h-24 text-netflix-red" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
            </svg>
          </div>
        </div>
      </section>

      <div className="border-t-8 border-gray-800" />

      {/* Feature 3 */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-24 py-16 gap-8">
        <div className="max-w-lg">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Watch everywhere
          </h2>
          <p className="text-xl text-gray-300">
            Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV without paying more.
          </p>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-72 h-48 bg-netflix-dark-gray rounded-xl flex items-center justify-center border border-gray-700">
            <svg className="w-24 h-24 text-netflix-red" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />
            </svg>
          </div>
        </div>
      </section>

      <div className="border-t-8 border-gray-800" />

      {/* FAQ */}
      <section className="px-8 md:px-24 py-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-2">
          {[
            {
              q: 'What is Netflix Clone?',
              a: 'Netflix Clone is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.'
            },
            {
              q: 'How much does Netflix Clone cost?',
              a: 'Watch Netflix Clone on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹149 to ₹649 a month.'
            },
            {
              q: 'Where can I watch?',
              a: 'Watch anywhere, anytime. Sign in with your Netflix Clone account to watch instantly on the web at netflixclone.com from your personal computer or on any internet-connected device.'
            },
            {
              q: 'How do I cancel?',
              a: 'Netflix Clone is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks.'
            }
          ].map((item, i) => (
            <details
              key={i}
              className="bg-netflix-mid-gray group cursor-pointer"
            >
              <summary className="flex items-center justify-between px-6 py-5 text-xl font-medium text-white list-none">
                {item.q}
                <span className="text-3xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="px-6 py-5 text-lg text-gray-200 border-t border-gray-600">
                {item.a}
              </p>
            </details>
          ))}
        </div>
        <div className="text-center mt-10">
          <p className="text-lg text-white mb-4">Ready to watch? Enter your email to create or restart your membership.</p>
          <Link
            href="/browse"
            className="inline-block bg-netflix-red hover:bg-netflix-red-hover text-white font-bold px-10 py-4 rounded text-xl transition-colors"
          >
            Get Started
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
