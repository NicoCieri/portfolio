"use client";

import { OperationsSkeleton } from "@/components/backoffice/operations-skeleton";
import { DeviceSpinner } from "@/components/devices/device-spinner";
import { useTranslations } from "@/hooks/use-translations";

const original = "group-data-[changed=true]/backoffice:opacity-0";
const changed = "opacity-0 group-data-[changed=true]/backoffice:opacity-100";
const showSaving = "opacity-0 group-data-[phase=saving]/backoffice:opacity-100 group-data-[phase=retry]/backoffice:opacity-100";
const selectedRowText = "[fill:color-mix(in_srgb,var(--device-text),var(--device-selection-text)_calc(var(--bo-selected)*100%))]";
const selectedOrderId = "[fill:color-mix(in_srgb,var(--device-accent),var(--device-selection-text)_calc(var(--bo-selected)*100%))]";

function OrderState({ x, y }: { x: number; y: number }) {
  const t = useTranslations().backoffice.illustration;
  return <g transform={`translate(${x} ${y})`}>
    <g className={original}><rect width="88" height="26" rx="13" fill="var(--device-selection)" /><text x="44" y="17" textAnchor="middle" fill="var(--device-selection-text)" fontSize="11">{t.statusValues.Pending}</text></g>
    <g className={changed}><rect width="88" height="26" rx="13" fill="var(--device-success)" /><text x="44" y="17" textAnchor="middle" fill="var(--device-success-text)" fontSize="11">{t.statusValues.Completed}</text></g>
  </g>;
}

