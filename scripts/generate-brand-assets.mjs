import fs from "node:fs/promises";
import { createRequire } from "node:module";

// Reuse the image processor shipped with Next.js; no additional dependency.
const require = createRequire(import.meta.url);
const nextRequire = createRequire(require.resolve("next/package.json"));
const sharp = nextRequire("sharp");

const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180"><rect width="180" height="180" rx="40" fill="#24184c"/><text x="24" y="123" font-family="Arial,sans-serif" font-size="99" font-weight="700" letter-spacing="-8" fill="#fff9ed">nc.</text></svg>`;
const social = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs><linearGradient id="background" x2="1" y2="1"><stop stop-color="#171226"/><stop offset="1" stop-color="#34264f"/></linearGradient></defs>
<rect width="1200" height="630" fill="url(#background)"/>
<circle cx="1130" cy="80" r="290" fill="#b6adff" opacity=".08"/><circle cx="1060" cy="590" r="250" fill="#62c0ef" opacity=".08"/>
<rect x="64" y="64" width="96" height="96" rx="24" fill="#fff9ed"/>
<text x="77" y="132" font-family="Arial,sans-serif" font-size="57" font-weight="700" letter-spacing="-5" fill="#24184c">nc.</text>
<g font-family="Arial,sans-serif"><text x="64" y="285" font-size="86" font-weight="700" letter-spacing="-3" fill="#fff9ed">Nicolás Cieri</text>
<text x="64" y="355" font-size="43" font-weight="500" fill="#b6adff">Senior Software Engineer · Tech Lead</text>
<text x="67" y="422" font-size="27" fill="#d1c3e4">React  ·  Next.js  ·  TypeScript</text>
<path d="M64 487H1136" stroke="#d1c3e4" opacity=".25"/>
<text x="64" y="551" font-size="29" fill="#fff9ed">nicocieri.dev</text><text x="1136" y="551" font-size="25" text-anchor="end" fill="#d1c3e4">Buenos Aires, Argentina</text></g>
</svg>`;
await fs.writeFile("public/icon.svg", icon);
await fs.writeFile("public/images/social-card.svg", social);
await sharp(Buffer.from(social)).png().toFile("public/images/social-card.png");
await sharp(Buffer.from(icon)).png().toFile("public/apple-touch-icon.png");
const png = await sharp(Buffer.from(icon)).resize(32, 32).png().toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
header[6] = 32; header[7] = 32;
header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12);
header.writeUInt32LE(png.length, 14); header.writeUInt32LE(22, 18);
await fs.writeFile("public/favicon.ico", Buffer.concat([header, png]));
console.log("Generated favicon, Apple icon and 1200×630 social image.");
