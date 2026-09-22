import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "User",
    email: "user@example.com",
    phone: "+91 98765 43210",
    city: "Ahmedabad",
    country: "India",
  });

  const [preferences, setPreferences] = useState({
    travelStyle: "Adventure",
    language: "English",
    budget: "Medium",
  });

  // Component load hone par localStorage se logged-in user ki details nikalna
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) {
      setProfile((prev) => ({
        ...prev,
        name: storedUser.name || prev.name,
        email: storedUser.email || prev.email,
        phone: storedUser.phone || prev.phone,
        city: storedUser.city || "Ahmedabad",
        country: storedUser.country || "India",
      }));
    }
  }, []);

  const updateProfile = (key, value) => {
    setProfile((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const updatePreference = (key, value) => {
    setPreferences((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const saveProfile = () => {
    setEditing(false);
    // Updated profile ko localStorage mein bhi save karna taaki session mein bani rahe
    localStorage.setItem("currentUser", JSON.stringify(profile));
    alert("Profile updated successfully.");
  };

  const logout = () => {
    localStorage.removeItem("currentUser"); // Logout par session clear karna
    navigate("/");
  };

  // Avatar ke liye initials nikalna (Jaise 'John Doe' se 'JD')
  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="page">
      <Navbar />

      <main className="profile-page">
        <div className="container">

          <div className="profile-header">
            <div>
              <span className="label">ACCOUNT SETTINGS</span>
              <h1>My Profile</h1>
              <p>
                Manage your personal details and travel preferences.
              </p>
            </div>

            <button
              className="btn"
              onClick={() =>
                editing ? saveProfile() : setEditing(true)
              }
            >
              {editing ? "✓ Save Profile" : "✎ Edit Profile"}
            </button>
          </div>

          <div className="profile-layout">

            <section className="profile-main">

              <div className="profile-card card">

                <div className="profile-cover">
                  <div className="profile-avatar">
                    {getInitials(profile.name)}
                  </div>
                </div>

                <div className="profile-details">

                  <div className="profile-name-section">
                    <div>
                      <h2>{profile.name}</h2>
                      <p>GlobeTrotter Traveler</p>
                    </div>

                    <span className="profile-status">
                      ● Active
                    </span>
                  </div>

                  <div className="profile-form">

                    <div className="form-group">
                      <label>Full Name</label>

                      <input
                        type="text"
                        value={profile.name}
                        disabled={!editing}
                        onChange={(e) =>
                          updateProfile("name", e.target.value)
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label>Email Address</label>

                      <input
                        type="email"
                        value={profile.email}
                        disabled={!editing}
                        onChange={(e) =>
                          updateProfile("email", e.target.value)
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label>Phone Number</label>

                      <input
                        type="text"
                        value={profile.phone}
                        disabled={!editing}
                        onChange={(e) =>
                          updateProfile("phone", e.target.value)
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label>City</label>

                      <input
                        type="text"
                        value={profile.city}
                        disabled={!editing}
                        onChange={(e) =>
                          updateProfile("city", e.target.value)
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label>Country</label>

                      <input
                        type="text"
                        value={profile.country}
                        disabled={!editing}
                        onChange={(e) =>
                          updateProfile("country", e.target.value)
                        }
                      />
                    </div>

                  </div>

                </div>

              </div>

              <div className="preferences-card card">

                <div className="profile-section-heading">
                  <div>
                    <span className="label">TRAVEL PREFERENCES</span>
                    <h2>How you like to travel</h2>
                  </div>

                  <span className="preference-icon">
                    🌍
                  </span>
                </div>

                <div className="preferences-grid">

                  <div className="preference-item">
                    <label>Travel Style</label>

                    <select
                      value={preferences.travelStyle}
                      disabled={!editing}
                      onChange={(e) =>
                        updatePreference(
                          "travelStyle",
                          e.target.value
                        )
                      }
                    >
                      <option>Adventure</option>
                      <option>Relaxation</option>
                      <option>Culture</option>
                      <option>Luxury</option>
                      <option>Budget</option>
                    </select>
                  </div>

                  <div className="preference-item">
                    <label>Preferred Language</label>

                    <select
                      value={preferences.language}
                      disabled={!editing}
                      onChange={(e) =>
                        updatePreference(
                          "language",
                          e.target.value
                        )
                      }
                    >
                      <option>English</option>
                      <option>Gujarati</option>
                      <option>Hindi</option>
                    </select>
                  </div>

                  <div className="preference-item">
                    <label>Budget Preference</label>

                    <select
                      value={preferences.budget}
                      disabled={!editing}
                      onChange={(e) =>
                        updatePreference(
                          "budget",
                          e.target.value
                        )
                      }
                    >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Luxury</option>
                    </select>
                  </div>

                </div>

              </div>

            </section>

            <aside className="profile-sidebar">

              <div className="profile-stats card">

                <div className="profile-section-heading">
                  <div>
                    <span className="label">YOUR JOURNEY</span>
                    <h2>Travel Statistics</h2>
                  </div>
                </div>

                <div className="profile-stat-list">

                  <div className="profile-stat">
                    <span className="stat-icon">🗺️</span>

                    <div>
                      <strong>4</strong>
                      <p>Total Trips</p>
                    </div>
                  </div>

                  <div className="profile-stat">
                    <span className="stat-icon">📍</span>

                    <div>
                      <strong>6</strong>
                      <p>Destinations</p>
                    </div>
                  </div>

                  <div className="profile-stat">
                    <span className="stat-icon">🎯</span>

                    <div>
                      <strong>18</strong>
                      <p>Activities</p>
                    </div>
                  </div>

                  <div className="profile-stat">
                    <span className="stat-icon">📅</span>

                    <div>
                      <strong>24</strong>
                      <p>Travel Days</p>
                    </div>
                  </div>

                </div>

              </div>

              <div className="quick-settings card">

                <span className="label">QUICK SETTINGS</span>

                <Link to="/my-trips">
                  <span>🗺️</span>
                  <div>
                    <strong>My Trips</strong>
                    <small>Manage your journeys</small>
                  </div>
                  <b>→</b>
                </Link>

                <Link to="/budget">
                  <span>💰</span>
                  <div>
                    <strong>Budget</strong>
                    <small>Track your travel expenses</small>
                  </div>
                  <b>→</b>
                </Link>

                <Link to="/share-trip">
                  <span>🔗</span>
                  <div>
                    <strong>Shared Trips</strong>
                    <small>Manage collaboration</small>
                  </div>
                  <b>→</b>
                </Link>

              </div>

              <div className="profile-tip">

                <div className="tip-icon">
                  ✨
                </div>

                <div>
                  <span className="label">
                    TRAVEL TIP
                  </span>

                  <h3>
                    Keep your preferences updated
                  </h3>

                  <p>
                    Your preferences help GlobeTrotter suggest
                    better destinations and activities.
                  </p>
                </div>

              </div>

              <button
                className="logout-btn"
                onClick={logout}
              >
                ↪ Logout
              </button>

            </aside>

          </div>

        </div>
      </main>
      {/* --- Ye raha aapka Footer jo har page par dikhega --- */}
<footer style={{ 
  backgroundColor: "#0f172a", 
  color: "#ffffff", 
  padding: "30px 20px", 
  marginTop: "50px",
  textAlign: "center",
  borderRadius: "12px 12px 0 0"
}}>
  <h3 style={{ marginBottom: "10px", color: "#38bdf8" }}>GlobeTrotter - About Us</h3>
  <p style={{ maxWidth: "600px", margin: "0 auto 20px auto", color: "#94a3b8", fontSize: "14px", lineHeight: "1.5" }}>
    GlobeTrotter is your ultimate travel companion to plan trips, explore cities, manage budgets, and share adventures seamlessly with your loved ones.
  </p>

  <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap", fontSize: "14px" }}>
    <span>📞 Phone: +91 98765 43210</span>
    <span>💬 WhatsApp: GlobeTrotter Support</span>
    <span>📸 Instagram: @globetrotter_official</span>
  </div>

  <div style={{ marginTop: "20px", fontSize: "12px", color: "#64748b" }}>
    © 2026 GlobeTrotter. All rights reserved.
  </div>
</footer>
    </div>
  );
}

export default Profile;