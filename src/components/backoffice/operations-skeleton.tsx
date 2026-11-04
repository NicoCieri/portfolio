export function OperationsSkeleton() {
  return (
    <g aria-hidden="true" className="pointer-events-none [opacity:calc(1_-_var(--scene-content-reveal,1))]">
      <rect width="1000" height="470" fill="var(--device-screen)" />
      <rect width="1000" height="52" fill="var(--device-panel)" />
      <rect x="651" y="52" width="349" height="418" fill="var(--device-canvas)" />
      <path d="M0 52H1000M0 147H1000M651 52V470" stroke="var(--device-border)" />
      <g fill="var(--device-border)" className="motion-safe:animate-pulse">
        <rect x="22" y="13" width="28" height="28" rx="9" />
        <rect x="62" y="19" width="130" height="14" rx="5" /><rect x="838" y="22" width="122" height="10" rx="4" />
        {[26, 245, 465].map((x) => <g key={x}>
          <rect x={x} y="66" width="112" height="11" rx="4" />
          <rect x={x} y="91" width="46" height="30" rx="6" />
        </g>)}
        {[{ x: 26, width: 63 }, { x: 98, width: 94 }, { x: 201, width: 109 }].map(({ x, width }) => <rect key={x} x={x} y="162" width={width} height="27" rx="13.5" />)}
        <rect x="28" y="208" width="135" height="9" rx="4" /><rect x="370" y="208" width="54" height="9" rx="4" /><rect x="560" y="208" width="61" height="9" rx="4" />
        {[246, 298, 350, 402].map((y) => <g key={y}>
          <rect x="28" y={y - 9} width="74" height="11" rx="4" />
          <rect x="28" y={y + 8} width="112" height="11" rx="4" />
          <rect x="370" y={y - 6} width="88" height="26" rx="13" />
          <rect x="563" y={y + 1} width="58" height="11" rx="4" />
          <path d={`M28 ${y + 34}H621`} stroke="var(--device-border)" />
        </g>)}
        <rect x="28" y="448" width="165" height="10" rx="4" />
        <rect x="742" y="227" width="168" height="15" rx="5" />
        <rect x="710" y="254" width="232" height="11" rx="4" />
      </g>
    </g>
  );
}
