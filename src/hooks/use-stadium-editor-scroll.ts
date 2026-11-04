"use client";

import { sceneScreenHeight, scrollSceneRange } from "@/lib/scroll-scene";
import { useCallback } from "react";
import { useScrollScene } from "@/hooks/use-scroll-scene";
import { editorDraftCorners, editorSectionCorners, editorSectionPath } from "@/components/stadium-editor-scene/editor-geometry";
import { useTranslations } from "@/hooks/use-translations";

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const ease = (value: number) => {
  const progress = clamp(value);
  return progress * progress * (3 - 2 * progress);
};

// Canvas controls stay in screen coordinates; geometry follows the camera.
const cursorStops = [
  [0, 120, 32], [0.06, 89, 32], [0.09, 89, 32],
  [0.13, ...editorDraftCorners[0]], [0.15, ...editorDraftCorners[0]],
  [0.21, ...editorDraftCorners[1]], [0.23, ...editorDraftCorners[1]],
  [0.29, ...editorDraftCorners[2]], [0.31, ...editorDraftCorners[2]],
  [0.37, ...editorDraftCorners[3]], [0.39, ...editorDraftCorners[3]],
  [0.43, ...editorDraftCorners[0]], [0.45, ...editorDraftCorners[0]],
  [0.47, ...editorDraftCorners[1]], [0.54, editorDraftCorners[1][0] + 6, editorDraftCorners[1][1] + 29],
  [0.58, 180, 195], [0.66, 270, 115],
  [0.69, 440, 310], [0.7, 440, 310], [0.77, 495, 338],
  [0.8, 690, 410], [0.87, 690, 410],
  [0.9, 666, 32], [0.94, 666, 32], [1, 666, 32],
] as const;

export function useStadiumEditorScroll() {
  const t = useTranslations().stadiumEditor;

  return useScrollScene("[data-editor-viewport]", useCallback(({ root, viewport }) => {
    const announcement = root.querySelector<HTMLElement>("[data-editor-announcement]");
    const zoomLabel = root.querySelector<SVGTextElement>("[data-editor-zoom-label]");
    const polygon = root.querySelector<SVGPathElement>("[data-editor-polygon]");
    const vertex = root.querySelector<SVGCircleElement>("[data-editor-active-vertex]");

    let lastAction = "";

    function update(reducedMotion: boolean) {
      const screenHeight = sceneScreenHeight(viewport);
      const lead = screenHeight * 0.35;
      const distance = scrollSceneRange(root.offsetHeight, viewport.offsetHeight, screenHeight, lead);
      const progress = reducedMotion ? 1 : clamp((lead - root.getBoundingClientRect().top) / distance);
      const edit = ease((progress - 0.47) / 0.07);
      const move = ease((progress - 0.58) / 0.08);
      const pan = ease((progress - 0.7) / 0.07);
      const zoom = ease((progress - 0.82) / 0.04);
      if (zoomLabel) zoomLabel.textContent = `${Math.round(100 + zoom * 28)}%`;
      const created = progress >= 0.43 ? 1 : 0;
      const saved = progress >= 0.94 ? 1 : 0;
      const nextStop = cursorStops.findIndex(([time]) => time >= progress);
      const end = cursorStops[Math.max(1, nextStop)];
      const start = cursorStops[Math.max(0, nextStop - 1)];
      const travel = ease((progress - start[0]) / (end[0] - start[0]));
      const x = start[1] + (end[1] - start[1]) * travel;
      const y = start[2] + (end[2] - start[2]) * travel;
      const pressed = [[0.06, 0.09], [0.13, 0.15], [0.21, 0.23], [0.29, 0.31], [0.37, 0.39], [0.43, 0.45], [0.47, 0.54], [0.58, 0.66], [0.7, 0.77], [0.82, 0.86], [0.91, 0.94]]
        .some(([from, to]) => progress >= from && progress < to);
      const properties = {
        "--editor-move": move,
        "--editor-guides": created && progress < 0.69 ? 1 : 0, "--editor-pan": pan, "--editor-zoom": zoom,
        "--editor-created": created, "--editor-saved": saved,
        "--editor-drawing": progress >= 0.13 && !created ? 1 : 0,
        "--editor-selection": created && !saved ? 1 : 0,
        "--editor-edge-1": ease((progress - 0.15) / 0.06),
        "--editor-edge-2": ease((progress - 0.23) / 0.06),
        "--editor-edge-3": ease((progress - 0.31) / 0.06),
        "--editor-edge-4": ease((progress - 0.39) / 0.04),
        "--editor-node-1": progress >= 0.13 ? 1 : 0,
        "--editor-node-2": progress >= 0.21 ? 1 : 0,
        "--editor-node-3": progress >= 0.29 ? 1 : 0,
        "--editor-node-4": progress >= 0.37 ? 1 : 0,
        "--editor-cursor-opacity": reducedMotion ? 0 : ease(progress / 0.04) * (1 - ease((progress - 0.96) / 0.04)),
        "--editor-pressed": pressed ? 1 : 0,
      };
      for (const [name, value] of Object.entries(properties)) root.style.setProperty(name, value.toFixed(4));
      root.style.setProperty("--editor-cursor-x", `${x.toFixed(2)}px`);
      root.style.setProperty("--editor-cursor-y", `${y.toFixed(2)}px`);
      polygon?.setAttribute("d", editorSectionPath(edit));
      // Use the path's exact corner in the same local space as the other handles.
      // Updating SVG coordinates avoids a separate CSS transform for this vertex.
      const [vertexX, vertexY] = editorSectionCorners(edit)[1];
      vertex?.setAttribute("cx", String(vertexX - 90));
      vertex?.setAttribute("cy", String(vertexY + 80));
      const action = progress < 0.45 ? "create" : progress < 0.56 ? "edit" : progress < 0.69 ? "move" : progress < 0.8 ? "pan" : progress < 0.88 ? "zoom" : saved ? "saved" : "save";
      if (action !== lastAction) {
        lastAction = action;
        root.dataset.step = action === "create" ? "create" : (action === "edit" || action === "move") ? "edit" : "explore";
        root.dataset.action = action;
        if (announcement) announcement.textContent = reducedMotion ? t.announcements.saved : t.announcements[action];
      }
    }

    return { update };
  }, [t]));
}
