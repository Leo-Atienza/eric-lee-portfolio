// Generates the static social card (public/og-image.png, 1200x630), the favicon SVG and its
// 32px PNG in the ledger language. Run after a design or portrait change:
//   node scripts/build-og-image.mjs
// The card is rendered in headless Chromium so the self-hosted faces are the ones in the image.
import { createRequire } from "node:module";
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

// sRGB renderings of the tokens in src/index.css (OKLCH stays canonical there)
const INK = "#101b15";
const INK_MUTED = "#49564f";
const GROUND = "#f4f8f5";
const GROUND_RAISED = "#fbfdfb";
const RULE = "#ced7cf";
const RULE_STRONG = "#7f8f85";
const ACCENT = "#115531";
const INK_DARK = "#e4e9e5";
const GROUND_DARK = "#0e1612";

const b64 = (path, mime) => `data:${mime};base64,${readFileSync(path).toString("base64")}`;
const caslon = b64(join(publicDir, "fonts", "libre-caslon-display-400.woff2"), "font/woff2");
const publicSans = b64(join(publicDir, "fonts", "public-sans-400-600.woff2"), "font/woff2");
const portrait = b64(join(publicDir, "assets", "eric-lee.jpg"), "image/jpeg");

// ----- OG card -----------------------------------------------------------------

const card = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:"Libre Caslon Display";src:url("${caslon}") format("woff2")}
@font-face{font-family:"Public Sans";font-weight:400 600;src:url("${publicSans}") format("woff2")}
*{margin:0;box-sizing:border-box}
html,body{width:1200px;height:630px;background:${GROUND};color:${INK};font-family:"Public Sans",Arial,sans-serif;-webkit-font-smoothing:antialiased}
.card{display:grid;grid-template-columns:1fr 300px;gap:72px;padding:80px 88px 72px;height:100%}
h1{font-family:"Libre Caslon Display",Georgia,serif;font-weight:400;font-size:148px;line-height:.95;letter-spacing:-.02em}
.rule{width:128px;height:3px;background:${ACCENT};margin:36px 0 32px}
.lede{font-size:28px;line-height:1.45;color:${INK};max-width:640px}
.foot{position:absolute;left:88px;right:88px;bottom:56px;display:flex;justify-content:space-between;font-size:20px;color:${INK_MUTED};padding-top:20px;border-top:1px solid ${RULE}}
.plate{align-self:start;margin-top:12px;padding:6px;border:1px solid ${RULE};background:${GROUND_RAISED}}
.plate img{display:block;width:100%;height:auto}
dl{margin-top:28px;font-size:18px;line-height:1.4}
dl div{display:grid;grid-template-columns:96px 1fr;padding:10px 0;border-top:1px solid ${RULE}}
dl div:last-child{border-bottom:3px double ${RULE_STRONG}}
dt{color:${INK_MUTED};font-size:15px;padding-top:2px}
</style></head><body><div class="card">
<div><h1>Eric Lee</h1><div class="rule"></div>
<p class="lede">Financial reporting, data analysis and KPI dashboards for finance, accounting and operations decisions. SQL, Python, Excel, Power BI, Tableau.</p></div>
<div><figure class="plate"><img src="${portrait}" width="264" height="264" alt=""></figure>
<dl><div><dt>Based</dt><dd>Markham, Ontario</dd></div><div><dt>Degree</dt><dd>BCom (Hons), BTM, Seneca, 2026</dd></div></dl></div>
</div><div class="foot"><span>Business Technology Management graduate</span><span>ericlee-portfolio.vercel.app</span></div></body></html>`;

const require = createRequire(execSync("npm root -g").toString().trim() + "/");
const { chromium } = require("playwright");
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(card, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: join(publicDir, "og-image.png"), type: "png" });
await browser.close();

const ogMeta = await sharp(join(publicDir, "og-image.png")).metadata();
console.log(`og-image.png  ${ogMeta.width}x${ogMeta.height}`);

// ----- Favicon: the seal (two engraved rings, initials in the display face) -------

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <style>
    .bg { fill: ${GROUND}; }
    .ink { fill: ${INK}; }
    .ring { fill: none; stroke: ${INK}; }
    @media (prefers-color-scheme: dark) {
      .bg { fill: ${GROUND_DARK}; }
      .ink { fill: ${INK_DARK}; }
      .ring { stroke: ${INK_DARK}; }
    }
  </style>
  <rect class="bg" width="512" height="512"/>
  <circle class="ring" cx="256" cy="256" r="230" stroke-width="12"/>
  <circle class="ring" cx="256" cy="256" r="198" stroke-width="8"/>
  <text class="ink" x="256" y="322" font-family="Libre Caslon Display, Georgia, 'Times New Roman', serif" font-size="196" text-anchor="middle" letter-spacing="6">EL</text>
</svg>
`;
writeFileSync(join(publicDir, "favicon.svg"), faviconSvg);

await sharp(Buffer.from(faviconSvg)).resize(32, 32).png({ compressionLevel: 9 }).toFile(join(publicDir, "favicon-32.png"));
const faviconMeta = await sharp(join(publicDir, "favicon-32.png")).metadata();
console.log(`favicon-32.png  ${faviconMeta.width}x${faviconMeta.height}`);

// favicon.ico as a PNG-in-ICO container (16 + 32 px). Every current browser and Windows accept PNG
// entries; the old 279 KB multi-bitmap ICO sat in the critical path of the first paint.
const pngs = await Promise.all([16, 32].map((size) => sharp(Buffer.from(faviconSvg)).resize(size, size).png({ compressionLevel: 9 }).toBuffer()));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(pngs.length, 4);
let offset = 6 + 16 * pngs.length;
const entries = pngs.map((png, i) => {
  const size = [16, 32][i];
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size, 0); // width (0 would mean 256)
  entry.writeUInt8(size, 1); // height
  entry.writeUInt8(0, 2); // palette
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // colour planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(offset, 12);
  offset += png.length;
  return entry;
});
const ico = Buffer.concat([header, ...entries, ...pngs]);
writeFileSync(join(publicDir, "favicon.ico"), ico);
console.log(`favicon.ico  ${pngs.length} entries, ${ico.length} bytes`);
