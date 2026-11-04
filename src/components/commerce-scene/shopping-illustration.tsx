"use client";

import { CatalogSkeleton } from "@/components/commerce-scene/catalog-skeleton";
import { DeviceSpinner } from "@/components/devices/device-spinner";
import { DeviceMonitor } from "@/components/devices/device-monitor";
import { DevicePhone } from "@/components/devices/device-phone";
import type { CSSProperties } from "react";
import { ProductArt } from "@/components/commerce-scene/product-art";
import { useTranslations } from "@/hooks/use-translations";

function firstWord(value: string) {
  const index = value.indexOf(" ");
  return index === -1 ? [value, ""] : [value.slice(0, index), value.slice(index + 1)];
}

function Art({ x, y, size, ink = false }: { x: number; y: number; size: number; ink?: boolean }) {
  return <svg x={x} y={y} width={size} height={size * 0.8125} viewBox="0 0 320 260"><ProductArt productId="headphones" variant={ink ? "Ink" : "Lilac"} className="size-full" /></svg>;
}

function ShoppingScreen({ touch = false }: { touch?: boolean }) {
  const tc = useTranslations().commerce;
  const t = tc.illustration;
  const names = [tc.products.headphones.name, tc.products.bag.name, tc.products.lamp.name];
  const width = touch ? 240 : 820;
  const height = touch ? 500 : 460;
  const productX = touch ? 20 : 30;
  const productWidth = touch ? 200 : 470;
  const bagX = touch ? 12 : 528;
  const bagWidth = touch ? 216 : 272;
  const pointer = touch ? "[transform:translate(var(--commerce-touch-x),var(--commerce-touch-y))]" : "[transform:translate(var(--commerce-mouse-x),var(--commerce-mouse-y))]";
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="block size-full bg-(--device-screen) fill-(--device-text) font-sans">
      <g className="opacity-[var(--scene-content-reveal,1)]">
      <rect width={width} height={height} fill="var(--device-screen)" />
      <text x="20" y={touch ? 42 : 31} fontSize={touch ? 17 : 20} fontWeight="750" letterSpacing="-1">good<tspan fill="var(--device-accent)">things✳</tspan></text>
      <text x={width - 20} y={touch ? 42 : 31} textAnchor="end" fontSize="11">{t.bag} <tspan className="[opacity:calc(1-var(--commerce-cart))]">0</tspan><tspan className="opacity-(--commerce-cart)">1</tspan></text>
      <path d={`M0 ${touch ? 59 : 48}H${width}`} stroke="var(--device-border)" />

      {/* The catalog is replaced by product detail after the first click/tap. */}
      <g className="[opacity:calc(1-var(--commerce-detail))]">
        <text x="20" y={touch ? 86 : 86} fontSize={touch ? 16 : 27} fontWeight="700">{t.tagline}</text>
        <text x="20" y="110" fontSize="11" fill="var(--device-muted)">{t.subtitle}</text>
        {[0, 1, 2].map((index) => {
          const x = touch ? 20 : 25 + index * 260;
          const y = touch ? 130 + index * 108 : 140;
          return <g key={index}>
            <rect x={x} y={y} width={touch ? 200 : 245} height={touch ? 98 : 239} rx="14" fill="var(--device-canvas)" stroke={index === 0 ? "var(--device-accent)" : "var(--device-border)"} strokeWidth={index === 0 ? 2 : 1} />
            <svg x={x + (touch ? 4 : 25)} y={y + 6} width={touch ? 90 : 195} height={touch ? 73 : 158} viewBox="0 0 320 260"><ProductArt productId={index === 0 ? "headphones" : index === 1 ? "bag" : "lamp"} variant={index === 1 ? "Pink" : index === 2 ? "Lime" : "Lilac"} className="size-full" /></svg>
            <text x={x + (touch ? 100 : 16)} y={y + (touch ? 34 : 192)} fontSize={touch ? 10 : 15} fontWeight="650">
              {touch ? <><tspan x={x + 100}>{firstWord(names[index])[0]}</tspan><tspan x={x + 100} dy="14">{firstWord(names[index])[1]}</tspan></> : names[index]}
            </text>
            <text x={x + (touch ? 100 : 16)} y={y + (touch ? 76 : 217)} fontSize="12" fill="var(--device-muted)">{index === 0 ? "$89.00" : index === 1 ? "$34.00" : "$65.00"}</text>
          </g>;
        })}
      </g>

      <g className="opacity-(--commerce-detail) [transform:translateY(calc((1-var(--commerce-detail))*20px))]">
        <rect x="0" y={touch ? 60 : 49} width={width} height={height - 49} fill="var(--device-screen)" />
        <text x={productX} y="81" fontSize="10" fill="var(--device-muted)">{t.collection}</text>
        <rect x={productX} y="96" width={productWidth} height={touch ? 192 : 191} rx="14" fill="var(--device-canvas)" />
        <circle cx={touch ? 120 : 265} cy="192" r="78" fill="var(--pop-paper)" />
        <g className="[opacity:calc(1-var(--commerce-variant))]"><Art x={touch ? 16 : 150} y={99} size={touch ? 208 : 230} /></g>
        <g className="opacity-(--commerce-variant)"><Art x={touch ? 16 : 150} y={99} size={touch ? 208 : 230} ink /></g>
        <text x={productX} y="314" fontSize={touch ? 17 : 23} fontWeight="700">{names[0]}</text>
        <text x={touch ? 20 : 500} y={touch ? 338 : 314} fontSize="14" textAnchor={touch ? "start" : "end"}>$89.00</text>
        <g transform={`translate(${productX},${touch ? 354 : 335})`}>
          <text x="0" y="18" fontSize="11" fill="var(--device-muted)">{t.color}</text>
          <rect x="40" width="66" height="30" rx="15" fill="var(--device-panel)" stroke="var(--device-border)" />
          <text x="73" y="19" textAnchor="middle" fontSize="11">● {tc.colors.Lilac}</text>
          <rect x="114" width="65" height="30" rx="15" fill="var(--device-panel)" stroke="var(--device-border)" />
          <rect x="114" width="65" height="30" rx="15" fill="var(--device-selection)" className="opacity-(--commerce-variant)" />
          <text x="146" y="19" textAnchor="middle" fontSize="11" className="[opacity:calc(1-var(--commerce-variant))]">● {tc.colors.Ink}</text>
          <text x="146" y="19" textAnchor="middle" fontSize="11" fill="var(--device-selection-text)" className="opacity-(--commerce-variant)">● {tc.colors.Ink}</text>
        </g>
        <rect x={productX} y={touch ? 402 : 386} width={productWidth} height="41" rx="20" fill="var(--device-accent)" />
        <DeviceSpinner x={productX + 16} y={touch ? 414 : 398} className="hidden group-data-[phase=adding]/commerce:block" />
        <text x={touch ? 120 : 265} y={touch ? 427 : 411} textAnchor="middle" fontSize="12" fontWeight="650" fill="var(--device-marker-text)">
          <tspan className="group-data-[phase=adding]/commerce:hidden group-data-[phase=bag]/commerce:hidden group-data-[phase=loading]/commerce:hidden group-data-[phase=checkout]/commerce:hidden group-data-[phase=confirming]/commerce:hidden group-data-[phase=complete]/commerce:hidden">{t.addToBag}</tspan>
          <tspan className="hidden group-data-[phase=adding]/commerce:inline">{t.adding}</tspan>
          <tspan className="hidden group-data-[phase=bag]/commerce:inline group-data-[phase=loading]/commerce:inline group-data-[phase=checkout]/commerce:inline group-data-[phase=confirming]/commerce:inline group-data-[phase=complete]/commerce:inline">{t.added}</tspan>
        </text>
      </g>

      <g className={touch ? "opacity-(--commerce-drawer) [transform:translateX(calc((1-var(--commerce-drawer))*245px))]" : "opacity-(--commerce-detail)"}>
        <rect x={bagX} y={touch ? 60 : 65} width={bagWidth} height={touch ? 420 : 377} rx="14" fill="var(--device-panel)" stroke="var(--device-border)" />
        <text x={bagX + 16} y="98" fontSize="19" fontWeight="700">{t.yourBag}</text>
        <g className="[opacity:calc(1-var(--commerce-cart))]"><text x={bagX + bagWidth / 2} y="216" textAnchor="middle" fontSize="26" fill="var(--device-accent)">+</text><text x={bagX + bagWidth / 2} y="245" textAnchor="middle" fontSize="12">{t.goodThingsHere}</text></g>
        <g className="opacity-(--commerce-cart) [transform:translateY(calc((1-var(--commerce-cart))*14px))]">
          <rect x={bagX + 12} y="122" width="64" height="62" rx="10" fill="var(--pop-paper)" />
          <Art x={bagX + 9} y={125} size={70} ink />
          <text x={bagX + 87} y="139" fontSize={touch ? 9 : 12} fontWeight="650">{names[0]}</text>
          <text x={bagX + 87} y="158" fontSize="11" fill="var(--device-muted)">{t.inkQty}</text>
          <text x={bagX + 87} y="179" fontSize="12">$89.00</text>
          <rect x={bagX + 12} y="204" width={bagWidth - 24} height="32" rx="9" fill="var(--device-success)" />
          <text x={bagX + 23} y="225" fontSize="11" fill="var(--device-success-text)">{t.bagUpToDate}</text>
        </g>
        <path d={`M${bagX + 16} 303h${bagWidth - 32}`} stroke="var(--device-border)" />
        <text x={bagX + 16} y="326" fontSize="11" fill="var(--device-muted)">{t.shipping}</text><text x={bagX + bagWidth - 16} y="326" textAnchor="end" fontSize="11">{t.free}</text>
        <text x={bagX + 16} y="354" fontSize="16" fontWeight="650">{t.total}</text><text x={bagX + bagWidth - 16} y="354" textAnchor="end" fontSize="16" fontWeight="650" className="opacity-(--commerce-cart)">$89.00</text>
        <rect x={bagX + 12} y={touch ? 400 : 384} width={bagWidth - 24} height="42" rx="21" fill="var(--device-accent)" />
        <DeviceSpinner x={bagX + 24} y={touch ? 412 : 396} className="hidden group-data-[phase=loading]/commerce:block" />
        <text x={bagX + bagWidth / 2} y={touch ? 426 : 410} textAnchor="middle" fontSize="12" fill="var(--device-marker-text)" fontWeight="650"><tspan className="group-data-[phase=loading]/commerce:hidden">{t.beginCheckout}</tspan><tspan className="hidden group-data-[phase=loading]/commerce:inline">{t.preparing}</tspan></text>
      </g>

      <g className="opacity-(--commerce-flying) [transform:translate(calc(var(--commerce-flight)*var(--commerce-flight-x)),calc(var(--commerce-flight)*-20px))_scale(calc(1-var(--commerce-flight)*.65))] [transform-origin:120px_190px]" style={{ "--commerce-flight-x": touch ? "55px" : "430px" } as CSSProperties}><Art x={touch ? 16 : 150} y={99} size={touch ? 208 : 230} ink /></g>

      <g className="opacity-(--commerce-checkout) [transform:translateY(calc((1-var(--commerce-checkout))*460px))]">
        <rect y={touch ? 60 : 49} width={width} height={height - 49} fill="var(--device-screen)" />
        <text x="22" y="92" fontSize="10" fill="var(--device-accent)">{t.guestReview}</text>
        <text x="22" y="122" fontSize={touch ? 23 : 30} fontWeight="700">{t.oneClearStep}</text>
        <text x="22" y="147" fontSize="11" fill="var(--device-muted)">{t.choicesForward}</text>
        <rect x="20" y="168" width={touch ? 200 : 390} height={touch ? 90 : 153} rx="13" fill="var(--device-canvas)" />
        <rect x={touch ? 25 : 35} y={touch ? 177 : 179} width={touch ? 85 : 160} height={touch ? 73 : 130} rx="10" fill="var(--pop-paper)" />
        <Art x={touch ? 22 : 35} y={touch ? 177 : 179} size={touch ? 90 : 160} ink />
        <text x={touch ? 114 : 203} y={touch ? 197 : 217} fontSize={touch ? 9 : 16} fontWeight="650">{names[0]}</text>
        <text x={touch ? 114 : 203} y={touch ? 218 : 242} fontSize="11" fill="var(--device-muted)">{t.inkQty}</text>
        <text x={touch ? 114 : 203} y={touch ? 240 : 274} fontSize="14">$89.00</text>
        <g transform={touch ? "translate(20 281)" : "translate(442 173)"}>
          <text y="0" fontSize="13" fontWeight="650">{t.orderSummary}</text>
          <text y="29" fontSize="11" fill="var(--device-muted)">{t.guestCustomer}</text>
          <text y="57" fontSize="12">{t.shipping}<tspan x={touch ? 196 : 337} textAnchor="end">{t.free}</tspan></text>
          <path d={`M0 74H${touch ? 200 : 338}`} stroke="var(--device-border)" />
          <text y="101" fontSize="17" fontWeight="700">{t.totalUsd}<tspan x={touch ? 200 : 338} textAnchor="end">$89.00</tspan></text>
        </g>
        <rect x={touch ? 20 : 442} y={touch ? 403 : 346} width={touch ? 200 : 338} height="42" rx="21" fill="var(--device-accent)" />
        <DeviceSpinner x={touch ? 35 : 460} y={touch ? 415 : 358} className="hidden group-data-[phase=confirming]/commerce:block" />
        <text x={touch ? 120 : 611} y={touch ? 429 : 372} textAnchor="middle" fontSize="12" fill="var(--device-marker-text)" fontWeight="650"><tspan className="group-data-[phase=confirming]/commerce:hidden">{t.placeOrder}</tspan><tspan className="hidden group-data-[phase=confirming]/commerce:inline">{t.confirming}</tspan></text>
        <text x={touch ? 120 : 611} y={touch ? 466 : 410} textAnchor="middle" fontSize="10" fill="var(--device-muted)">{t.demoOnly}</text>
      </g>

      <g className="opacity-(--commerce-complete) [transform:translateY(calc((1-var(--commerce-complete))*460px))]">
        <rect y={touch ? 60 : 49} width={width} height={height - 49} fill="var(--device-screen)" />
        <circle cx={width / 2} cy="167" r="30" fill="var(--device-success)" /><path d={`m${width / 2 - 13} 167 9 10 18-22`} stroke="var(--device-success-text)" strokeWidth="4" fill="none" />
        <text x={width / 2} y="231" textAnchor="middle" fontSize={touch ? 23 : 32} fontWeight="700">{t.goodChoice}</text>
        <text x={width / 2} y="264" textAnchor="middle" fontSize={touch ? 17 : 24} fontWeight="650">{t.orderConfirmed}</text>
        <text x={width / 2} y="305" textAnchor="middle" fontSize="12" fill="var(--device-muted)">{t.confirmedProduct}</text>
        <text x={width / 2} y="329" textAnchor="middle" fontSize="14" fontWeight="650">{t.confirmedTotal}</text>
        <text x={width / 2} y="387" textAnchor="middle" fontSize="10" fill="var(--device-muted)">{t.illustrationOnly}</text>
      </g>

      <g className={`pointer-events-none opacity-(--commerce-pointer) ${pointer}`}>
        {touch ? <g><circle r="16" fill="var(--pop-paper)" fillOpacity=".85" stroke="var(--pop-ink)" strokeWidth="2" /><circle r="7" fill="var(--pop-ink)" className="[transform:scale(calc(1-var(--commerce-press)*.4))]" /><circle r="25" stroke="var(--device-accent)" fill="none" className="opacity-(--commerce-press) [transform:scale(calc(.7+var(--commerce-press)*.3))]" /></g> : <g className="[transform:scale(calc(1-var(--commerce-press)*.15))]"><circle r="20" fill="var(--device-accent)" fillOpacity=".16" className="opacity-(--commerce-press)" /><path d="m0 0 23 21-11 1-5 12Z" fill="var(--pop-paper)" stroke="var(--pop-ink)" strokeWidth="2" /></g>}
      </g>
      </g>
      <CatalogSkeleton touch={touch} />
    </svg>
  );
}

export function ShoppingIllustration() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[1080px] max-[700px]:py-6 min-[701px]:aspect-[1.85]">
      <div className="hidden min-[701px]:block absolute top-0 left-0 w-[78%] [transform:translateY(calc((1-var(--commerce-entrance))*16px))] min-[701px]:w-[84%]">
        <DeviceMonitor aspectRatio="820 / 460"><ShoppingScreen /></DeviceMonitor>
      </div>
      <div className="relative mx-auto w-[224px] min-[701px]:absolute min-[701px]:right-0 min-[701px]:bottom-0 [transform:translateY(calc((1-var(--commerce-entrance))*-16px))_rotate(calc((1-var(--commerce-entrance))*4deg))] min-[701px]:w-[24%]">
        <DevicePhone aspectRatio="240 / 520"><ShoppingScreen touch /></DevicePhone>
      </div>
    </div>
  );
}
