interface SerialStatusBadgeProps {
  status: string;
  className?: string;
}

export function SerialStatusBadge({
  status,
  className = '',
}: SerialStatusBadgeProps) {
  const normalizedStatus = status === '连载' ? '连载中' : status;
  const isFinished = normalizedStatus === '完本';

  return (
    <span
      className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] text-white backdrop-blur-sm ${className}`.trim()}
      style={{
        color: isFinished ? '#a7b4ff' : '#4ae08c',
        borderColor: isFinished ? 'rgba(91,107,255,0.38)' : 'rgba(25,180,91,0.42)',
        backgroundColor: isFinished ? 'rgba(29,33,78,0.58)' : 'rgba(5,41,24,0.58)',
      }}
    >
      {normalizedStatus}
    </span>
  );
}
