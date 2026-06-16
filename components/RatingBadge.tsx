import { cn } from '@/lib/utils';

interface RatingBadgeProps {
  rating: string;
  className?: string;
}

export default function RatingBadge({ rating, className }: RatingBadgeProps) {
  const getColor = (r: string) => {
    switch (r) {
      case 'G': return 'bg-green-700 text-green-100';
      case 'PG': return 'bg-blue-700 text-blue-100';
      case 'PG-13': return 'bg-yellow-700 text-yellow-100';
      case 'R': return 'bg-red-700 text-red-100';
      case 'NC-17': return 'bg-red-900 text-red-100';
      case 'TV-MA': return 'bg-red-700 text-red-100';
      case 'TV-14': return 'bg-yellow-700 text-yellow-100';
      case 'TV-G': return 'bg-green-700 text-green-100';
      default: return 'bg-gray-700 text-gray-100';
    }
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-1.5 py-0.5 rounded text-xs font-bold',
        getColor(rating),
        className
      )}
    >
      {rating}
    </span>
  );
}
