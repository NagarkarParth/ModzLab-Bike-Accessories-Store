import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";

import "./App.css";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div className="page-wrapper">
      <Routes location={location}>
        <Route path="/register"element={<Register />}/>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id"element={<ProductDetails />}/>
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;