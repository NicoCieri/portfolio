import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from "react";

type DeviceMonitorProps = Omit<ComponentPropsWithoutRef<"div">, "children"> & {
  children: ReactNode;
  screenClassName?: string;
  aspectRatio?: CSSProperties["aspectRatio"];
  showStand?: boolean;
};

// Scene placement belongs to className. Screens share a 16:10 default;
// fixed-coordinate illustrations can supply their own ratio (or "auto").
export function DeviceMonitor({ children, className = "", screenClassName = "", aspectRatio = "16 / 10", showStand = true, ...props }: DeviceMonitorProps) {
  return (
    <div {...props} data-device="monitor" className={`relative min-w-0 text-(--device-text) ${className}`}>
      <div data-device-frame className="relative z-0 rounded-[16px] border-[5px] border-(--device-frame) bg-(--device-frame) p-0.5 min-[701px]:shadow-[0_16px_40px_#24184c26] min-[701px]:rounded-[22px] min-[701px]:border-[7px] min-[701px]:p-1">
        <div data-device-screen style={{ "--monitor-aspect-ratio": aspectRatio } as CSSProperties} className={`relative flex aspect-(--monitor-aspect-ratio) min-w-0 flex-col overflow-hidden rounded-[8px] bg-(--device-screen) min-[701px]:rounded-[12px] ${screenClassName}`}>{children}</div>
        <div aria-hidden="true" className="mx-auto mt-1 size-1 rounded-full bg-(--device-stand-highlight) min-[701px]:bg-white/30" />
      </div>
      {showStand && <div aria-hidden="true">
        <div className="mx-auto h-5 w-[18%] bg-(--device-stand) min-[701px]:bg-linear-to-r from-(--device-stand) via-(--device-stand-highlight) to-(--device-stand) min-[701px]:h-8" />
        <div className="mx-auto h-1.5 w-[36%] rounded-t-[50%] rounded-b-full bg-(--device-stand) min-[701px]:h-2" />
      </div>}
    </div>
  );
}
