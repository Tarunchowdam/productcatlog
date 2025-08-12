import React, { useEffect, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Topbar from "./components/Topbar";

export default function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch("https://fakestoreapi.com/products").then((r) => r.json()),
      fetch("https://fakestoreapi.com/products/categories").then((r) =>
        r.json()
      ),
    ])
      .then(([prodData, catData]) => {
        setProducts(prodData);
        setCategories(catData);
      })
      .catch((err) => console.error("API error", err))
      .finally(() => setLoading(false));
  }, []);

  const visibleProducts = useMemo(() => {
    let out = [...products];

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      out = out.filter((p) => p.title.toLowerCase().includes(q));
    }
    if (category) {
      out = out.filter((p) => p.category === category);
    }
    if (sort === "price-asc") out.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") out.sort((a, b) => b.price - a.price);
    else if (sort === "rating-desc")
      out.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    else if (sort === "title-asc") out.sort((a, b) => a.title.localeCompare(b.title));
    else if (sort === "title-desc") out.sort((a, b) => b.title.localeCompare(a.title));

    return out;
  }, [products, search, category, sort]);

  return (
    <>
      <Topbar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
        categories={categories}
      />
      <Routes>
        <Route
          path="/"
          element={<Home loading={loading} products={visibleProducts} />}
        />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </>
  );
}
