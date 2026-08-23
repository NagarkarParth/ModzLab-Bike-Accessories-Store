import {
  Heart,
  ShoppingCart,
  Star,
  ArrowRight,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./ProductSection.css";
import { useCart } from "../context/CartContext";
import products from "../data/products";

function ProductSection({ selectedCategory }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [wishlist, setWishlist] = useState([]);
  const [addedProduct, setAddedProduct] = useState(null);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) =>
            product.category === selectedCategory
        );

  const handleWishlist = (e, productId) => {
    e.preventDefault();
    e.stopPropagation();

    setWishlist((currentWishlist) => {
      if (currentWishlist.includes(productId)) {
        return currentWishlist.filter(
          (id) => id !== productId
        );
      }

      return [...currentWishlist, productId];
    });
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(product);

    setAddedProduct(product.id);

    setTimeout(() => {
      setAddedProduct(null);
    }, 1200);
  };

  const openProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <section
      id="products"
      className="products-section"
    >
      {/* SECTION HEADER */}

      <div className="products-heading">
        <div>
          <p>OUR COLLECTION</p>

          <h2>
            {selectedCategory === "All"
              ? "Featured"
              : selectedCategory}{" "}
            <span>Products</span>
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
          <ArrowRight size={18} />
        </button>
      </div>

      {/* NO PRODUCTS */}

      {filteredProducts.length === 0 ? (
        <div className="no-products">
          <h3>No Products Available</h3>

          <p>
            Products for this category
            will be added soon.
          </p>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => {
            const discount = Math.round(
              ((product.oldPrice -
                product.price) /
                product.oldPrice) *
                100
            );

            const isWishlisted =
              wishlist.includes(product.id);

            const isAdded =
              addedProduct === product.id;

            return (
              <div
                className="product-card"
                key={product.id}
              >
                {/* PRODUCT IMAGE */}

                <div
                  className="product-image"
                  onClick={() =>
                    openProduct(product.id)
                  }
                >
                  <img
                    src={product.image}
                    alt={product.name}
                  />

                  <span className="sale-badge">
                    {discount}% OFF
                  </span>

                  {/* WISHLIST BUTTON */}

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

                {/* PRODUCT INFORMATION */}

                <div className="product-info">
                  <p className="product-category">
                    {product.category}
                  </p>

                  <h3
                    onClick={() =>
                      openProduct(product.id)
                    }
                  >
                    {product.name}
                  </h3>

                  {/* RATING */}

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
                      {product.reviews})
                    </small>
                  </div>

                  {/* PRICE */}

                  <div className="product-price">
                    <strong>
                      ₹
                      {product.price.toLocaleString(
                        "en-IN"
                      )}
                    </strong>

                    <del>
                      ₹
                      {product.oldPrice.toLocaleString(
                        "en-IN"
                      )}
                    </del>
                  </div>

                  {/* ADD TO CART */}

                  <button
                    type="button"
                    className={`add-cart-btn ${
                      isAdded ? "added" : ""
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
          })}
        </div>
      )}
    </section>
  );
}

export default ProductSection;