import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((r) => r.json())
      .then((data) => setProduct(data))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="container">Loading product...</div>;
  if (!product) return <div className="container">Product not found.</div>;

  return (
    <main className="container">
      <button className="back-btn" onClick={() => nav(-1)}>← Back</button>
      <div className="product-detail-card">
        <div className="gallery">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="detail-info">
          <h1 className="detail-title">{product.title}</h1>
          <div className="detail-meta">
            <div className="price-prim">₹{(product.price * 83).toFixed(0)}</div>
            <div className="price-us">(${product.price.toFixed(2)})</div>
          </div>
          <p className="desc">{product.description}</p>
          <div className="info-row">
            {/* <div><strong>Category:</strong> {product.category}</div> */}
            {/* <div><strong>Product ID:</strong> {product.id}</div> */}
          </div>
          <div className="info-row rating-row">
            <div className="rating-pill">⭐ {product.rating?.rate ?? "—"}</div>
            <div className="muted">({product.rating?.count ?? 0} reviews)</div>
          </div>
          <div className="actions">
            <button className="btn primary">Add to Cart</button>
            <button className="btn outline">Buy Now</button>
          </div>
        </div>
      </div>
    </main>
  );
}
