"use client";

import { sceneReflowClass } from "@/components/scene-classes";

import type { ReactNode } from "react";
import { useStadiumEditorScroll } from "@/hooks/use-stadium-editor-scroll";

export function EditorScrollScene({ children }: { children: ReactNode }) {
  const scene = useStadiumEditorScroll();
  return (
    <section ref={scene} id="stadium-editor" aria-labelledby="editor-heading" aria-describedby="editor-description" data-step="create"
      className={`${sceneReflowClass} [view-timeline-name:--section-atmosphere] [view-timeline-axis:block] group/editor relative h-[440svh] min-h-[calc(1800px+100svh)] max-[700px]:h-[455svh] max-[700px]:min-h-[calc(2340px+100svh)] text-foreground [--editor-created:0] [--editor-saved:0] [--editor-cursor-opacity:0] motion-reduce:h-auto max-[700px]:motion-reduce:h-auto motion-reduce:min-h-0 max-[700px]:motion-reduce:min-h-0 motion-reduce:[--editor-created:1] motion-reduce:[--editor-saved:1]`}>
      {children}
    </section>
  );
}
