import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { useEffect } from "react";

import Navbar from "./components/Navbar";

// Pages
import Register from "./pages/Register";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/login";
import Signup from "./pages/signup";
import ForgotPassword from "./pages/forgot-password";
import ResetPassword from "./pages/reset-password";
import ProductDetails from "./pages/ProductDetails";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";
import Orders from "./pages/Orders";
import Contact from "./pages/Contact";

// Context
import { CartProvider } from "./context/CartContext";

import "./App.css";

// =====================================================
// SCROLL TO TOP
// =====================================================

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
}

// =====================================================
// ANIMATED ROUTES
// =====================================================

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div
      className="page-wrapper"
      key={location.pathname}
    >
      <Routes location={location}>

        {/* ================= REGISTER ================= */}

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ================= HOME ================= */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* ================= CART ================= */}

        <Route
          path="/cart"
          element={<Cart />}
        />

        {/* ================= CHECKOUT ================= */}

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        {/* ================= LOGIN ================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* ================= SIGNUP ================= */}

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* ================= FORGOT PASSWORD ================= */}

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        {/* ================= RESET PASSWORD ================= */}

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

        {/* ================= PRODUCT DETAILS ================= */}

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        {/* ================= ABOUT ================= */}

        <Route
          path="/about"
          element={<About />}
        />

        {/* ================= CONTACT ================= */}

        <Route
          path="/contact"
          element={<Contact />}
        />

        {/* ================= USER PROFILE ================= */}

        <Route
          path="/profile"
          element={<Profile />}
        />

        {/* ================= WISHLIST ================= */}

        <Route
          path="/wishlist"
          element={<Wishlist />}
        />

        {/* ================= MY ORDERS ================= */}

        <Route
          path="/orders"
          element={<Orders />}
        />

      </Routes>
    </div>
  );
}

// =====================================================
// APP
// =====================================================

function App() {
  return (
    <BrowserRouter>

      <CartProvider>

        {/* Scroll page to top whenever route changes */}

        <ScrollToTop />

        {/* Navbar stays visible on all pages */}

        <Navbar />

        {/* Application routes */}

        <AnimatedRoutes />

      </CartProvider>

    </BrowserRouter>
  );
}

export default App;