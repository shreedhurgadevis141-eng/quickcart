import { useState } from 'react';
import Header from './components/Header';
import CartSidebar from './components/CartSidebar';
import ProductList from './components/ProductList';
import { products } from './data/products';
import './styles/App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  function addToCart(product) {
    console.log('Adding to cart:', product);
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  }

  function removeFromCart(id) {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  }

  function updateQuantity(id, newQuantity) {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  }

  function toggleCart() {
    setIsCartOpen(prev => !prev);
  }

  function getTotalItems() {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }

  return (
    <div className="app">
      <Header onCartClick={toggleCart} cartItemCount={getTotalItems()} />
      <main className="main-content">
        <ProductList products={products} onAddToCart={addToCart} />
      </main>
      <CartSidebar
        isOpen={isCartOpen}
        onClose={toggleCart}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
      />
    </div>
  );
}

export default App;