export function OperationsIllustration() {
  const t = useTranslations().backoffice.illustration;
  return (
    <svg viewBox="0 0 1000 470" role="img" aria-labelledby="operations-title operations-description" className="block w-full overflow-visible rounded-[20px] border border-control bg-(--device-screen) shadow-[0_22px_70px_-35px_var(--accent)] min-[701px]:rounded-[28px]">
      <title id="operations-title">{t.title}</title>
      <desc id="operations-description">{t.desc}</desc>
      <defs><clipPath id="operations-screen"><rect width="1000" height="470" rx="26" /></clipPath></defs>
      <g clipPath="url(#operations-screen)" fontFamily="Arial, sans-serif" fill="var(--device-text)">
        <g className="opacity-[var(--scene-content-reveal,1)]">
        <rect width="1000" height="470" fill="var(--device-screen)" />
        <rect width="1000" height="52" fill="var(--device-panel)" />
        <rect x="22" y="13" width="28" height="28" rx="9" fill="var(--device-accent)" />
        <text x="36" y="32" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--device-marker-text)">bo.</text>
        <text x="62" y="31" fontSize="14" fontWeight="700">{t.desk}</text>
        <text x="960" y="31" textAnchor="end" fontSize="11" fill="var(--device-muted)">{t.liveOverview}</text>
        <path d="M0 52H1000 M0 147H1000" stroke="var(--device-border)" />
        {[
          { x: 26, label: t.totalOrders, before: "06", after: "06" },
          { x: 245, label: t.needsAttention, before: "03", after: "02" },
          { x: 465, label: t.completed, before: "02", after: "03" },
        ].map(({ x, label, before, after }) => <g key={label} transform={`translate(${x} 75)`}>
          <text fontSize="11" fill="var(--device-muted)">{label}</text>
          <text y="42" fontSize="33" fontWeight="700" className={original}>{before}</text>
          <text y="42" fontSize="33" fontWeight="700" className={changed}>{after}</text>
        </g>)}
        <g transform="translate(26 162)">
          <rect width="63" height="27" rx="13.5" fill="var(--device-accent)" /><text x="31" y="18" textAnchor="middle" fontSize="11" fill="var(--device-marker-text)">{t.all} · 6</text>
          <rect x="72" width="94" height="27" rx="13.5" fill="var(--device-panel)" stroke="var(--device-border)" />
          <text x="119" y="18" textAnchor="middle" fontSize="11" className={original}>{t.pending} · 2</text><text x="119" y="18" textAnchor="middle" fontSize="11" className={changed}>{t.pending} · 1</text>
          <rect x="175" width="109" height="27" rx="13.5" fill="var(--device-panel)" stroke="var(--device-border)" />
          <text x="229" y="18" textAnchor="middle" fontSize="11" className={original}>{t.completed} · 2</text><text x="229" y="18" textAnchor="middle" fontSize="11" className={changed}>{t.completed} · 3</text>
        </g>
        <text x="28" y="215" fontSize="9" fill="var(--device-muted)">{t.orderCustomer}</text><text x="370" y="215" fontSize="9" fill="var(--device-muted)">{t.status}</text><text x="621" y="215" textAnchor="end" fontSize="9" fill="var(--device-muted)">{t.totalUsd}</text>
        <rect x="14" y="228" width="622" height="53" rx="9" fill="var(--device-selection)" className="opacity-(--bo-selected)" />
        {[
          { id: "1048", name: "Olivia Martin", status: "Pending", amount: "$148.00" },
          { id: "1047", name: "Santiago Torres", status: "Processing", amount: "$225.00" },
          { id: "1046", name: "Emma Wilson", status: "Completed", amount: "$74.00" },
          { id: "1045", name: "Mateo García", status: "Pending", amount: "$320.00" },
        ].map(({ id, name, status, amount }, index) => <g key={id} transform={`translate(28 ${246 + index * 52})`} className={index === 0 ? selectedRowText : undefined}>
          <text fontSize="11" fontWeight="700" fill="var(--device-accent)" className={index === 0 ? selectedOrderId : undefined}>ORD-{id}</text><text y="17" fontSize="11">{name}</text>
          {index === 0 ? <OrderState x={342} y={-6} /> : <><rect x="342" y="-6" width="88" height="26" rx="13" fill={status === "Completed" ? "var(--device-success)" : "var(--device-panel)"} stroke="var(--device-border)" /><text x="386" y="11" textAnchor="middle" fontSize="11" fill={status === "Completed" ? "var(--device-success-text)" : "var(--device-text)"}>{t.statusValues[status as keyof typeof t.statusValues]}</text></>}
          <text x="593" y="10" textAnchor="end" fontFamily="monospace" fontSize="11">{amount}</text>
          <path d="M0 34H593" stroke="var(--device-border)" />
        </g>)}
        <text x="28" y="456" fontSize="10" fill="var(--device-muted)">{t.showingOrders}</text>
        <g><rect x="651" y="52" width="349" height="418" fill="var(--device-canvas)" /><text x="826" y="239" textAnchor="middle" fontSize="15" fontWeight="700">{t.detailsTitle}</text><text x="826" y="263" textAnchor="middle" fontSize="11" fill="var(--device-muted)">{t.detailsHint}</text></g>
        <g className="[transform:translateX(calc((1_-_var(--bo-panel))*350px))] motion-reduce:transform-none">
          <rect x="651" y="52" width="349" height="418" fill="var(--device-panel)" /><path d="M651 52V470" stroke="var(--device-border)" />
          <text x="675" y="83" fontSize="12" fontWeight="700">{t.orderDetails}</text><text x="974" y="83" textAnchor="end" fontSize="15" fill="var(--device-muted)">×</text>
          <text x="675" y="119" fontSize="23" fontWeight="700">ORD-1048</text><OrderState x={675} y={133} />
          <text x="675" y="187" fontSize="10" fill="var(--device-muted)">{t.customer}</text><text x="675" y="206" fontSize="13" fontWeight="700">Olivia Martin</text><text x="675" y="223" fontSize="11" fill="var(--device-muted)">olivia@example.com</text>
          <text x="675" y="251" fontSize="10" fill="var(--device-muted)">{t.midnightSessions}</text><text x="675" y="271" fontSize="12">{t.twoTickets}</text><text x="973" y="271" textAnchor="end" fontSize="13" fontWeight="700">$148.00</text>
          <rect x="675" y="292" width="298" height="37" rx="9" fill="var(--device-screen)" stroke="var(--device-border)" />
          <text x="688" y="315" fontSize="12" className="group-data-[phase=saving]/backoffice:opacity-0 group-data-[phase=error]/backoffice:opacity-0 group-data-[phase=retry]/backoffice:opacity-0 group-data-[phase=saved]/backoffice:opacity-0">{t.statusPending}</text>
          <text x="688" y="315" fontSize="12" className="opacity-0 group-data-[phase=saving]/backoffice:opacity-100 group-data-[phase=error]/backoffice:opacity-100 group-data-[phase=retry]/backoffice:opacity-100 group-data-[phase=saved]/backoffice:opacity-100">{t.statusCompleted}</text><text x="955" y="315" fontSize="12">⌄</text>
          <rect x="675" y="343" width="298" height="40" rx="10" fill="var(--device-accent)" />
          <DeviceSpinner x={696} y={354} className="hidden group-data-[phase=saving]/backoffice:block group-data-[phase=retry]/backoffice:block" />
          <g fill="var(--device-marker-text)" fontSize="12" fontWeight="700" textAnchor="middle">
            <text x="824" y="368" className="group-data-[phase=saving]/backoffice:opacity-0 group-data-[phase=error]/backoffice:opacity-0 group-data-[phase=retry]/backoffice:opacity-0 group-data-[phase=saved]/backoffice:opacity-0">{t.saveStatus}</text>
            <text x="824" y="368" className={showSaving}>{t.savingChanges}</text><text x="824" y="368" className="opacity-0 group-data-[phase=error]/backoffice:opacity-100">{t.retryUpdate}</text><text x="824" y="368" className="opacity-0 group-data-[phase=saved]/backoffice:opacity-100">{t.changesSaved}</text>
          </g>
          <text x="675" y="409" fontSize="11" fill="var(--device-muted)" className="group-data-[phase=error]/backoffice:opacity-0 group-data-[phase=saved]/backoffice:opacity-0">{t.inSync}</text>
          <g className="opacity-0 group-data-[phase=error]/backoffice:opacity-100"><rect x="675" y="394" width="298" height="54" rx="9" fill="var(--device-selection)" /><text x="688" y="415" fontSize="11" fill="var(--device-selection-text)">{t.connectionFailed}</text><text x="688" y="433" fontSize="11" fill="var(--device-selection-text)">{t.choiceKept}</text></g>
          <text x="675" y="409" fontSize="11" fill="var(--device-muted)" className="opacity-0 group-data-[phase=saved]/backoffice:opacity-100">{t.confirmed}</text>
        </g>
        <g className="pointer-events-none opacity-(--bo-cursor-opacity) [transform:translate(var(--bo-cursor-x),var(--bo-cursor-y))] motion-reduce:hidden">
          <circle r="20" fill="var(--device-accent)" className="[opacity:calc(var(--bo-press)*0.25)] [transform:scale(calc(1_+_var(--bo-press)*0.5))]" />
          <path d="M0 0L5 22L10 15L18 15Z" fill="var(--device-text)" stroke="var(--device-screen)" strokeWidth="2" />
        </g>
        </g>
        <OperationsSkeleton />
      </g>
    </svg>
  );
}
