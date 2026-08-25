import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";

import { supabase } from "../lib/supabaseClient";

import "./login.css";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  // ================= SIGN UP =================

  const handleSignup = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    // Check password
    if (password.length < 6) {
      setErrorMessage(
        "Password must be at least 6 characters."
      );
      return;
    }

    // Check confirm password
    if (password !== confirmPassword) {
      setErrorMessage(
        "Passwords do not match."
      );
      return;
    }

    setLoading(true);

    try {
      const { data, error } =
        await supabase.auth.signUp({
          email: email.trim(),
          password: password,

          options: {
            data: {
              full_name: name.trim(),
            },
          },
        });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      console.log("Signup user:", data.user);

      setSuccessMessage(
        "Account created successfully!"
      );

      /*
        If email confirmation is enabled in Supabase,
        the user must confirm their email before login.
      */

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      console.error("Signup error:", error);

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

          <h1>Create Account</h1>

          <p className="login-subtitle">
            Create your ModzLab account and start
            shopping for premium bike accessories.
          </p>

          {/* ================= SIGNUP FORM ================= */}

          <form onSubmit={handleSignup}>

            {/* NAME */}

            <div className="input-group">

              <label htmlFor="name">
                Full Name
              </label>

              <div className="input-wrapper">

                <User size={19} />

                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  required
                  autoComplete="name"
                />

              </div>

            </div>

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

              <label htmlFor="password">
                Password
              </label>

              <div className="input-wrapper">

                <Lock size={19} />

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                  autoComplete="new-password"
                />

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

            {/* CONFIRM PASSWORD */}

            <div className="input-group">

              <label htmlFor="confirmPassword">
                Confirm Password
              </label>

              <div className="input-wrapper">

                <Lock size={19} />

                <input
                  id="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  required
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

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
                {successMessage}
              </div>
            )}

            {/* SIGNUP BUTTON */}

            <button
              type="submit"
              className="login-submit"
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>

          {/* LOGIN LINK */}

          <p className="signup-text">
            Already have an account?{" "}

            <Link to="/login">
              Login
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

export default Signup;