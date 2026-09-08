// Injects the prerendered home route into dist/index.html so the first paint comes from HTML,
// not from the JavaScript bundle. Runs as the last step of `npm run build`:
//   vite build && vite build --ssr src/entry-prerender.tsx --outDir dist-ssr && node scripts/prerender.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const htmlPath = join(root, "dist", "index.html");
const ssrEntry = pathToFileURL(join(root, "dist-ssr", "entry-prerender.js")).href;

const { render } = await import(ssrEntry);
const app = render();
if (!app || app.length < 1000) throw new Error(`prerender: suspiciously short output (${app?.length ?? 0} chars)`);

let shell = readFileSync(htmlPath, "utf8");
const marker = '<div id="root"></div>';
if (!shell.includes(marker)) throw new Error("prerender: dist/index.html has no empty #root to fill");

// Inline the one stylesheet: it is ~6 KB gzipped and it is the only render-blocking request, so
// on a slow connection the first paint no longer waits a round trip for it. Font URLs inside are
// root-absolute, so they resolve unchanged from the inline block.
const cssLink = shell.match(/<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/);
if (!cssLink) throw new Error("prerender: expected one stylesheet link in dist/index.html");
const css = readFileSync(join(root, "dist", cssLink[1]), "utf8");
shell = shell.replace(cssLink[0], `<style>${css}</style>`);

// The page paints from HTML, so hydration and analytics wait for the load event: the portrait and
// the two faces get the connection first; the bundle and Plausible follow once the first screen is drawn.
const scriptTag = shell.match(/<script type="module" crossorigin src="(\/assets\/[^"]+\.js)"><\/script>/);
if (!scriptTag) throw new Error("prerender: expected the module script tag in dist/index.html");
const loader =
  `<script>addEventListener("load",function(){` +
  `var s=document.createElement("script");s.type="module";s.crossOrigin="";s.src="${scriptTag[1]}";document.head.appendChild(s);` +
  `var p=document.createElement("script");p.defer=true;p.dataset.domain="ericlee-portfolio.vercel.app";p.src="https://plausible.io/js/script.js";document.head.appendChild(p)` +
  `})</script>`;
shell = shell.replace(scriptTag[0], loader);

writeFileSync(htmlPath, shell.replace(marker, `<div id="root">${app}</div>`));
console.log(`prerender: injected ${app.length.toLocaleString()} chars + ${css.length.toLocaleString()} chars of CSS into dist/index.html`);
