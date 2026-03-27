import { Eye } from 'lucide-react';

interface HeatCountProps {
  value: string;
  className?: string;
  iconClassName?: string;
}

export function HeatCount({
  value,
  className = 'text-[12px] text-muted-foreground',
  iconClassName = 'h-3.5 w-3.5',
}: HeatCountProps) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <Eye className={iconClassName} />
      {value}
    </span>
  );
}
