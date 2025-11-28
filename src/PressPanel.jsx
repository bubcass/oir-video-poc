// src/PressPanel.jsx
import React from "react";

export function PressPanel() {
  return (
    <section className="module half l-module -press">
      <h2 className="u-text-h2 u-pad-edge-mobile">Press releases</h2>

      <div className="simple-list">
        <div className="simple-list__item">
          <p className="simple-list__date">19 Nov 2025, 09.30</p>
          <p className="simple-list__title">
            <a href="https://www.oireachtas.ie/en/press-centre/press-releases/20251126-committee-of-public-accounts-to-meet-with-the-office-of-public-works-opw/">Committee of Public Accounts to meet officials from the Office of Public Works</a>
          </p>
        </div>

        <div className="simple-list__item">
          <p className="simple-list__date">12 Nov 2025, 15.00</p>
          <p className="simple-list__title">
            <a href="https://www.oireachtas.ie/en/press-centre/press-releases/20251126-the-joint-committee-on-infrastructure-and-national-development-plan-delivery-to-discuss-the-metrolink-judicial-review-proceedings/">The Joint Committee on Infrastructure to discuss Metrolink</a>
          </p>
        </div>

        <div className="simple-list__item">
          <p className="simple-list__date">4 Nov 2025, 13.00</p>
          <p className="simple-list__title">
            <a href="https://www.oireachtas.ie/en/press-centre/press-releases/20251126-ceann-comhairle-verona-murphy-t-d-hosts-event-to-mark-international-day-of-persons-with-disabilities-2025/">Ceann Comhairle to host event marking International Day of Persons with Disabilities</a>
          </p>
        </div>
      </div>

      <ul className="u-pad-edge-mobile simple-list__footer">
        <li className="see-all flex">
          <a href="https://www.oireachtas.ie/en/press-centre/press-releases/">See all press releases</a>
        </li>
      </ul>
    </section>
  );
}