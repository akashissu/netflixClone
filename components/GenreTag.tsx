import { cn } from '@/lib/utils';

interface GenreTagProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function GenreTag({ label, active = false, onClick }: GenreTagProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border',
        active
          ? 'bg-white text-black border-white'
          : 'bg-transparent text-gray-300 border-gray-600 hover:border-white hover:text-white'
      )}
    >
      {label}
    </button>
  );
}

export default GenreTag;
