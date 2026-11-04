"use client";

import { editorDraftCorners, editorSectionPath } from "@/components/stadium-editor-scene/editor-geometry";
import { venueSectionPath as sectionPath } from "@/lib/venue-geometry";
import { useTranslations } from "@/hooks/use-translations";

export function StadiumMap() {
  const t = useTranslations().stadiumEditor.ui;
  return (
    <svg viewBox="0 0 760 460" className="block h-full w-full" fill="none" aria-hidden="true">
      <defs>
        <pattern id="editor-map-dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="var(--device-text)" opacity=".12" /></pattern>
      </defs>
      <rect width="760" height="460" fill="var(--device-canvas)" />
      <rect width="760" height="460" fill="url(#editor-map-dots)" />
      <g className="origin-[380px_230px] [transform:translate(calc(var(--editor-pan,0)*55px),calc(var(--editor-pan,0)*28px))_scale(calc(1_+_var(--editor-zoom,0)*0.28))]">
        <ellipse cx="380" cy="230" rx="264" ry="189" stroke="var(--device-text)" strokeOpacity=".1" strokeDasharray="4 7" />
        <ellipse cx="380" cy="230" rx="169" ry="99" fill="var(--device-screen)" />
        {Array.from({ length: 16 }, (_, index) => index !== 2 && (
          <path key={index} d={sectionPath(index)} fill={index < 5 ? "#a7aafa" : index < 10 ? "#c2b1eb" : "#ecc3d9"} stroke="var(--device-screen)" strokeWidth="2" />
        ))}
        <rect x="275" y="168" width="210" height="124" rx="9" fill="var(--device-pitch)" stroke="var(--device-pitch-line)" strokeWidth="2" />
        <g stroke="var(--device-pitch-line)" strokeWidth="1.5">
          <path d="M380 168V292M275 195H308V265H275M485 195H452V265H485" />
          <circle cx="380" cy="230" r="24" /><circle cx="380" cy="230" r="2" fill="var(--device-pitch-line)" />
        </g>
        <g className="hidden min-[701px]:block" fill="var(--device-muted)" fontSize="12" fontFamily="var(--font-geist-mono)">
          <text x="380" y="29" textAnchor="middle">{t.north}</text>
          <text x="380" y="441" textAnchor="middle">{t.south}</text>
        </g>

        <g className="opacity-[var(--editor-drawing,0)]" stroke="var(--device-accent)" strokeWidth="2.5" strokeLinecap="round">
          {editorDraftCorners.map(([x1, y1], index) => {
            const [x2, y2] = editorDraftCorners[(index + 1) % editorDraftCorners.length];
            return (
            <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} pathLength="1" strokeDasharray="1" style={{ strokeDashoffset: `calc(1 - var(--editor-edge-${index + 1},0))` }} />
            );
          })}
          {editorDraftCorners.map(([x, y], index) => (
            <circle key={index} cx={x} cy={y} r="4" fill="var(--device-screen)" style={{ opacity: `var(--editor-node-${index + 1},0)` }} />
          ))}
        </g>
        <g className="opacity-[var(--editor-guides,0)]" stroke="var(--device-accent)" strokeDasharray="4 5">
          <path d={sectionPath(2)} fill="var(--device-accent)" fillOpacity=".08" strokeWidth="1.5" />
          <path d="M185 107H335M211 55V166" strokeOpacity=".45" />
        </g>
        <g className="opacity-[var(--editor-created,0)] [transform:translate(calc(var(--editor-move,0)*90px),calc(var(--editor-move,0)*-80px))]">
          <path id="editor-section-shape" data-editor-polygon d={editorSectionPath(0)} transform="translate(-90 80)" fill="#ff75bf" stroke="currentColor" strokeWidth="2" className="text-(--device-accent) group-data-[action=saved]/editor:text-(--device-screen)" />
          <g className="opacity-[var(--editor-selection,0)]" fill="var(--device-screen)" stroke="var(--device-accent)" strokeWidth="2">
            {editorDraftCorners.filter((_, index) => index !== 1).map(([x, y]) => <circle key={x} cx={x} cy={y} r="4" />)}
            <circle data-editor-active-vertex cx={editorDraftCorners[1][0]} cy={editorDraftCorners[1][1]} r="4" />
          </g>
          <g className="hidden min-[701px]:block">
            <rect x="115" y="248" width="110" height="23" rx="6" fill="var(--device-marker)" />
            <text x="170" y="264" textAnchor="middle" fill="var(--device-marker-text)" fontSize="12" fontWeight="600">{t.sectionN03}</text>
          </g>
        </g>
      </g>

      <g transform="translate(24 14)">
        <rect width="132" height="36" rx="9" fill="var(--device-panel)" stroke="var(--device-accent)" strokeWidth="1.5" />
        <path d="m12 21 5-11 13 2 2 14Z" stroke="var(--device-accent)" strokeWidth="1.5" />
        <text x="40" y="23" fontSize="12" fontWeight="600" fill="var(--device-text)">{t.addPolygon}</text>
      </g>
      <g transform="translate(612 14)">
        <rect width="108" height="36" rx="9" fill="var(--device-accent)" />
        <rect width="108" height="36" rx="9" fill="var(--device-text)" className="opacity-[calc(var(--editor-pressed,0)*0.15)] group-data-[action=create]/editor:hidden group-data-[action=edit]/editor:hidden group-data-[action=move]/editor:hidden group-data-[action=pan]/editor:hidden group-data-[action=zoom]/editor:hidden" />
        <text x="54" y="23" textAnchor="middle" fontSize="13" fontWeight="600" fill="white">{t.save}</text>
      </g>
      <g transform="translate(566 390)">
        <rect width="164" height="40" rx="10" fill="var(--device-panel)" stroke="var(--device-border)" />
        <path d="M15 20H27M118 20H130M124 14V26" stroke="var(--device-text)" strokeWidth="2" strokeLinecap="round" />
        <text data-editor-zoom-label x="75" y="25" textAnchor="middle" fontSize="13" fontFamily="monospace" fill="var(--device-text)">100%</text>
        <rect x="115" y="9" width="24" height="22" rx="5" fill="var(--device-accent)" fillOpacity=".18" className="hidden group-data-[action=zoom]/editor:block" />
      </g>
      <g className="opacity-[var(--editor-saved,0)]" transform="translate(220 370)">
        <rect width="320" height="58" rx="12" fill="var(--device-panel)" stroke="#22a06b" strokeWidth="1.5" />
        <circle cx="27" cy="29" r="12" fill="#22a06b" />
        <path d="m21 29 4 4 8-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <text x="49" y="26" fontSize="13" fontWeight="600" fill="var(--device-text)">{t.savedTitle}</text>
        <text x="49" y="43" fontSize="11" fill="var(--device-muted)">{t.savedCopy}</text>
      </g>
      <g className="opacity-[var(--editor-cursor-opacity,0)] [transform:translate(var(--editor-cursor-x,530px),var(--editor-cursor-y,340px))]">
        <circle r="17" fill="#4858f5" fillOpacity=".14" stroke="var(--device-accent)" strokeOpacity=".35" className="opacity-[var(--editor-pressed,0)]" />
        <path className="group-data-[action=pan]/editor:hidden" d="M1 2 4 28 11 21 17 32 23 29 17 18 27 17Z" fill="var(--device-text)" fillOpacity=".15" />
        <path className="group-data-[action=pan]/editor:hidden" d="M0 0 3 26 10 19 16 30 22 27 16 16 26 15Z" fill="var(--device-text)" stroke="var(--device-screen)" strokeWidth="2" strokeLinejoin="round" />
        <path className="hidden group-data-[action=pan]/editor:block" d="M5 17V5a3 3 0 0 1 6 0v9-14a3 3 0 0 1 6 0v14-11a3 3 0 0 1 6 0v12-7a3 3 0 0 1 6 0v15c0 8-5 13-12 13-5 0-8-3-11-7l-5-7a3 3 0 0 1 4-4l4 4" fill="var(--device-text)" stroke="var(--device-screen)" strokeWidth="2" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
