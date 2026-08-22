import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <div className="logo">
          <span>MODZ</span>
          <strong>LAB</strong>
        </div>

       {/* Desktop Navigation */}
<div className={`nav-links ${menuOpen ? "active" : ""}`}>
  <a href="#home">Home</a>
  <a href="#products">Products</a>
  <a href="#categories">Categories</a>
  <a href="#about">About</a>
  <a href="#contact">Contact</a>
</div>

        {/* Right Side */}
        <div className="nav-actions">

          <button className="icon-btn" title="Search">
            <Search size={21} />
          </button>

          <button className="icon-btn cart-btn" title="Cart">
            <ShoppingCart size={21} />
            <span className="cart-count">0</span>
          </button>

          <button className="login-btn">
            <User size={18} />
            <span>Login</span>
          </button>

          {/* Mobile Menu */}
          <button
            className="menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={25} /> : <Menu size={25} />}
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;