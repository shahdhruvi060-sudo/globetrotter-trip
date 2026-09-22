import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./TripCalendar.css";

function TripCalendar() {
  // State for tracking current year and month (0 = January, 5 = June 2026, etc.)
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(5); // June is index 5
  const [selectedDate, setSelectedDate] = useState(12);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Handler for previous month
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDate(1); // Reset selected date to 1 when changing month
  };

  // Handler for next month
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(1); // Reset selected date to 1 when changing month
  };

  // Dynamically generate all days for the current month & year
  const getDaysInMonth = (year, month) => {
    const date = new Date(year, month, 1);
    const daysList = [];
    const dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    while (date.getMonth() === month) {
      daysList.push({
        date: date.getDate(),
        day: dayNamesShort[date.getDay()],
      });
      date.setDate(date.getDate() + 1);
    }
    return daysList;
  };

  const days = getDaysInMonth(currentYear, currentMonth);

  // Mock events mapped by "YYYY-MM-DD" for dynamic lookup
  const events = {
    "2026-5-12": [
      { time: "09:00 AM", title: "Arrive in Jaipur", type: "Travel", icon: "✈️" },
      { time: "12:00 PM", title: "Hotel Check-in", type: "Stay", icon: "🏨" },
      { time: "05:00 PM", title: "Explore City Palace", type: "Activity", icon: "🏛️" },
    ],
    "2026-5-13": [
      { time: "09:00 AM", title: "Amber Fort", type: "Activity", icon: "🏰" },
      { time: "02:00 PM", title: "Rajasthani Food Tour", type: "Food", icon: "🍽️" },
    ],
    "2026-5-14": [
      { time: "10:00 AM", title: "Local Market Visit", type: "Shopping", icon: "🛍️" },
      { time: "06:00 PM", title: "Sunset Photography", type: "Activity", icon: "📸" },
    ],
    "2026-5-15": [
      { time: "09:30 AM", title: "Hawa Mahal Visit", type: "Activity", icon: "🏛️" },
      { time: "04:00 PM", title: "Free Time", type: "Personal", icon: "☕" },
    ],
    "2026-5-16": [
      { time: "08:00 AM", title: "Hotel Check-out", type: "Stay", icon: "🏨" },
      { time: "11:00 AM", title: "Return Journey", type: "Travel", icon: "🚆" },
    ],
  };

  // Unique key for looking up events based on year, month index, and selected day
  const dateKey = `${currentYear}-${currentMonth}-${selectedDate}`;
  const selectedEvents = events[dateKey] || [];

  return (
    <div className="page">
      <Navbar />

      <main className="calendar-page">
        <div className="container">
          <div className="calendar-header">
            <div>
              <span className="label">PLAN YOUR DAYS</span>
              <h1>Travel Calendar</h1>
              <p>Organize your activities and make every day of your trip count.</p>
            </div>

            <Link to="/itinerary-builder" className="btn">
              + Add Activity
            </Link>
          </div>

          <div className="calendar-layout">
            <section className="calendar-card card">
              <div className="calendar-top">
                <button className="calendar-arrow" onClick={handlePrevMonth}>
                  ‹
                </button>

                <div>
                  <span>{currentYear}</span>
                  <h2>{monthNames[currentMonth]}</h2>
                </div>

                <button className="calendar-arrow" onClick={handleNextMonth}>
                  ›
                </button>
              </div>

              <div className="calendar-weekdays">
                <span>MON</span>
                <span>TUE</span>
                <span>WED</span>
                <span>THU</span>
                <span>FRI</span>
                <span>SAT</span>
                <span>SUN</span>
              </div>

              <div className="calendar-grid">
                {days.map((item) => {
                  const currentItemKey = `${currentYear}-${currentMonth}-${item.date}`;
                  const hasEvent = events[currentItemKey];

                  return (
                    <button
                      key={item.date}
                      className={
                        selectedDate === item.date
                          ? "calendar-day selected"
                          : hasEvent
                          ? "calendar-day has-event"
                          : "calendar-day"
                      }
                      onClick={() => setSelectedDate(item.date)}
                    >
                      <span>{item.date}</span>
                      {hasEvent && <i></i>}
                    </button>
                  );
                })}
              </div>

              <div className="calendar-legend">
                <div>
                  <span className="legend-circle selected-circle"></span>
                  Selected day
                </div>
                <div>
                  <span className="legend-circle event-circle"></span>
                  Trip activity
                </div>
              </div>
            </section>

            <aside className="selected-day-card card">
              <div className="selected-day-heading">
                <div>
                  <span className="label">SELECTED DATE</span>
                  <h2>
                    {monthNames[currentMonth]} {selectedDate}, {currentYear}
                  </h2>
                </div>
                <span className="date-icon">📅</span>
              </div>

              <div className="day-trip-info">
                <span>📍</span>
                <div>
                  <strong>Trip Adventure</strong>
                  <p>
                    {monthNames[currentMonth]} Dynamic Itinerary
                  </p>
                </div>
              </div>

              <div className="day-events">
                <div className="events-title">
                  <span className="label">TODAY'S ACTIVITIES</span>
                  <span>{selectedEvents.length}</span>
                </div>

                {selectedEvents.length > 0 ? (
                  selectedEvents.map((event, index) => (
                    <div className="calendar-event" key={index}>
                      <div className="event-time">{event.time}</div>
                      <div className="event-line">
                        <span>{event.icon}</span>
                        {index !== selectedEvents.length - 1 && <i></i>}
                      </div>
                      <div className="event-details">
                        <h3>{event.title}</h3>
                        <p>{event.type}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-events">
                    <span>🌤️</span>
                    <h3>No activities planned</h3>
                    <p>Add an activity to make this day more exciting.</p>
                  </div>
                )}
              </div>

              <Link to="/itinerary-builder" className="btn calendar-add-btn">
                + Add Activity
              </Link>
            </aside>
          </div>

          <div className="calendar-tip">
            <div className="tip-icon">💡</div>
            <div>
              <span className="label">SMART TRAVEL TIP</span>
              <h3>Leave some free time in your itinerary</h3>
              <p>
                A flexible schedule gives you time to discover unexpected
                places, relax and enjoy your destination without rushing.
              </p>
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

export default TripCalendar;