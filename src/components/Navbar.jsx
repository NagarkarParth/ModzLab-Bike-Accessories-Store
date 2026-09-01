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

  // ================= AUTH STATE =================

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

  // ================= LOGOUT =================

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
    navigate("/");
  };

  // ================= NAVIGATION =================

  const handleSectionClick = (section) => {
    setMenuOpen(false);

    if (location.pathname === "/") {
      document
        .getElementById(section)
        ?.scrollIntoView({
          behavior: "smooth",
        });
    } else {
      navigate(`/#${section}`);
    }
  };

  // ================= SEARCH =================

  const handleSearch = (e) => {
    e.preventDefault();

    const query = searchText.trim();

    if (!query) {
      return;
    }

    console.log(
      "Searching for:",
      query
    );

    // Later we can connect this to
    // Supabase products.

    navigate(
      `/products?search=${encodeURIComponent(
        query
      )}`
    );

    setSearchOpen(false);
  };

  return (
    <nav className="navbar">

      {/* ================= NAVBAR ================= */}

      <div className="navbar-container">

        {/* LOGO */}

        <Link
          to="/"
          className="logo"
          onClick={() =>
            setMenuOpen(false)
          }
        >
          <span>MODZ</span>
          <strong>LAB</strong>
        </Link>

        {/* NAVIGATION */}

        <div
          className={`nav-links ${
            menuOpen ? "active" : ""
          }`}
        >

          <Link
            to="/"
            onClick={() =>
              setMenuOpen(false)
            }
          >
            Home
          </Link>

          <button
            type="button"
            onClick={() =>
              handleSectionClick(
                "products"
              )
            }
          >
            Products
          </button>

          <button
            type="button"
            onClick={() =>
              handleSectionClick(
                "categories"
              )
            }
          >
            Categories
          </button>

          <button
            type="button"
            onClick={() =>
              handleSectionClick("about")
            }
          >
            About
          </button>

          <button
            type="button"
            onClick={() =>
              handleSectionClick(
                "contact"
              )
            }
          >
            Contact
          </button>

        </div>

        {/* RIGHT SIDE */}

        <div className="nav-actions">

          {/* SEARCH BUTTON */}

          <button
            type="button"
            className="icon-btn search-btn"
            title="Search"
            onClick={() =>
              setSearchOpen(!searchOpen)
            }
          >
            {searchOpen ? (
              <X size={21} />
            ) : (
              <Search size={21} />
            )}
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

          {/* LOGIN / LOGOUT */}

          {!authLoading && (
            user ? (
              <button
                type="button"
                className="login-btn"
                onClick={handleLogout}
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            ) : (
              <button
                type="button"
                className="login-btn"
                onClick={() =>
                  navigate("/login")
                }
              >
                <User size={18} />
                <span>Login</span>
              </button>
            )
          )}

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

      {/* ================= SEARCH BAR ================= */}

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
                onClick={() =>
                  setSearchText("")
                }
              >
                <X size={20} />
              </button>
            )}

          </form>

        </div>
      )}

      {/* CART PANEL */}

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