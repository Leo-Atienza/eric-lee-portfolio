#!/usr/bin/env node
/**
 * check-perf-budget.mjs, a performance BUDGET, enforced, not a number admired.
 *
 * Craft step 4a has run Lighthouse since v8.7 and gated a11y/SEO ≥ 90 on public
 * sites; the performance category had no stated threshold at all, measured,
 * then ignored. This reads a budget and a Lighthouse JSON and exits non-zero
 * on any breach, the same shape as check-contrast.mjs (compute, never assert).
 *
 * Usage:
 *   node check-perf-budget.mjs --lh ./lh.json [--config perf-budget.json] [--field crux.json] [--inp <ms>] [--require-field]
 *   node check-perf-budget.mjs --init                    # scaffold perf-budget.json with the house defaults
 *
 * Lighthouse JSON: from `mcp__lighthouse__run_audit` or
 *   npx lighthouse <url> --output=json --output-path=./lh.json --chrome-flags="--headless=new"
 *
 * Budget (perf-budget.json at the project root; ms, unitless, 0–100, bytes, counts):
 *   { "lcp": 2500, "inp": 200, "cls": 0.1, "lighthousePerf": 90,
 *     "jsBytes": 200000, "cssBytes": 60000, "fonts": 2, "requests": 50 }
 *   Every key is optional; an unknown key is a config error (typos must not
 *   silently un-gate a metric). Bytes are TRANSFER size (compressed), summed
 *   from Lighthouse's `network-requests` audit; `fonts` counts font requests.
 *
 * INP is a FIELD metric, a navigation-mode Lighthouse run cannot measure it
 * (web-dev/principles.md: "INP has no lab proxy"). It is checked only from
 * `--field <crux.json>` (a CrUX API `queryRecord` response, the p75 under
 * record.metrics.interaction_to_next_paint.percentiles.p75), from `--inp <ms>`
 * (a Speed Insights / RUM reading you typed in), or from a timespan-mode
 * Lighthouse JSON that carries `interaction-to-next-paint`. Otherwise it prints
 * UNMEASURED with the lab TBT as a hint and does not fail, unless
 * `--require-field` (a public site after deploy) turns the hole into a FAIL.
 * When field LCP/CLS are present they govern; lab values are printed beside.
 *
 * Exit 0 = every budgeted metric passes · 1 = any breach · 2 = config/parse error.
 */
'use strict';

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const ARGS = process.argv.slice(2);
const flag = (name, def = null) => {
  const i = ARGS.indexOf(name);
  return i !== -1 && ARGS[i + 1] !== undefined && !ARGS[i + 1].startsWith('--') ? ARGS[i + 1] : def;
};
const has = (name) => ARGS.includes(name);
const die = (msg) => { console.error(`check-perf-budget: ${msg}`); process.exit(2); };

const CONFIG_PATH = flag('--config', 'perf-budget.json');

// House defaults. jsBytes is 200 KB transfer to match templates/web-pro/.size-limit.json
// (200 KB gzip First Load JS), one number across CI and the local gate; tighten
// per project (170 KB is the classic mobile budget). fonts=2 is the 2+1 rule with the
// outlier face self-hosted as a single file.
const DEFAULTS = { lcp: 2500, inp: 200, cls: 0.1, lighthousePerf: 90, jsBytes: 200000, cssBytes: 60000, fonts: 2, requests: 50 };
const KNOWN = new Set(Object.keys(DEFAULTS));

if (has('--help') || has('-h')) {
  console.log('usage: node check-perf-budget.mjs --lh <lighthouse.json> [--config perf-budget.json] [--field <crux.json>] [--inp <ms>] [--require-field]\n       node check-perf-budget.mjs --init');
  process.exit(0);
}

// ------------------------------------------------------------------- --init

if (has('--init')) {
  if (existsSync(CONFIG_PATH)) die(`${CONFIG_PATH} already exists, refusing to overwrite`);
  const config = {
    _how: 'Budget for the public build. Run: node ~/.claude/skills/impeccable/scripts/check-perf-budget.mjs --lh ./lh.json (craft step 4e). Field INP/LCP/CLS via --field <crux.json> or --inp <ms> after deploy.',
    _source: 'CWV p75 thresholds per web.dev/articles/vitals (LCP ≤ 2.5 s · INP ≤ 200 ms · CLS ≤ 0.1); jsBytes matches .size-limit.json (200 KB gzip); tighten per project, never loosen past the CWV line.',
    ...DEFAULTS,
  };
  writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2) + '\n');
  console.log(`wrote ${CONFIG_PATH}:\n${Object.entries(DEFAULTS).map(([k, v]) => `  ${k.padEnd(16)} ${v}`).join('\n')}`);
  process.exit(0);
}

// -------------------------------------------------------------------- inputs

