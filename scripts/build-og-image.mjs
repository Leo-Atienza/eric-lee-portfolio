// One-off generator for static OG image (1200x630) + favicon-32 PNG.
// Run with: node scripts/build-og-image.mjs

import sharp from "sharp";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, "..", "public");

// ----- OG image (1200x630) ----------------------------------------------------

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#06080f"/>
      <stop offset="100%" stop-color="#0c1118"/>
    </linearGradient>
    <radialGradient id="auraPrimary" cx="22%" cy="28%" r="55%">
      <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.32"/>
      <stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="auraAccent" cx="82%" cy="78%" r="55%">
      <stop offset="0%" stop-color="#a855f7" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#a855f7" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="leeGrad" x1="0" y1="0" x2="1" y2="0.4">
      <stop offset="0%" stop-color="#60a5fa"/>
      <stop offset="50%" stop-color="#a78bfa"/>
      <stop offset="100%" stop-color="#c084fc"/>
    </linearGradient>
    <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="1" fill="#ffffff" fill-opacity="0.04"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#dots)"/>
  <rect width="1200" height="630" fill="url(#auraPrimary)"/>
  <rect width="1200" height="630" fill="url(#auraAccent)"/>

  <!-- Pill: location -->
  <g transform="translate(80, 100)">
    <rect width="220" height="44" rx="22" fill="#ffffff" fill-opacity="0.06" stroke="#ffffff" stroke-opacity="0.12"/>
    <circle cx="22" cy="22" r="4" fill="#34d399"/>
    <text x="38" y="29" font-family="Inter, Segoe UI, system-ui, sans-serif" font-size="16" font-weight="500" fill="rgba(255,255,255,0.75)">Markham, ON · Available</text>
  </g>

  <!-- Name -->
  <text x="80" y="290" font-family="Inter, Segoe UI, system-ui, sans-serif" font-size="92" font-weight="800" fill="#ffffff" letter-spacing="-3">Eric Yee Fa</text>
  <text x="80" y="400" font-family="Inter, Segoe UI, system-ui, sans-serif" font-size="124" font-weight="800" fill="url(#leeGrad)" letter-spacing="-4">Lee</text>

  <!-- Gradient accent bar -->
  <rect x="80" y="430" width="140" height="6" rx="3" fill="url(#leeGrad)"/>

  <!-- Role -->
  <text x="80" y="488" font-family="Inter, Segoe UI, system-ui, sans-serif" font-size="34" font-weight="500" fill="rgba(255,255,255,0.72)">Data Analytics &amp; Business Intelligence</text>

  <!-- Tool chips -->
  <g transform="translate(80, 540)">
    <text x="0" y="22" font-family="Inter, Segoe UI, system-ui, sans-serif" font-size="20" font-weight="600" fill="rgba(255,255,255,0.5)" letter-spacing="3">SQL  ·  PYTHON  ·  POWER BI  ·  TABLEAU</text>
  </g>

  <!-- Domain (bottom right) -->
  <text x="1120" y="588" font-family="Inter, Segoe UI, system-ui, sans-serif" font-size="22" font-weight="700" fill="#60a5fa" text-anchor="end">ericlee.dev</text>
</svg>`;

await sharp(Buffer.from(ogSvg))
  .png({ compressionLevel: 9 })
  .toFile(join(publicDir, "og-image.png"));

const ogMeta = await sharp(join(publicDir, "og-image.png")).metadata();
console.log(`og-image.png  ${ogMeta.width}x${ogMeta.height}`);

// ----- favicon 32x32 ----------------------------------------------------------

await sharp(join(publicDir, "favicon.svg"))
  .resize(32, 32)
  .png({ compressionLevel: 9 })
  .toFile(join(publicDir, "favicon-32.png"));

const faviconMeta = await sharp(join(publicDir, "favicon-32.png")).metadata();
console.log(`favicon-32.png  ${faviconMeta.width}x${faviconMeta.height}`);
