import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function Home({ loading, products }) {
  return (
    <main className="container">
      <section className="grid-wrap" aria-live="polite">
        {loading ? (
          <div className="grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div className="card-skeleton" key={i}>
                <div className="s-img" />
                <div className="s-line short" />
                <div className="s-line" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="empty">
            No products found. Try a different search or category.
          </div>
        ) : (
          <div className="grid">
            {products.map((p) => (
              <Link
                to={`/product/${p.id}`}
                key={p.id}
                className="card-link"
                aria-label={`Open ${p.title}`}
              >
                <ProductCard product={p} />
              </Link>
            ))}
          </div>
        )}
      </section>

      <footer className="footer">
        Data from{" "}
        <a href="https://fakestoreapi.com" target="_blank" rel="noreferrer">
          FakeStoreAPI
        </a>
      </footer>
    </main>
  );
}
