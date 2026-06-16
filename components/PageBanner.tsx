interface PageBannerProps {
  title: string;
  description?: string;
}

export function PageBanner({ title, description }: PageBannerProps) {
  return (
    <div className="pt-24 pb-8 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-black/60 to-netflix-black">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">{title}</h1>
      {description && (
        <p className="text-netflix-lightgray text-lg max-w-2xl">{description}</p>
      )}
    </div>
  );
}
