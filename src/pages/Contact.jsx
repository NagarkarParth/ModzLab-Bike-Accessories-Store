import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Phone,
  Mail,
  Clock,
  ArrowLeft,
  Send,
  Package,
} from "lucide-react";

// =====================================================
// REACT ICONS
// =====================================================

import {
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

import "./Contact.css";

function Contact() {
  const navigate = useNavigate();

  // =====================================================
  // CONTACT FORM STATE
  // =====================================================

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Enquiry",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // =====================================================
  // ORDER SUPPORT STATE
  // =====================================================

  const [orderData, setOrderData] = useState({
    orderNumber: "",
    issue: "Order Status",
  });

  // =====================================================
  // HANDLE CONTACT INPUT
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    if (submitted) {
      setSubmitted(false);
    }
  };

  // =====================================================
  // HANDLE ORDER INPUT
  // =====================================================

  const handleOrderChange = (e) => {
    const { name, value } = e.target;

    setOrderData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  // =====================================================
  // SUBMIT CONTACT FORM
  // =====================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(
      "Contact form submitted:",
      formData
    );

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "General Enquiry",
      message: "",
    });
  };

  // =====================================================
  // ORDER SUPPORT
  // =====================================================

  const handleOrderSupport = (e) => {
    e.preventDefault();

    console.log(
      "Order support:",
      orderData
    );

    alert(
      `Order support request submitted for ${
        orderData.orderNumber || "your order"
      }.`
    );
  };

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="contact-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="contact-hero">

        <div className="contact-kicker">
          CONTACT MODZLAB
        </div>

        <h1>
          LET&apos;S <span>TALK.</span>
        </h1>

        <p>
          Have a question about a product, your order,
          or your next bike modification? Our team is
          here to help.
        </p>

      </section>


      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <main className="contact-container">

        {/* ===================================================
            BACK BUTTON
        =================================================== */}

        <button
          type="button"
          className="contact-back-btn"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={18} />

          <span>
            Back to Home
          </span>
        </button>


        {/* ===================================================
            CONTACT INFORMATION CARDS
        =================================================== */}

        <section className="contact-info-grid">

          {/* =================================================
              EMAIL
          ================================================= */}

          <div className="contact-info-card">

            <div className="contact-info-icon">
              <Mail size={24} />
            </div>

            <h3>
              Email Support
            </h3>

            <p>
              support@modzlab.com
              <br />
              We reply as soon as possible.
            </p>

          </div>


          {/* =================================================
              PHONE
          ================================================= */}

          <div className="contact-info-card">

            <div className="contact-info-icon">
              <Phone size={24} />
            </div>

            <h3>
              Call Us
            </h3>

            <p>
              +91 XXXXX XXXXX
              <br />
              Mon–Sat, 10 AM–7 PM
            </p>

          </div>


          {/* =================================================
              SUPPORT HOURS
          ================================================= */}

          <div className="contact-info-card">

            <div className="contact-info-icon">
              <Clock size={24} />
            </div>

            <h3>
              Support Hours
            </h3>

            <p>
              Monday – Saturday
              <br />
              10:00 AM – 7:00 PM
            </p>

          </div>

        </section>


        {/* ===================================================
            CONTACT FORM + GET IN TOUCH
        =================================================== */}

        <section className="contact-main-grid">

          {/* =================================================
              CONTACT FORM
          ================================================= */}

          <div className="contact-card">

            <div className="contact-card-header">

              <h2>
                Send Us a Message
              </h2>

              <p>
                Tell us what you need and we&apos;ll
                get back to you.
              </p>

            </div>


            <form
              className="contact-form"
              onSubmit={handleSubmit}
            >

              {/* =================================================
                  NAME + EMAIL
              ================================================= */}

              <div className="contact-form-row">

                <div className="contact-field">

                  <label htmlFor="contact-name">
                    Full Name
                  </label>

                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                </div>


                <div className="contact-field">

                  <label htmlFor="contact-email">
                    Email Address
                  </label>

                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>


              {/* =================================================
                  PHONE + SUBJECT
              ================================================= */}

              <div className="contact-form-row">

                <div className="contact-field">

                  <label htmlFor="contact-phone">
                    Phone Number
                  </label>

                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={handleChange}
                  />

                </div>


                <div className="contact-field">

                  <label htmlFor="contact-subject">
                    Subject
                  </label>

                  <select
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                  >

                    <option>
                      General Enquiry
                    </option>

                    <option>
                      Product Question
                    </option>

                    <option>
                      Order Support
                    </option>

                    <option>
                      Return / Exchange
                    </option>

                    <option>
                      Payment Issue
                    </option>

                  </select>

                </div>

              </div>


              {/* =================================================
                  MESSAGE
              ================================================= */}

              <div className="contact-field">

                <label htmlFor="contact-message">
                  Message
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  rows="6"
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* =================================================
                  SUCCESS MESSAGE
              ================================================= */}

              {submitted && (
                <div className="contact-success">

                  <span>
                    ✓
                  </span>

                  Message sent successfully!

                </div>
              )}


              {/* =================================================
                  SEND BUTTON
              ================================================= */}

              <button
                type="submit"
                className="contact-send-btn"
              >

                <Send size={18} />

                <span>
                  Send Message
                </span>

              </button>

            </form>

          </div>


          {/* =================================================
              GET IN TOUCH
          ================================================= */}

          <div className="contact-card">

            <div className="contact-card-header">

              <h2>
                Get in Touch
              </h2>

              <p>
                Choose the easiest way to reach
                ModzLab.
              </p>

            </div>


            {/* =================================================
                EMAIL
            ================================================= */}

            <div className="contact-side-item">

              <strong>
                Email
              </strong>

              <span>
                support@modzlab.com
              </span>

            </div>


            {/* =================================================
                PHONE
            ================================================= */}

            <div className="contact-side-item">

              <strong>
                Phone
              </strong>

              <span>
                +91 XXXXX XXXXX
              </span>

            </div>


            {/* =================================================
                ORDER SUPPORT
            ================================================= */}

            <div className="contact-side-item">

              <strong>
                Order Support
              </strong>

              <span>
                Keep your order number ready when
                contacting us.
              </span>

            </div>


            {/* =================================================
                SOCIAL MEDIA
            ================================================= */}

            <div className="contact-side-item">

              <strong>
                Follow the Ride
              </strong>


              <div className="contact-socials">

                {/* =================================================
                    INSTAGRAM
                ================================================= */}

                <a
                  href="https://www.instagram.com/bikers_modzlab?igsh=MXFtMGF5bTFua2cxdg=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social instagram-social"
                  aria-label="Visit ModzLab Instagram"
                >

                  <FaInstagram size={17} />

                  <span>
                    Instagram
                  </span>

                </a>


                {/* =================================================
                    YOUTUBE
                ================================================= */}

                <a
                  href="https://youtube.com/@mh14sonuvlogs?si=fc8QorK-exQXIxkV"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social youtube-social"
                  aria-label="Visit ModzLab YouTube"
                >

                  <FaYoutube size={17} />

                  <span>
                    YouTube
                  </span>

                </a>

              </div>

            </div>

          </div>

        </section>


        {/* ===================================================
            ORDER SUPPORT
        =================================================== */}

        <section className="contact-card contact-order-card">

          <div className="contact-order-header">

            <div className="contact-order-icon">

              <Package size={23} />

            </div>

            <div>

              <h2>
                Need Help With an Order?
              </h2>

              <p>
                For delivery, cancellation, damaged
                products, returns or exchanges,
                contact support with your order number.
              </p>

            </div>

          </div>


          {/* =================================================
              ORDER SUPPORT FORM
          ================================================= */}

          <form
            className="contact-order-form"
            onSubmit={handleOrderSupport}
          >

            {/* =================================================
                ORDER NUMBER
            ================================================= */}

            <div className="contact-field">

              <label htmlFor="order-number">
                Order Number
              </label>

              <input
                id="order-number"
                type="text"
                name="orderNumber"
                placeholder="e.g. ML-10245"
                value={orderData.orderNumber}
                onChange={handleOrderChange}
              />

            </div>


            {/* =================================================
                ISSUE
            ================================================= */}

            <div className="contact-field">

              <label htmlFor="order-issue">
                Issue
              </label>

              <select
                id="order-issue"
                name="issue"
                value={orderData.issue}
                onChange={handleOrderChange}
              >

                <option>
                  Order Status
                </option>

                <option>
                  Payment Issue
                </option>

                <option>
                  Wrong Product
                </option>

                <option>
                  Damaged Product
                </option>

                <option>
                  Return / Exchange
                </option>

                <option>
                  Cancellation
                </option>

              </select>

            </div>


            {/* =================================================
                SUPPORT BUTTON
            ================================================= */}

            <button
              type="submit"
              className="contact-order-btn"
            >

              <Package size={16} />

              <span>
                Contact Support
              </span>

            </button>

          </form>

        </section>


        {/* ===================================================
            FAQ
        =================================================== */}

        <section className="contact-faq">

          <div className="contact-kicker">
            QUICK ANSWERS
          </div>

          <h2>
            Frequently Asked Questions
          </h2>


          {/* =================================================
              FAQ 1
          ================================================= */}

          <details className="contact-faq-item">

            <summary>
              How can I track my order?
            </summary>

            <p>
              Use the order tracking details provided
              after your purchase, or contact support
              with your order number.
            </p>

          </details>


          {/* =================================================
              FAQ 2
          ================================================= */}

          <details className="contact-faq-item">

            <summary>
              Can I cancel my order?
            </summary>

            <p>
              Contact us as soon as possible with your
              order number. Cancellation depends on
              the current order status.
            </p>

          </details>


          {/* =================================================
              FAQ 3
          ================================================= */}

          <details className="contact-faq-item">

            <summary>
              Do you offer returns or exchanges?
            </summary>

            <p>
              Returns and exchanges can be handled
              through customer support, subject to
              your store&apos;s policy.
            </p>

          </details>


          {/* =================================================
              FAQ 4
          ================================================= */}

          <details className="contact-faq-item">

            <summary>
              How long does delivery take?
            </summary>

            <p>
              Delivery time depends on the customer&apos;s
              location and the product.
            </p>

          </details>

        </section>

      </main>

    </div>
  );
}

export default Contact;