// src/FindSenatorModule.jsx
import React from "react";

export function FindSenatorModule() {
  return (
    <section className="module half find-member">
      <div className="wrapper">
        <h2>
          <label htmlFor="search-senator-66">Find a current Senator</label>
        </h2>
        <p>There are 60 Members (called Senators) in Seanad Éireann.</p>

        <form>
          <div className="td-wrapper form-container">
            <div
              className="form-element full-width has-autocomplete-list"
              placeholder="Find a current Senator"
              data-js-autocompleter="Senator:66"
              data-autocomplete-no-results-text="No Members found..."
              data-xhr="/en/?module=new-module-find-member-search&amp;filter=%2Fie%2Foireachtas%2Fhouse%2Fseanad%2F27"
              data-autocomplete-overlay="false"
            >
              <input
                type="text"
                autoComplete="off"
                placeholder="Find a current Senator"
                aria-label="Find a current Senator"
                id="search-senator-66"
              />
              <ul
                id="auto-complete-results-Senator:66"
                role="listbox"
                aria-label="Autocomplete list"
                aria-expanded="false"
                className="autocomplete-list is-empty"
              />
            </div>
          </div>

          <input
            type="text"
            style={{ display: "none" }}
            aria-hidden="true"
            aria-label="Hidden Field"
          />
        </form>
      </div>
    </section>
  );
}