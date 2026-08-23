import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Checkout.css";

function Checkout() {
  const { cartItems, cartTotal } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    paymentMethod: "Cash on Delivery",
  });

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  // =====================================================
  // PLACE ORDER
  // =====================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check login status
    const isLoggedIn =
      localStorage.getItem("isLoggedIn");

    // =================================================
    // USER NOT LOGGED IN
    // =================================================

    if (isLoggedIn !== "true") {

      navigate("/login", {
        state: {
          from: "/checkout",
        },
      });

      return;
    }


    // =================================================
    // USER IS LOGGED IN
    // =================================================

    const orderDetails = {
      customer: formData,
      products: cartItems,
      total: cartTotal,
      paymentMethod: formData.paymentMethod,
      orderDate: new Date().toISOString(),
    };

    console.log(
      "Order Details:",
      orderDetails
    );

    alert(
      "Order placed successfully!"
    );
  };


  // =====================================================
  // EMPTY CART
  // =====================================================

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">

        <div className="checkout-empty">

          <h2>
            Your Cart Is Empty
          </h2>

          <p>
            Please add products before
            proceeding to checkout.
          </p>

        </div>

      </div>
    );
  }


  return (
    <div className="checkout-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="checkout-header">

        <div className="checkout-container">

          <div className="checkout-brand">
            MODZLAB
          </div>

          <h1>
            Checkout
          </h1>

          <p>
            Complete your order securely
          </p>

        </div>

      </div>


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div className="checkout-container">

        <div className="checkout-layout">


          {/* =================================================
              DELIVERY INFORMATION
          ================================================= */}

          <div className="delivery-card checkout-card">

            <div className="checkout-section-heading">

              <div className="checkout-number">
                01
              </div>

              <div>

                <h2>
                  Delivery Information
                </h2>

                <p>
                  Enter your delivery details
                </p>

              </div>

            </div>


            {/* FORM */}

            <form
              id="checkout-form"
              onSubmit={handleSubmit}
              className="checkout-form"
            >

              {/* FULL NAME */}

              <div className="checkout-field">

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* MOBILE + EMAIL */}

              <div className="checkout-grid">

                <div className="checkout-field">

                  <label>
                    Mobile Number
                  </label>

                  <input
                    type="tel"
                    name="mobile"
                    placeholder="Enter mobile number"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                  />

                </div>


                <div className="checkout-field">

                  <label>
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>


              {/* ADDRESS */}

              <div className="checkout-field">

                <label>
                  Delivery Address
                </label>

                <textarea
                  name="address"
                  placeholder="House no, street, area..."
                  rows="4"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* CITY + PINCODE */}

              <div className="checkout-grid">

                <div className="checkout-field">

                  <label>
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    placeholder="Enter city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />

                </div>


                <div className="checkout-field">

                  <label>
                    Pincode
                  </label>

                  <input
                    type="text"
                    name="pincode"
                    placeholder="Enter pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

            </form>

          </div>


          {/* =================================================
              ORDER SUMMARY
          ================================================= */}

          <div className="summary-card">

            <div className="order-summary">

              {/* SUMMARY HEADER */}

              <div className="summary-top">

                <div>

                  <span className="summary-label">
                    YOUR ORDER
                  </span>

                  <h2>
                    Order Summary
                  </h2>

                </div>

                <span className="item-badge">
                  {cartItems.length} Items
                </span>

              </div>


              {/* PRODUCTS */}

              <div className="summary-products">

                {cartItems.map((item) => (

                  <div
                    className="summary-product"
                    key={item.id}
                  >

                    <div className="summary-image">

                      {item.image ? (

                        <img
                          src={item.image}
                          alt={item.name}
                        />

                      ) : (

                        <span>
                          🏍️
                        </span>

                      )}

                    </div>


                    <div className="summary-product-info">

                      <h3>
                        {item.name}
                      </h3>

                      <p>
                        Qty: {item.quantity}
                      </p>

                    </div>


                    <div className="summary-price">

                      ₹
                      {Number(item.price) *
                        item.quantity}

                    </div>

                  </div>

                ))}

              </div>


              {/* CALCULATION */}

              <div className="summary-calculation">

                <div className="summary-line">

                  <span>
                    Subtotal
                  </span>

                  <strong>
                    ₹{cartTotal}
                  </strong>

                </div>


                <div className="summary-line">

                  <span>
                    Delivery
                  </span>

                  <strong className="free">
                    FREE
                  </strong>

                </div>


                <div className="summary-divider"></div>


                <div className="summary-total">

                  <span>
                    Total
                  </span>

                  <strong>
                    ₹{cartTotal}
                  </strong>

                </div>

              </div>


              {/* SECURITY */}

              <div className="checkout-security">

                <span className="security-icon">
                  🔒
                </span>

                <div>

                  <strong>
                    Secure Checkout
                  </strong>

                  <p>
                    Your information is protected
                  </p>

                </div>

              </div>

            </div>

          </div>


          {/* =================================================
              PAYMENT METHOD
          ================================================= */}

          <div className="payment-card checkout-card">

            {/* HEADING */}

            <div className="checkout-section-heading">

              <div className="checkout-number">
                02
              </div>

              <div>

                <h2>
                  Payment Method
                </h2>

                <p>
                  Choose your preferred payment option
                </p>

              </div>

            </div>


            {/* CASH ON DELIVERY */}

            <label className="payment-option">

              <input
                type="radio"
                name="paymentMethod"
                value="Cash on Delivery"
                checked={
                  formData.paymentMethod ===
                  "Cash on Delivery"
                }
                onChange={handleChange}
                form="checkout-form"
              />

              <div className="payment-content">

                <strong>
                  Cash on Delivery
                </strong>

                <span>
                  Pay when your order arrives
                </span>

              </div>

            </label>


            {/* ONLINE PAYMENT */}

            <label className="payment-option">

              <input
                type="radio"
                name="paymentMethod"
                value="Online Payment"
                checked={
                  formData.paymentMethod ===
                  "Online Payment"
                }
                onChange={handleChange}
                form="checkout-form"
              />

              <div className="payment-content">

                <strong>
                  Online Payment
                </strong>

                <span>
                  Pay securely using online payment
                </span>

              </div>

            </label>


            {/* PLACE ORDER */}

            <button
              type="submit"
              form="checkout-form"
              className="place-order-button"
            >

              <span>
                PLACE ORDER
              </span>

              <span className="arrow">
                →
              </span>

            </button>


            {/* LOGIN MESSAGE */}

            <p
              style={{
                textAlign: "center",
                marginTop: "15px",
                fontSize: "12px",
                color: "#777",
              }}
            >
              You must be signed in to place an order.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;