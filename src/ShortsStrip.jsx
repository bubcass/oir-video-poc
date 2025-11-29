// src/ShortsStrip.jsx
import React, { useEffect, useRef, useState } from "react";

function pillClassForTag(tag = "") {
  const name = tag.toLowerCase();

  if (name.includes("budget") || name.includes("pbo")) return "short-tag short-tag-pbo";
  if (name.includes("learning")) return "short-tag short-tag-learninghub";
  if (name.includes("research service") || name.includes("parliamentary research"))
    return "short-tag short-tag-lrs";
  if (name.includes("visual")) return "short-tag short-tag-visual";
  if (name.includes("open data")) return "short-tag short-tag-opendata";
  if (name.includes("report")) return "short-tag short-tag-report";

  // Inside Parliament + any other fallback
  return "short-tag short-tag-default";
}

export function ShortsStrip({ items = [], onOpenViewer }) {
  const trackRef = useRef(null);
  const videoRefs = useRef([]);

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [hoverCapable, setHoverCapable] = useState(false);

  const GAP_PX = 16;

  // ----------------------------------------------------
  // Detect whether this device actually supports hover
  // (desktop / laptop with a mouse or trackpad) vs touch
  // ----------------------------------------------------
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");

    const update = (e) => setHoverCapable(e.matches);
    // Initial value
    setHoverCapable(mq.matches);

    // Older Safari uses addListener / removeListener
    if (mq.addEventListener) {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    } else {
      mq.addListener(update);
      return () => mq.removeListener(update);
    }
  }, []);

  // ----------------------------------------------------
  // Hover preview (desktop only)
  // ----------------------------------------------------
  const handleHoverStart = (index) => {
    if (!hoverCapable) return; // no-op on touch devices
    const v = videoRefs.current[index];
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {
      // Ignore autoplay failures
    });
  };

  const handleHoverEnd = (index) => {
    if (!hoverCapable) return; // no-op on touch devices
    const v = videoRefs.current[index];
    if (!v) return;
    v.pause();
    v.currentTime = 0;
    // Most browsers will show the poster again after resetting currentTime.
  };

  // ----------------------------------------------------
  // Scrolling + arrow state
  // ----------------------------------------------------
  const updateScrollState = () => {
    const t = trackRef.current;
    if (!t) return;
    const maxScroll = t.scrollWidth - t.clientWidth;
    setCanPrev(t.scrollLeft > 0);
    setCanNext(t.scrollLeft < maxScroll - 1);
  };

  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;

    updateScrollState();

    const onScroll = () => updateScrollState();
    t.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => updateScrollState();
    window.addEventListener("resize", onResize);

    return () => {
      t.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const scrollByDir = (dir) => {
    const t = trackRef.current;
    if (!t) return;

    const firstCard = t.firstElementChild;
    const cardWidth = firstCard
      ? firstCard.getBoundingClientRect().width + GAP_PX
      : t.clientWidth * 0.8;

    t.scrollBy({
      left: dir * cardWidth,
      behavior: "smooth"
    });
  };

  if (!items.length) return null;

  return (
    <section className="module full">
      <div className="shorts-shell">
        {/* Header */}
        <div className="shorts-header">
          <h2 className="shorts-title">Inside Parliament</h2>
          <p className="shorts-subtitle">
            Get inside the work of the Oireachtas with our short videos.
          </p>
        </div>

        {/* Body: arrows + strip */}
        <div className="shorts-body">
          <button
            type="button"
            className="shorts-arrow shorts-arrow-left"
            aria-label="Scroll short videos left"
            disabled={!canPrev}
            onClick={() => scrollByDir(-1)}
          >
            ‹
          </button>

          <div
            className="shorts-strip no-scrollbar"
            ref={trackRef}
            aria-label="Short video highlights"
            role="list"
          >
            {items.map((item, index) => {
              const tagClass = pillClassForTag(item.tag);

              return (
                <article
                  key={item.id ?? index}
                  className="short-card"
                  role="listitem"
                >
                  <div
                    className="short-media"
                    // Desktop hover preview
                    onMouseEnter={
                      hoverCapable ? () => handleHoverStart(index) : undefined
                    }
                    onMouseLeave={
                      hoverCapable ? () => handleHoverEnd(index) : undefined
                    }
                    // Tap / click opens fullscreen viewer (desktop + mobile)
                    onClick={() => {
                      if (onOpenViewer) onOpenViewer(index);
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        if (onOpenViewer) onOpenViewer(index);
                      }
                    }}
                  >
                    <video
                      ref={(el) => (videoRefs.current[index] = el)}
                      className="short-video"
                      muted
                      playsInline
                      preload="none" // posters only until hover or modal
                      poster={item.poster}
                      src={item.src}
                    />

                    <div className="short-gradient" />

                    <div className="short-labels">
                      {item.tag && (
                        <div className={tagClass}>{item.tag}</div>
                      )}

                      {item.headline && (
                        <div className="short-headline">
                          {item.headline}
                        </div>
                      )}

                      <div
                        className={
                          "short-info" +
                          (item.info ? "" : " short-info--empty")
                        }
                      >
                        {item.info || "\u00a0" /* keep line height */}
                      </div>

                      {item.duration && (
                        <div className="short-duration">
                          {item.duration}
                        </div>
                      )}
                    </div>

                    {/* Play CTA, still visible as a cue but uses same handler */}
                    <button
                      type="button"
                      className="short-play-button"
                      aria-label={`Open video: ${item.headline}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onOpenViewer) onOpenViewer(index);
                      }}
                    >
                      ▶
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <button
            type="button"
            className="shorts-arrow shorts-arrow-right"
            aria-label="Scroll short videos right"
            disabled={!canNext}
            onClick={() => scrollByDir(1)}
          >
            ›
          </button>
        </div>

        {/* Footer link */}
        <div className="shorts-footer see-all">
          <a
            href="https://www.oireachtas.ie/en/oireachtas-tv/video-on-demand/"
            aria-label="Explore all videos"
          >
            Explore all videos
          </a>
        </div>
      </div>
    </section>
  );
}