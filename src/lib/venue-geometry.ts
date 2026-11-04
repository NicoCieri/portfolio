// Shared fictional venue geometry, in a 760 × 460 SVG coordinate system.
// Coordinates are fixed to two decimals so server and client emit the same path.
function point(angle: number, rx: number, ry: number): readonly [number, number] {
  const radians = angle * Math.PI / 180;
  const x = Number((380 + Math.cos(radians) * rx).toFixed(2));
  const y = Number((230 + Math.sin(radians) * ry).toFixed(2));
  return [x, y];
}

export function venueSectionCorners(index: number) {
  const start = -180 + index * 22.5 + 1.5;
  const end = start + 19.5;
  return [point(start, 245, 170), point(end, 245, 170), point(end, 180, 110), point(start, 180, 110)] as const;
}

export function venueSectionPath(index: number) {
  const [a, b, c, d] = venueSectionCorners(index).map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`);
  return `M${a}A245 170 0 0 1 ${b}L${c}A180 110 0 0 0 ${d}Z`;
}
