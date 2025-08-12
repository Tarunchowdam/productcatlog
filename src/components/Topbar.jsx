import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Topbar({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
  categories,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="topbar">
      <div className="topbar-inner">
        {/* Brand */}
        <div className="brand">
          <Link to="/" className="brand-link">
            Shoply
          </Link>
          <p className="brand-sub"> Product Listing</p>
        </div>

        {/* Hamburger for mobile */}
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          ☰
        </button>

        {/* Filters */}
        <div className={`filters-inline ${menuOpen ? "open" : ""}`}>
          <input
            aria-label="Search products"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="select"
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="select"
          >
            <option value="">Sort by</option>
            <option value="price-asc">Price:Low→High</option>
            <option value="price-desc">Price:High→Low</option>
            <option value="rating-desc">Rating:High→Low</option>
            <option value="title-asc">Title:A→Z</option>
            <option value="title-desc">Title:Z→A</option>
          </select>
        </div>
      </div>
    </header>
  );
}
