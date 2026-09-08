import { useCallback, useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, Download, X, ZoomIn, ZoomOut } from "lucide-react";

export interface GalleryImage {
  src: string;
  caption: string;
  width: number;
  height: number;
}

interface DashboardGalleryProps {
  images: GalleryImage[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
  projectTitle: string;
  pdfUrl?: string;
  /** The control that opened the viewer; focus returns to it on close. */
  returnFocusTo?: HTMLElement | null;
}

const SWIPE_THRESHOLD = 50;

/**
 * Full-screen viewer for the dashboard captures. Radix Dialog supplies the focus trap, Escape
 * and the accessible name; arrows and swipe move between captures; a click toggles zoom.
 */
const DashboardGallery = ({ images, isOpen, onClose, initialIndex = 0, projectTitle, pdfUrl, returnFocusTo }: DashboardGalleryProps) => {
  const [index, setIndex] = useState(initialIndex);
  const [zoomed, setZoomed] = useState(false);
  const pointerStart = useRef<number | null>(null);
  const count = images.length;

  useEffect(() => {
    setIndex(initialIndex);
    setZoomed(false);
  }, [initialIndex, isOpen]);

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => (i + delta + count) % count);
      setZoomed(false);
    },
    [count]
  );

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft") go(-1);
    else if (event.key === "ArrowRight") go(1);
  };

  const onPointerDown = (event: React.PointerEvent) => {
    pointerStart.current = event.clientX;
  };

  const onPointerUp = (event: React.PointerEvent) => {
    if (pointerStart.current === null) return;
    const dx = event.clientX - pointerStart.current;
    pointerStart.current = null;
    if (zoomed) return;
    if (dx > SWIPE_THRESHOLD) go(-1);
    else if (dx < -SWIPE_THRESHOLD) go(1);
  };

  if (count === 0) return null;
  const current = images[index];

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="lightbox-overlay" />
        <Dialog.Content
          className="lightbox"
          onKeyDown={onKeyDown}
          aria-describedby={undefined}
          onCloseAutoFocus={(event) => {
            if (!returnFocusTo) return;
            event.preventDefault();
            returnFocusTo.focus();
          }}
        >
          <header className="flex items-center justify-between gap-4 border-b border-overlay-rule px-4 py-3">
            <div className="min-w-0">
              <Dialog.Title className="font-display truncate text-xl leading-tight">{projectTitle}</Dialog.Title>
              <p className="small num mt-1 opacity-80">
                {index + 1} of {count}. {current.caption}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                className="lightbox-button"
                onClick={() => setZoomed((z) => !z)}
                aria-label={zoomed ? "Zoom out" : "Zoom in"}
                aria-pressed={zoomed}
              >
                {zoomed ? <ZoomOut className="h-5 w-5" aria-hidden="true" /> : <ZoomIn className="h-5 w-5" aria-hidden="true" />}
              </button>
              {pdfUrl && (
                <a className="lightbox-button" href={pdfUrl} download aria-label="Download the dashboard PDF">
                  <Download className="h-5 w-5" aria-hidden="true" />
                </a>
              )}
              <Dialog.Close className="lightbox-button" aria-label="Close">
                <X className="h-5 w-5" aria-hidden="true" />
              </Dialog.Close>
            </div>
          </header>

          <div
            className="relative grid min-h-0 place-items-center overflow-hidden px-4 py-4 sm:px-20"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
          >
            <img
              key={current.src}
              src={current.src}
              alt={current.caption}
              width={current.width}
              height={current.height}
              decoding="async"
              draggable={false}
              className="lightbox-image"
              data-zoomed={zoomed}
              onClick={() => setZoomed((z) => !z)}
            />
            {count > 1 && (
              <>
                <button
                  type="button"
                  className="lightbox-button absolute left-2 top-1/2 -translate-y-1/2 sm:left-4"
                  onClick={() => go(-1)}
                  aria-label="Previous capture"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="lightbox-button absolute right-2 top-1/2 -translate-y-1/2 sm:right-4"
                  onClick={() => go(1)}
                  aria-label="Next capture"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </>
            )}
          </div>

          {count > 1 && (
            <footer className="flex items-center justify-center gap-2 border-t border-overlay-rule px-4 py-3">
              {images.map((image, i) => (
                <button
                  key={image.src}
                  type="button"
                  className="lightbox-thumb"
                  aria-current={i === index ? "true" : undefined}
                  aria-label={`Show capture ${i + 1}: ${image.caption}`}
                  onClick={() => {
                    setIndex(i);
                    setZoomed(false);
                  }}
                >
                  <img src={image.src} alt="" width={64} height={40} loading="lazy" decoding="async" draggable={false} />
                </button>
              ))}
            </footer>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DashboardGallery;
