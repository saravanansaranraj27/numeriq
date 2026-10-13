"use client";

import { useEffect, useRef, useState, type FocusEvent, type KeyboardEvent } from "react";
import Icon, { type IconName } from "@/components/icons";
import type { ToolId } from "@/types/numeriq";

export type HeaderSearchResult = {
  id: ToolId;
  title: string;
  category: string;
  description: string;
  icon: IconName;
};

type HeaderProps = {
  onMenu: () => void;
  onHome: () => void;
  searchValue: string;
  onSearch: (value: string) => void;
  searchResults: HeaderSearchResult[];
  onSelectResult: (id: ToolId) => void;
};

export default function Header({
  onMenu,
  onHome,
  searchValue,
  onSearch,
  searchResults,
  onSelectResult,
}: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const searchRootRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const hasQuery = searchValue.trim().length > 0;
  const showResults = searchOpen && hasQuery;

  useEffect(() => {
    if (activeIndex >= 0) {
      optionRefs.current[activeIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setSearchOpen(false);
      setActiveIndex(-1);
      return;
    }

    if (event.key === "ArrowDown" && searchResults.length > 0) {
      event.preventDefault();
      setSearchOpen(true);
      setActiveIndex((current) => (current < 0 ? 0 : (current + 1) % searchResults.length));
      return;
    }

    if (event.key === "ArrowUp" && searchResults.length > 0) {
      event.preventDefault();
      setSearchOpen(true);
      setActiveIndex((current) => (current <= 0 ? searchResults.length - 1 : current - 1));
      return;
    }

    if (event.key === "Enter" && searchResults.length > 0) {
      event.preventDefault();
      const result = searchResults[activeIndex >= 0 ? activeIndex : 0];
      if (result) {
        onSelectResult(result.id);
        setSearchOpen(false);
        setActiveIndex(-1);
        searchInputRef.current?.blur();
      }
    }
  };

  const handleRootBlur = (event: FocusEvent<HTMLDivElement>) => {
    const nextTarget = event.relatedTarget;
    if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
      setSearchOpen(false);
      setActiveIndex(-1);
    }
  };

  const clearSearch = () => {
    onSearch("");
    setSearchOpen(false);
    setActiveIndex(-1);
    searchInputRef.current?.focus();
  };

  return (
    <header className="site-header">
      <button
        className="icon-button mobile-menu-button"
        onClick={onMenu}
        aria-label="Open navigation"
      >
        <Icon name="menu" size={19} />
      </button>
      <button
        type="button"
        className="mobile-brand"
        onClick={onHome}
        aria-label="Go to Numeriq Home"
      >
        <span className="brand-mark">
          <Icon name="brand" size={34} />
        </span>
        <span className="mobile-brand-copy">
          <span className="brand-name">Numeriq</span>
          <small>Mathematics Workspace</small>
        </span>
      </button>

      <div
        className="search-shell"
        ref={searchRootRef}
        role="search"
        onFocus={() => {
          if (hasQuery) setSearchOpen(true);
        }}
        onBlur={handleRootBlur}
      >
        <div className="global-search">
          <Icon name="search" size={18} />
          <input
            ref={searchInputRef}
            value={searchValue}
            onChange={(event) => {
              onSearch(event.target.value);
              setSearchOpen(true);
              setActiveIndex(-1);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (hasQuery) setSearchOpen(true);
            }}
            placeholder="Search tools, topics, or formulas..."
            aria-label="Search Numeriq tools"
            aria-expanded={showResults}
            aria-controls="numeriq-search-results"
            aria-autocomplete="list"
            aria-activedescendant={
              activeIndex >= 0 ? `numeriq-search-option-${activeIndex}` : undefined
            }
            role="combobox"
          />
          {searchValue && (
            <button
              type="button"
              className="search-clear"
              onClick={clearSearch}
              aria-label="Clear search"
            >
              <Icon name="close" size={15} />
            </button>
          )}
        </div>

        {showResults && (
          <div
            className="search-results"
            id="numeriq-search-results"
            role="listbox"
            aria-label="Search results"
          >
            {searchResults.length > 0 ? (
              <>
                <div className="search-results-heading">
                  <span>{searchResults.length === 1 ? "Best match" : "Tools and topics"}</span>
                  <span className="search-results-count">{searchResults.length} results</span>
                </div>
                <div className="search-results-list">
                  {searchResults.map((result, index) => (
                    <button
                      ref={(node) => {
                        optionRefs.current[index] = node;
                      }}
                      key={result.id}
                      id={`numeriq-search-option-${index}`}
                      type="button"
                      role="option"
                      aria-selected={activeIndex === index}
                      className={`search-result-option${activeIndex === index ? " is-active" : ""}`}
                      onMouseEnter={() => setActiveIndex(index)}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => {
                        onSelectResult(result.id);
                        setSearchOpen(false);
                        setActiveIndex(-1);
                        searchInputRef.current?.blur();
                      }}
                    >
                      <span className="search-result-icon" aria-hidden="true">
                        <Icon name={result.icon} size={18} />
                      </span>
                      <span className="search-result-copy">
                        <span className="search-result-title">{result.title}</span>
                        <span className="search-result-description">{result.description}</span>
                      </span>
                      <span className="search-result-meta">
                        <span className="search-result-category">{result.category}</span>
                        <Icon name="arrow-right" size={15} />
                      </span>
                    </button>
                  ))}
                </div>
                <div className="search-results-footer">
                  <span>
                    <kbd>↑</kbd>
                    <kbd>↓</kbd> to navigate
                  </span>
                  <span>
                    <kbd>Enter</kbd> to open
                  </span>
                  <span>
                    <kbd>Esc</kbd> to close
                  </span>
                </div>
              </>
            ) : (
              <div className="search-empty-state">
                <span className="search-empty-icon">
                  <Icon name="search" size={18} />
                </span>
                <div>
                  <strong>No matching tools found</strong>
                  <p>Try a tool name, topic, or term such as “derivative”, “matrix”, or “loan”.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
