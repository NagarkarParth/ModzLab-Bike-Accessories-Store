import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";

import { supabase } from "../lib/supabaseClient";

import "./login.css";

function ResetPassword() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);

  const [checkingSession, setCheckingSession] =
    useState(true);

  const [recoverySession, setRecoverySession] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  // ==========================================
  // CHECK PASSWORD RECOVERY SESSION
  // ==========================================

  useEffect(() => {
    let mounted = true;

    const setupRecovery = async () => {
      // Listen for PASSWORD_RECOVERY
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(
        (event, session) => {
          console.log(
            "Supabase Auth Event:",
            event
          );

          console.log(
            "Recovery Session:",
            session
          );

          if (event === "PASSWORD_RECOVERY") {
            if (mounted) {
              setRecoverySession(true);
              setCheckingSession(false);
            }
          }
        }
      );

      // Check if a session already exists
      const {
        data: { session },
      } = await supabase.auth.getSession();

      console.log(
        "Current Supabase Session:",
        session
      );

      if (mounted && session) {
        setRecoverySession(true);
        setCheckingSession(false);
      } else if (mounted) {
        // Give Supabase a moment to process
        // the recovery URL
        setTimeout(async () => {
          const {
            data: { session: currentSession },
          } = await supabase.auth.getSession();

          if (currentSession) {
            setRecoverySession(true);
          } else {
            setErrorMessage(
              "Password reset session is missing or expired. Please request a new reset link."
            );
          }

          setCheckingSession(false);
        }, 1000);
      }
    };

    setupRecovery();

    return () => {
      mounted = false;
    };
  }, []);

  // ==========================================
  // UPDATE PASSWORD
  // ==========================================

  const handleResetPassword = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    // Check password length

    if (password.length < 6) {
      setErrorMessage(
        "Password must be at least 6 characters."
      );

      return;
    }

    // Check passwords

    if (password !== confirmPassword) {
      setErrorMessage(
        "Passwords do not match."
      );

      return;
    }

    setLoading(true);

    try {
      // Get current recovery session

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        throw sessionError;
      }

      if (!session) {
        setErrorMessage(
          "Auth session missing. Please request a new password reset link."
        );

        return;
      }

      // Update password

      const { error } =
        await supabase.auth.updateUser({
          password: password,
        });

      if (error) {
        throw error;
      }

      setSuccessMessage(
        "Password updated successfully!"
      );

      // Wait before going to login

      setTimeout(async () => {
        await supabase.auth.signOut();

        navigate("/login");
      }, 1500);

    } catch (error) {
      console.error(
        "Reset password error:",
        error
      );

      setErrorMessage(
        error.message ||
          "Unable to update password."
      );

    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // CHECKING SESSION
  // ==========================================

  if (checkingSession) {
    return (
      <div className="login-page">

        <div className="login-container">

          <div className="login-left">

            <div className="login-brand">
              <span>MODZ</span>
              <strong>LAB</strong>
            </div>

            <h1>
              Verifying Reset Link
            </h1>

            <p className="login-subtitle">
              Please wait while we verify your
              password reset request...
            </p>

            <div className="login-success">
              Checking authentication...
            </div>

          </div>

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

  // ==========================================
  // NO RECOVERY SESSION
  // ==========================================

  if (!recoverySession) {
    return (
      <div className="login-page">

        <div className="login-container">

          <div className="login-left">

            <button
              type="button"
              className="back-btn"
              onClick={() =>
                navigate("/login")
              }
            >
              <ArrowLeft size={18} />
              Back to Login
            </button>

            <div className="login-brand">
              <span>MODZ</span>
              <strong>LAB</strong>
            </div>

            <h1>
              Reset Link Expired
            </h1>

            <p className="login-subtitle">
              This password reset link is no
              longer valid. Please request a
              new password reset link.
            </p>

            {errorMessage && (
              <div className="login-error">
                {errorMessage}
              </div>
            )}

            <Link
              to="/forgot-password"
              className="login-submit"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
                boxSizing: "border-box",
              }}
            >
              Request New Reset Link
            </Link>

          </div>

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

  // ==========================================
  // RESET PASSWORD PAGE
  // ==========================================

  return (
    <div className="login-page">

      <div className="login-container">

        {/* =================================
            LEFT SIDE
        ================================= */}

        <div className="login-left">

          <button
            type="button"
            className="back-btn"
            onClick={() =>
              navigate("/login")
            }
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

          <h1>
            Reset Password
          </h1>

          <p className="login-subtitle">
            Create a new password for your
            ModzLab account.
          </p>

          {/* FORM */}

          <form
            onSubmit={handleResetPassword}
          >

            {/* NEW PASSWORD */}

            <div className="input-group">

              <label htmlFor="password">
                New Password
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
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  required
                  minLength="6"
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
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
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  required
                  minLength="6"
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
                ? "Updating..."
                : "Update Password"}
            </button>

          </form>

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

export default ResetPassword;