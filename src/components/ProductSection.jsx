import {
  Heart,
  ShoppingCart,
  Star,
  ArrowRight,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./ProductSection.css";

import { useCart } from "../context/CartContext";
import products from "../data/products";

// Supabase
import { supabase } from "../lib/supabaseClient";

function ProductSection({ selectedCategory }) {
  const navigate = useNavigate();

  const { addToCart } = useCart();

  // =====================================================
  // STATES
  // =====================================================

  const [wishlist, setWishlist] = useState([]);

  const [addedProduct, setAddedProduct] = useState(null);

  const [loadingWishlist, setLoadingWishlist] = useState(true);

  // =====================================================
  // LOAD USER WISHLIST
  // =====================================================

  const loadWishlist = async (currentUser = null) => {
    try {
      setLoadingWishlist(true);

      let user = currentUser;

      // If user wasn't passed, get current Supabase user
      if (!user) {
        const {
          data: { user: loggedInUser },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          console.error(
            "Error getting user:",
            userError
          );

          setWishlist([]);
          return;
        }

        user = loggedInUser;
      }

      // =================================================
      // USER NOT LOGGED IN
      // =================================================

      if (!user) {
        setWishlist([]);
        return;
      }

      // =================================================
      // GET ONLY THIS USER'S WISHLIST
      // =================================================

      const {
        data,
        error,
      } = await supabase
        .from("wishlist")
        .select("product_id")
        .eq("user_id", user.id);

      if (error) {
        console.error(
          "Error loading wishlist:",
          error
        );

        setWishlist([]);
        return;
      }

      // =================================================
      // NORMALIZE PRODUCT IDS
      // =================================================

      const productIds = (data || []).map(
        (item) => String(item.product_id)
      );

      setWishlist(productIds);

    } catch (error) {
      console.error(
        "Unexpected wishlist error:",
        error
      );

      setWishlist([]);
    } finally {
      setLoadingWishlist(false);
    }
  };

  // =====================================================
  // INITIAL WISHLIST LOAD
  // =====================================================

  useEffect(() => {
    loadWishlist();

    // =================================================
    // LISTEN FOR LOGIN / LOGOUT
    // =================================================

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          await loadWishlist(session.user);
        } else {
          setWishlist([]);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // =====================================================
  // FILTER PRODUCTS
  // =====================================================

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) =>
            product.category === selectedCategory
        );

  // =====================================================
  // WISHLIST
  // =====================================================

  const handleWishlist = async (
    e,
    productId
  ) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      // =================================================
      // GET CURRENT USER
      // =================================================

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error(
          "Error getting user:",
          userError
        );

        return;
      }

      // =================================================
      // USER MUST BE LOGGED IN
      // =================================================

      if (!user) {
        navigate("/login");
        return;
      }

      // =================================================
      // NORMALIZE PRODUCT ID
      // =================================================

      const normalizedProductId = String(productId);

      // =================================================
      // CHECK CURRENT WISHLIST
      // =================================================

      const isAlreadyWishlisted =
        wishlist.includes(normalizedProductId);

      // =================================================
      // REMOVE FROM WISHLIST
      // =================================================

      if (isAlreadyWishlisted) {
        const {
          error,
        } = await supabase
          .from("wishlist")
          .delete()
          .eq("user_id", user.id)
          .eq("product_id", productId);

        if (error) {
          console.error(
            "Error removing wishlist item:",
            error
          );

          return;
        }

        // Update UI immediately
        setWishlist(
          (currentWishlist) =>
            currentWishlist.filter(
              (id) => id !== normalizedProductId
            )
        );

        return;
      }

      // =================================================
      // ADD TO WISHLIST
      // =================================================

      const {
        error,
      } = await supabase
        .from("wishlist")
        .insert({
          user_id: user.id,
          product_id: productId,
        });

      if (error) {
        console.error(
          "Error adding wishlist item:",
          error
        );

        // Handle duplicate entry gracefully
        if (
          error.code === "23505"
        ) {
          await loadWishlist(user);
        }

        return;
      }

      // Update UI immediately
      setWishlist(
        (currentWishlist) => [
          ...currentWishlist,
          normalizedProductId,
        ]
      );

    } catch (error) {
      console.error(
        "Wishlist operation failed:",
        error
      );
    }
  };

  // =====================================================
  // ADD TO CART
  // =====================================================

  const handleAddToCart = (
    e,
    product
  ) => {
    e.preventDefault();
    e.stopPropagation();

    // Add product to existing CartContext
    addToCart(product);

    // Show Added to Cart animation
    setAddedProduct(product.id);

    // =================================================
    // OPEN EXISTING CART PANEL IN NAVBAR
    // =================================================

    window.dispatchEvent(
      new Event("open-cart-panel")
    );

    // Remove animation
    setTimeout(() => {
      setAddedProduct(null);
    }, 1200);
  };

  // =====================================================
  // OPEN PRODUCT DETAILS
  // =====================================================

  const openProduct = (
    productId
  ) => {
    navigate(
      `/product/${productId}`
    );
  };

  // =====================================================
  // COMPONENT
  // =====================================================

  return (
    <section
      id="products"
      className="products-section"
    >

      {/* =================================================
          SECTION HEADER
      ================================================= */}

      <div className="products-heading">

        <div>

          <p>
            OUR COLLECTION
          </p>

          <h2>
            {selectedCategory === "All"
              ? "Featured"
              : selectedCategory}{" "}

            <span>
              Products
            </span>
          </h2>

        </div>

        <button
          className="view-all-btn"
          type="button"
          onClick={() => {

            const categories =
              document.getElementById(
                "categories"
              );

            if (categories) {

              categories.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });

            }

          }}
        >

          Categories

          <ArrowRight
            size={18}
          />

        </button>

      </div>

      {/* =================================================
          NO PRODUCTS
      ================================================= */}

      {filteredProducts.length === 0 ? (

        <div className="no-products">

          <h3>
            No Products Available
          </h3>

          <p>
            Products for this category
            will be added soon.
          </p>

        </div>

      ) : (

        <div className="products-grid">

          {filteredProducts.map(
            (product) => {

              // =================================================
              // DISCOUNT
              // =================================================

              const discount =
                product.oldPrice &&
                product.oldPrice > 0
                  ? Math.round(
                      (
                        (
                          product.oldPrice -
                          product.price
                        ) /
                        product.oldPrice
                      ) *
                        100
                    )
                  : 0;

              // =================================================
              // WISHLIST STATUS
              // =================================================

              const isWishlisted =
                wishlist.includes(
                  String(product.id)
                );

              // =================================================
              // CART STATUS
              // =================================================

              const isAdded =
                addedProduct ===
                product.id;

              return (

                <div
                  className="product-card"
                  key={product.id}
                >

                  {/* =================================================
                      PRODUCT IMAGE
                  ================================================= */}

                  <div
                    className="product-image"
                    onClick={() =>
                      openProduct(
                        product.id
                      )
                    }
                  >

                    <img
                      src={product.image}
                      alt={product.name}
                    />

                    {/* SALE BADGE */}

                    <span className="sale-badge">

                      {discount}% OFF

                    </span>

                    {/* =================================================
                        WISHLIST BUTTON
                    ================================================= */}

                    <button
                      type="button"
                      className={`wishlist-btn ${
                        isWishlisted
                          ? "active"
                          : ""
                      }`}
                      title={
                        isWishlisted
                          ? "Remove from wishlist"
                          : "Add to wishlist"
                      }
                      onClick={(e) =>
                        handleWishlist(
                          e,
                          product.id
                        )
                      }
                      disabled={
                        loadingWishlist
                      }
                    >

                      <Heart
                        size={19}
                        fill={
                          isWishlisted
                            ? "currentColor"
                            : "none"
                        }
                      />

                    </button>

                  </div>

                  {/* =================================================
                      PRODUCT INFORMATION
                  ================================================= */}

                  <div className="product-info">

                    {/* CATEGORY */}

                    <p className="product-category">

                      {product.category}

                    </p>

                    {/* PRODUCT NAME */}

                    <h3
                      onClick={() =>
                        openProduct(
                          product.id
                        )
                      }
                    >

                      {product.name}

                    </h3>

                    {/* =================================================
                        RATING
                    ================================================= */}

                    <div className="product-rating">

                      <div className="stars">

                        {[1, 2, 3, 4, 5].map(
                          (star) => (

                            <Star
                              key={star}
                              size={14}
                              fill={
                                star <=
                                Math.round(
                                  product.rating
                                )
                                  ? "currentColor"
                                  : "none"
                              }
                            />

                          )
                        )}

                      </div>

                      <small>

                        {product.rating} (
                        {product.reviews}
                        )

                      </small>

                    </div>

                    {/* =================================================
                        PRICE
                    ================================================= */}

                    <div className="product-price">

                      <strong>

                        ₹
                        {Number(
                          product.price
                        ).toLocaleString(
                          "en-IN"
                        )}

                      </strong>

                      <del>

                        ₹
                        {Number(
                          product.oldPrice
                        ).toLocaleString(
                          "en-IN"
                        )}

                      </del>

                    </div>

                    {/* =================================================
                        ADD TO CART
                    ================================================= */}

                    <button
                      type="button"
                      className={`add-cart-btn ${
                        isAdded
                          ? "added"
                          : ""
                      }`}
                      onClick={(e) =>
                        handleAddToCart(
                          e,
                          product
                        )
                      }
                    >

                      {isAdded ? (

                        "✓ Added to Cart"

                      ) : (

                        <>

                          <ShoppingCart
                            size={17}
                          />

                          Add to Cart

                        </>

                      )}

                    </button>

                  </div>

                </div>

              );

            }
          )}

        </div>

      )}

    </section>
  );
}

export default ProductSection;