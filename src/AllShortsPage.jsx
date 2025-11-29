// src/AllShortsPage.jsx
import React, { useMemo, useState } from "react";
import { shortsData } from "./shortsData";
import { ShortsStrip } from "./ShortsStrip";
import { ShortsViewer } from "./ShortsViewer";

// --- Custom theme ordering for this page only ---
const THEME_ORDER = [
  "Inside Parliament",
  "Report",
  "Learning Hub",
  "Parliamentary Budget Office",
  "Parliamentary Research Service",
  "A day in the life"
];

// --- Custom display labels for headings (this page only) ---
const THEME_LABELS = {
  Report: "Report launch"
};

// --- Short labels for checkbox filters only ---
const TAG_DISPLAY = {
  "Parliamentary Budget Office": "PBO",
  "Parliamentary Research Service": "PRS"
};

export default function AllShortsPage({ onBack }) {
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]); // [] = all themes

  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);
  const [viewerItems, setViewerItems] = useState([]);

  // Unique tags extracted from shortsData
  const allTags = useMemo(() => {
    const tags = Array.from(new Set(shortsData.map((s) => s.tag)));

    // Sort tags according to THEME_ORDER
    return tags.sort((a, b) => {
      const ia = THEME_ORDER.indexOf(a);
      const ib = THEME_ORDER.indexOf(b);
      if (ia === -1 && ib === -1) return a.localeCompare(b); // fall back alphabetical
      if (ia === -1) return 1;
      if (ib === -1) return -1;
      return ia - ib;
    });
  }, []);

  // Filter based on search + selected themes
  const filteredShorts = useMemo(() => {
    const q = query.trim().toLowerCase();

    return shortsData.filter((item) => {
      const matchesTag =
        selectedTags.length === 0 || selectedTags.includes(item.tag);

      const matchesQuery =
        q.length === 0 ||
        item.headline.toLowerCase().includes(q) ||
        (item.info && item.info.toLowerCase().includes(q)) ||
        item.tag.toLowerCase().includes(q) ||
        (item.duration && item.duration.toLowerCase().includes(q));

      return matchesTag && matchesQuery;
    });
  }, [query, selectedTags]);

  // Group filtered shorts by tag
  const groupedByTag = useMemo(() => {
    const groups = new Map();
    for (const tag of allTags) groups.set(tag, []);
    for (const item of filteredShorts) {
      const arr = groups.get(item.tag);
      if (arr) arr.push(item);
    }
    return groups;
  }, [filteredShorts, allTags]);

  const handleOpenViewer = (itemsForStrip, indexInStrip) => {
    setViewerItems(itemsForStrip);
    setViewerIndex(indexInStrip);
    setViewerOpen(true);
  };

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <main className="page all-shorts-page">
      <header className="site-header all-shorts-header">
        <div className="site-header-top-row">
          {onBack && (
            <button type="button" className="back-link" onClick={onBack}>
              ← Back to homepage
            </button>
          )}
        </div>

        <section className="all-shorts-hero">
          <h1 className="all-shorts-title">
            Inside Parliament&nbsp;| Video hub
          </h1>
          <p className="all-shorts-hero-text">
            Get inside the work of the Oireachtas with our short videos.
          </p>
        </section>
      </header>

      {/* Search + filters */}
      <section className="all-shorts-controls">
        <div className="search-control full-width">
          <label className="control-label" htmlFor="shorts-search">
            Search short videos
          </label>
          <input
            id="shorts-search"
            type="text"
            placeholder="Search by title, tag, description…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="theme-checkboxes">
          <span className="theme-checkboxes-label">Filter by theme:</span>

          {allTags.map((tag) => (
            <label key={tag} className="theme-checkbox">
              <input
                type="checkbox"
                value={tag}
                checked={selectedTags.includes(tag)}
                onChange={() => toggleTag(tag)}
              />
              <span>{TAG_DISPLAY[tag] || THEME_LABELS[tag] || tag}</span>
            </label>
          ))}
        </div>
      </section>

      {/* One carousel per theme */}
      <section className="all-shorts-body">
        {allTags.map((tag) => {
          const items = groupedByTag.get(tag);
          if (!items || !items.length) return null;

          return (
            <section key={tag} className="all-shorts-section">
              <div className="all-shorts-section-header">
                <h2>{THEME_LABELS[tag] || tag}</h2>
                <p className="all-shorts-section-meta">
                  {items.length} short{items.length > 1 ? "s" : ""}
                </p>
              </div>

              <ShortsStrip
                items={items}
                showHeader={false}
                onOpenViewer={(idx) => handleOpenViewer(items, idx)}
              />
            </section>
          );
        })}

        {filteredShorts.length === 0 && (
          <p className="all-shorts-empty">
            No short videos match your search and filters.
            Try clearing the search box or choosing a different theme.
          </p>
        )}
      </section>

      {viewerOpen && (
        <ShortsViewer
          items={viewerItems}
          index={viewerIndex}
          onClose={() => setViewerOpen(false)}
          onIndexChange={setViewerIndex}
        />
      )}
    </main>
  );
}