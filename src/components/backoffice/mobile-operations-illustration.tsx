"use client";

import { useTranslations } from "@/hooks/use-translations";

export function MobileOperationsIllustration() {
  const t = useTranslations().backoffice.illustration;
  return (
    <div data-bo-mobile-screen role="img" aria-label={`${t.title}. ${t.desc}`} className="relative mx-auto h-[368px] w-[336px] overflow-hidden rounded-2xl border border-control bg-(--device-screen) text-(--device-text) min-[701px]:hidden">
      <div className="flex h-11 items-center gap-2 border-b border-(--device-border) px-4 text-[13px] font-semibold"><span className="rounded-md bg-(--device-accent) px-1.5 py-1 text-(--device-marker-text)">bo.</span>{t.desk}</div>
      <div className="grid grid-cols-3 gap-3 border-b border-(--device-border) p-4">
        {[[t.totalOrders, "06", "06"], [t.needsAttention, "03", "02"], [t.completed, "02", "03"]].map(([label, before, after]) => <div key={label}><p className="text-[9px] text-(--device-muted)">{label}</p><p className="mt-1 text-[26px] font-semibold"><span className="group-data-[changed=true]/backoffice:hidden">{before}</span><span className="hidden group-data-[changed=true]/backoffice:inline">{after}</span></p></div>)}
      </div>
      <div className="px-4 pt-3 text-[10px] text-(--device-muted)">{t.orderCustomer}</div>
      <div className="mt-2 divide-y divide-(--device-border) px-3">
        {[["1048", "Olivia Martin", "$148.00"], ["1047", "Santiago Torres", "$225.00"], ["1046", "Emma Wilson", "$74.00"]].map(([id, name, amount], index) => <div key={id} data-bo-mobile-order={index === 0 ? "" : undefined} className={`flex items-center justify-between rounded-lg px-2 py-3 ${index === 0 ? "group-data-[changed=true]/backoffice:bg-(--device-selection) group-data-[changed=true]/backoffice:text-(--device-selection-text)" : ""}`}><div><p className="text-[12px] font-semibold">ORD-{id}</p><p className="mt-1 text-[11px] text-(--device-muted)">{name}</p></div><p className="font-mono text-[11px]">{amount}</p></div>)}
      </div>
      <div className="absolute inset-x-0 top-11 bottom-0 border-t border-(--device-border) bg-(--device-panel) p-4 [transform:translateX(calc((1_-_var(--bo-panel,0))*100%))]">
        <div className="flex items-center justify-between"><p className="text-[11px] text-(--device-muted)">{t.orderDetails}</p><span className="text-[14px]">×</span></div>
        <div className="mt-3 flex items-center justify-between"><p className="text-[23px] font-semibold">ORD-1048</p><span className="rounded-full bg-(--device-selection) px-2 py-1 text-[10px] text-(--device-selection-text)"><span className="group-data-[changed=true]/backoffice:hidden">{t.statusValues.Pending}</span><span className="hidden group-data-[changed=true]/backoffice:inline">{t.statusValues.Completed}</span></span></div>
        <p className="mt-4 text-[10px] text-(--device-muted)">{t.customer}</p><p className="mt-1 text-[13px] font-semibold">Olivia Martin</p>
        <div className="mt-4 flex justify-between border-y border-(--device-border) py-3 text-[12px]"><span>{t.twoTickets}</span><span className="font-semibold">$148.00</span></div>
        <div data-bo-mobile-save className="mt-4 rounded-lg bg-(--device-accent) py-2.5 text-center text-[12px] font-semibold text-(--device-marker-text)">
          <span className="group-data-[phase=saving]/backoffice:hidden group-data-[phase=retry]/backoffice:hidden group-data-[phase=error]/backoffice:hidden group-data-[phase=saved]/backoffice:hidden">{t.saveStatus}</span>
          <span className="hidden group-data-[phase=saving]/backoffice:inline group-data-[phase=retry]/backoffice:inline">{t.savingChanges}</span><span className="hidden group-data-[phase=error]/backoffice:inline">{t.retryUpdate}</span><span className="hidden group-data-[phase=saved]/backoffice:inline">{t.changesSaved}</span>
        </div>
        <p className="mt-3 text-[10px] text-(--device-muted) group-data-[phase=error]/backoffice:hidden group-data-[phase=saved]/backoffice:hidden">{t.inSync}</p><p className="mt-3 hidden text-[10px] text-(--device-accent) group-data-[phase=error]/backoffice:block">{t.connectionFailed} {t.choiceKept}</p><p className="mt-3 hidden text-[10px] text-(--device-accent) group-data-[phase=saved]/backoffice:block">{t.confirmed}</p>
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute top-0 left-0 z-20 opacity-(--bo-cursor-opacity,0) [transform:translate(var(--bo-touch-x,240px),var(--bo-touch-y,300px))] motion-reduce:hidden">
        <div className="size-8 -translate-1/2 rounded-full border-2 border-(--device-accent) bg-(--device-screen)/70 [transform:scale(calc(1_-_var(--bo-press,0)*0.25))]">
          <div className="absolute inset-2 rounded-full bg-(--device-accent)/50" />
          <div className="absolute -inset-2 rounded-full border border-(--device-accent)/40 opacity-(--bo-press,0) [transform:scale(calc(0.8_+_var(--bo-press,0)*0.4))]" />
        </div>
      </div>
    </div>
  );
}
