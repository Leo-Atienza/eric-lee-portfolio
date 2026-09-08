import { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { NAV_SECTIONS, SECTIONS } from "@/lib/sections";

/**
 * Wordmark left, section shortcuts in the middle, résumé and theme right (N1b).
 * Under 64rem the shortcuts move into a sheet. Scroll state and the current section both come
 * from IntersectionObserver, never a scroll listener.
 */
const Navigation = () => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const pickedInSheet = useRef(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !("IntersectionObserver" in window)) return;

    const topObserver = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    topObserver.observe(sentinel);

    const options = { rootMargin: "-45% 0px -50% 0px", threshold: 0 };
    const observers = [...SECTIONS.map((s) => s.id), "top"].flatMap((id) => {
      const el = document.getElementById(id);
      if (!el) return [];
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setCurrent(id === "top" ? null : id);
      }, options);
      obs.observe(el);
      return [obs];
    });

    return () => {
      topObserver.disconnect();
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  const isDark = resolvedTheme === "dark";

  const links = (className: string) =>
    NAV_SECTIONS.map(({ id, label }) => (
      <a key={id} href={`#${id}`} className={className} aria-current={current === id ? "true" : undefined}>
        {label}
      </a>
    ));

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="absolute left-0 top-0 h-px w-px" />

      <header className="nav" data-scrolled={scrolled}>
        <div className="page nav-inner">
          <a href="#top" className="quiet-link inline-flex items-center gap-3">
            <span className="seal" aria-hidden="true">
              EL
            </span>
            <span className="font-display text-lg leading-none">Eric Lee</span>
          </a>

          <nav aria-label="Sections" className="nav-links hidden lg:flex">
            {links("nav-link")}
          </nav>

          <div className="nav-actions">
            <a href="/assets/Eric_Lee_Resume.pdf" target="_blank" rel="noopener noreferrer" className="nav-link">
              Résumé<span className="sr-only"> (PDF, opens in a new tab)</span>
            </a>
            {mounted && (
              <button
                type="button"
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className="icon-button"
                aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
              >
                {isDark ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
              </button>
            )}

            <Dialog.Root open={sheetOpen} onOpenChange={setSheetOpen}>
              <Dialog.Trigger className="nav-link lg:hidden">Sections</Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="sheet-overlay" />
                <Dialog.Content
                  className="sheet"
                  aria-describedby={undefined}
                  // After a pick, focus belongs to the section the link named, not the trigger.
                  onCloseAutoFocus={(event) => {
                    if (!pickedInSheet.current) return;
                    pickedInSheet.current = false;
                    event.preventDefault();
                  }}
                >
                  <div className="flex items-center justify-between">
                    <Dialog.Title className="label">Sections</Dialog.Title>
                    <Dialog.Close className="icon-button" aria-label="Close">
                      <X className="h-4 w-4" aria-hidden="true" />
                    </Dialog.Close>
                  </div>
                  <nav
                    aria-label="Sections"
                    className="mt-2 grid"
                    onClick={() => {
                      pickedInSheet.current = true;
                      setSheetOpen(false);
                    }}
                  >
                    {links("sheet-link")}
                  </nav>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navigation;
