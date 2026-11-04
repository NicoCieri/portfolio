export function ArgentinaFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 24" aria-hidden="true" className={className}>
      <rect width="36" height="24" rx="2" fill="#74ACDF" />
      <rect y="8" width="36" height="8" fill="#fff" />
      <g transform="translate(18 12)" fill="#F6B40E" stroke="#853A0F" strokeWidth="0.3">
        <circle r="2.2" />
        <path
          strokeLinecap="round"
          d="M0-4.5v1.5M0 3v1.5M4.5 0h-1.5M-3 0h-1.5M3.18-3.18l-1.06 1.06M-2.12 2.12l-1.06 1.06M3.18 3.18l-1.06-1.06M-2.12-2.12l-1.06-1.06"
        />
      </g>
    </svg>
  );
}
