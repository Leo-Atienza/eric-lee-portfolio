# Eric Lee - Portfolio

Personal portfolio website built with React, TypeScript and Tailwind CSS. The design language is a
ruled financial statement: self-hosted Libre Caslon Display and Public Sans, one ledger-green accent,
light by default with a dark scheme. Design context lives in `.impeccable.md`; the build stamp and
its gates sit at the top of `src/index.css`.

## Tech Stack

- Vite
- TypeScript
- React
- Tailwind CSS
- Radix UI (dialog)

## Development

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

## Quality gates

```sh
npm test                 # vitest
npm run check:contrast   # every shipped ink/ground pair, both schemes
npm run check:perf       # perf-budget.json against a Lighthouse JSON (see script header)
```