const LH_PATH = flag('--lh');
if (!LH_PATH) die('--lh <lighthouse.json> is required (or --init to scaffold the budget)');
if (!existsSync(LH_PATH)) die(`Lighthouse JSON not found: ${LH_PATH}`);

let budget = DEFAULTS;
if (existsSync(CONFIG_PATH)) {
  let cfg;
  try { cfg = JSON.parse(readFileSync(CONFIG_PATH, 'utf8')); } catch (e) { die(`bad JSON in ${CONFIG_PATH}: ${e.message}`); }
  budget = {};
  for (const [k, v] of Object.entries(cfg)) {
    if (k.startsWith('_')) continue;
    if (!KNOWN.has(k)) die(`unknown budget key "${k}" in ${CONFIG_PATH}, known: ${[...KNOWN].join(', ')}`);
    if (typeof v !== 'number' || !Number.isFinite(v) || v < 0) die(`budget "${k}" must be a non-negative number, got ${JSON.stringify(v)}`);
    budget[k] = v;
  }
} else {
  console.log(`no ${CONFIG_PATH}, using the house defaults (scaffold one with --init)`);
}

let lh;
try { lh = JSON.parse(readFileSync(LH_PATH, 'utf8')); } catch (e) { die(`bad JSON in ${LH_PATH}: ${e.message}`); }
// The MCP returns the LHR either bare or wrapped; accept both.
if (lh.lhr && lh.lhr.audits) lh = lh.lhr;
if (!lh.audits || typeof lh.audits !== 'object') die(`${LH_PATH} has no "audits", is this a Lighthouse JSON report?`);
const audits = lh.audits;
const numeric = (id) => {
  const a = audits[id];
  return a && typeof a.numericValue === 'number' && Number.isFinite(a.numericValue) ? a.numericValue : null;
};

// Field data (CrUX queryRecord response, or the record itself)
let field = null;
const FIELD_PATH = flag('--field');
if (FIELD_PATH) {
  if (!existsSync(FIELD_PATH)) die(`field JSON not found: ${FIELD_PATH}`);
  let raw;
  try { raw = JSON.parse(readFileSync(FIELD_PATH, 'utf8')); } catch (e) { die(`bad JSON in ${FIELD_PATH}: ${e.message}`); }
  const metrics = raw?.record?.metrics || raw?.metrics;
  if (!metrics) die(`${FIELD_PATH} has no record.metrics, expected a CrUX API queryRecord response`);
  const p75 = (name) => {
    const v = metrics[name]?.percentiles?.p75;
    if (v === undefined || v === null) return null;
    const n = typeof v === 'string' ? parseFloat(v) : v; // CLS p75 is a string per the API
    return Number.isFinite(n) ? n : null;
  };
  field = { lcp: p75('largest_contentful_paint'), inp: p75('interaction_to_next_paint'), cls: p75('cumulative_layout_shift') };
}
const INP_ARG = flag('--inp');
if (INP_ARG !== null) {
  const n = parseFloat(INP_ARG);
  if (!Number.isFinite(n) || n < 0) die(`--inp must be a non-negative number of ms, got "${INP_ARG}"`);
  field = { ...(field || { lcp: null, cls: null }), inp: n };
}

// ------------------------------------------------------------ measurements

// Transfer bytes + counts by resource type, from network-requests (stable across
// Lighthouse versions); falls back to resource-summary when absent.
function resourceTotals() {
  const items = audits['network-requests']?.details?.items;
  if (Array.isArray(items) && items.length) {
    const by = { script: 0, stylesheet: 0, font: 0, image: 0, total: 0 };
    const count = { font: 0, requests: 0 };
    for (const it of items) {
      const type = String(it.resourceType || '').toLowerCase();
      const size = typeof it.transferSize === 'number' ? it.transferSize : 0;
      count.requests++;
      by.total += size;
      if (type in by) by[type] += size;
      if (type === 'font') count.font++;
    }
    return { source: 'network-requests', bytes: by, count };
  }
  const rs = audits['resource-summary']?.details?.items;
  if (Array.isArray(rs) && rs.length) {
    const by = { script: 0, stylesheet: 0, font: 0, image: 0, total: 0 };
    const count = { font: 0, requests: 0 };
    for (const it of rs) {
      const type = String(it.resourceType || '').toLowerCase();
      if (type in by) by[type] = it.transferSize || 0;
      if (type === 'total') { by.total = it.transferSize || 0; count.requests = it.requestCount || 0; }
      if (type === 'font') count.font = it.requestCount || 0;
    }
    return { source: 'resource-summary', bytes: by, count };
  }
  return null;
}

