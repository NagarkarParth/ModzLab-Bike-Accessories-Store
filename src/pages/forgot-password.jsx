import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";

import { supabase } from "../lib/supabaseClient";

import "./login.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] =
    useState("");

  const navigate = useNavigate();

  // ==========================================
  // SEND RESET EMAIL
  // ==========================================

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    try {
      const { error } =
        await supabase.auth.resetPasswordForEmail(
          email.trim(),
          {
            redirectTo:
              `${window.location.origin}/reset-password`,
          }
        );

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      setSuccessMessage(
        "Password reset link has been sent to your email."
      );

    } catch (error) {
      console.error(
        "Forgot password error:",
        error
      );

      setErrorMessage(
        "Something went wrong. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-container">

        {/* =================================
            LEFT SIDE
        ================================= */}

        <div className="login-left">

          {/* BACK */}

          <button
            type="button"
            className="back-btn"
            onClick={() => navigate("/login")}
          >
            <ArrowLeft size={18} />
            Back to Login
          </button>

          {/* LOGO */}

          <div className="login-brand">
            <span>MODZ</span>
            <strong>LAB</strong>
          </div>

          {/* HEADING */}

          <h1>Forgot Password?</h1>

          <p className="login-subtitle">
            Enter your registered email address and
            we'll send you a link to reset your
            password.
          </p>

          {/* =================================
              FORM
          ================================= */}

          <form onSubmit={handleForgotPassword}>

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

            {/* ERROR */}

            {errorMessage && (
              <div className="login-error">
                {errorMessage}
              </div>
            )}

            {/* SUCCESS */}

            {successMessage && (
              <div className="login-success">
                <CheckCircle size={17} />
                <span>
                  {successMessage}
                </span>
              </div>
            )}

            {/* BUTTON */}

            <button
              type="submit"
              className="login-submit"
              disabled={loading}
            >
              {loading
                ? "Sending..."
                : "Send Reset Link"}
            </button>

          </form>

          {/* LOGIN */}

          <p className="signup-text">

            Remember your password?{" "}

            <Link to="/login">
              Login
            </Link>

          </p>

        </div>

        {/* =================================
            RIGHT SIDE
        ================================= */}

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

export default ForgotPassword;