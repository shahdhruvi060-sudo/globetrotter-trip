import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./ItineraryView.css";

function ItineraryView() {
  const days = [
    {
      day: "Day 1",
      date: "12 June 2026",
      title: "Arrival & Pink City",
      activities: [
        {
          time: "09:00 AM",
          title: "Travel to Jaipur",
          location: "Ahmedabad → Jaipur",
          duration: "5 hours",
          image:
            "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=500&q=80",
        },
        {
          time: "02:00 PM",
          title: "Hotel Check-in",
          location: "Jaipur Hotel",
          duration: "1 hour",
          image:
            "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=500&q=80",
        },
        {
          time: "05:00 PM",
          title: "Explore Pink City",
          location: "Old Jaipur",
          duration: "2 hours",
          image:
            "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=500&q=80",
        },
      ],
    },
    {
      day: "Day 2",
      date: "13 June 2026",
      title: "Historical Jaipur",
      activities: [
        {
          time: "09:00 AM",
          title: "Visit City Palace",
          location: "City Palace, Jaipur",
          duration: "2 hours",
          image:
            "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=500&q=80",
        },
        {
          time: "12:00 PM",
          title: "Lunch & Local Food",
          location: "Pink City Restaurant",
          duration: "1 hour",
          image:
            "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=80",
        },
        {
          time: "04:00 PM",
          title: "Hawa Mahal",
          location: "Hawa Mahal, Jaipur",
          duration: "2 hours",
          image:
            "https://images.unsplash.com/photo-1599661046827-dacff0c2b3b7?auto=format&fit=crop&w=500&q=80",
        },
      ],
    },
    {
      day: "Day 3",
      date: "14 June 2026",
      title: "Forts & Sunset",
      activities: [
        {
          time: "08:00 AM",
          title: "Amber Fort",
          location: "Amer, Jaipur",
          duration: "3 hours",
          image:
            "https://images.unsplash.com/photo-1599661046827-dacff0c2b3b7?auto=format&fit=crop&w=500&q=80",
        },
        {
          time: "01:00 PM",
          title: "Lunch & Rest",
          location: "Jaipur",
          duration: "2 hours",
          image:
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=500&q=80",
        },
        {
          time: "06:00 PM",
          title: "Nahargarh Sunset",
          location: "Nahargarh Fort",
          duration: "2 hours",
          image:
            "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=500&q=80",
        },
      ],
    },
  ];

  return (
    <div className="page">
      <Navbar />

      <main className="itinerary-view-page">
        <div className="container">

          <div className="itinerary-view-header">
            <div>
              <span className="label">MY ITINERARY</span>
              <h1>Jaipur Adventure</h1>
              <p>
                Your personalized day-by-day travel plan.
              </p>
            </div>

            <div className="header-actions">
              <Link to="/share-trip" className="btn secondary">
                🔗 Share
              </Link>

              <Link to="/itinerary-builder" className="btn">
                ✏️ Edit
              </Link>
            </div>
          </div>

          <div className="itinerary-hero">

            <img
              src="https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1400&q=85"
              alt="Jaipur"
            />

            <div className="itinerary-hero-overlay">
              <span>5 DAY JOURNEY</span>
              <h2>Discover the Pink City</h2>
              <p>
                Explore historic forts, beautiful palaces and local
                experiences in Jaipur.
              </p>
            </div>

          </div>

          <div className="trip-overview card">

            <div className="overview-item">
              <span className="overview-icon">📍</span>
              <div>
                <small>DESTINATION</small>
                <strong>Jaipur, Rajasthan</strong>
              </div>
            </div>

            <div className="overview-item">
              <span className="overview-icon">📅</span>
              <div>
                <small>TRAVEL DATES</small>
                <strong>12 Jun – 16 Jun 2026</strong>
              </div>
            </div>

            <div className="overview-item">
              <span className="overview-icon">👥</span>
              <div>
                <small>TRAVELERS</small>
                <strong>2 Travelers</strong>
              </div>
            </div>

            <div className="overview-item">
              <span className="overview-icon">💰</span>
              <div>
                <small>ESTIMATED BUDGET</small>
                <strong>₹25,000</strong>
              </div>
            </div>

          </div>

          <div className="itinerary-layout">

            <section className="days-section">

              {days.map((day) => (
                <div className="day-card card" key={day.day}>

                  <div className="day-header">

                    <div className="day-number">
                      {day.day.replace("Day ", "")}
                    </div>

                    <div className="day-heading">
                      <span>{day.date}</span>
                      <h2>{day.title}</h2>
                    </div>

                    <span className="day-count">
                      {day.activities.length} Activities
                    </span>

                  </div>

                  <div className="itinerary-timeline">

                    {day.activities.map((activity, index) => (
                      <div
                        className="itinerary-item"
                        key={activity.title}
                      >

                        <div className="item-time">
                          <strong>{activity.time}</strong>
                          <span>{activity.duration}</span>
                        </div>

                        <div className="item-line">

                          <div className="item-dot">
                            <img
                              src={activity.image}
                              alt={activity.title}
                            />
                          </div>

                          {index !== day.activities.length - 1 && (
                            <div className="item-connector"></div>
                          )}

                        </div>

                        <div className="item-content">

                          <div className="activity-photo">
                            <img
                              src={activity.image}
                              alt={activity.title}
                            />
                          </div>

                          <div className="activity-info">
                            <h3>{activity.title}</h3>
                            <p>📍 {activity.location}</p>
                          </div>

                        </div>

                      </div>
                    ))}

                  </div>

                </div>
              ))}

            </section>

            <aside className="itinerary-side">

              <div className="summary-card card">

                <span className="label">TRIP SUMMARY</span>

                <h2>Jaipur Adventure</h2>

                <div className="summary-row">
                  <span>🗓️ Duration</span>
                  <strong>5 Days</strong>
                </div>

                <div className="summary-row">
                  <span>🎯 Activities</span>
                  <strong>9</strong>
                </div>

                <div className="summary-row">
                  <span>👥 Travelers</span>
                  <strong>2</strong>
                </div>

                <div className="summary-row">
                  <span>💰 Budget</span>
                  <strong>₹25,000</strong>
                </div>

                <Link to="/budget" className="btn budget-btn">
                  View Budget →
                </Link>

              </div>

              <div className="progress-card card">

                <span className="label">TRIP PROGRESS</span>

                <div className="progress-heading">
                  <strong>Planning Complete</strong>
                  <span>85%</span>
                </div>

                <div className="progress-bar">
                  <div className="progress-fill"></div>
                </div>

                <p>
                  Most of your trip has been planned. Add remaining
                  activities to complete your itinerary.
                </p>

              </div>

              <div className="view-tip">

                <span>💡</span>

                <div>
                  <strong>Travel Tip</strong>
                  <p>
                    Keep your itinerary flexible and leave some free
                    time for unexpected discoveries.
                  </p>
                </div>

              </div>

              <Link
                to="/share-trip"
                className="btn share-trip-btn"
              >
                🔗 Share This Trip
              </Link>

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

export default ItineraryView;