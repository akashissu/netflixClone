import { cn } from '@/lib/utils';

interface RatingBadgeProps {
  rating: string;
  className?: string;
}

export default function RatingBadge({ rating, className }: RatingBadgeProps) {
  const getColor = (r: string) => {
    const num = parseFloat(r);
    if (num >= 8) return 'bg-green-600';
    if (num >= 6.5) return 'bg-yellow-600';
    return 'bg-red-700';
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-xs font-bold text-white',
        getColor(rating),
        className
      )}
    >
      ★ {rating}
    </span>
  );
}
