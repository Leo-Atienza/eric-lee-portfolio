import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { ThemeProvider } from "next-themes";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "@/pages/Index";

/**
 * Build-time render of the home route (scripts/prerender.mjs injects the result into
 * dist/index.html). Mirrors App.tsx exactly, with a StaticRouter in place of the BrowserRouter,
 * so the client hydrates the same tree.
 */
export function render(): string {
  return renderToString(
    <ErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <StaticRouter location="/">
          <Index />
        </StaticRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
