import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  User,
  CreditCard,
  Truck,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import { supabase } from "../lib/supabaseClient";

import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const {
    cartItems,
    cartTotal,
    getCartTotal,
    clearCart,
  } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    paymentMethod: "Cash on Delivery",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================================
  // PLACE ORDER
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setLoading(true);

    try {
      // Check Supabase authentication
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setErrorMessage(
          "Please login before placing your order."
        );
        setLoading(false);
        return;
      }

      if (cartItems.length === 0) {
        setErrorMessage("Your cart is empty.");
        setLoading(false);
        return;
      }

      const totalAmount = getCartTotal();

      // ======================================
      // CREATE ORDER
      // ======================================

      const { data: order, error: orderError } =
        await supabase
          .from("orders")
          .insert([
            {
              user_id: user.id,
              customer_name: formData.name.trim(),
              mobile: formData.mobile.trim(),
              email: formData.email.trim(),
              address: formData.address.trim(),
              city: formData.city.trim(),
              pincode: formData.pincode.trim(),
              payment_method: formData.paymentMethod,
              total_amount: totalAmount,
              status: "Pending",
            },
          ])
          .select()
          .single();

      if (orderError) {
        throw new Error(orderError.message);
      }

      // ======================================
      // CREATE ORDER ITEMS
      // ======================================

      const orderItems = cartItems.map((item) => ({
        order_id: order.id,
        product_id: item.id,
        product_name: item.name,
        quantity: Number(item.quantity),
        unit_price: Number(item.price),
        subtotal:
          Number(item.price) * Number(item.quantity),
      }));

      const { error: itemsError } =
        await supabase
          .from("order_items")
          .insert(orderItems);

      if (itemsError) {
        // Remove the order if order items failed
        await supabase
          .from("orders")
          .delete()
          .eq("id", order.id);

        throw new Error(itemsError.message);
      }

      // ======================================
      // SUCCESS
      // ======================================

      alert("Order placed successfully!");

      clearCart();

      navigate("/");
    } catch (error) {
      console.error("Checkout error:", error);

      setErrorMessage(
        error.message ||
          "Something went wrong while placing your order."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // EMPTY CART
  // ==========================================

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="checkout-empty">
          <ShoppingBag size={60} />

          <h2>Your Cart is Empty</h2>

          <p>
            Add some products before proceeding to
            checkout.
          </p>

          <button
            className="checkout-back-btn"
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={18} />
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // CHECKOUT PAGE
  // ==========================================

  return (
    <div className="checkout-page">
      <div className="checkout-container">

        {/* ====================================
            HEADER
        ==================================== */}

        <div className="checkout-header">
          <div>
            <button
              type="button"
              className="checkout-back-link"
              onClick={() => navigate("/")}
            >
              <ArrowLeft size={17} />
              Continue Shopping
            </button>

            <h1>Checkout</h1>

            <p>
              Complete your order and get your
              accessories delivered.
            </p>
          </div>
        </div>

        {/* ====================================
            MAIN CONTENT
        ==================================== */}

        <div className="checkout-layout">

          {/* ==================================
              LEFT - DELIVERY FORM
          ================================== */}

          <div className="checkout-form-card">

            <div className="checkout-card-header">
              <div className="checkout-icon">
                <MapPin size={21} />
              </div>

              <div>
                <h2>Delivery Information</h2>
                <p>
                  Enter your delivery details
                </p>
              </div>
            </div>

            <form
              id="checkout-form"
              onSubmit={handleSubmit}
            >

              {/* NAME */}

              <div className="checkout-input-group">
                <label>Full Name</label>

                <div className="checkout-input-wrapper">
                  <User size={19} />

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* MOBILE + EMAIL */}

              <div className="checkout-two-columns">

                <div className="checkout-input-group">
                  <label>Mobile Number</label>

                  <div className="checkout-input-wrapper">
                    <Phone size={19} />

                    <input
                      type="tel"
                      name="mobile"
                      placeholder="10 digit mobile number"
                      value={formData.mobile}
                      onChange={handleChange}
                      pattern="[0-9]{10}"
                      maxLength="10"
                      required
                    />
                  </div>
                </div>

                <div className="checkout-input-group">
                  <label>Email Address</label>

                  <div className="checkout-input-wrapper">
                    <Mail size={19} />

                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

              </div>

              {/* ADDRESS */}

              <div className="checkout-input-group">
                <label>Delivery Address</label>

                <textarea
                  name="address"
                  placeholder="House no., street, area, landmark..."
                  rows="4"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* CITY + PINCODE */}

              <div className="checkout-two-columns">

                <div className="checkout-input-group">
                  <label>City</label>

                  <input
                    type="text"
                    name="city"
                    placeholder="Enter your city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="checkout-input-group">
                  <label>Pincode</label>

                  <input
                    type="text"
                    name="pincode"
                    placeholder="6 digit pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    pattern="[0-9]{6}"
                    maxLength="6"
                    required
                  />
                </div>

              </div>

              {/* PAYMENT */}

              <div className="payment-section">

                <div className="checkout-card-header payment-header">
                  <div className="checkout-icon">
                    <CreditCard size={21} />
                  </div>

                  <div>
                    <h2>Payment Method</h2>
                    <p>
                      Choose your preferred payment
                      method
                    </p>
                  </div>
                </div>

                {/* CASH ON DELIVERY */}

                <label
                  className={`payment-option ${
                    formData.paymentMethod ===
                    "Cash on Delivery"
                      ? "selected"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Cash on Delivery"
                    checked={
                      formData.paymentMethod ===
                      "Cash on Delivery"
                    }
                    onChange={handleChange}
                  />

                  <div className="payment-option-icon">
                    <Truck size={21} />
                  </div>

                  <div className="payment-option-content">
                    <strong>
                      Cash on Delivery
                    </strong>

                    <span>
                      Pay when your order arrives
                    </span>
                  </div>
                </label>

                {/* ONLINE PAYMENT */}

                <label
                  className={`payment-option ${
                    formData.paymentMethod ===
                    "Online Payment"
                      ? "selected"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Online Payment"
                    checked={
                      formData.paymentMethod ===
                      "Online Payment"
                    }
                    onChange={handleChange}
                  />

                  <div className="payment-option-icon">
                    <CreditCard size={21} />
                  </div>

                  <div className="payment-option-content">
                    <strong>
                      Online Payment
                    </strong>

                    <span>
                      Pay securely online
                    </span>
                  </div>
                </label>

              </div>

              {/* ERROR */}

              {errorMessage && (
                <div className="checkout-error">
                  {errorMessage}
                </div>
              )}

              {/* PLACE ORDER */}

              <button
                type="submit"
                className="place-order-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="checkout-spinner"></span>
                    Placing Order...
                  </>
                ) : (
                  <>
                    <ShoppingBag size={19} />
                    Place Order
                  </>
                )}
              </button>

            </form>

          </div>

          {/* ==================================
              RIGHT - ORDER SUMMARY
          ================================== */}

          <div className="order-summary-card">

            <div className="summary-header">
              <div>
                <h2>Order Summary</h2>

                <p>
                  {cartItems.length}{" "}
                  {cartItems.length === 1
                    ? "item"
                    : "items"}{" "}
                  in your cart
                </p>
              </div>

              <ShoppingBag size={23} />
            </div>

            {/* PRODUCTS */}

            <div className="summary-products">

              {cartItems.map((item) => (
                <div
                  className="summary-product"
                  key={item.id}
                >
                  <div className="summary-product-image">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                      />
                    ) : (
                      <ShoppingBag size={25} />
                    )}
                  </div>

                  <div className="summary-product-info">
                    <h3>{item.name}</h3>

                    <p>
                      Quantity: {item.quantity}
                    </p>

                    <span>
                      ₹
                      {Number(item.price).toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  </div>

                  <strong>
                    ₹
                    {(
                      Number(item.price) *
                      Number(item.quantity)
                    ).toLocaleString("en-IN")}
                  </strong>
                </div>
              ))}

            </div>

            {/* TOTAL */}

            <div className="summary-divider"></div>

            <div className="summary-row">
              <span>Subtotal</span>

              <strong>
                ₹
                {Number(
                  getCartTotal()
                ).toLocaleString("en-IN")}
              </strong>
            </div>

            <div className="summary-row">
              <span>Delivery</span>

              <strong className="free-text">
                FREE
              </strong>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span>Total</span>

              <strong>
                ₹
                {Number(
                  getCartTotal()
                ).toLocaleString("en-IN")}
              </strong>
            </div>

            {/* SECURE CHECKOUT */}

            <div className="secure-checkout">
              <span>🔒</span>

              <div>
                <strong>Secure Checkout</strong>

                <p>
                  Your order information is
                  protected.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Checkout;