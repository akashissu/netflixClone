export function LoadingSkeleton() {
  return (
    <div className="bg-netflix-black min-h-screen">
      {/* Hero skeleton */}
      <div className="relative w-full h-[85vh] skeleton" />

      {/* Category rows skeleton */}
      <div className="relative z-10 -mt-32 pb-16 space-y-8 px-4 md:px-8">
        {Array.from({ length: 4 }).map((_, rowIdx) => (
          <div key={rowIdx}>
            {/* Row title */}
            <div className="skeleton h-6 w-48 rounded mb-3" />
            {/* Cards */}
            <div className="flex gap-2 overflow-hidden">
              {Array.from({ length: 8 }).map((_, cardIdx) => (
                <div
                  key={cardIdx}
                  className="flex-shrink-0 w-36 md:w-44 lg:w-52 aspect-video skeleton rounded-md"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="aspect-video skeleton rounded-md" />
  );
}

export function DetailSkeleton() {
  return (
    <div className="bg-netflix-dark-gray rounded-lg overflow-hidden max-w-3xl w-full mx-4">
      <div className="aspect-video skeleton" />
      <div className="p-6 space-y-4">
        <div className="skeleton h-8 w-64 rounded" />
        <div className="flex gap-3">
          <div className="skeleton h-10 w-24 rounded" />
          <div className="skeleton h-10 w-10 rounded-full" />
          <div className="skeleton h-10 w-10 rounded-full" />
        </div>
        <div className="space-y-2">
          <div className="skeleton h-4 w-full rounded" />
          <div className="skeleton h-4 w-5/6 rounded" />
          <div className="skeleton h-4 w-4/6 rounded" />
        </div>
      </div>
    </div>
  );
}
