import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
    const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getCartTotal,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2>Your Cart is Empty</h2>
        <p className="text-muted">
          Add some bike accessories to your cart.
        </p>

        <Link to="/" className="btn btn-dark mt-3">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <h2 className="mb-4">Shopping Cart</h2>

      <div className="row">

        {/* Cart Products */}
        <div className="col-lg-8">

          {cartItems.map((item) => (
            <div
              className="card mb-3 shadow-sm"
              key={item.id}
            >
              <div className="card-body">

                <div className="row align-items-center">

                  {/* Image */}
                  <div className="col-md-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-fluid rounded"
                    />
                  </div>

                  {/* Product */}
                  <div className="col-md-4">
                    <h5>{item.name}</h5>

                    <p className="text-muted mb-0">
                      ₹{item.price}
                    </p>
                  </div>

                  {/* Quantity */}
                  <div className="col-md-3">

                    <div className="d-flex align-items-center gap-2">

                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() =>
                          increaseQuantity(item.id)
                        }
                      >
                        +
                      </button>

                    </div>

                  </div>

                  {/* Price */}
                  <div className="col-md-2">

                    <strong>
                      ₹{item.price * item.quantity}
                    </strong>

                  </div>

                  {/* Remove */}
                  <div className="col-md-1">

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                    >
                      ×
                    </button>

                  </div>

                </div>

              </div>
            </div>
          ))}

        </div>

        {/* Order Summary */}
        <div className="col-lg-4">

          <div className="card shadow-sm">

            <div className="card-body">

              <h4>Order Summary</h4>

              <hr />

              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal</span>

                <strong>
                  ₹{getCartTotal()}
                </strong>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span>Shipping</span>

                <span>Free</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-4">

                <strong>Total</strong>

                <strong>
                  ₹{getCartTotal()}
                </strong>

              </div>

              <button
  type="button"
  className="btn btn-dark w-100"
  onClick={() => navigate("/checkout")}
>
  Proceed to Checkout
</button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Cart;