const res = resourceTotals();
const perfScore = typeof lh.categories?.performance?.score === 'number' ? Math.round(lh.categories.performance.score * 100) : null;
const labLcp = numeric('largest-contentful-paint');
const labCls = numeric('cumulative-layout-shift');
const labTbt = numeric('total-blocking-time');
const labInp = numeric('interaction-to-next-paint'); // timespan mode only
const url = lh.finalDisplayedUrl || lh.finalUrl || lh.requestedUrl || '(url unknown)';
const formFactor = lh.configSettings?.formFactor || lh.configSettings?.emulatedFormFactor || '?';

// ---------------------------------------------------------------- the gate

const fmtMs = (v) => (v === null ? 'n/a' : `${Math.round(v)} ms`);
const fmtKb = (v) => `${(v / 1024).toFixed(1)} KB`;
const rows = [];
let failed = 0;
let unmeasured = 0;
const line = (ok, label, measured, limit, note = '') => {
  if (ok === false) failed++;
  const tag = ok === null ? 'UNMEASURED' : ok ? 'PASS' : 'FAIL';
  rows.push(`  ${tag.padEnd(10)} ${label.padEnd(18)} ${String(measured).padEnd(22)} (budget ${limit})${note ? '  ' + note : ''}`);
};

console.log(`perf budget, ${url} [${formFactor}] · lab source: ${LH_PATH}${field ? ` · field: ${FIELD_PATH || '--inp'}` : ''}`);

if ('lighthousePerf' in budget) {
  if (perfScore === null) { unmeasured++; line(null, 'lighthouse perf', 'no performance category', `≥ ${budget.lighthousePerf}`); }
  else line(perfScore >= budget.lighthousePerf, 'lighthouse perf', `${perfScore}`, `≥ ${budget.lighthousePerf}`, 'median of ≥ 3 runs on a quiet machine, single runs are noise');
}
if ('lcp' in budget) {
  const v = field?.lcp ?? labLcp;
  if (v === null) { unmeasured++; line(null, 'LCP', 'not in report', `≤ ${budget.lcp} ms`); }
  else line(v <= budget.lcp, 'LCP', `${fmtMs(v)} ${field?.lcp != null ? '(field p75)' : '(lab)'}`, `≤ ${budget.lcp} ms`, field?.lcp != null && labLcp !== null ? `lab ${fmtMs(labLcp)}` : '');
}
if ('cls' in budget) {
  const v = field?.cls ?? labCls;
  if (v === null) { unmeasured++; line(null, 'CLS', 'not in report', `≤ ${budget.cls}`); }
  else line(v <= budget.cls, 'CLS', `${v.toFixed(3)} ${field?.cls != null ? '(field p75)' : '(lab)'}`, `≤ ${budget.cls}`, field?.cls != null && labCls !== null ? `lab ${labCls.toFixed(3)}` : '');
}
if ('inp' in budget) {
  const v = field?.inp ?? labInp;
  if (v === null) {
    if (has('--require-field')) line(false, 'INP', 'no field reading', `≤ ${budget.inp} ms`, '--require-field: capture p75 from Speed Insights / CrUX first');
    else { unmeasured++; line(null, 'INP', 'field-only', `≤ ${budget.inp} ms`, `lab TBT ${fmtMs(labTbt)} is a hint, not a pass, measure after deploy (delivery-gate.md)`); }
  } else line(v <= budget.inp, 'INP', `${fmtMs(v)} ${field?.inp != null ? '(field p75)' : '(lab timespan)'}`, `≤ ${budget.inp} ms`);
}
if (res) {
  if ('jsBytes' in budget) line(res.bytes.script <= budget.jsBytes, 'JS transfer', fmtKb(res.bytes.script), `≤ ${fmtKb(budget.jsBytes)}`);
  if ('cssBytes' in budget) line(res.bytes.stylesheet <= budget.cssBytes, 'CSS transfer', fmtKb(res.bytes.stylesheet), `≤ ${fmtKb(budget.cssBytes)}`);
  if ('fonts' in budget) line(res.count.font <= budget.fonts, 'font files', `${res.count.font}`, `≤ ${budget.fonts}`, res.bytes.font ? `${fmtKb(res.bytes.font)} transferred` : '');
  if ('requests' in budget) line(res.count.requests <= budget.requests, 'requests', `${res.count.requests}`, `≤ ${budget.requests}`, `total ${fmtKb(res.bytes.total)} · via ${res.source}`);
} else {
  for (const k of ['jsBytes', 'cssBytes', 'fonts', 'requests']) if (k in budget) { unmeasured++; line(null, k, 'no network-requests / resource-summary audit', `${budget[k]}`); }
}

console.log(rows.join('\n'));
if (unmeasured) console.log(`\n${unmeasured} metric(s) UNMEASURED, an unmeasured budget is not a pass; say so in the delivery gate.`);
if (failed) { console.error(`\n${failed} budget breach(es), fix the page, not the budget.`); process.exit(1); }
console.log('\nall measured budgets pass.');
