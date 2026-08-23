import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check passwords
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Save user information
    const user = {
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
    };

    localStorage.setItem(
      "registeredUser",
      JSON.stringify(user)
    );

    // Login user automatically
    localStorage.setItem(
      "isLoggedIn",
      "true"
    );

    localStorage.setItem(
      "userEmail",
      formData.email
    );

    alert("Account created successfully!");

    navigate("/");
  };

  return (
    <div className="register-page">

      <div className="register-card">

        {/* ================= LOGO ================= */}

        <Link
          to="/"
          className="register-logo"
        >
          <span>MODZ</span>
          <strong>LAB</strong>
        </Link>


        {/* ================= HEADER ================= */}

        <div className="register-header">

          <h1>
            Create Account
          </h1>

          <p>
            Create your MODZLAB account
          </p>

        </div>


        {/* ================= FORM ================= */}

        <form
          className="register-form"
          onSubmit={handleSubmit}
        >

          {/* NAME */}

          <div className="register-field">

            <label htmlFor="name">
              Full Name
            </label>

            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />

          </div>


          {/* EMAIL */}

          <div className="register-field">

            <label htmlFor="email">
              Email Address
            </label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>


          {/* MOBILE */}

          <div className="register-field">

            <label htmlFor="mobile">
              Mobile Number
            </label>

            <input
              id="mobile"
              type="tel"
              name="mobile"
              placeholder="Enter mobile number"
              value={formData.mobile}
              onChange={handleChange}
              required
            />

          </div>


          {/* PASSWORD */}

          <div className="register-field">

            <label htmlFor="password">
              Password
            </label>

            <div className="register-password-wrapper">

              <input
                id="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="register-show-password"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword
                  ? "Hide"
                  : "Show"}
              </button>

            </div>

          </div>


          {/* CONFIRM PASSWORD */}

          <div className="register-field">

            <label htmlFor="confirmPassword">
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

          </div>


          {/* CREATE ACCOUNT BUTTON */}

          <button
            type="submit"
            className="register-button"
          >

            <span>
              CREATE ACCOUNT
            </span>

            <span className="register-arrow">
              →
            </span>

          </button>

        </form>


        {/* ================= LOGIN ================= */}

        <div className="login-section">

          <span>
            Already have an account?
          </span>

          <Link to="/login">
            Sign In
          </Link>

        </div>


        {/* ================= BACK HOME ================= */}

        <Link
          to="/"
          className="register-back-home"
        >
          ← Back to Home
        </Link>

      </div>

    </div>
  );
}

export default Register;