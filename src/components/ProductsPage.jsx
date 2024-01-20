import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (selectedCategory) => {
    setCategoryFilter(selectedCategory);
  };

  const handleSortChange = (selectedSort) => {
    setSortBy(selectedSort);
  };

  const filteredAndSortedProducts = () => {
    let filteredProducts = [...products];

    if (categoryFilter) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === categoryFilter
      );
    }

    if (sortBy === "price") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high-to-low") {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    return filteredProducts;
  };

  return (
    <>
      <nav>
        <h4>Filter by category:</h4>
        <select onChange={(e) => handleCategoryChange(e.target.value)}>
          <option value="">All</option>
          {[...new Set(products.map((product) => product.category))].map(
            (category) => (
              <option key={category} value={category}>
                {category}
              </option>
            )
          )}
        </select>

        <h4>Sort by price: </h4>
        <select onChange={(e) => handleSortChange(e.target.value)}>
          <option value="">Default</option>
          <option value="price">Price Low to High</option>
          <option value="price-high-to-low">Price High to Low</option>
        </select>
      </nav>

      <main>
        {filteredAndSortedProducts().map((product) => (
          <div className="card" key={product.id}>
            <h1 className="title">{product.title}</h1>
            <p className="category">{product.category}</p>
            <span className="price">{`${product.price} €`}</span>
            <p className="description">{product.description}</p>
            <Link to={`/reviews/${product.id}`}>Show Reviews</Link>
          </div>
        ))}
      </main>
    </>
  );
};

export default ProductsPage;
