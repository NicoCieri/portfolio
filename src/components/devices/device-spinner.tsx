export function DeviceSpinner({ x, y, className }: { x: number; y: number; className: string }) {
  return (
    <svg x={x} y={y} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="9" stroke="var(--device-marker-text)" strokeOpacity=".25" strokeWidth="3" />
      <circle cx="12" cy="12" r="9" stroke="var(--device-marker-text)" strokeWidth="3" strokeLinecap="round" strokeDasharray="42 57" className="origin-center motion-safe:animate-spin [transform-box:fill-box]" />
    </svg>
  );
}
