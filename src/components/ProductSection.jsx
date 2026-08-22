import {
  Heart,
  ShoppingCart,
  Star,
  ArrowRight
} from "lucide-react";
import { useState } from "react";

import "./ProductSection.css";
import { useCart } from "../context/CartContext";

const products = [
  {
    id: 1,
    name: "Performance Exhaust",
    category: "Exhaust",
    price: 4999,
    oldPrice: 5999,
    rating: 4.8,
    reviews: 24,
    image: "/products/exhaust.jpg",
  },
  {
    id: 2,
    name: "LED Fog Light",
    category: "Fog Lights",
    price: 1299,
    oldPrice: 1699,
    rating: 4.7,
    reviews: 18,
    image: "/products/fog-light.jpg",
  },
  {
    id: 3,
    name: "Premium Phone Holder",
    category: "Phone Holders",
    price: 899,
    oldPrice: 1199,
    rating: 4.6,
    reviews: 31,
    image: "/products/phone-holder.jpg",
  },
  {
    id: 4,
    name: "Sport Bike Mirrors",
    category: "Mirrors",
    price: 1499,
    oldPrice: 1899,
    rating: 4.8,
    reviews: 16,
    image: "/products/mirrors.jpg",
  },
  {
    id: 5,
    name: "LED Indicators",
    category: "Indicators",
    price: 999,
    oldPrice: 1299,
    rating: 4.5,
    reviews: 21,
    image: "/products/indicators.jpg",
  },
  {
    id: 6,
    name: "Riding Gloves",
    category: "Riding Gloves",
    price: 799,
    oldPrice: 999,
    rating: 4.7,
    reviews: 42,
    image: "/products/gloves.jpg",
  },
  {
    id: 7,
    name: "Sport Bike Visor",
    category: "Visors",
    price: 699,
    oldPrice: 899,
    rating: 4.6,
    reviews: 15,
    image: "/products/visor.jpg",
  },
  {
    id: 8,
    name: "Premium Tank Pad",
    category: "Tank Pads",
    price: 499,
    oldPrice: 699,
    rating: 4.5,
    reviews: 28,
    image: "/products/tank-pad.jpg",
  },
];

function ProductSection() {
    const { addToCart } = useCart();
    const [wishlist, setWishlist] = useState([]);
  return (
    <section id="products" className="products-section">

      {/* ================= SECTION HEADER ================= */}

      <div className="products-heading">

        <div>
          <p>
            OUR COLLECTION
          </p>

          <h2>
            Featured <span>Products</span>
          </h2>
        </div>

        <button className="view-all-btn">
          View All
          <ArrowRight size={18} />
        </button>

      </div>

      {/* ================= PRODUCTS GRID ================= */}

      <div className="products-grid">

        {products.map((product) => {

          const discount = Math.round(
            ((product.oldPrice - product.price) /
              product.oldPrice) *
              100
          );

          return (

            <div
              className="product-card"
              key={product.id}
            >

              {/* ================= PRODUCT IMAGE ================= */}

              <div className="product-image">

                <img
                  src={product.image}
                  alt={product.name}
                />

                {/* Sale Badge */}
                <span className="sale-badge">
                  {discount}% OFF
                </span>

                {/* Wishlist */}
                <button
  className={`wishlist-btn ${
    wishlist.includes(product.id) ? "active" : ""
  }`}
  title="Add to wishlist"
  onClick={() => {
    setWishlist((current) =>
      current.includes(product.id)
        ? current.filter((id) => id !== product.id)
        : [...current, product.id]
    );
  }}
>
  <Heart
    size={19}
    fill={
      wishlist.includes(product.id)
        ? "currentColor"
        : "none"
    }
  />
</button>

              </div>


              {/* ================= PRODUCT INFORMATION ================= */}

              <div className="product-info">

                {/* Category */}
                <p className="product-category">
                  {product.category}
                </p>

                {/* Product Name */}
                <h3>
                  {product.name}
                </h3>


                {/* ================= RATING ================= */}

                <div className="product-rating">

                  <div className="stars">

                    {[1, 2, 3, 4, 5].map((star) => (

                      <Star
                        key={star}
                        size={14}
                        fill={
                          star <= Math.round(product.rating)
                            ? "currentColor"
                            : "none"
                        }
                      />

                    ))}

                  </div>

                  <small>
                    {product.rating} ({product.reviews})
                  </small>

                </div>


                {/* ================= PRICE ================= */}

                <div className="product-price">

                  <strong>
                    ₹{product.price.toLocaleString("en-IN")}
                  </strong>

                  <del>
                    ₹{product.oldPrice.toLocaleString("en-IN")}
                  </del>

                </div>


                {/* ================= ADD TO CART ================= */}

                <button
                className="add-cart-btn"
                title="Add to cart"
                onClick={() => addToCart(product)}
                >
                 <ShoppingCart size={17} />
                 Add to Cart
                </button>

              </div>

            </div>

          );
        })}

      </div>

    </section>
  );
}

export default ProductSection;