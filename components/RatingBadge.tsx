import { cn } from '@/lib/utils';

interface RatingBadgeProps {
  score: number;
  className?: string;
}

export function RatingBadge({ score, className }: RatingBadgeProps) {
  const color =
    score >= 80
      ? 'text-green-400'
      : score >= 60
      ? 'text-yellow-400'
      : 'text-red-400';

  return (
    <span className={cn('font-bold text-sm', color, className)}>
      {score}% Match
    </span>
  );
}

export default RatingBadge;
