import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from "react";

type DevicePhoneProps = Omit<ComponentPropsWithoutRef<"div">, "children"> & {
  children: ReactNode;
  screenClassName?: string;
  aspectRatio?: CSSProperties["aspectRatio"];
  screenBackground?: CSSProperties["backgroundColor"];
  transparent?: boolean;
  showCamera?: boolean;
  showHomeIndicator?: boolean;
};

export function DevicePhone({ children, className = "", screenClassName = "", aspectRatio = "1 / 2.05", screenBackground = "var(--device-screen)", transparent = false, showCamera = true, showHomeIndicator = true, style, ...props }: DevicePhoneProps) {
  const phoneStyle = { aspectRatio, "--phone-screen-background": transparent ? "transparent" : screenBackground, ...style } as CSSProperties;
  return (
    <div {...props} data-device="phone" style={phoneStyle} className={`relative min-w-0 overflow-hidden rounded-[25px] border-[5px] border-(--device-frame) p-0.5 text-(--device-text) shadow-[0_14px_32px_#24184c26] min-[701px]:rounded-[34px] min-[701px]:border-[6px] min-[701px]:p-1 ${transparent ? "bg-transparent" : "bg-(--device-frame)"} ${className}`}>
      <div data-device-screen className={`relative flex h-full min-h-0 flex-col overflow-hidden rounded-[18px] bg-(--phone-screen-background) min-[701px]:rounded-[24px] ${screenClassName}`}>{children}</div>
      {showCamera && <div aria-hidden="true" className="pointer-events-none absolute top-[2%] left-1/2 z-30 h-[1.5%] min-h-1 w-[28%] -translate-x-1/2 rounded-full bg-(--device-frame)" />}
      {showHomeIndicator && <div aria-hidden="true" className="pointer-events-none absolute bottom-[2%] left-1/2 z-30 h-0.5 w-[28%] -translate-x-1/2 rounded-full bg-(--device-text)/30" />}
    </div>
  );
}
