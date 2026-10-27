// Static Tailwind utility groups shared by the original portfolio illustrations.
export const sceneClasses = `
  relative isolate
  bg-[radial-gradient(ellipse_at_35%_80%,#7cf7d414,transparent_55%),radial-gradient(ellipse_at_88%_30%,#72a8ff1a,transparent_60%)]
  before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:content-['']
  before:bg-[radial-gradient(#72a8ff38_0.6px,transparent_0.8px)] before:bg-size-[18px_18px]
  before:[mask-image:radial-gradient(ellipse_at_center,#000,transparent_75%)]
  forced-colors:before:hidden
`;

const panelSurfaceClasses = `
  border border-transparent
  [background:linear-gradient(145deg,var(--surface-elevated),var(--background-alt)_75%)_padding-box,linear-gradient(125deg,#7cf7d475,#72a8ff30_45%,#9b8cff65)_border-box]
  forced-colors:border-[CanvasText] forced-colors:shadow-none
`;

export const panelClasses = `${panelSurfaceClasses}
  shadow-[0_18px_44px_#00000045,inset_0_1px_0_#f5f7fb08]
`;

export const dataPanelClasses = `${panelSurfaceClasses}
  shadow-[0_20px_50px_#00000055,-8px_-6px_36px_#7cf7d40a]
`;
