import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./CartPanel.css";

function CartPanel({ isOpen, onClose }) {
  const navigate = useNavigate();

  const {
    cartItems,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="cart-overlay"
          onClick={onClose}
        ></div>
      )}

      {/* Cart Panel */}
      <aside className={`cart-panel ${isOpen ? "open" : ""}`}>

        {/* Header */}
        <div className="cart-header">

          <div>
            <p>YOUR</p>
            <h2>Shopping Cart</h2>
          </div>

          <button
            className="cart-close-btn"
            onClick={onClose}
            title="Close cart"
          >
            <X size={22} />
          </button>

        </div>

        {/* Cart Content */}
        <div className="cart-content">

          {cartItems.length === 0 ? (

            <div className="empty-cart">

              <ShoppingBag size={55} />

              <h3>Your cart is empty</h3>

              <p>
                Add some products to your cart
                and they will appear here.
              </p>

              <button
                className="continue-shopping-btn"
                onClick={onClose}
              >
                Continue Shopping
              </button>

            </div>

          ) : (

            <div className="cart-items">

              {cartItems.map((item) => (

                <div
                  className="cart-item"
                  key={item.id}
                >

                  {/* Image */}
                  <div className="cart-item-image">

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                  </div>

                  {/* Details */}
                  <div className="cart-item-details">

                    <div className="cart-item-top">

                      <div>

                        <p className="cart-item-category">
                          {item.category}
                        </p>

                        <h3>
                          {item.name}
                        </h3>

                      </div>

                      <button
                        className="remove-item-btn"
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>

                    <div className="cart-item-bottom">

                      <strong>
                        ₹{item.price.toLocaleString("en-IN")}
                      </strong>

                      <div className="quantity-control">

                        <button
                          onClick={() =>
                            decreaseQuantity(item.id)
                          }
                        >
                          <Minus size={14} />
                        </button>

                        <span>
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            increaseQuantity(item.id)
                          }
                        >
                          <Plus size={14} />
                        </button>

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* Footer */}
        {cartItems.length > 0 && (

          <div className="cart-footer">

            <div className="cart-total">

              <span>Total</span>

              <strong>
                ₹{cartTotal.toLocaleString("en-IN")}
              </strong>

            </div>

            {/* Checkout */}
            <button
              type="button"
              className="checkout-btn"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>

            {/* Continue Shopping */}
            <button
              type="button"
              className="continue-shopping-btn"
              onClick={onClose}
            >
              Continue Shopping
            </button>

          </div>

        )}

      </aside>
    </>
  );
}

export default CartPanel;