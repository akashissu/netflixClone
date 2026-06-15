import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-netflix-black flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-netflix-red text-8xl font-bold mb-4">404</h1>
      <h2 className="text-white text-3xl font-semibold mb-4">Lost your way?</h2>
      <p className="text-netflix-lightgray text-lg mb-8 max-w-md">
        Sorry, we can&apos;t find that page. You&apos;ll find lots to explore on the home page.
      </p>
      <Link
        href="/"
        className="bg-white text-black px-8 py-3 rounded font-semibold text-lg hover:bg-gray-200 transition-colors"
      >
        Netflix Home
      </Link>
    </div>
  );
}
