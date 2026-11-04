import { venueSectionCorners, venueSectionPath } from "@/lib/venue-geometry";

export const editorTargetCorners = venueSectionCorners(2);
export const editorDraftCorners = editorTargetCorners.map(([x, y], index) => [
  x - 90 - (index === 1 ? 6 : 0),
  y + 80 - (index === 1 ? 29 : 0),
] as const);

export function editorSectionCorners(edit: number) {
  return editorTargetCorners.map(([x, y], index) => [
    x - (index === 1 ? 6 * (1 - edit) : 0),
    y - (index === 1 ? 29 * (1 - edit) : 0),
  ] as const);
}

// The rough straight edges acquire the venue's exact elliptical contours while
// editing. Returning the shared path at completion prevents rounded approximations.
export function editorSectionPath(edit: number) {
  if (edit >= 1) return venueSectionPath(2);
  const [a, b, c, d] = editorSectionCorners(edit).map(([x, y]) => `${x},${y}`);
  const outer = edit > 0 ? `${245 / edit} ${170 / edit}` : "0 0";
  const inner = edit > 0 ? `${180 / edit} ${110 / edit}` : "0 0";
  return `M${a}A${outer} 0 0 1 ${b}L${c}A${inner} 0 0 0 ${d}Z`;
}
