"use client";

import { useBuenosAiresClock } from "@/hooks/use-buenos-aires-clock";

export function BuenosAiresClock({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  const { time, colonOn } = useBuenosAiresClock();
  const display = time ?? { hour: "00", minute: "00", dayPeriod: "", dateTime: undefined };
  const ready = time !== null;

  return (
    <p className={className}>
      <span className="inline-flex items-center gap-2.5">
        <span
          aria-hidden="true"
          className="relative size-1.5 shrink-0 rounded-full bg-accent"
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-accent/70 motion-reduce:hidden" />
        </span>
        <span>{label}</span>
        <time
          className={`inline-flex items-center font-semibold leading-none text-foreground tabular-nums ${ready ? "" : "invisible"}`}
          dateTime={display.dateTime}
          aria-label={ready ? `${label} ${display.hour}:${display.minute} ${display.dayPeriod}` : label}
        >
          <span>{display.hour}</span>
          <span
            aria-hidden="true"
            className={`inline-block w-[0.35em] text-center motion-reduce:!opacity-100 ${colonOn ? "opacity-100" : "opacity-0"}`}
          >
            :
          </span>
          <span>{display.minute}</span>
          <span className="ml-1 whitespace-nowrap">{display.dayPeriod}</span>
        </time>
      </span>
    </p>
  );
}
