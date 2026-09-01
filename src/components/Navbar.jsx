import {
  Search,
  ShoppingCart,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { useEffect, useState } from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useCart } from "../context/CartContext";
import CartPanel from "./CartPanel";

import { supabase } from "../lib/supabaseClient";

import "./Navbar.css";


function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  // ================= SEARCH =================

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  // ================= AUTH =================

  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const { cartCount } = useCart();

  const location = useLocation();
  const navigate = useNavigate();


  // =====================================================
  // AUTH STATE
  // =====================================================

  useEffect(() => {

    let mounted = true;

    const getCurrentUser = async () => {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (mounted) {
        setUser(user);
        setAuthLoading(false);
      }

    };

    getCurrentUser();


    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (event, session) => {

        if (mounted) {

          setUser(session?.user ?? null);
          setAuthLoading(false);

        }

      }
    );


    return () => {

      mounted = false;
      subscription.unsubscribe();

    };

  }, []);


  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = async () => {

    const { error } =
      await supabase.auth.signOut();

    if (error) {

      console.error(
        "Logout error:",
        error
      );

      return;

    }

    setMenuOpen(false);
    setSearchOpen(false);

    // Go to Home
    navigate("/");

    // Make sure Home starts at top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  // =====================================================
  // CLOSE MENU
  // =====================================================

  const closeMenu = () => {

    setMenuOpen(false);

  };


  // =====================================================
  // GO HOME
  // =====================================================

  const handleHomeClick = () => {

    setMenuOpen(false);
    setSearchOpen(false);

    // If already on Home
    if (location.pathname === "/") {

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    } else {

      // Navigate to Home
      navigate("/");

      // Scroll after navigation
      setTimeout(() => {

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

      }, 100);

    }

  };


  // =====================================================
  // LOGO CLICK
  // =====================================================

  const handleLogoClick = (e) => {

    e.preventDefault();

    handleHomeClick();

  };


  // =====================================================
  // SECTION NAVIGATION
  // =====================================================

  const handleSectionClick = (section) => {

    setMenuOpen(false);
    setSearchOpen(false);


    // Already on Home
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


    // If on another page,
    // first go to Home
    navigate("/");


    // Wait for Home to render
    setTimeout(() => {

      const element =
        document.getElementById(section);

      if (element) {

        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

      }

    }, 150);

  };


  // =====================================================
  // SEARCH BUTTON
  // =====================================================

  const handleSearchButton = () => {

    // Automatically scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Open / close search
    setSearchOpen((previous) => !previous);

    // Close mobile menu
    setMenuOpen(false);

  };


  // =====================================================
  // SEARCH SUBMIT
  // =====================================================

  const handleSearch = (e) => {

    e.preventDefault();

    const query =
      searchText.trim();


    if (!query) {

      return;

    }


    console.log(
      "Searching for:",
      query
    );


    // Navigate to product search page
    navigate(
      `/products?search=${encodeURIComponent(
        query
      )}`
    );


    setSearchOpen(false);
    setMenuOpen(false);

  };


  // =====================================================
  // CLEAR SEARCH
  // =====================================================

  const clearSearch = () => {

    setSearchText("");

  };


  return (

    <nav className="navbar">


      {/* =================================================
          NAVBAR CONTAINER
      ================================================= */}

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


          {/* ================= HOME ================= */}

          <Link
            to="/"
            onClick={(e) => {

              e.preventDefault();

              handleHomeClick();

            }}
          >
            Home
          </Link>


          {/* ================= PRODUCTS ================= */}

          <button
            type="button"
            onClick={() =>
              handleSectionClick("products")
            }
          >
            Products
          </button>


          {/* ================= CATEGORIES ================= */}

          <button
            type="button"
            onClick={() =>
              handleSectionClick("categories")
            }
          >
            Categories
          </button>


          {/* ================= ABOUT ================= */}

          <Link
            to="/about"
            onClick={() => {

              closeMenu();
              setSearchOpen(false);

              // Start About page at top
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });

            }}
          >
            About
          </Link>


          {/* ================= CONTACT ================= */}

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


          {/* ================= SEARCH ================= */}

          <button
            type="button"
            className="icon-btn search-btn"
            title="Search"
            onClick={handleSearchButton}
          >

            {searchOpen ? (
              <X size={21} />
            ) : (
              <Search size={21} />
            )}

          </button>


          {/* ================= CART ================= */}

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

          {!authLoading && (

            user ? (

              // ================= LOGOUT =================

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

            ) : (

              // ================= LOGIN =================

              <button
                type="button"
                className="login-btn"
                onClick={() => {

                  setMenuOpen(false);
                  setSearchOpen(false);

                  navigate("/login");

                }}
                title="Login"
              >

                <User size={18} />

                <span>
                  Login
                </span>

              </button>

            )

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
            aria-label="Toggle menu"
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
          SEARCH BAR
      ================================================= */}

      {searchOpen && (

        <div className="search-container">

          <form
            className="search-form"
            onSubmit={handleSearch}
          >

            <Search
              size={24}
              className="search-icon"
            />


            <input
              type="text"
              value={searchText}
              onChange={(e) =>
                setSearchText(
                  e.target.value
                )
              }
              placeholder="Search for bike accessories..."
              autoFocus
            />


            {searchText && (

              <button
                type="button"
                className="search-clear"
                onClick={clearSearch}
                aria-label="Clear search"
              >

                <X size={20} />

              </button>

            )}

          </form>

        </div>

      )}


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