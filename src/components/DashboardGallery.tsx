import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, Download } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

// iPhone Safari does not honor requestFullscreen on the document element — only
// on <video>. Feature-detect so users see one fewer button rather than a broken one.
const FULLSCREEN_SUPPORTED =
  typeof document !== "undefined" && Boolean(document.fullscreenEnabled);

const SWIPE_THRESHOLD = 50;

export interface GalleryImage {
  src: string;
  caption: string;
}

interface DashboardGalleryProps {
  images: GalleryImage[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
  projectTitle: string;
  pdfUrl?: string;
}

const DashboardGallery = ({
  images,
  isOpen,
  onClose,
  initialIndex = 0,
  projectTitle,
  pdfUrl,
}: DashboardGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setIsZoomed(false);
  }, [initialIndex, isOpen]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setIsZoomed(false);
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setIsZoomed(false);
  }, [images.length]);

  const toggleZoom = useCallback(() => {
    setIsZoomed((prev) => !prev);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (isZoomed) return;
      if (info.offset.x > SWIPE_THRESHOLD) handlePrevious();
      else if (info.offset.x < -SWIPE_THRESHOLD) handleNext();
    },
    [isZoomed, handlePrevious, handleNext]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case "ArrowLeft":
          handlePrevious();
          break;
        case "ArrowRight":
          handleNext();
          break;
        case "Escape":
          onClose();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handlePrevious, handleNext, onClose]);

  if (images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full p-0 bg-black/95 border-none overflow-hidden">
        <VisuallyHidden>
          <DialogTitle>{projectTitle} Dashboard Gallery</DialogTitle>
        </VisuallyHidden>
        
        {/* Header controls */}
        <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-3 sm:p-4 bg-gradient-to-b from-black/80 to-transparent">
          <div className="text-white min-w-0 flex-1 mr-2">
            <h3 className="font-semibold text-sm sm:text-lg truncate">{projectTitle}</h3>
            <p className="text-white/60 text-xs sm:text-sm">
              {currentIndex + 1} of {images.length}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleZoom}
              className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label={isZoomed ? "Zoom out" : "Zoom in"}
            >
              {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
            </motion.button>
            
            {FULLSCREEN_SUPPORTED && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleFullscreen}
                className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Toggle fullscreen"
              >
                <Maximize2 className="w-5 h-5" />
              </motion.button>
            )}

            {pdfUrl && (
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href={pdfUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors inline-flex"
                aria-label="Download dashboard PDF"
              >
                <Download className="w-5 h-5" />
              </motion.a>
            )}

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Close gallery"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Main image area */}
        <div className="relative flex items-center justify-center w-full h-full pt-12 sm:pt-16 pb-16 sm:pb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`relative flex items-center justify-center w-full h-full ${
                isZoomed ? "cursor-zoom-out overflow-auto" : "cursor-zoom-in"
              }`}
              onClick={toggleZoom}
              drag={!isZoomed && images.length > 1 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
            >
              <img
                src={currentImage.src}
                alt={currentImage.caption}
                decoding="async"
                className={`max-h-full transition-transform duration-300 ${
                  isZoomed
                    ? "max-w-none scale-150"
                    : "max-w-full object-contain"
                }`}
                draggable={false}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src.endsWith(".webp")) {
                    target.src = target.src.replace(".webp", ".png");
                  }
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <motion.button
                whileHover={{ scale: 1.1, x: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1, x: 2 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>
            </>
          )}
        </div>

        {/* Caption and thumbnail strip */}
        <div className="absolute bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-4">
          <p className="text-white text-center mb-2 sm:mb-3 font-medium text-sm sm:text-base">
            {currentImage.caption}
          </p>
          
          {images.length > 1 && (
            <>
              {/* Mobile (< sm): swipe to navigate, dot indicators in place of thumbnails */}
              <div className="flex sm:hidden justify-center gap-1.5">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index);
                      setIsZoomed(false);
                    }}
                    aria-label={`Go to image ${index + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      index === currentIndex
                        ? "w-6 bg-white"
                        : "w-1.5 bg-white/40"
                    }`}
                  />
                ))}
              </div>

              {/* Desktop/tablet: thumbnail strip */}
              <div className="hidden sm:flex justify-center gap-2">
                {images.map((image, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCurrentIndex(index);
                      setIsZoomed(false);
                    }}
                    className={`w-16 h-10 rounded-md overflow-hidden border-2 transition-all ${
                      index === currentIndex
                        ? "border-white opacity-100"
                        : "border-transparent opacity-50 hover:opacity-80"
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={`Thumbnail ${index + 1}`}
                      width={64}
                      height={40}
                      decoding="async"
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  </motion.button>
                ))}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DashboardGallery;
