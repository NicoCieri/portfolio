"use client";

import { sceneScreenHeight, scrollSceneRange } from "@/lib/scroll-scene";
import { useCallback } from "react";
import { useScrollScene } from "@/hooks/use-scroll-scene";
import { agentRoutes, featureCompletion, workflowStage } from "@/components/code-craft/workflow";

export function useCraftScroll() {
  return useScrollScene("[data-craft-viewport]", useCallback(({ root, viewport }) => {
    const diagrams = Array.from(root.querySelectorAll<SVGSVGElement>("[data-agent-diagram]"));
    const connections = diagrams.map((diagram, diagramIndex) => {
      const definitions = agentRoutes(diagramIndex === 1);
      const routes = Array.from(diagram.querySelectorAll<SVGPathElement>("[data-agent-route]"));
      const lengths = routes.map((route) => route.getTotalLength());
      const packets = Array.from(diagram.querySelectorAll<SVGGElement>("[data-agent-packet]")).map((element) => {
        const index = Number(element.dataset.routeIndex);
        return { element, route: routes[index], length: lengths[index], index, packet: Number(element.dataset.packetIndex) };
      });
      return { definitions, packets, traces: Array.from(diagram.querySelectorAll<SVGPathElement>("[data-agent-trace]")) };
    });
    const clamp = (value: number) => Math.max(0, Math.min(1, value));

    function updateGraph(progress: number) {
      root.style.setProperty("--craft-progress", String(progress));
      for (let index = 0; index < 3; index++) {
        root.style.setProperty(`--craft-spin-${index}`, `${progress * (index === 1 ? -720 : 720)}deg`);
        root.style.setProperty(`--craft-robot-${index}`, String(clamp((progress - 0.08 - index * 0.025) / 0.25)));
        // Tint agent borders lime as incoming packets arrive (mid-to-late inbound window).
        root.style.setProperty(`--craft-charge-${index}`, String(clamp((progress - 0.2 - index * 0.025) / 0.18)));
        root.style.setProperty(`--craft-feature-${index}`, String(clamp((progress - featureCompletion[index] + 0.05) / 0.05)));
      }
      root.dataset.stage = String(workflowStage(progress));
      for (const { definitions, packets, traces } of connections) {
        definitions.forEach(({ windows }, index) => {
          const current = windows.find(([start, end]) => progress >= start && progress <= end);
          const completed = windows.some(([, end]) => progress > end);
          const fraction = current ? clamp((progress - current[0]) / (current[1] - current[0])) : completed ? 1 : 0;
          traces[index].style.strokeDashoffset = String(1 - fraction);
        });
        for (const { element, route, length, index, packet } of packets) {
          const window = definitions[index].windows.find(([start, end]) => progress >= start && progress <= end);
          if (!window) { element.style.opacity = "0"; continue; }
          // Keep a constant on-screen pixel gap between packets on every route, so the packets
          // leaving the agents are spaced exactly like the ones arriving from Nicolás, regardless
          // of each route's length or how many packets it carries.
          const count = definitions[index].packets;
          const gap = Math.min(46 / length, 0.9 / Math.max(1, count - 1));
          const duration = 1 / (1 + (count - 1) * gap);
          const stagger = gap * duration;
          const travel = ((progress - window[0]) / (window[1] - window[0]) - packet * stagger) / duration;
          const point = route.getPointAtLength(clamp(travel) * length);
          element.setAttribute("transform", `translate(${point.x} ${point.y})`);
          element.style.opacity = travel > 0 && travel < 1 ? "1" : "0";
        }
      }
    }

    function update(reducedMotion: boolean) {
      const screenHeight = sceneScreenHeight(viewport);
      root.dataset.motion = String(!reducedMotion);
      if (reducedMotion) {
        updateGraph(1);
        root.removeAttribute("data-stage");
        return;
      }
      updateGraph(clamp(-root.getBoundingClientRect().top / scrollSceneRange(root.offsetHeight, viewport.offsetHeight, screenHeight)));
    }

    return { update };
  }, []));
}
