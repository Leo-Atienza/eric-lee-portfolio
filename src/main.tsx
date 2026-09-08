import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

/**
 * Arms the reveal gate (`.js .reveal` in index.css). It is armed here, once the bundle is running,
 * never from the HTML head: before this moment nothing can un-hide a section, so a reader who
 * scrolls ahead of the bundle must see the whole document. Anything already on screen (or
 * scrolled past) keeps its final state, so arming never blanks what the reader is looking at.
 * Reduced-motion readers never get the gate at all.
 */
function armReveals() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  for (const el of document.querySelectorAll(".reveal")) {
    if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-visible");
  }
  document.documentElement.classList.add("js");
}

const root = document.getElementById("root")!;

armReveals();

// Production HTML is prerendered (scripts/prerender.mjs), so hydrate it; the dev server
// serves an empty root and renders from scratch.
if (root.hasChildNodes()) {
  hydrateRoot(root, <App />);
} else {
  createRoot(root).render(<App />);
}
