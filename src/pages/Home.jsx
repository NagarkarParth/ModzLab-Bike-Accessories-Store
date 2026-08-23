import { useState } from "react";

import CategorySection from "../components/CategorySection";

import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Headphones,
} from "lucide-react";

import ProductSection from "../components/ProductSection";

import logo from "../assets/modzlab-logo.png";

import "./Home.css";


function Home() {

  const [selectedCategory, setSelectedCategory] =
    useState("All");


  // =====================================================
  // CATEGORY SELECTION
  // =====================================================

  const handleCategorySelect = (category) => {

    setSelectedCategory(category);

    // Wait for state/update
    setTimeout(() => {

      const productsSection =
        document.getElementById("products");

      if (productsSection) {

        productsSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

      }

    }, 100);

  };


  return (

    <div
      id="home"
      className="home"
    >

      {/* =================================================
          HERO SECTION
      ================================================= */}

      <section className="hero">

        <div className="hero-content">

          <p className="hero-tag">
            PREMIUM BIKE ACCESSORIES
          </p>


          <h1>

            RIDE HARD.

            <br />

            <span>
              LOOK BETTER.
            </span>

          </h1>


          <p className="hero-description">

            Upgrade your motorcycle with premium
            accessories, stylish parts and riding
            essentials built for riders.

          </p>


          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={() => {

                const products =
                  document.getElementById("products");

                if (products) {

                  products.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });

                }

              }}
            >

              Shop Now

              <ArrowRight size={18} />

            </button>


            <button
              className="secondary-btn"
              onClick={() => {

                const categories =
                  document.getElementById("categories");

                if (categories) {

                  categories.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });

                }

              }}
            >

              Explore Categories

            </button>

          </div>

        </div>


        {/* =================================================
            HERO DESIGN
        ================================================= */}

        <div className="hero-design">

          <div className="logo-circle">

            <img
              src={logo}
              alt="ModzLab Logo"
            />

          </div>

        </div>

      </section>


      {/* =================================================
          FEATURES
      ================================================= */}

      <section className="features">

        <div className="feature-card">

          <Truck size={28} />

          <div>

            <h3>
              Fast Delivery
            </h3>

            <p>
              Quick and reliable shipping
            </p>

          </div>

        </div>


        <div className="feature-card">

          <ShieldCheck size={28} />

          <div>

            <h3>
              Quality Products
            </h3>

            <p>
              Premium motorcycle accessories
            </p>

          </div>

        </div>


        <div className="feature-card">

          <Headphones size={28} />

          <div>

            <h3>
              Rider Support
            </h3>

            <p>
              We're here when you need us
            </p>

          </div>

        </div>

      </section>


      {/* =================================================
          CATEGORIES
      ================================================= */}

      <CategorySection
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />


      {/* =================================================
          PRODUCTS
      ================================================= */}

      <ProductSection
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />

    </div>

  );

}

export default Home;