// src/ShortsViewer.jsx
import React, { useEffect, useRef, useState } from "react";

export function ShortsViewer({ items, index, onClose, onIndexChange }) {
  const videoRef = useRef(null);
  const [touchStartX, setTouchStartX] = useState(null);

  const [pipSupported, setPipSupported] = useState(false);
  const [isPip, setIsPip] = useState(false);

  const current = items[index];

  const hasPrev = index > 0;
  const hasNext = index < items.length - 1;

  // Play the current video when index changes
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v
      .play()
      .catch(() => {
        // user might need to click; that's fine
      });
  }, [index, current?.src]);

  // Detect PiP support + keep local state in sync with PiP events
  useEffect(() => {
    const v = videoRef.current;

    const supported =
      typeof document !== "undefined" &&
      "pictureInPictureEnabled" in document &&
      !!v &&
      !v.disablePictureInPicture;

    setPipSupported(supported);

    if (!v) return;

    const handleEnter = (event) => {
      if (event.target === v) setIsPip(true);
    };
    const handleLeave = (event) => {
      if (event.target === v) setIsPip(false);
    };

    v.addEventListener("enterpictureinpicture", handleEnter);
    v.addEventListener("leavepictureinpicture", handleLeave);

    return () => {
      v.removeEventListener("enterpictureinpicture", handleEnter);
      v.removeEventListener("leavepictureinpicture", handleLeave);
    };
  }, [index, current?.src]);

  // Keyboard navigation: Esc to close, arrows to move
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      } else if (e.key === "ArrowRight") {
        if (hasNext) onIndexChange?.(index + 1);
      } else if (e.key === "ArrowLeft") {
        if (hasPrev) onIndexChange?.(index - 1);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [index, hasPrev, hasNext, onClose, onIndexChange]);

  if (!current) return null;

  // Handle video end → auto-advance if possible
  const handleEnded = () => {
    if (hasNext) {
      onIndexChange?.(index + 1);
    } else {
      // last video: you could call onClose() here if you want
    }
  };

  // Touch swipe handlers (left/right)
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setTouchStartX(touch.clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX == null) return;
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartX;

    const SWIPE_THRESHOLD = 50; // px

    if (deltaX < -SWIPE_THRESHOLD && hasNext) {
      onIndexChange?.(index + 1); // swipe left → next
    } else if (deltaX > SWIPE_THRESHOLD && hasPrev) {
      onIndexChange?.(index - 1); // swipe right → prev
    }

    setTouchStartX(null);
  };

  // Picture-in-Picture toggle
  const handleTogglePiP = async () => {
    const v = videoRef.current;
    if (!v || !pipSupported) return;

    try {
      if (document.pictureInPictureElement === v) {
        await document.exitPictureInPicture();
      } else {
        await v.requestPictureInPicture();
      }
    } catch (err) {
      // could show a toast / console.log if you want
      console.error("PiP error:", err);
    }
  };

  return (
    <div className="shorts-viewer-backdrop" role="dialog" aria-modal="true">
      <div className="shorts-viewer">
        {/* Top bar */}
        <div className="shorts-viewer-header">
          <div className="shorts-viewer-title">
            {current.tag && (
              <span className="shorts-viewer-tag">{current.tag}</span>
            )}
            <h2>{current.headline}</h2>
          </div>

          <div className="shorts-viewer-actions">
            {pipSupported && (
              <button
                type="button"
                className="shorts-viewer-pip"
                onClick={handleTogglePiP}
                aria-label={
                  isPip ? "Exit picture-in-picture" : "Pop out video"
                }
              >
                ⧉
              </button>
            )}
            <button
              type="button"
              className="shorts-viewer-close"
              onClick={onClose}
              aria-label="Close video viewer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Main video area */}
        <div
          className="shorts-viewer-body"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            type="button"
            className="shorts-viewer-nav shorts-viewer-nav-left"
            onClick={() => hasPrev && onIndexChange(index - 1)}
            disabled={!hasPrev}
            aria-label="Previous video"
          >
            ‹
          </button>

          <div className="shorts-viewer-video-wrap">
            <video
              ref={videoRef}
              controls
              playsInline
              className="shorts-viewer-video"
              src={current.src}
              poster={current.poster}
              onEnded={handleEnded}
            />
            {current.duration && (
              <div className="shorts-viewer-meta">{current.duration}</div>
            )}
          </div>

          <button
            type="button"
            className="shorts-viewer-nav shorts-viewer-nav-right"
            onClick={() => hasNext && onIndexChange(index + 1)}
            disabled={!hasNext}
            aria-label="Next video"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}