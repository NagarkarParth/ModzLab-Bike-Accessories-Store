import { useEffect, useState } from "react";

import {
  User,
  Heart,
  Package,
  Settings,
  LogOut,
  ArrowLeft,
} from "lucide-react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import { supabase } from "../lib/supabaseClient";

import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // GET LOGGED-IN USER
  // =====================================================

  useEffect(() => {
    let mounted = true;

    const getUser = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error) {
          console.error(
            "User error:",
            error
          );

          if (mounted) {
            setLoading(false);
          }

          return;
        }

        if (mounted) {
          setUser(user);
          setLoading(false);
        }

      } catch (error) {
        console.error(
          "Unexpected user error:",
          error
        );

        if (mounted) {
          setLoading(false);
        }
      }
    };

    getUser();

    // =================================================
    // LISTEN FOR AUTH CHANGES
    // =================================================

    const {
      data: {
        subscription,
      },
    } = supabase.auth.onAuthStateChange(
      (event, session) => {

        if (!mounted) {
          return;
        }

        setUser(
          session?.user ?? null
        );

        setLoading(false);
      }
    );

    return () => {
      mounted = false;

      subscription.unsubscribe();
    };

  }, []);

  // =====================================================
  // GET USER NAME
  // =====================================================

  const getUserName = () => {

    if (!user) {
      return "User";
    }

    return (
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      user.email?.split("@")[0] ||
      "User"
    );
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = async () => {

    try {

      const {
        error,
      } = await supabase.auth.signOut();

      if (error) {

        console.error(
          "Logout error:",
          error
        );

        return;
      }

      // Go to home
      navigate("/");

    } catch (error) {

      console.error(
        "Unexpected logout error:",
        error
      );

    }
  };

  // =====================================================
  // WISHLIST
  // =====================================================

  const handleWishlist = () => {

    /*
      Wishlist page will use the currently
      logged-in Supabase user's ID.

      Example:

      user.id

      This means every user gets their
      own wishlist.
    */

    navigate("/wishlist");
  };

  // =====================================================
  // MY ORDERS
  // =====================================================

  const handleOrders = () => {

    /*
      Orders page will use the currently
      logged-in Supabase user's ID.

      Example:

      user.id

      This means every user gets their
      own orders.
    */

    navigate("/orders");
  };

  // =====================================================
  // ACCOUNT SETTINGS
  // =====================================================

  const handleAccountSettings = () => {

    console.log(
      "Account Settings clicked"
    );

    // Account Settings can be
    // implemented later.
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (
      <div className="profile-page profile-loading">

        <div className="profile-loader">

          Loading...

        </div>

      </div>
    );
  }

  // =====================================================
  // USER NOT LOGGED IN
  // =====================================================

  if (!user) {

    return (
      <div className="profile-page">

        <div className="profile-not-logged">

          <User size={50} />

          <h2>
            Please Login
          </h2>

          <p>
            You need to login to view
            your profile.
          </p>

          <button
            type="button"
            className="profile-login-btn"
            onClick={() =>
              navigate("/login")
            }
          >
            Login
          </button>

        </div>

      </div>
    );
  }

  // =====================================================
  // PROFILE
  // =====================================================

  return (
    <div className="profile-page">

      <div className="profile-container">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="profile-header">

          <span className="profile-label">
            MY ACCOUNT
          </span>

          <h1>

            Hello,{" "}

            <span>
              {getUserName()}
            </span>{" "}

            <span className="wave">
              👋
            </span>

          </h1>

          <p>
            Manage your ModzLab account,
            orders and wishlist.
          </p>

        </div>


        {/* =================================================
            PERSONAL INFORMATION
        ================================================= */}

        <section className="personal-information">

          <div className="personal-icon">

            <User size={24} />

          </div>

          <div className="personal-content">

            <h2>
              Personal Information
            </h2>

            <p className="personal-description">
              Your account information
            </p>

            {/* ================= NAME ONLY ================= */}

            <div className="personal-name">

              <span className="info-label">
                Name
              </span>

              <span className="info-value">
                {getUserName()}
              </span>

            </div>

          </div>

        </section>


        {/* =================================================
            PROFILE OPTIONS
        ================================================= */}

        <div className="profile-options">

          {/* =================================================
              WISHLIST
          ================================================= */}

          <button
            type="button"
            className="profile-option"
            onClick={handleWishlist}
          >

            <div className="option-icon">

              <Heart size={25} />

            </div>

            <div className="option-content">

              <h3>
                Wishlist
              </h3>

              <p>
                View your saved products
              </p>

              <span className="option-arrow">
                →
              </span>

            </div>

          </button>


          {/* =================================================
              MY ORDERS
          ================================================= */}

          <button
            type="button"
            className="profile-option"
            onClick={handleOrders}
          >

            <div className="option-icon">

              <Package size={25} />

            </div>

            <div className="option-content">

              <h3>
                My Orders
              </h3>

              <p>
                View your previous orders
              </p>

              <span className="option-arrow">
                →
              </span>

            </div>

          </button>


          {/* =================================================
              ACCOUNT SETTINGS
          ================================================= */}

          <button
            type="button"
            className="profile-option"
            onClick={
              handleAccountSettings
            }
          >

            <div className="option-icon">

              <Settings size={25} />

            </div>

            <div className="option-content">

              <h3>
                Account Settings
              </h3>

              <p>
                Manage your account
              </p>

              <span className="option-arrow">
                →
              </span>

            </div>

          </button>

        </div>


        {/* =================================================
            LOGOUT
        ================================================= */}

        <button
          type="button"
          className="profile-logout-btn"
          onClick={handleLogout}
        >

          <LogOut size={20} />

          <span>
            Logout
          </span>

        </button>


        {/* =================================================
            BACK TO HOME
        ================================================= */}

        <Link
          to="/"
          className="profile-back-home"
          onClick={() => {

            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });

          }}
        >

          <ArrowLeft size={18} />

          <span>
            Back to Home
          </span>

        </Link>

      </div>

    </div>
  );
}

export default Profile;