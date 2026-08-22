import CategorySection from "../components/CategorySection";
import { ArrowRight, ShieldCheck, Truck, Headphones } from "lucide-react";
import ProductSection from "../components/ProductSection";
import logo from "../assets/modzlab-logo.png";
import "./Home.css";

function Home() {
  return (
    <div id="home" className="home">

      {/* Hero Section */}
      <section className="hero">

        <div className="hero-content">

          <p className="hero-tag">
            PREMIUM BIKE ACCESSORIES
          </p>

          <h1>
            RIDE HARD.
            <br />
            <span>LOOK BETTER.</span>
          </h1>

          <p className="hero-description">
            Upgrade your motorcycle with premium accessories,
            stylish parts and riding essentials built for riders.
          </p>

          <div className="hero-buttons">

            <button className="primary-btn">
              Shop Now
              <ArrowRight size={18} />
            </button>

            <button className="secondary-btn">
              Explore Categories
            </button>

          </div>

        </div>

        <div className="hero-design">
     <div className="logo-circle">
     <img src={logo} alt="ModzLab Logo" />
    </div>
</div>

      </section>

      {/* Features */}
      <section className="features">

        <div className="feature-card">
          <Truck size={28} />
          <div>
            <h3>Fast Delivery</h3>
            <p>Quick and reliable shipping</p>
          </div>
        </div>

        <div className="feature-card">
          <ShieldCheck size={28} />
          <div>
            <h3>Quality Products</h3>
            <p>Premium motorcycle accessories</p>
          </div>
        </div>

        <div className="feature-card">
          <Headphones size={28} />
          <div>
            <h3>Rider Support</h3>
            <p>We're here when you need us</p>
          </div>
        </div>

      </section>
        <CategorySection />
        <ProductSection />
    </div>
  );
}

export default Home;