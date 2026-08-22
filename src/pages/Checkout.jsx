import { useState } from "react";
import { useCart } from "../context/CartContext";

function Checkout() {
  const { cartItems, getCartTotal } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    paymentMethod: "Cash on Delivery",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Order Details:", {
      customer: formData,
      products: cartItems,
      total: getCartTotal(),
    });

    alert("Order placed successfully!");
  };

  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h3>Your cart is empty</h3>
        <p className="text-muted">
          Please add products before checkout.
        </p>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <h2 className="mb-4">Checkout</h2>

      <div className="row">

        {/* Customer Details */}
        <div className="col-lg-7">

          <div className="card shadow-sm mb-4">
            <div className="card-body">

              <h4 className="mb-4">
                Delivery Information
              </h4>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="row">

                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Mobile Number
                    </label>

                    <input
                      type="tel"
                      name="mobile"
                      className="form-control"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Address
                  </label>

                  <textarea
                    name="address"
                    className="form-control"
                    rows="3"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="row">

                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      City
                    </label>

                    <input
                      type="text"
                      name="city"
                      className="form-control"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Pincode
                    </label>

                    <input
                      type="text"
                      name="pincode"
                      className="form-control"
                      value={formData.pincode}
                      onChange={handleChange}
                      required
                    />
                  </div>

                </div>

                <h5 className="mt-3">
                  Payment Method
                </h5>

                <div className="form-check mt-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    value="Cash on Delivery"
                    checked={
                      formData.paymentMethod ===
                      "Cash on Delivery"
                    }
                    onChange={handleChange}
                  />

                  <label className="form-check-label">
                    Cash on Delivery
                  </label>
                </div>

                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    value="Online Payment"
                    checked={
                      formData.paymentMethod ===
                      "Online Payment"
                    }
                    onChange={handleChange}
                  />

                  <label className="form-check-label">
                    Online Payment
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn btn-dark w-100"
                >
                  Place Order
                </button>

              </form>

            </div>
          </div>

        </div>

        {/* Order Summary */}
        <div className="col-lg-5">

          <div className="card shadow-sm">

            <div className="card-body">

              <h4 className="mb-4">
                Order Summary
              </h4>

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-between mb-3"
                >
                  <div>
                    <strong>{item.name}</strong>

                    <br />

                    <small className="text-muted">
                      Qty: {item.quantity}
                    </small>
                  </div>

                  <span>
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}

              <hr />

              <div className="d-flex justify-content-between">
                <strong>Total</strong>

                <strong>
                  ₹{getCartTotal()}
                </strong>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;