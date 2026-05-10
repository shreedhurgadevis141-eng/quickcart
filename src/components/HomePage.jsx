import React from 'react';

import ProductList from './ProductList';

import { useCart } from '../context/CartContext';

function HomePage({ products, searchTerm }) {

  // Get addToCart from Context
  const { addToCart } = useCart();

  // Filter products
  const filteredProducts = products.filter((p) =>
    p.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-page">

      {/* Search Result Count */}
      {searchTerm && (
        <p className="search-results">
          Found {filteredProducts.length} product
          {filteredProducts.length !== 1 ? 's' : ''}
          {' '}for "{searchTerm}"
        </p>
      )}

      {/* Product List */}
      <ProductList
        products={filteredProducts}
        onAddToCart={addToCart}
      />

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <p className="no-results">
          No products found
        </p>
      )}

    </div>
  );
}

export default HomePage;