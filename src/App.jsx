// src/App.jsx
import React, { useState, useRef, useEffect } from "react";
import { ShortsStrip } from "./ShortsStrip";
import { shortsData } from "./shortsData";
import { FindTDModule } from "./FindTDModule";
import { FindSenatorModule } from "./FindSenatorModule";
import { NewsPanel } from "./NewsPanel";
import { PressPanel } from "./PressPanel";
import { ShortsViewer } from "./ShortsViewer";
import "./index.css";
import "./shorts.css";

// --- Research shelf data + helpers ---

const researchItems = [
  {
    id: "learning-1",
    theme: "Learning Hub",
    title: "How a Bill becomes an Act",
    meta: "12 min read • Updated today",
    href: "https://data.oireachtas.ie/ie/oireachtas/communications/education/2020/2020-09-01_how-decisions-are-made-lesson-plan_en.pdf"
  },
  {
    id: "pbo-1",
    theme: "Parliamentary Budget Office",
    title: "Budget 2026: Flash impact analysis",
    meta: "9 min read • Updated 2 days ago",
    href: "https://data.oireachtas.ie/ie/oireachtas/parliamentaryBudgetOffice/2025/2025-10-07_budget-2026-flash-impact-analysis_en.pdf"
  },
  {
    id: "lrs-1",
    theme: "Parliamentary Research Service",
    title: "Housing completions and housing needs | Q3 2025",
    meta: "17 min read • Updated 14 November",
    href: "https://www.oireachtas.ie/en/how-parliament-is-run/houses-of-the-oireachtas-service/library-and-research-service/research-matters/2025-02-25-capacity-constraints-and-irelands-housing-supply/"
  },
  {
    id: "visual-1",
    theme: "Visual data",
    title: "Housing completions and housing needs | Q3 2025",
    meta: "4 min read • Updated 14 November",
    href: "https://www.oireachtas.ie/en/open-data/pq-explorer/"
  },
  {
    id: "open-1",
    theme: "Open data",
    title: "Housing completions and housing needs | Q3 2025",
    meta: "JSON • CSV • Updated 14 November",
    href: "https://www.oireachtas.ie/en/open-data/pq-explorer/#:~:text=Download-,Parliamentary,-Question%20dataset.csv%20(~"
  },
  {
    id: "report-1",
    theme: "Report",
    title: "Review of DEIS school programmes",
    meta: "24 min read • Updated 9 November",
    href: "https://www.oireachtas.ie/en/debates/question/2024-10-24/166/"
  }
];

function themePillClass(theme) {
  const name = (theme || "").toLowerCase();

  if (name.includes("budget") || name.includes("pbo")) {
    return "pill pill-pbo";
  }

  if (name.includes("learning hub")) {
    return "pill pill-learninghub";
  }

  if (
    name.includes("spotlight") ||
    name.includes("l&rs") ||
    name.includes("library") ||
    name.includes("research service")
  ) {
    return "pill pill-lrs";
  }

  if (name.includes("visual")) {
    return "pill pill-visual";
  }

  if (name.includes("open data") || name.includes("opendata")) {
    return "pill pill-opendata";
  }

  if (name.includes("report")) {
    return "pill pill-report";
  }

  // Default / Inside Parliament / anything else → corporate gold
  return "pill pill-inside";
}

// --- New Stór carousel component (option 2) ---

function ResearchCarousel({ items }) {
  const trackRef = React.useRef(null);
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(true);

  const GAP_PX = 16;

  const updateScrollState = () => {
    const t = trackRef.current;
    if (!t) return;
    const maxScroll = t.scrollWidth - t.clientWidth;
    setCanPrev(t.scrollLeft > 0);
    setCanNext(t.scrollLeft < maxScroll - 1);
  };

  React.useEffect(() => {
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

  if (!items || !items.length) return null;

  return (
    <section
      className="module full research-shelf"
      aria-labelledby="research-heading"
    >
      <div className="research-shelf-header">
        <h2 id="research-heading">Stór | Research and insight</h2>
        <p className="research-shelf-intro">
          A selection of written research, visual data and briefings to inform Parliament.
        </p>
      </div>

      <div className="research-shelf-body">
        {/* Left arrow */}
        <button
          type="button"
          className="research-arrow research-arrow-left"
          aria-label="Scroll research items left"
          disabled={!canPrev}
          onClick={() => scrollByDir(-1)}
        >
          ‹
        </button>

        {/* Track */}
        <div
          className="research-shelf-track no-scrollbar"
          ref={trackRef}
          aria-label="Research highlights"
        >
          {items.map((item) => (
            <article key={item.id} className="research-card">
              <div className="research-card-top">
                <span className={themePillClass(item.theme)}>
                  {item.theme}
                </span>
              </div>

              <h3 className="research-card-title">{item.title}</h3>

              {item.summary && (
                <p className="research-card-summary">{item.summary}</p>
              )}

              {item.meta && (
                <p className="research-card-meta">{item.meta}</p>
              )}

              {item.href && (
                <a
                  href={item.href}
                  className="research-card-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Read more →
                </a>
              )}
            </article>
          ))}
        </div>

        {/* Right arrow */}
        <button
          type="button"
          className="research-arrow research-arrow-right"
          aria-label="Scroll research items right"
          disabled={!canNext}
          onClick={() => scrollByDir(1)}
        >
          ›
        </button>
      </div>

      <div className="research-shelf-footer see-all">
        <a
          href="https://www.oireachtas.ie/en/how-parliament-is-run/houses-of-the-oireachtas-service/library-and-research-service/"
          aria-label="See all research from Stór"
        >
          Explore our insights
        </a>
      </div>
    </section>
  );
}

// --- Main App ---

export default function App() {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  return (
    <main className="page">
      <header className="site-header">
        <div className="site-title">
          Integration of video carousel POC – Homepage elements between Member search, short videos, news, research
        </div>
      </header>

      <section className="hero">
        <h1>Schedule etc.</h1>
        <p>{/* hero copy later */}</p>
      </section>

      {/* Row 1: Find a current TD / Find a current Senator */}
      <section className="flex-row">
        <FindTDModule />
        <FindSenatorModule />
      </section>

      {/* Row 2: Full-width short video strip */}
      <section className="shorts-row">
        <ShortsStrip
          items={shortsData}
          onOpenViewer={(idx) => {
            setViewerIndex(idx);
            setViewerOpen(true);
          }}
        />
      </section>

      {/* Row 3: Research carousel (Stór) */}
      <ResearchCarousel items={researchItems} />

      {/* Row 4: News + Press releases (half-width each) */}
      <section className="flex-row">
        <NewsPanel />
        <PressPanel />
      </section>

      <footer className="site-footer">
        Prototype layout only, integration of video carousel and research shelf.
      </footer>

      {viewerOpen && (
        <ShortsViewer
          items={shortsData}
          index={viewerIndex}
          onClose={() => setViewerOpen(false)}
          onIndexChange={setViewerIndex}
        />
      )}
    </main>
  );
}