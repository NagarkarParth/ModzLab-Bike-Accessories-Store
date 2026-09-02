import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";

import { supabase } from "../lib/supabaseClient";

import "./login.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  // ================= LOGIN =================

  const handleLogin = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    try {
      const { data, error } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password,
        });

      // ================= INVALID LOGIN =================

      if (error) {
        setErrorMessage(
          "User account doesn't exist or invalid credentials."
        );

        return;
      }

      console.log("Logged in user:", data.user);

      setSuccessMessage("Login successful!");

      // Give success message a moment to show
      setTimeout(() => {
        navigate("/");
      }, 800);

    } catch (error) {
      console.error("Login error:", error);

      setErrorMessage(
        "User account doesn't exist or invalid credentials."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-container">

        {/* ================= LEFT SIDE ================= */}

        <div className="login-left">

          {/* BACK BUTTON */}

          <button
            type="button"
            className="back-btn"
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={18} />
            Back to Home
          </button>

          {/* LOGO */}

          <div className="login-brand">
            <span>MODZ</span>
            <strong>LAB</strong>
          </div>

          {/* HEADING */}

          <h1>Welcome Back</h1>

          <p className="login-subtitle">
            Login to your ModzLab account and continue
            shopping for premium bike accessories.
          </p>

          {/* ================= LOGIN FORM ================= */}

          <form onSubmit={handleLogin}>

            {/* EMAIL */}

            <div className="input-group">

              <label htmlFor="email">
                Email Address
              </label>

              <div className="input-wrapper">

                <Mail size={19} />

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                  autoComplete="email"
                />

              </div>

            </div>

            {/* PASSWORD */}

            <div className="input-group">

              <div className="password-label">

                <label htmlFor="password">
                  Password
                </label>

                <Link to="/forgot-password">
                  Forgot Password?
                </Link>

              </div>

              <div className="input-wrapper">

                <Lock size={19} />

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                  autoComplete="current-password"
                />

                {/* SHOW / HIDE PASSWORD */}

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>

            </div>

            {/* ================= ERROR ================= */}

            {errorMessage && (
              <div className="login-error">
                {errorMessage}
              </div>
            )}

            {/* ================= SUCCESS ================= */}

            {successMessage && (
              <div className="login-success">
                {successMessage}
              </div>
            )}

            {/* ================= LOGIN BUTTON ================= */}

            <button
              type="submit"
              className="login-submit"
              disabled={loading}
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>

          </form>

          {/* ================= SIGN UP ================= */}

          <p className="signup-text">
            Don't have an account?{" "}

            <Link to="/signup">
              Create Account
            </Link>
          </p>

        </div>

        {/* ================= RIGHT SIDE ================= */}

        <div className="login-right">

          <div className="login-overlay">

            <div className="bike-icon">
              🏍️
            </div>

            <h2>RIDE.</h2>
            <h2>MODIFY.</h2>
            <h2>DOMINATE.</h2>

            <p>
              Premium accessories for riders
              who refuse to stay stock.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;