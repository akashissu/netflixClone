export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[2/3] bg-netflix-dark rounded overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900" />
      </div>
      <div className="mt-2 h-3 bg-gray-800 rounded w-3/4" />
    </div>
  );
}
