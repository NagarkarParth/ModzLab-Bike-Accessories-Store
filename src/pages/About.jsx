import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import {
  FaInstagram,
  FaYoutube,
} from "react-icons/fa6";

import "./About.css";

function About() {
  return (
    <div className="about-page">

      {/* ================= HERO ================= */}

      <section className="about-hero">

        <div className="about-hero-content">

          <span className="about-label">
            ABOUT MODZLAB
          </span>

          <h1>
            RIDE.
            <span> MODIFY.</span>
            <br />
            DOMINATE.
          </h1>

          <p>
            ModzLab is built for riders who believe
            their bike should be more than just stock.
          </p>

        </div>

      </section>


      {/* ================= ABOUT CONTENT ================= */}

      <section className="about-content">

        <div className="about-container">

          {/* ================= OUR STORY ================= */}

          <div className="about-section">

            <div className="about-section-number">
              01
            </div>

            <div>

              <h2>Our Story</h2>

              <p>
                ModzLab is a bike accessories store
                created for riders who want to upgrade,
                customize and personalize their rides.
              </p>

              <p>
                From practical accessories to stylish
                modifications, our goal is to bring
                quality products together in one place.
              </p>

            </div>

          </div>


          {/* ================= OUR MISSION ================= */}

          <div className="about-section">

            <div className="about-section-number">
              02
            </div>

            <div>

              <h2>Our Mission</h2>

              <p>
                Our mission is simple — make premium
                bike accessories easy to discover and
                purchase for every rider.
              </p>

              <p>
                We focus on quality, functionality,
                style and a smooth shopping experience.
              </p>

            </div>

          </div>


          {/* ================= WHY MODZLAB ================= */}

          <div className="about-section">

            <div className="about-section-number">
              03
            </div>

            <div>

              <h2>Why ModzLab?</h2>

              <div className="about-features">

                <div className="about-feature">

                  <h3>Quality Products</h3>

                  <p>
                    Accessories selected with riders
                    and everyday use in mind.
                  </p>

                </div>


                <div className="about-feature">

                  <h3>Rider Focused</h3>

                  <p>
                    Built around the needs and style
                    of motorcycle enthusiasts.
                  </p>

                </div>


                <div className="about-feature">

                  <h3>Easy Shopping</h3>

                  <p>
                    Simple browsing, secure accounts
                    and convenient checkout.
                  </p>

                </div>

              </div>

            </div>

          </div>


          {/* ================= SOCIAL MEDIA ================= */}

          <div className="about-social">

            <h2>Follow ModzLab</h2>

            <p>
              Follow us for new products, bike builds,
              modifications and updates.
            </p>


            <div className="social-buttons">

              {/* ================= INSTAGRAM ================= */}

              <a
                href="https://www.instagram.com/bikers_modzlab?igsi=MXFtMGF5bTFua2cxdg=="
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn instagram-btn"
                aria-label="Follow ModzLab on Instagram"
              >

                <FaInstagram size={22} />

                <span>
                  Instagram
                </span>

              </a>


              {/* ================= YOUTUBE ================= */}

              <a
                href="https://youtube.com/@mh14sonuvlogs?si=fc8QorK-exQXIxkV"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn youtube-btn"
                aria-label="Visit ModzLab on YouTube"
              >

                <FaYoutube size={22} />

                <span>
                  YouTube
                </span>

              </a>

            </div>

          </div>


          {/* ================= BACK HOME ================= */}

          <div className="about-back">

            <Link
              to="/"
              className="back-home-btn"
            >

              <ArrowLeft size={18} />

              <span>
                Back to Home
              </span>

            </Link>

          </div>

        </div>

      </section>

    </div>
  );
}

export default About;