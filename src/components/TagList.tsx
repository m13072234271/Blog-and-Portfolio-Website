interface Props {
  tags: string[];
}

export default function TagList({ tags }: Props) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <span
          key={tag}
          className="text-xs px-2.5 py-0.5 rounded-full bg-white/15 text-white/70"
        >
          #{tag}
        </span>
      ))}
    </div>
  );
}
