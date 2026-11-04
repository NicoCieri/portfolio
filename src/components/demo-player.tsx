"use client";

import type { ReactNode } from "react";
import { useDemoPlayback } from "@/hooks/use-demo-playback";

/** Keeps mobile playback local to the demo; desktop retains its scroll timeline. */
export function DemoPlayer({ children }: { children: ReactNode }) {
  const stage = useDemoPlayback();
  return <div ref={stage} className="contents max-[700px]:relative max-[700px]:block">{children}</div>;
}
