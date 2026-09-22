import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [search, setSearch] = useState("");

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Keyuri Thakkar",
      email: "keyuri@example.com",
      trips: 4,
      status: "Active"
    },
    {
      id: 2,
      name: "Rahul Patel",
      email: "rahul@example.com",
      trips: 7,
      status: "Active"
    },
    {
      id: 3,
      name: "Priya Shah",
      email: "priya@example.com",
      trips: 3,
      status: "Active"
    },
    {
      id: 4,
      name: "Aarav Mehta",
      email: "aarav@example.com",
      trips: 5,
      status: "Inactive"
    },
    {
      id: 5,
      name: "Neha Joshi",
      email: "neha@example.com",
      trips: 2,
      status: "Active"
    }
  ]);

  const toggleStatus = (id) => {
    setUsers((current) =>
      current.map((user) =>
        user.id === id
          ? {
              ...user,
              status:
                user.status === "Active" ? "Inactive" : "Active"
            }
          : user
      )
    );
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <Navbar />

      <main className="admin-page">
        <div className="container">

          <div className="admin-header">
            <div>
              <span className="label">SYSTEM MANAGEMENT</span>
              <h1>Admin Dashboard</h1>
              <p>
                Manage users, trips, destinations and platform activity.
              </p>
            </div>

            <Link to="/dashboard" className="btn">
              ← Back to Dashboard
            </Link>
          </div>

          <div className="admin-stats">

            <div className="admin-stat-card card">
              <div className="admin-stat-icon">👥</div>
              <div>
                <span>Total Users</span>
                <strong>1,248</strong>
                <small>↑ 12% this month</small>
              </div>
            </div>

            <div className="admin-stat-card card">
              <div className="admin-stat-icon">🗺️</div>
              <div>
                <span>Total Trips</span>
                <strong>3,642</strong>
                <small>↑ 18% this month</small>
              </div>
            </div>

            <div className="admin-stat-card card">
              <div className="admin-stat-icon">📍</div>
              <div>
                <span>Destinations</span>
                <strong>86</strong>
                <small>8 added recently</small>
              </div>
            </div>

            <div className="admin-stat-card card">
              <div className="admin-stat-icon">🎯</div>
              <div>
                <span>Activities</span>
                <strong>324</strong>
                <small>24 new activities</small>
              </div>
            </div>

          </div>

          <div className="admin-layout">

            <section className="admin-users card">

              <div className="admin-section-header">
                <div>
                  <span className="label">USER MANAGEMENT</span>
                  <h2>Registered Users</h2>
                </div>

                <div className="admin-search">
                  <span>🔍</span>
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="user-table-wrapper">
                <table className="user-table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Trips</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id}>
                        <td>
                          <div className="user-info">
                            <div className="user-avatar">
                              {user.name
                                .split(" ")
                                .map((word) => word[0])
                                .join("")}
                            </div>

                            <div>
                              <strong>{user.name}</strong>
                              <small>{user.email}</small>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span className="trip-count">
                            {user.trips}
                          </span>
                        </td>

                        <td>
                          <span
                            className={
                              user.status === "Active"
                                ? "user-status active"
                                : "user-status inactive"
                            }
                          >
                            ● {user.status}
                          </span>
                        </td>

                        <td>
                          <button
                            className="status-btn"
                            onClick={() => toggleStatus(user.id)}
                          >
                            {user.status === "Active"
                              ? "Deactivate"
                              : "Activate"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredUsers.length === 0 && (
                <div className="admin-empty">
                  <div>🔎</div>
                  <h3>No users found</h3>
                  <p>Try another name or email address.</p>
                </div>
              )}

            </section>

            <aside className="admin-sidebar">

              <div className="recent-activity card">

                <div className="admin-section-header simple">
                  <div>
                    <span className="label">RECENT ACTIVITY</span>
                    <h2>Latest Updates</h2>
                  </div>
                </div>

                <div className="activity-list">

                  <div className="admin-activity">
                    <span>👤</span>
                    <div>
                      <strong>New user registered</strong>
                      <small>Keyuri joined GlobeTrotter</small>
                      <em>10 minutes ago</em>
                    </div>
                  </div>

                  <div className="admin-activity">
                    <span>🗺️</span>
                    <div>
                      <strong>Trip created</strong>
                      <small>Jaipur Adventure was created</small>
                      <em>35 minutes ago</em>
                    </div>
                  </div>

                  <div className="admin-activity">
                    <span>📍</span>
                    <div>
                      <strong>Destination added</strong>
                      <small>Kerala added to destinations</small>
                      <em>1 hour ago</em>
                    </div>
                  </div>

                  <div className="admin-activity">
                    <span>🎯</span>
                    <div>
                      <strong>Activity added</strong>
                      <small>Mountain Trek added</small>
                      <em>2 hours ago</em>
                    </div>
                  </div>

                </div>

              </div>

              <div className="system-status card">

                <span className="label">SYSTEM STATUS</span>
                <h2>Platform Health</h2>

                <div className="system-item">
                  <div>
                    <span className="system-dot"></span>
                    <strong>Website</strong>
                  </div>
                  <b>Operational</b>
                </div>

                <div className="system-item">
                  <div>
                    <span className="system-dot"></span>
                    <strong>Database</strong>
                  </div>
                  <b>Operational</b>
                </div>

                <div className="system-item">
                  <div>
                    <span className="system-dot"></span>
                    <strong>API Services</strong>
                  </div>
                  <b>Operational</b>
                </div>

                <div className="system-progress">
                  <div>
                    <span>System performance</span>
                    <strong>98%</strong>
                  </div>
                  <div className="progress-track">
                    <span></span>
                  </div>
                </div>

              </div>

              <div className="admin-tip">

                <div className="tip-icon">🛡️</div>

                <div>
                  <span className="label">ADMIN TIP</span>
                  <h3>Keep the platform organized</h3>
                  <p>
                    Regularly review inactive accounts and platform
                    activity to keep GlobeTrotter safe and useful.
                  </p>
                </div>

              </div>

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

export default AdminDashboard;