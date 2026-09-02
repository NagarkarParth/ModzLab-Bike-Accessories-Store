import { useEffect, useState } from "react";
import {
  Heart,
  ShoppingCart,
  Trash2,
  ArrowLeft,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { supabase } from "../lib/supabaseClient";
import products from "../data/products";
import { useCart } from "../context/CartContext";

import "./Wishlist.css";

function Wishlist() {
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // =====================================================
  // LOAD WISHLIST
  // =====================================================

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user) {
        setErrorMessage(
          "Please login to view your wishlist."
        );

        return;
      }

      // =================================================
      // GET USER WISHLIST
      // =================================================

      const {
        data,
        error,
      } = await supabase
        .from("wishlist")
        .select(
          "id, user_id, product_id, created_at"
        )
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        throw error;
      }

      // =================================================
      // MATCH DATABASE PRODUCTS WITH LOCAL PRODUCTS
      // =================================================

      const matchedProducts = data
        .map((wishlistItem) => {
          const product = products.find(
            (item) =>
              String(item.id) ===
              String(wishlistItem.product_id)
          );

          if (!product) {
            return null;
          }

          return {
            ...product,
            wishlistId: wishlistItem.id,
          };
        })
        .filter(Boolean);

      setWishlistItems(matchedProducts);
    } catch (error) {
      console.error(
        "Wishlist loading error:",
        error
      );

      setErrorMessage(
        error.message ||
          "Unable to load your wishlist."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // REMOVE FROM WISHLIST
  // =====================================================

  const removeFromWishlist = async (
    wishlistId
  ) => {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        navigate("/login");
        return;
      }

      const {
        error,
      } = await supabase
        .from("wishlist")
        .delete()
        .eq("id", wishlistId)
        .eq("user_id", user.id);

      if (error) {
        throw error;
      }

      setWishlistItems(
        (currentItems) =>
          currentItems.filter(
            (item) =>
              item.wishlistId !== wishlistId
          )
      );
    } catch (error) {
      console.error(
        "Remove wishlist error:",
        error
      );

      alert(
        error.message ||
          "Unable to remove product."
      );
    }
  };

  // =====================================================
  // ADD TO CART
  // =====================================================

  const handleAddToCart = (product) => {
    addToCart(product);

    window.dispatchEvent(
      new Event("open-cart-panel")
    );
  };

  // =====================================================
  // OPEN PRODUCT
  // =====================================================

  const openProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="wishlist-page">
        <div className="wishlist-loading">
          Loading your wishlist...
        </div>
      </div>
    );
  }

  // =====================================================
  // LOGIN REQUIRED
  // =====================================================

  if (
    errorMessage &&
    wishlistItems.length === 0
  ) {
    return (
      <div className="wishlist-page">
        <div className="wishlist-empty">

          <Heart size={60} />

          <h2>Wishlist</h2>

          <p>
            {errorMessage}
          </p>

          <button
            type="button"
            className="wishlist-primary-btn"
            onClick={() =>
              navigate("/login")
            }
          >
            Login
          </button>

        </div>
      </div>
    );
  }

  // =====================================================
  // EMPTY WISHLIST
  // =====================================================

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page">

        <div className="wishlist-container">

          <button
            type="button"
            className="wishlist-back-btn"
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={18} />
            Continue Shopping
          </button>

          <div className="wishlist-empty">

            <Heart size={60} />

            <h2>
              Your Wishlist is Empty
            </h2>

            <p>
              Save products you love and
              find them here later.
            </p>

            <button
              type="button"
              className="wishlist-primary-btn"
              onClick={() => navigate("/")}
            >
              Explore Products
            </button>

          </div>

        </div>

      </div>
    );
  }

  // =====================================================
  // WISHLIST PAGE
  // =====================================================

  return (
    <div className="wishlist-page">

      <div className="wishlist-container">

        {/* HEADER */}

        <div className="wishlist-header">

          <button
            type="button"
            className="wishlist-back-btn"
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={18} />
            Continue Shopping
          </button>

          <span className="wishlist-label">
            MY ACCOUNT
          </span>

          <h1>
            My <span>Wishlist</span>
          </h1>

          <p>
            {wishlistItems.length}{" "}
            {wishlistItems.length === 1
              ? "product"
              : "products"}{" "}
            saved for later.
          </p>

        </div>

        {/* PRODUCTS */}

        <div className="wishlist-grid">

          {wishlistItems.map((product) => {

            const discount =
              product.oldPrice &&
              product.price
                ? Math.round(
                    ((product.oldPrice -
                      product.price) /
                      product.oldPrice) *
                      100
                  )
                : 0;

            return (
              <div
                className="wishlist-card"
                key={product.wishlistId}
              >

                {/* IMAGE */}

                <div
                  className="wishlist-image"
                  onClick={() =>
                    openProduct(product.id)
                  }
                >

                  <img
                    src={product.image}
                    alt={product.name}
                  />

                  {discount > 0 && (
                    <span className="wishlist-sale-badge">
                      {discount}% OFF
                    </span>
                  )}

                  <button
                    type="button"
                    className="wishlist-remove-btn"
                    title="Remove from wishlist"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();

                      removeFromWishlist(
                        product.wishlistId
                      );
                    }}
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

                {/* INFORMATION */}

                <div className="wishlist-info">

                  <p className="wishlist-category">
                    {product.category}
                  </p>

                  <h3
                    onClick={() =>
                      openProduct(product.id)
                    }
                  >
                    {product.name}
                  </h3>

                  <div className="wishlist-price">

                    <strong>
                      ₹
                      {Number(
                        product.price
                      ).toLocaleString("en-IN")}
                    </strong>

                    {product.oldPrice && (
                      <del>
                        ₹
                        {Number(
                          product.oldPrice
                        ).toLocaleString("en-IN")}
                      </del>
                    )}

                  </div>

                  <button
                    type="button"
                    className="wishlist-cart-btn"
                    onClick={() =>
                      handleAddToCart(product)
                    }
                  >
                    <ShoppingCart size={17} />

                    Add to Cart
                  </button>

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}

export default Wishlist;