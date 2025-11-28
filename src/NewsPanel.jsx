// src/NewsPanel.jsx
import React from "react";

export function NewsPanel() {
  return (
    <section className="module half l-module -news">
      <h2 className="u-text-h2 u-pad-edge-mobile">News</h2>

      <div className="simple-list">
        <div className="simple-list__item">
          <p className="simple-list__date">26 Nov 2025, 11.00</p>
          <p className="simple-list__title">
            <a href="https://www.oireachtas.ie/en/press-centre/news-and-features/20251126-pac-100-celebration-held-to-mark-the-centenary-of-the-committee-of-public-accounts/">PAC 100: Celebration marks centenary of the Public Accounts Committee</a>
          </p>
        </div>

        <div className="simple-list__item">
          <p className="simple-list__date">24 Nov 2025, 10.00</p>
          <p className="simple-list__title">
            <a href="https://www.oireachtas.ie/en/press-centre/news-and-features/20251124-european-update-the-oireachtas-national-parliament-office-for-the-european-union/">European Update: Oireachtas National Parliament Office for the EU</a>
          </p>
        </div>

        <div className="simple-list__item">
          <p className="simple-list__date">17 Nov 2025, 12.00</p>
          <p className="simple-list__title">
            <a href="https://www.oireachtas.ie/en/press-centre/news-and-features/20251117-seanad-na-nog-in-leinster-house/">Seanad na nÓg takes place in Leinster House, calling on the Government to act on mental health</a>
          </p>
        </div>
      </div>

      <ul className="u-pad-edge-mobile simple-list__footer">
        <li className="see-all flex">
          <a href="https://www.oireachtas.ie/en/press-centre/news-and-features/">See all news</a>
        </li>
      </ul>
    </section>
  );
}