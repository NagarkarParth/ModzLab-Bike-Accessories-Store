import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    // ==========================================
    // CHECK REGISTERED USER
    // ==========================================

    const registeredUser =
      localStorage.getItem("registeredUser");

    if (registeredUser) {
      const user = JSON.parse(registeredUser);

      if (user.email !== formData.email) {
        alert("Email address is not registered.");
        return;
      }
    }

    // ==========================================
    // SAVE LOGIN STATUS
    // ==========================================

    localStorage.setItem(
      "isLoggedIn",
      "true"
    );

    localStorage.setItem(
      "userEmail",
      formData.email
    );

    // ==========================================
    // LOGIN SUCCESS
    // ==========================================

    alert("Login successful!");

    // ==========================================
    // RETURN TO PREVIOUS PAGE
    // ==========================================

    const returnTo =
      location.state?.from || "/";

    navigate(returnTo);
  };

  return (
    <div className="login-page">

      <div className="login-card">

        {/* ========================================
            LOGO
        ======================================== */}

        <Link
          to="/"
          className="login-logo"
        >
          <span>MODZ</span>
          <strong>LAB</strong>
        </Link>


        {/* ========================================
            HEADER
        ======================================== */}

        <div className="login-header">

          <h1>
            Welcome Back
          </h1>

          <p>
            Sign in to continue to your account
          </p>

        </div>


        {/* ========================================
            LOGIN FORM
        ======================================== */}

        <form
          className="login-form"
          onSubmit={handleSubmit}
        >

          {/* EMAIL */}

          <div className="login-field">

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


          {/* PASSWORD */}

          <div className="login-field">

            <label htmlFor="password">
              Password
            </label>

            <div className="password-wrapper">

              <input
                id="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="show-password"
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


          {/* ========================================
              OPTIONS
          ======================================== */}

          <div className="login-options">

            <label className="remember-me">

              <input
                type="checkbox"
              />

              <span>
                Remember me
              </span>

            </label>


            <button
              type="button"
              className="forgot-password"
              onClick={() =>
                alert(
                  "Password reset feature coming soon!"
                )
              }
            >
              Forgot Password?
            </button>

          </div>


          {/* ========================================
              LOGIN BUTTON
          ======================================== */}

          <button
            type="submit"
            className="login-button"
          >

            <span>
              SIGN IN
            </span>

            <span className="login-arrow">
              →
            </span>

          </button>

        </form>


        {/* ========================================
            REGISTER
        ======================================== */}

        <div className="register-section">

          <span>
            Don't have an account?
          </span>

          <Link
            to="/register"
            className="create-account-link"
          >
            Create Account
          </Link>

        </div>


        {/* ========================================
            BACK HOME
        ======================================== */}

        <Link
          to="/"
          className="back-home"
        >
          ← Back to Home
        </Link>

      </div>

    </div>
  );
}

export default Login;