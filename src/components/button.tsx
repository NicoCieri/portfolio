import type { ComponentPropsWithRef } from "react";

const variants = {
  primary: "rounded-full border border-(--pop-ink)/20 bg-accent-lime font-semibold text-(--on-accent-lime) min-[701px]:shadow-lg not-disabled:hover:bg-(--accent-lime-hover) not-disabled:active:bg-(--accent-lime-pressed)",
  secondary: "rounded-full border border-transparent bg-foreground font-semibold text-surface not-disabled:hover:bg-accent",
  outline: "rounded-full border border-control font-semibold text-foreground not-disabled:hover:border-accent not-disabled:hover:bg-background min-[701px]:not-disabled:hover:bg-background/40 not-disabled:hover:text-accent",
  ghost: "rounded-full text-secondary not-disabled:hover:bg-surface min-[701px]:not-disabled:hover:bg-surface/70 not-disabled:hover:text-foreground",
  link: "rounded text-secondary underline underline-offset-4 not-disabled:hover:text-foreground",
  custom: "",
} as const;

const sizes = {
  sm: "min-h-11 gap-2 px-3 py-2 text-small",
  md: "min-h-12 gap-2.5 px-4 py-2.5 text-ui",
  lg: "min-h-[52px] gap-3 px-6 py-3 text-ui",
  icon: "size-11 shrink-0",
  custom: "",
} as const;

const effects = {
  lift: "min-[701px]:data-[state=visible]:not-disabled:hover:shadow-[0_12px_28px_-8px_var(--pop-ink)] motion-safe:min-[701px]:data-[state=visible]:not-disabled:hover:-translate-y-1 motion-safe:min-[701px]:data-[state=visible]:not-disabled:hover:scale-[1.03] motion-safe:min-[701px]:data-[state=visible]:focus-visible:-translate-y-1",
  none: "",
} as const;

// Custom styling supports the illustrative demos and animated selectors.
type SharedProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  effect?: keyof typeof effects;
  fullWidth?: boolean;
  "data-state"?: "visible" | "hidden";
};

type ButtonProps = SharedProps & (
  | ({ href: string } & Omit<ComponentPropsWithRef<"a">, "href">)
  | ({ href?: never } & ComponentPropsWithRef<"button">)
);

export function Button({ variant = "primary", size = "md", effect = variant === "primary" ? "lift" : "none", fullWidth = false, className = "", "data-state": state = "visible", ...props }: ButtonProps) {
  const classes = [
    "group/action cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--focus-ring) disabled:cursor-not-allowed disabled:opacity-50",
    "max-[700px]:transition-none transition-[opacity,translate,scale,visibility,box-shadow,background-color,color] duration-300 ease-out motion-reduce:transition-none",
    "data-[state=hidden]:pointer-events-none data-[state=hidden]:invisible motion-safe:data-[state=hidden]:translate-y-4 motion-safe:data-[state=hidden]:scale-95 data-[state=hidden]:opacity-0",
    variant === "custom" ? "" : "inline-flex items-center justify-center",
    variants[variant], sizes[size], effects[effect], fullWidth ? "w-full" : "", className,
  ].join(" ");

  if (props.href !== undefined) {
    return <a {...props} data-state={state} className={classes} />;
  }
  return <button type="button" {...props} data-state={state} className={classes} />;
}
