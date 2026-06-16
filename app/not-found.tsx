import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-netflix-black flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-lg">
        <h1 className="text-netflix-red text-8xl font-bold mb-4">404</h1>
        <h2 className="text-white text-3xl font-semibold mb-4">Lost your way?</h2>
        <p className="text-gray-400 text-lg mb-8">
          Sorry, we can&apos;t find that page. You&apos;ll find lots to explore on the home page.
        </p>
        <Link
          href="/"
          className="inline-block bg-white text-black font-semibold px-8 py-3 rounded hover:bg-gray-200 transition-colors duration-200"
        >
          Netflix Home
        </Link>
        <p className="text-gray-500 text-sm mt-8">
          Error Code: <span className="text-gray-400">NSES-404</span>
        </p>
      </div>
    </div>
  );
}
