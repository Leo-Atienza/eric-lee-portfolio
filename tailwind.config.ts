import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "72rem" },
    },
    extend: {
      // The ledger tokens; src/index.css is canonical, these only expose them as utilities.
      colors: {
        ground: {
          DEFAULT: "var(--color-ground)",
          raised: "var(--color-ground-raised)",
          sunken: "var(--color-ground-sunken)",
        },
        ink: {
          DEFAULT: "var(--color-ink)",
          muted: "var(--color-ink-muted)",
        },
        rule: {
          DEFAULT: "var(--color-rule)",
          strong: "var(--color-rule-strong)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          strong: "var(--color-accent-strong)",
        },
        overlay: {
          DEFAULT: "var(--color-overlay)",
          ink: "var(--color-overlay-ink)",
          rule: "var(--color-overlay-rule)",
        },
      },
      fontFamily: {
        sans: ["Public Sans", "Public Sans Fallback", "Arial", "sans-serif"],
        display: ["Libre Caslon Display", "Caslon Fallback", "Georgia", "serif"],
      },
      maxWidth: {
        page: "var(--page-max)",
        measure: "var(--measure)",
      },
    },
  },
  plugins: [],
} satisfies Config;
