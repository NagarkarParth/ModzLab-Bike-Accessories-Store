import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X
} from "lucide-react";

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import CartPanel from "./CartPanel";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const { cartCount } = useCart();

  const location = useLocation();
  const navigate = useNavigate();

  // ================= NAVIGATION =================

  const handleSectionClick = (section) => {
    setMenuOpen(false);

    // If already on Home, scroll directly
    if (location.pathname === "/") {
      document.getElementById(section)?.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      // Go back to Home first
      navigate(`/#${section}`);
    }
  };

  return (
    <nav className="navbar">

      <div className="navbar-container">

        {/* ================= LOGO ================= */}

        <Link
          to="/"
          className="logo"
          onClick={() => setMenuOpen(false)}
          style={{ textDecoration: "none" }}
        >
          <span>MODZ</span>
          <strong>LAB</strong>
        </Link>

        {/* ================= NAVIGATION ================= */}

        <div
          className={`nav-links ${
            menuOpen ? "active" : ""
          }`}
        >

          {/* HOME */}

          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          {/* PRODUCTS */}

          <button
            type="button"
            onClick={() =>
              handleSectionClick("products")
            }
          >
            Products
          </button>

          {/* CATEGORIES */}

          <button
            type="button"
            onClick={() =>
              handleSectionClick("categories")
            }
          >
            Categories
          </button>

          {/* ABOUT */}

          <button
            type="button"
            onClick={() =>
              handleSectionClick("about")
            }
          >
            About
          </button>

          {/* CONTACT */}

          <button
            type="button"
            onClick={() =>
              handleSectionClick("contact")
            }
          >
            Contact
          </button>

        </div>

        {/* ================= RIGHT SIDE ================= */}

        <div className="nav-actions">

          {/* SEARCH */}

          <button
            type="button"
            className="icon-btn"
            title="Search"
          >
            <Search size={21} />
          </button>

          {/* CART */}

          <button
            type="button"
            className="icon-btn cart-btn"
            title="Cart"
            onClick={() => setCartOpen(true)}
          >

            <ShoppingCart size={21} />

            <span className="cart-count">
              {cartCount}
            </span>

          </button>

          {/* LOGIN */}

          <button
            type="button"
            className="login-btn"
          >
            <User size={18} />

            <span>Login</span>
          </button>

          {/* MOBILE MENU */}

          <button
            type="button"
            className="menu-btn"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
          >
            {menuOpen ? (
              <X size={25} />
            ) : (
              <Menu size={25} />
            )}
          </button>

        </div>

      </div>

      {/* ================= CART PANEL ================= */}

      <CartPanel
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
      />

    </nav>
  );
}

export default Navbar;