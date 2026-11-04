export function CatalogSkeleton({ touch }: { touch: boolean }) {
  const width = touch ? 240 : 820;
  return (
    <g aria-hidden="true" className="pointer-events-none [opacity:calc(1_-_var(--scene-content-reveal,1))]">
      <rect width={width} height={touch ? 500 : 460} fill="var(--device-screen)" />
      <path d={`M0 ${touch ? 59 : 48}H${width}`} stroke="var(--device-border)" />
      <g fill="var(--device-border)" className="motion-safe:min-[701px]:animate-pulse">
        <rect x="20" y={touch ? 28 : 15} width={touch ? 100 : 128} height={touch ? 17 : 20} rx="5" />
        <rect x={width - 60} y={touch ? 34 : 23} width="40" height="11" rx="4" />
        <rect x="20" y={touch ? 73 : 64} width={touch ? 172 : 390} height={touch ? 16 : 27} rx="5" />
        <rect x="20" y="101" width={touch ? 190 : 300} height="11" rx="4" />
      </g>
      {[0, 1, 2].map((index) => {
        const x = touch ? 20 : 25 + index * 260;
        const y = touch ? 130 + index * 108 : 140;
        return <g key={index}>
          <rect x={x} y={y} width={touch ? 200 : 245} height={touch ? 98 : 239} rx="14" fill="var(--device-canvas)" stroke="var(--device-border)" />
          <g fill="var(--device-border)" className="motion-safe:min-[701px]:animate-pulse">
            <rect x={x + (touch ? 4 : 25)} y={y + 6} width={touch ? 90 : 195} height={touch ? 73 : 158} rx="10" />
            <rect x={x + (touch ? 100 : 16)} y={y + (touch ? 25 : 180)} width={touch ? 86 : 170} height={touch ? 10 : 15} rx="4" />
            {touch && <rect x={x + 100} y={y + 39} width="65" height="10" rx="4" />}
            <rect x={x + (touch ? 100 : 16)} y={y + (touch ? 66 : 207)} width="48" height="12" rx="4" />
          </g>
        </g>;
      })}
    </g>
  );
}
