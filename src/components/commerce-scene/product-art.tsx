import type { Product } from "@/components/commerce-scene/catalog";

export function ProductArt({ productId, variant, className = "" }: { productId: Product["id"]; variant: string; className?: string }) {
  const color = variant === "Ink" ? "var(--pop-ink)" : variant === "Pink" ? "var(--pop-pink)" : variant === "Lime" ? "var(--pop-lime)" : "#b9a4ef";
  return (
    <svg viewBox="0 0 320 260" aria-hidden="true" className={className} fill="none">
      <ellipse cx="160" cy="225" rx="98" ry="13" fill="var(--pop-ink)" opacity=".1" />
      <g stroke="var(--pop-ink)" strokeWidth="5" strokeLinejoin="round">
        {productId === "headphones" ? <>
          <path d="M76 146V112a84 84 0 0 1 168 0v34" strokeWidth="22" stroke={color} />
          <path d="M68 141v-29a92 92 0 0 1 184 0v29" />
          <rect x="62" y="124" width="52" height="89" rx="23" fill={color} transform="rotate(-12 88 168)" />
          <rect x="206" y="124" width="52" height="89" rx="23" fill={color} transform="rotate(12 232 168)" />
          <path d="m101 140 10 49m108-49-10 49" stroke="var(--pop-paper)" strokeWidth="7" />
        </> : productId === "bag" ? <>
          <path d="M119 99V75a41 41 0 0 1 82 0v24" strokeWidth="12" />
          <path d="m85 90-14 125q89 27 178 0L235 90Z" fill={color} />
          <path d="M132 91v22m56-22v22" stroke="var(--pop-paper)" strokeWidth="8" />
          <path d="m160 135 7 21 23-1-18 14 7 22-19-13-19 13 7-22-18-14 23 1Z" fill="var(--pop-paper)" strokeWidth="2" />
        </> : <>
          <path d="M160 124v82" strokeWidth="13" />
          <path d="M107 221a53 18 0 0 1 106 0Z" fill={color} />
          <path d="M72 128a88 88 0 0 1 176 0Z" fill={color} />
          <path d="M137 130a23 23 0 0 0 46 0" fill="var(--pop-paper)" />
          <path d="M220 133v28" strokeWidth="3" /><circle cx="220" cy="166" r="5" fill="var(--pop-ink)" />
        </>}
      </g>
    </svg>
  );
}
