interface GenreBadgeProps {
  name: string;
}

export default function GenreBadge({ name }: GenreBadgeProps) {
  return (
    <span className="inline-block bg-gray-700 text-white text-xs px-2 py-1 rounded font-medium">
      {name}
    </span>
  );
}
