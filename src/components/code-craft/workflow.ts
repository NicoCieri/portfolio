// A simplified visual concept, rather than a literal agent execution trace.
export const workflowStages = ["My direction", "Agent teams", "Features delivered"];
export const featureCompletion = [0.68, 0.81, 0.94];

export function workflowStage(progress: number) {
  return progress < 0.15 ? 0 : progress < 0.6 ? 1 : 2;
}

export function agentRoutes(compact: boolean) {
  const paths = compact ? [
    "M235 116 C235 165 85 145 85 210", "M260 125 V210", "M285 116 C285 165 435 145 435 210",
    "M85 350 V486", "M260 350 V486", "M435 350 V486",
  ] : [
    "M175 240 C290 240 290 95 410 95", "M175 260 H410", "M175 280 C290 280 290 425 410 425",
    "M550 95 H813", "M550 260 H813", "M550 425 H813",
  ];
  return paths.map((path, index) => ({
    path,
    // Routes 0-2 carry Nicolás's direction to each agent team; routes 3-5 are the
    // amplified output each team produces, so they emit more packets.
    packets: index < 3 ? 1 : 5,
    windows: index < 3 ? [[0.06 + index * 0.025, 0.39 + index * 0.025]] : [[0.4 + (index - 3) * 0.1, featureCompletion[index - 3]]],
  }));
}
