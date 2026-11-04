const paths = {
  plane: "M22 2 9 9 2 8 1 10l7 4 4 7 2-1-1-7Z M8 14l-4 4m0-4v4h4",
  check: "m5 12 4 4L19 6",
  close: "m7 7 10 10M7 17 17 7",
  arrow: "M5 12h14m-5-5 5 5-5 5",
  diagonal: "M6 18 18 6M6 6h12v12",
  seat: "M5 5h14v14H5Z",
} as const;

export function AirportIcon({ name, className = "" }: { name: keyof typeof paths; className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`inline-block size-[1em] shrink-0 align-[-0.125em] ${className}`}>
      <path d={paths[name]} />
    </svg>
  );
}
