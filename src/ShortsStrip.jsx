// src/ShortsStrip.jsx
import React, { useEffect, useRef, useState } from "react";

// Map tag text → unified pill classes (shared with research shelf)
function shortTagClass(tag = "") {
  const t = tag.toLowerCase();

  if (t.includes("budget") || t.includes("parliamentary budget office") || t.includes("pbo")) {
    return "pill pill-pbo";
  }

  if (t.includes("learning hub")) {
    return "pill pill-learninghub";
  }

  if (t.includes("research service") || t.includes("parliamentary research service") || t.includes("prs")) {
    return "pill pill-lrs";
  }

  if (t.includes("visual")) {
    return "pill pill-visual";
  }

  if (t.includes("open data") || t.includes("opendata")) {
    return "pill pill-opendata";
  }

  if (t.includes("report")) {
    return "pill pill-report";
  }

  // Inside Parliament + anything unclassified → gold pill
  return "pill pill-inside";
}

export function ShortsStrip({ items = [], onOpenViewer, showHeader = true }) {
  const trackRef = useRef(null);
  const videoRefs = useRef([]);

  const [hoverIndex, setHoverIndex] = useState(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const GAP_PX = 16;

  // --- Hover teaser behaviour ---

  const handleTeaserEnter = (index) => {
    setHoverIndex(index);
    const v = videoRefs.current[index];
    if (!v) return;
    v.currentTime = 0;
    v
      .play()
      .catch(() => {
        // autoplay on hover might still be blocked; ignore
      });
  };

  const handleTeaserLeave = (index) => {
    const v = videoRefs.current[index];
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
    setHoverIndex((prev) => (prev === index ? null : prev));
  };

  // --- Scrolling + arrow state ---

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
        {/* Header (optional) */}
        {showHeader && (
          <div className="shorts-header">
            <h2 className="shorts-title">Inside Parliament</h2>
            <p className="shorts-subtitle">
              Get inside the work of the Oireachtas with our short videos.
            </p>
          </div>
        )}

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
              const isHovered = index === hoverIndex;

              return (
                <article
                  key={item.id ?? index}
                  className="short-card"
                  role="listitem"
                  onMouseEnter={() => handleTeaserEnter(index)}
                  onMouseLeave={() => handleTeaserLeave(index)}
                >
                  <div
                    className="short-media"
                    // Clicking anywhere on the thumbnail opens the fullscreen viewer
                    onClick={() => {
                      if (onOpenViewer) onOpenViewer(index);
                    }}
                  >
                    {/* Base poster thumbnail */}
                    <img
                      src={item.poster}
                      alt={
                        item.headline ||
                        item.tag ||
                        "Oireachtas short video"
                      }
                      className="short-poster"
                      loading="lazy"
                    />

                    {/* Hover video teaser, layered on top and faded in/out */}
                    <video
                      ref={(el) => (videoRefs.current[index] = el)}
                      className={
                        "short-video" +
                        (isHovered ? " short-video--visible" : "")
                      }
                      muted
                      playsInline
                      preload="metadata"
                      src={item.src}
                    />

                    <div className="short-gradient" />

                    <div className="short-labels">
                      {item.tag && (
                        <div className={shortTagClass(item.tag)}>
                          {item.tag}
                        </div>
                      )}

                      {item.headline && (
                        <div className="short-headline">
                          {item.headline}
                        </div>
                      )}

                      {/* Always render short-info, but mark when it's empty
                          so we can reserve height and keep everything aligned */}
                      <div
                        className={
                          "short-info" +
                          (item.info ? "" : " short-info--empty")
                        }
                      >
                        {item.info || "\u00a0" /* nbsp keeps the line's height */}
                      </div>

                      {item.duration && (
                        <div className="short-duration">
                          {item.duration}
                        </div>
                      )}
                    </div>

                    {/* Play CTA – visual affordance, same behaviour as clicking the thumbnail */}
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
      </div>
    </section>
  );
}