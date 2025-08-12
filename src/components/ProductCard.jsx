import React from "react";

export default function ProductCard({ product }) {
  const INR_RATE = 83;
  const inr = (product.price * INR_RATE).toFixed(0);

  return (
    <article className="product-card">
      <div className="thumb">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="card-body">
        <h2 className="card-title">{product.title}</h2>
        <div className="meta">
          <div className="price">₹{inr}</div>
          <div className="usd">(${product.price.toFixed(2)})</div>
        </div>
      </div>
    </article>
  );
}
