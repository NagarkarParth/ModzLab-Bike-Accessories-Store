import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  LogOut,
} from "lucide-react";

import { useState } from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useCart } from "../context/CartContext";
import CartPanel from "./CartPanel";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const { cartCount } = useCart();

  const location = useLocation();
  const navigate = useNavigate();

  // =====================================================
  // LOGIN STATUS
  // =====================================================

  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true";


  // =====================================================
  // HOME BUTTON
  // =====================================================

  const handleHomeClick = () => {
    setMenuOpen(false);

    if (location.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    navigate("/");

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 300);
  };


  // =====================================================
  // SECTION NAVIGATION
  // =====================================================

  const handleSectionClick = (section) => {
    setMenuOpen(false);

    if (location.pathname === "/") {
      const element =
        document.getElementById(section);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      return;
    }

    navigate("/");

    setTimeout(() => {
      const element =
        document.getElementById(section);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 300);
  };


  // =====================================================
  // LOGO CLICK
  // =====================================================

  const handleLogoClick = () => {
    setMenuOpen(false);

    if (location.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };


  // =====================================================
  // LOGIN
  // =====================================================

  const handleLogin = () => {
    setMenuOpen(false);

    navigate("/login");
  };


  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");

    setMenuOpen(false);

    alert("You have been logged out.");

    navigate("/");
  };


  return (
    <nav className="navbar">

      <div className="navbar-container">

        {/* =================================================
            LOGO
        ================================================= */}

        <Link
          to="/"
          className="logo"
          onClick={handleLogoClick}
          style={{
            textDecoration: "none",
          }}
        >
          <span>MODZ</span>
          <strong>LAB</strong>
        </Link>


        {/* =================================================
            NAVIGATION LINKS
        ================================================= */}

        <div
          className={`nav-links ${
            menuOpen ? "active" : ""
          }`}
        >

          {/* HOME */}

          <button
            type="button"
            onClick={handleHomeClick}
          >
            Home
          </button>


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


        {/* =================================================
            RIGHT SIDE ACTIONS
        ================================================= */}

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
            onClick={() =>
              setCartOpen(true)
            }
          >
            <ShoppingCart size={21} />

            <span className="cart-count">
              {cartCount}
            </span>

          </button>


          {/* =================================================
              LOGIN / LOGOUT
          ================================================= */}

          {!isLoggedIn ? (

            <button
              type="button"
              className="login-btn"
              onClick={handleLogin}
            >

              <User size={18} />

              <span>
                Login
              </span>

            </button>

          ) : (

            <button
              type="button"
              className="login-btn"
              onClick={handleLogout}
              title="Logout"
            >

              <LogOut size={18} />

              <span>
                Logout
              </span>

            </button>

          )}


          {/* =================================================
              MOBILE MENU
          ================================================= */}

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


      {/* =================================================
          CART PANEL
      ================================================= */}

      <CartPanel
        isOpen={cartOpen}
        onClose={() =>
          setCartOpen(false)
        }
      />

    </nav>
  );
}

export default Navbar;