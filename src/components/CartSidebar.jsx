import React from 'react';

import { useCart } from '../context/CartContext';

import '../styles/CartSidebar.css';

function CartSidebar() {

  // Use Cart Context
  const {
    isCartOpen,
    toggleCart,
    cart,
    updateQuantity,
    removeFromCart,
    getTotalPrice
  } = useCart();

  return (
    <div
      className={`cart-sidebar ${
        isCartOpen ? 'open' : ''
      }`}
    >

      {/* Header */}
      <div className="cart-header">

        <h2>Your Cart</h2>

        <button
          type="button"
          onClick={toggleCart}
          className="close-btn"
        >
          X
        </button>

      </div>

      {/* Cart Items */}
      <div className="cart-items">

        {cart.length === 0 ? (

          <p className="empty-cart">
            Your cart is empty
          </p>

        ) : (

          cart.map((item) => (

            <div
              key={item.id}
              className="cart-item"
            >

              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />

              <div className="cart-item-details">

                <h4 className="cart-item-name">
                  {item.name}
                </h4>

                <p className="cart-item-price">
                  ₹{item.price}
                </p>

                <p className="cart-item-subtotal">
                  Subtotal: ₹
                  {item.price * item.quantity}
                </p>

              </div>

              {/* Quantity Controls */}
              <div className="cart-item-quantity">

                <button
                  type="button"
                  className="quantity-btn"
                  onClick={() =>
                    updateQuantity(
                      item.id,
                      item.quantity - 1
                    )
                  }
                >
                  -
                </button>

                <span className="quantity-display">
                  {item.quantity}
                </span>

                <button
                  type="button"
                  className="quantity-btn"
                  onClick={() =>
                    updateQuantity(
                      item.id,
                      item.quantity + 1
                    )
                  }
                >
                  +
                </button>

              </div>

              {/* Remove Button */}
              <button
                type="button"
                className="remove-btn"
                onClick={() =>
                  removeFromCart(item.id)
                }
                aria-label="Remove item"
              >
                X
              </button>

            </div>

          ))

        )}

      </div>

      {/* Footer */}
      {cart.length > 0 && (

        <div className="cart-footer">

          <div className="cart-total">

            <span>Total:</span>

            <span>
              ₹{getTotalPrice()}
            </span>

          </div>

        </div>

      )}

    </div>
  );
}

export default CartSidebar;