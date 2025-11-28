// src/FindTDModule.jsx
import React from "react";

export function FindTDModule() {
  return (
    <section className="module half find-party">
      <div className="wrapper">
        <h2>
          <label htmlFor="search-td-66">Find a current TD</label>
        </h2>
        <p>There are 174 Members (called Deputies or TDs) of Dáil Éireann.</p>

        <form>
          <div className="td-wrapper form-container">
            <div
              className="form-element full-width has-autocomplete-list"
              data-js-autocompleter="TD:66"
              data-autocomplete-no-results-text="No members found..."
              data-xhr="/en/?module=new-module-find-member-search&amp;filter=%2Fie%2Foireachtas%2Fhouse%2Fdail%2F34"
              data-autocomplete-overlay="false"
            >
              <input
                type="text"
                autoComplete="off"
                placeholder="Find a current TD"
                aria-label="Find a current TD"
                id="search-td-66"
              />
              <ul
                id="auto-complete-results-TD:66"
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