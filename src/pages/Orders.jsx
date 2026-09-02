import { useEffect, useState } from "react";
import {
  Package,
  ArrowLeft,
  ShoppingBag,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { supabase } from "../lib/supabaseClient";

function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // =====================================================
  // LOAD ORDERS
  // =====================================================

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      // =================================================
      // GET USER
      // =================================================

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user) {
        setErrorMessage(
          "Please login to view your orders."
        );

        return;
      }

      // =================================================
      // GET ORDERS
      // =================================================

      const {
        data,
        error,
      } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        throw error;
      }

      setOrders(data || []);
    } catch (error) {
      console.error(
        "Orders loading error:",
        error
      );

      setErrorMessage(
        error.message ||
          "Unable to load your orders."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "";
    }

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div
        style={{
          minHeight: "calc(100vh - 80px)",
          background: "#080808",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Loading your orders...
      </div>
    );
  }

  // =====================================================
  // LOGIN REQUIRED
  // =====================================================

  if (
    errorMessage &&
    orders.length === 0
  ) {
    return (
      <div
        style={{
          minHeight: "calc(100vh - 80px)",
          background: "#080808",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "30px",
        }}
      >
        <div>

          <Package
            size={60}
            color="#ef0b16"
          />

          <h2>
            My Orders
          </h2>

          <p
            style={{
              color: "#999",
            }}
          >
            {errorMessage}
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/login")
            }
            style={{
              background: "#ef0b16",
              color: "#ffffff",
              border: "none",
              padding: "12px 24px",
              borderRadius: "7px",
              cursor: "pointer",
              fontWeight: "700",
            }}
          >
            Login
          </button>

        </div>
      </div>
    );
  }

  // =====================================================
  // NO ORDERS
  // =====================================================

  if (orders.length === 0) {
    return (
      <div
        style={{
          minHeight: "calc(100vh - 80px)",
          background: "#080808",
          color: "#ffffff",
          padding: "60px 20px",
        }}
      >

        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >

          <button
            type="button"
            onClick={() => navigate("/")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "transparent",
              color: "#aaa",
              border: "none",
              cursor: "pointer",
              marginBottom: "50px",
            }}
          >
            <ArrowLeft size={18} />
            Continue Shopping
          </button>

          <div
            style={{
              minHeight: "45vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >

            <ShoppingBag
              size={60}
              color="#ef0b16"
            />

            <h1>
              No Orders Yet
            </h1>

            <p
              style={{
                color: "#999",
                marginBottom: "25px",
              }}
            >
              You haven't placed any orders yet.
            </p>

            <button
              type="button"
              onClick={() => navigate("/")}
              style={{
                background: "#ef0b16",
                color: "#ffffff",
                border: "none",
                padding: "12px 24px",
                borderRadius: "7px",
                cursor: "pointer",
                fontWeight: "700",
              }}
            >
              Start Shopping
            </button>

          </div>

        </div>

      </div>
    );
  }

  // =====================================================
  // ORDERS PAGE
  // =====================================================

  return (
    <div
      style={{
        minHeight: "calc(100vh - 80px)",
        background: "#080808",
        color: "#ffffff",
        padding: "60px 20px 80px",
      }}
    >

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >

        {/* BACK */}

        <button
          type="button"
          onClick={() => navigate("/profile")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "transparent",
            color: "#aaa",
            border: "none",
            cursor: "pointer",
            marginBottom: "35px",
          }}
        >
          <ArrowLeft size={18} />
          Back to Profile
        </button>

        {/* HEADER */}

        <div
          style={{
            marginBottom: "40px",
          }}
        >

          <span
            style={{
              color: "#ef0b16",
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "2px",
            }}
          >
            MY ACCOUNT
          </span>

          <h1
            style={{
              fontSize: "42px",
              margin: "10px 0",
            }}
          >
            My <span style={{ color: "#ef0b16" }}>
              Orders
            </span>
          </h1>

          <p
            style={{
              color: "#999",
            }}
          >
            View your previous ModzLab orders.
          </p>

        </div>

        {/* ORDERS */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >

          {orders.map((order) => (

            <div
              key={order.id}
              style={{
                background: "#111111",
                border: "1px solid #242424",
                borderRadius: "12px",
                padding: "25px",
              }}
            >

              {/* ORDER TOP */}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "20px",
                  flexWrap: "wrap",
                  marginBottom: "20px",
                }}
              >

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                  }}
                >

                  <div
                    style={{
                      width: "45px",
                      height: "45px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#1c1c1c",
                      borderRadius: "8px",
                      color: "#ef0b16",
                    }}
                  >
                    <Package size={22} />
                  </div>

                  <div>

                    <strong>
                      Order #{order.id}
                    </strong>

                    <p
                      style={{
                        margin: "5px 0 0",
                        color: "#888",
                        fontSize: "13px",
                      }}
                    >
                      {formatDate(
                        order.created_at
                      )}
                    </p>

                  </div>

                </div>

                {/* STATUS */}

                <span
                  style={{
                    padding: "7px 12px",
                    borderRadius: "20px",
                    background:
                      order.status ===
                      "Delivered"
                        ? "#123d1d"
                        : "#3b2d0b",
                    color:
                      order.status ===
                      "Delivered"
                        ? "#55d66b"
                        : "#f5c451",
                    fontSize: "12px",
                    fontWeight: "700",
                  }}
                >
                  {order.status || "Pending"}
                </span>

              </div>

              {/* ORDER DETAILS */}

              <div
                style={{
                  borderTop:
                    "1px solid #242424",
                  paddingTop: "18px",
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(3, 1fr)",
                  gap: "20px",
                }}
              >

                <div>

                  <span
                    style={{
                      display: "block",
                      color: "#777",
                      fontSize: "12px",
                      marginBottom: "5px",
                    }}
                  >
                    Customer
                  </span>

                  <strong>
                    {order.customer_name}
                  </strong>

                </div>

                <div>

                  <span
                    style={{
                      display: "block",
                      color: "#777",
                      fontSize: "12px",
                      marginBottom: "5px",
                    }}
                  >
                    Payment
                  </span>

                  <strong>
                    {order.payment_method}
                  </strong>

                </div>

                <div>

                  <span
                    style={{
                      display: "block",
                      color: "#777",
                      fontSize: "12px",
                      marginBottom: "5px",
                    }}
                  >
                    Total
                  </span>

                  <strong
                    style={{
                      color: "#ef0b16",
                      fontSize: "18px",
                    }}
                  >
                    ₹
                    {Number(
                      order.total_amount
                    ).toLocaleString("en-IN")}
                  </strong>

                </div>

              </div>

              {/* ADDRESS */}

              <div
                style={{
                  marginTop: "20px",
                  paddingTop: "18px",
                  borderTop:
                    "1px solid #242424",
                }}
              >

                <span
                  style={{
                    display: "block",
                    color: "#777",
                    fontSize: "12px",
                    marginBottom: "5px",
                  }}
                >
                  Delivery Address
                </span>

                <p
                  style={{
                    margin: 0,
                    color: "#ccc",
                    lineHeight: "1.5",
                  }}
                >
                  {order.address},{" "}
                  {order.city} -{" "}
                  {order.pincode}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Orders;