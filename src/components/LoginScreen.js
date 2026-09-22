import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginScreen.css";

function LoginScreen() {
  const navigate = useNavigate();

  // Email / Password States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Handle Email Login / Register
  const handleEmailLogin = (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("globeTrotterUsers")) || {};

    if (users[email]) {
      // User पहले से registered है -> Password check करो
      if (users[email].password !== password) {
        setError("Incorrect password! Please enter the correct password.");
        return;
      }
      setSuccessMsg("Welcome back! Login successful.");
    } else {
      // Naya user hai -> Register karke save karo
      const nameParts = email.split("@")[0].split(".");
      const formattedName = nameParts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
      
      users[email] = {
        email: email,
        password: password,
        name: formattedName || "GlobeTrotter User",
        loginType: "email"
      };
      localStorage.setItem("globeTrotterUsers", JSON.stringify(users));
      setSuccessMsg("Account created successfully!");
    }

    localStorage.setItem("currentUser", JSON.stringify(users[email]));
    
    setTimeout(() => {
      navigate("/dashboard");
    }, 800);
  };

  return (
    <div className="login-page">
      {/* LEFT SECTION WITH NATURE & TRAVEL BACKGROUND */}
      <div 
        className="login-left" 
        style={{
          backgroundImage: `linear-gradient(rgba(10, 25, 47, 0.65), rgba(10, 25, 47, 0.80)), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1350&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="login-brand">
          <div className="login-brand-icon">🌍</div>
          <div>
            <h1 style={{ color: "#ffffff", textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>GlobeTrotter</h1>
            <p style={{ color: "#cbd5e1" }}>Personalized Travel Planning</p>
          </div>
        </div>

        <div className="login-left-content">
          <span className="login-small-title" style={{ color: "#38bdf8", fontWeight: "700", letterSpacing: "1px" }}>
            PLAN • EXPLORE • TRAVEL
          </span>
          <h2 style={{ color: "#ffffff", textShadow: "0 2px 6px rgba(0,0,0,0.6)" }}>
            Your journey,
            <br />
            your way.
          </h2>
          <p style={{ color: "#e2e8f0" }}>
            Discover amazing destinations, create personalized itineraries and manage every part of your trip in one place.
          </p>

          <div className="login-features">
            <div className="login-feature" style={{ backgroundColor: "rgba(15, 23, 42, 0.6)", padding: "12px", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.15)", backdropFilter: "blur(6px)" }}>
              <span>🗺️</span>
              <div>
                <strong style={{ color: "#ffffff" }}>Personalized Trips</strong>
                <small style={{ color: "#94a3b8" }}>Create trips based on your preferences.</small>
              </div>
            </div>
            <div className="login-feature" style={{ backgroundColor: "rgba(15, 23, 42, 0.6)", padding: "12px", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.15)", backdropFilter: "blur(6px)" }}>
              <span>📅</span>
              <div>
                <strong style={{ color: "#ffffff" }}>Smart Itinerary</strong>
                <small style={{ color: "#94a3b8" }}>Organize your travel plans easily.</small>
              </div>
            </div>
            <div className="login-feature" style={{ backgroundColor: "rgba(15, 23, 42, 0.6)", padding: "12px", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.15)", backdropFilter: "blur(6px)" }}>
              <span>💰</span>
              <div>
                <strong style={{ color: "#ffffff" }}>Budget Planning</strong>
                <small style={{ color: "#94a3b8" }}>Keep your travel expenses under control.</small>
              </div>
            </div>
          </div>
        </div>

        <div className="login-left-footer" style={{ color: "#cbd5e1" }}>
          <span>✈️</span>
          <span>Make every journey memorable.</span>
        </div>
      </div>

      {/* RIGHT LOGIN SECTION */}
      <div className="login-right">
        <div className="login-card">
          <div className="login-card-header">
            <div className="login-mobile-logo">🌍</div>
            <h2>Welcome Back!</h2>
            <p>Sign in with your email and password.</p>
          </div>

          {/* EMAIL & PASSWORD FORM */}
          <form onSubmit={handleEmailLogin}>
            <div className="login-form-group">
              <label htmlFor="email">Email Address</label>
              <div className="login-input-wrapper">
                <span className="login-input-icon">✉️</span>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="login-form-group">
              <div className="password-label-row">
                <label htmlFor="password">Password</label>
                <button
                  type="button"
                  className="forgot-password"
                  onClick={() => setError("Password reset feature will be available soon.")}
                >
                  Forgot Password?
                </button>
              </div>

              <div className="login-input-wrapper">
                <span className="login-input-icon">🔒</span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="show-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Show or hide password"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div className="login-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
            </div>

            {error && (
              <div className="login-error" style={{ color: "#ef4444", marginBottom: "15px", fontSize: "14px", fontWeight: "600" }}>
                {error}
              </div>
            )}

            {successMsg && (
              <div style={{ color: "#16a34a", marginBottom: "15px", fontSize: "14px", fontWeight: "600" }}>
                {successMsg}
              </div>
            )}

            <button type="submit" className="login-button">
              Sign In / Register
            </button>
          </form>

          <div className="login-divider">
            <span></span>
            <p>OR</p>
            <span></span>
          </div>

          <button
            type="button"
            className="guest-button"
            onClick={() => {
              localStorage.setItem("currentUser", JSON.stringify({ name: "Guest User", email: "guest@globetrotter.com" }));
              navigate("/dashboard");
            }}
          >
            Continue as Guest
          </button>

          <div className="signup-section">
            <p>Don't have an account?</p>
            <Link to="/dashboard">Create an Account</Link>
          </div>

          <div className="login-security">
            🔐 Your information is kept secure.
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;