import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

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

// Context
import { CartProvider } from "./context/CartContext";

import "./App.css";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div className="page-wrapper">
      <Routes location={location}>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />
        <AnimatedRoutes />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;