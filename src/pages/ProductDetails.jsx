import {
  ArrowLeft,
  Heart,
  ShoppingCart,
  Star,
  Plus,
  Minus,
} from "lucide-react";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useCart } from "../context/CartContext";

import "./ProductDetails.css";


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
    description:
      "Upgrade your motorcycle with a premium performance exhaust designed for better styling, deeper sound and an aggressive riding experience.",
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
    description:
      "Bright and reliable LED fog lights designed to improve visibility while giving your motorcycle a stylish appearance.",
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
    description:
      "A strong and secure motorcycle phone holder designed for everyday riding and navigation.",
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
    description:
      "Sport-inspired motorcycle mirrors with a stylish design and clear rear visibility.",
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
    description:
      "Modern LED indicators that provide bright illumination and a clean premium look.",
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
    description:
      "Comfortable riding gloves designed to provide grip, protection and comfort during your rides.",
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
    description:
      "A stylish motorcycle visor designed to improve wind protection while enhancing the bike's appearance.",
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
    description:
      "Premium tank pad designed to protect your motorcycle fuel tank from scratches and improve grip.",
  },
];


function ProductDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);

  const [wishlist, setWishlist] =
    useState(false);

  const [added, setAdded] =
    useState(false);


  // =====================================================
  // FIND PRODUCT
  // =====================================================

  const product = products.find(
    (item) =>
      item.id === Number(id)
  );


  // =====================================================
  // PRODUCT NOT FOUND
  // =====================================================

  if (!product) {

    return (

      <div className="product-not-found">

        <h2>
          Product Not Found
        </h2>

        <button
          onClick={() =>
            navigate("/")
          }
        >
          Back to Home
        </button>

      </div>

    );

  }


  // =====================================================
  // DISCOUNT
  // =====================================================

  const discount =
    Math.round(
      (
        (product.oldPrice -
          product.price) /
        product.oldPrice
      ) * 100
    );


  // =====================================================
  // ADD TO CART
  // =====================================================

  const handleAddToCart = () => {

    for (let i = 0; i < quantity; i++) {

      addToCart(product);

    }

    setAdded(true);

    setTimeout(() => {

      setAdded(false);

    }, 1500);

  };


  // =====================================================
  // BUY NOW
  // =====================================================

  const handleBuyNow = () => {

    for (let i = 0; i < quantity; i++) {

      addToCart(product);

    }

    navigate("/checkout");

  };


  return (

    <div className="product-details-page">

      {/* =================================================
          BACK BUTTON
      ================================================= */}

      <div className="product-details-container">

        <button
          className="back-products"
          onClick={() =>
            navigate(-1)
          }
        >

          <ArrowLeft size={18} />

          Back to Products

        </button>


        {/* =================================================
            PRODUCT DETAILS
        ================================================= */}

        <div className="product-details">

          {/* =================================================
              IMAGE
          ================================================= */}

          <div className="product-details-image">

            <img
              src={product.image}
              alt={product.name}
            />

            <span className="details-sale-badge">

              {discount}% OFF

            </span>

          </div>


          {/* =================================================
              INFORMATION
          ================================================= */}

          <div className="product-details-info">

            <p className="details-category">

              {product.category}

            </p>


            <h1>

              {product.name}

            </h1>


            {/* RATING */}

            <div className="details-rating">

              <div className="details-stars">

                {[1, 2, 3, 4, 5].map(
                  (star) => (

                    <Star
                      key={star}
                      size={18}
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

              <span>

                {product.rating}

                {" "}

                ({product.reviews} reviews)

              </span>

            </div>


            {/* PRICE */}

            <div className="details-price">

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

              <span>

                {discount}% OFF

              </span>

            </div>


            {/* DESCRIPTION */}

            <div className="details-description">

              <h3>
                Product Description
              </h3>

              <p>
                {product.description}
              </p>

            </div>


            {/* =================================================
                QUANTITY
            ================================================= */}

            <div className="quantity-section">

              <span>
                Quantity
              </span>

              <div className="quantity-control">

                <button
                  onClick={() =>
                    setQuantity(
                      (current) =>
                        Math.max(
                          1,
                          current - 1
                        )
                    )
                  }
                >

                  <Minus size={16} />

                </button>


                <strong>
                  {quantity}
                </strong>


                <button
                  onClick={() =>
                    setQuantity(
                      (current) =>
                        current + 1
                    )
                  }
                >

                  <Plus size={16} />

                </button>

              </div>

            </div>


            {/* =================================================
                ACTIONS
            ================================================= */}

            <div className="details-actions">

              <button
                className={`details-cart-button ${
                  added
                    ? "added"
                    : ""
                }`}
                onClick={
                  handleAddToCart
                }
              >

                <ShoppingCart
                  size={19}
                />

                {added
                  ? "Added to Cart"
                  : "Add to Cart"}

              </button>


              <button
                className="buy-now-button"
                onClick={
                  handleBuyNow
                }
              >

                Buy Now

              </button>


              <button
                className={`details-wishlist ${
                  wishlist
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setWishlist(
                    !wishlist
                  )
                }
              >

                <Heart
                  size={20}
                  fill={
                    wishlist
                      ? "currentColor"
                      : "none"
                  }
                />

              </button>

            </div>


            {/* =================================================
                FEATURES
            ================================================= */}

            <div className="product-highlights">

              <div>

                <strong>
                  ✓ Premium Quality
                </strong>

                <span>
                  Built for riders
                </span>

              </div>


              <div>

                <strong>
                  ✓ Fast Delivery
                </strong>

                <span>
                  Quick shipping
                </span>

              </div>


              <div>

                <strong>
                  ✓ Secure Checkout
                </strong>

                <span>
                  Safe payments
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}


export default ProductDetails;