import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./ItineraryBuilder.css";

function ItineraryBuilder() {
  const navigate = useNavigate();

  const [selectedDay, setSelectedDay] = useState(1);

  const [activities, setActivities] = useState([
    {
      id: 1,
      time: "09:00 AM",
      activity: "Breakfast & Hotel Check-in",
      location: "Jaipur Hotel",
      duration: "1 hour",
    },
  ]);

  const [form, setForm] = useState({
    time: "",
    activity: "",
    location: "",
    duration: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addActivity = (e) => {
    e.preventDefault();

    if (!form.time || !form.activity || !form.location) {
      alert("Please fill Time, Activity and Location.");
      return;
    }

    const formattedTime = new Date(
      `1970-01-01T${form.time}`
    ).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newActivity = {
      id: Date.now(),
      time: formattedTime,
      activity: form.activity,
      location: form.location,
      duration: form.duration || "1 hour",
    };

    setActivities([...activities, newActivity]);

    setForm({
      time: "",
      activity: "",
      location: "",
      duration: "",
    });
  };

  const removeActivity = (id) => {
    setActivities(
      activities.filter((activity) => activity.id !== id)
    );
  };

  const saveItinerary = () => {
    alert("Your itinerary has been saved successfully!");
    navigate("/itinerary");
  };

  return (
    <div className="page">
      <Navbar />

      <main className="itinerary-builder">
        <div className="container">

          <div className="builder-header">
            <div>
              <span className="label">TRIP PLANNER</span>
              <h1>Build Your Itinerary</h1>
              <p>
                Organize your activities and travel plans day by day.
              </p>
            </div>

            <Link to="/my-trips" className="btn secondary">
              ← My Trips
            </Link>
          </div>

          <div className="day-selector card">

            <div className="day-selector-title">
              <div className="day-icon">
                📅
              </div>

              <div>
                <span className="label">TRAVEL PLAN</span>
                <h2>Select Travel Day</h2>
                <p>Choose a day to manage your activities.</p>
              </div>
            </div>

            <div className="days-list">
              {[1, 2, 3, 4, 5].map((day) => (
                <button
                  key={day}
                  className={
                    selectedDay === day
                      ? "day-button active"
                      : "day-button"
                  }
                  onClick={() => setSelectedDay(day)}
                >
                  <small>DAY</small>
                  <strong>{day}</strong>
                </button>
              ))}
            </div>

          </div>

          <div className="builder-layout">

            <section className="activity-form card">

              <div className="builder-section-header">
                <div>
                  <span className="label">ADD ACTIVITY</span>
                  <h2>Plan Day {selectedDay}</h2>
                </div>

                <span className="section-plus">
                  +
                </span>
              </div>

              <form onSubmit={addActivity}>

                <div className="form-group">
                  <label>Activity Time</label>
                  <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Activity Name</label>
                  <input
                    type="text"
                    name="activity"
                    placeholder="e.g. Visit City Palace"
                    value={form.activity}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    placeholder="e.g. City Palace, Jaipur"
                    value={form.location}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Duration</label>
                  <select
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select duration
                    </option>
                    <option value="30 minutes">
                      30 minutes
                    </option>
                    <option value="1 hour">
                      1 hour
                    </option>
                    <option value="2 hours">
                      2 hours
                    </option>
                    <option value="3 hours">
                      3 hours
                    </option>
                    <option value="Half day">
                      Half day
                    </option>
                    <option value="Full day">
                      Full day
                    </option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn add-activity-btn"
                >
                  + Add Activity
                </button>

              </form>
            </section>

            <section className="timeline-section card">

              <div className="builder-section-header">

                <div>
                  <span className="label">
                    YOUR ITINERARY
                  </span>

                  <h2>
                    Day {selectedDay} Timeline
                  </h2>
                </div>

                <span className="activity-total">
                  {activities.length} Activities
                </span>

              </div>

              <div className="timeline">

                {activities.length === 0 ? (
                  <div className="empty-timeline">
                    <div className="empty-icon">
                      🗓️
                    </div>

                    <h3>
                      No activities added
                    </h3>

                    <p>
                      Add your first activity from the form.
                    </p>
                  </div>
                ) : (
                  activities.map((item, index) => (
                    <div
                      className="timeline-item"
                      key={item.id}
                    >

                      <div className="timeline-time">
                        <strong>{item.time}</strong>
                        <small>{item.duration}</small>
                      </div>

                      <div className="timeline-marker">
                        <span></span>

                        {index !== activities.length - 1 && (
                          <div className="timeline-connector"></div>
                        )}
                      </div>

                      <div className="activity-content">

                        <div>
                          <h3>
                            {item.activity}
                          </h3>

                          <p>
                            📍 {item.location}
                          </p>
                        </div>

                        <button
                          className="delete-activity"
                          onClick={() =>
                            removeActivity(item.id)
                          }
                        >
                          ×
                        </button>

                      </div>

                    </div>
                  ))
                )}

              </div>
            </section>

          </div>

          <div className="builder-footer card">

            <div className="builder-summary">

              <div className="summary-plane">
                ✈️
              </div>

              <div>
                <span>ITINERARY SUMMARY</span>
                <strong>
                  Day {selectedDay} · {activities.length} planned activities
                </strong>
              </div>

            </div>

            <div className="builder-actions">

              <button
                className="btn secondary"
                onClick={() => navigate("/dashboard")}
              >
                Save Later
              </button>

              <button
                className="btn"
                onClick={saveItinerary}
              >
                Save Itinerary ✓
              </button>

            </div>

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

export default ItineraryBuilder;