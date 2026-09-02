import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
} from "lucide-react";

import {
  useEffect,
  useState,
  useRef,
} from "react";

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
  // =====================================================
  // STATES
  // =====================================================

  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  // ================= SEARCH =================

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const searchRef = useRef(null);

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
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error) {
          console.error(
            "Error getting current user:",
            error
          );
        }

        if (mounted) {
          setUser(user);
          setAuthLoading(false);
        }
      } catch (error) {
        console.error(
          "Unexpected auth error:",
          error
        );

        if (mounted) {
          setAuthLoading(false);
        }
      }
    };

    getCurrentUser();

    // =================================================
    // LISTEN FOR AUTH CHANGES
    // =================================================

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
  // OPEN CART PANEL FROM PRODUCT SECTION
  // =====================================================

  useEffect(() => {
    const handleOpenCartPanel = () => {
      setCartOpen(true);
    };

    window.addEventListener(
      "open-cart-panel",
      handleOpenCartPanel
    );

    return () => {
      window.removeEventListener(
        "open-cart-panel",
        handleOpenCartPanel
      );
    };
  }, []);


  // =====================================================
  // CLOSE SEARCH WHEN CLICKING OUTSIDE
  // =====================================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setSearchOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
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
    setCartOpen(false);

    navigate("/");
  };


  // =====================================================
  // HOME
  // =====================================================

  const handleHomeClick = () => {
    setMenuOpen(false);
    setSearchOpen(false);

    if (location.pathname === "/") {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } else {
      navigate("/");
    }
  };


  // =====================================================
  // SECTION NAVIGATION
  // =====================================================

  const handleSectionClick = (section) => {
    setMenuOpen(false);
    setSearchOpen(false);

    if (location.pathname === "/") {
      const element =
        document.getElementById(section);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      navigate(`/#${section}`);
    }
  };


  // =====================================================
  // CONTACT PAGE
  // =====================================================

  const handleContactClick = () => {
    setMenuOpen(false);
    setSearchOpen(false);

    navigate("/contact");
  };


  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearch = (e) => {
    e.preventDefault();

    const query = searchText.trim();

    if (!query) {
      return;
    }

    navigate(
      `/products?search=${encodeURIComponent(
        query
      )}`
    );

    setSearchOpen(false);
  };


  // =====================================================
  // CLOSE MOBILE MENU
  // =====================================================

  const closeMenu = () => {
    setMenuOpen(false);
  };


  // =====================================================
  // GET USER NAME
  // =====================================================

  const getUserName = () => {
    if (!user) {
      return "";
    }

    return (
      user.user_metadata?.name ||
      user.user_metadata?.full_name ||
      user.email?.split("@")[0] ||
      "User"
    );
  };


  // =====================================================
  // RENDER
  // =====================================================

  return (
    <nav className="navbar">

      {/* =================================================
          NAVBAR CONTAINER
      ================================================= */}

      <div className="navbar-container">


        {/* =================================================
            LOGO
        ================================================= */}

        <button
          type="button"
          className="logo"
          onClick={handleHomeClick}
          aria-label="Go to Home"
        >
          <span>MODZ</span>
          <strong>LAB</strong>
        </button>


        {/* =================================================
            NAVIGATION LINKS
        ================================================= */}

        <div
          className={`nav-links ${
            menuOpen ? "active" : ""
          }`}
        >

          {/* ================= HOME ================= */}

          <button
            type="button"
            onClick={handleHomeClick}
          >
            Home
          </button>


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
            onClick={closeMenu}
          >
            About
          </Link>


          {/* ================= CONTACT ================= */}

          <button
            type="button"
            onClick={handleContactClick}
          >
            Contact
          </button>

        </div>


        {/* =================================================
            RIGHT SIDE ACTIONS
        ================================================= */}

        <div className="nav-actions">


          {/* =================================================
              SEARCH
          ================================================= */}

          <div
            className="search-wrapper"
            ref={searchRef}
          >

            {/* SEARCH ICON */}

            <button
              type="button"
              className="icon-btn search-btn"
              title="Search"
              onClick={() =>
                setSearchOpen(
                  (current) => !current
                )
              }
              onMouseEnter={() =>
                setSearchOpen(true)
              }
            >
              <Search size={21} />
            </button>


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
                    size={21}
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


                  {/* CLEAR SEARCH */}

                  {searchText && (
                    <button
                      type="button"
                      className="search-clear"
                      onClick={() =>
                        setSearchText("")
                      }
                      aria-label="Clear search"
                    >
                      <X size={18} />
                    </button>
                  )}

                </form>

              </div>
            )}

          </div>


          {/* =================================================
              CART
          ================================================= */}

          <button
            type="button"
            className="icon-btn cart-btn"
            title="Shopping Cart"
            onClick={() => {
              setCartOpen(true);
              setSearchOpen(false);
              setMenuOpen(false);
            }}
          >

            <ShoppingCart size={21} />

            {/* CART COUNT */}

            {cartCount > 0 && (
              <span className="cart-count">
                {cartCount}
              </span>
            )}

          </button>


          {/* =================================================
              PROFILE / LOGIN
          ================================================= */}

          {!authLoading && (
            user ? (

              /* ================= LOGGED IN ================= */

              <button
                type="button"
                className="user-profile-btn"
                onClick={() => {
                  setSearchOpen(false);
                  setMenuOpen(false);
                  navigate("/profile");
                }}
                title="My Profile"
              >

                {/* USER ICON */}

                <User
                  size={20}
                  className="user-profile-icon"
                />

                {/* HELLO + NAME */}

                <span className="user-name">
                  Hello, {getUserName()}
                </span>

              </button>

            ) : (

              /* ================= LOGGED OUT ================= */

              <button
                type="button"
                className="login-btn"
                onClick={() => {
                  setSearchOpen(false);
                  setMenuOpen(false);
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
          EXISTING CART PANEL
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