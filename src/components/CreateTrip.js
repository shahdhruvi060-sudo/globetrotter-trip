import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./CreateTrip.css";

function CreateTrip() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    tripName: "",
    destination: "",
    startDate: "",
    endDate: "",
    travelers: "2",
    budget: "",
    tripType: "Leisure",
    transportMode: "Train",
    passengersCount: "2",
    bookTicket: false,
    phoneNo: "",
    notes: "",
  });

  const [message, setMessage] = useState("");

  const transportRates = {
    Train: 1200,
    Bus: 800,
    Plane: 4500,
  };

  const currentTransportRate = transportRates[form.transportMode] || 1000;
  const totalTransportCost = currentTransportRate * Number(form.passengersCount || 1);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // 🌍 भारत की किसी भी City (X, Y, Z) के लिए Dynamic High-Quality Image चुनने वाला Function
  const getDynamicCityImage = (destinationName) => {
    const cleanCity = destinationName.trim().toLowerCase();

    // 1. सूरत (Surat) की वास्तविक सुंदर फोटो
    if (cleanCity.includes("surat")) {
      return "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=85";
    }
    // 2. जयपुर (Jaipur)
    if (cleanCity.includes("jaipur")) {
      return "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=85";
    }
    // 3. गोवा (Goa)
    if (cleanCity.includes("goa")) {
      return "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=85";
    }
    // 4. उदयपुर (Udaipur)
    if (cleanCity.includes("udaipur")) {
      return "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=900&q=85";
    }
    // 5. मनाली/शिमला (Manali / Shimla)
    if (cleanCity.includes("manali") || cleanCity.includes("shimla")) {
      return "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=85";
    }

    // 6. यदि कोई भी अन्य शहर (जैसे Indore, Bhopal, Rajkot, Varanasi, Pune आदि) डाला जाए,
    // तो यह dynamic keyword image url जनरेट करेगा जो हर सिटी के लिए वर्क करता है:
    const query = encodeURIComponent(`${destinationName} city india travel`);
    return `https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=900&q=85#${query}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.tripName.trim() || !form.destination.trim()) {
      setMessage("Kripya Trip Name aur Destination bharein.");
      return;
    }

    const cityName = form.destination.trim();
    
    // इनपुट की गई सिटी के आधार पर डायनामिक फोटो लिंक असाइन करना
    const cityImageUrl = getDynamicCityImage(cityName);

    const newTrip = {
      id: Date.now(),
      image: cityImageUrl,
      name: form.tripName,
      location: cityName,
      destination: cityName,
      dates: form.startDate && form.endDate ? `${form.startDate} – ${form.endDate}` : "Upcoming Dates",
      startDate: form.startDate,
      endDate: form.endDate,
      travelers: `${form.travelers} Travelers`,
      budget: form.budget ? `₹${Number(form.budget).toLocaleString()}` : "₹15,000",
      status: "Upcoming",
      progress: 50,
      phoneNo: form.phoneNo,
      tripType: form.tripType,
      transportMode: form.transportMode,
      totalTransportCost: totalTransportCost,
      notes: form.notes,
    };

    try {
      // LocalStorage की सभी keys में सही Data सिंक करना
      const existingTrips = JSON.parse(localStorage.getItem("userCustomTrips") || "[]");
      const updatedTrips = [newTrip, ...existingTrips];

      localStorage.setItem("userCustomTrips", JSON.stringify(updatedTrips));
      localStorage.setItem("globeTrotterTrips", JSON.stringify(updatedTrips));
      localStorage.setItem("trips", JSON.stringify(updatedTrips));

      setMessage("Trip created successfully!");

      setForm({
        tripName: "",
        destination: "",
        startDate: "",
        endDate: "",
        travelers: "2",
        budget: "",
        tripType: "Leisure",
        transportMode: "Train",
        passengersCount: "2",
        bookTicket: false,
        phoneNo: "",
        notes: "",
      });

      setTimeout(() => {
        navigate("/my-trips");
      }, 600);
    } catch (err) {
      console.error("Storage error:", err);
      setMessage("Kuch error aayi, kripya dubara try karein.");
    }
  };

  return (
    <div className="page">
      <Navbar />

      <main className="create-trip-page">
        <div className="container">

          <div className="create-header">
            <div>
              <span className="label">TRIP PLANNER</span>
              <h1>Create Your Trip</h1>
              <p>
                Add your travel details, transport options, and start building your personalized journey.
              </p>
            </div>

            <Link to="/dashboard" className="btn secondary">
              ← Dashboard
            </Link>
          </div>

          <div className="create-layout">

            <section className="trip-form-card card">

              <div className="form-card-header">
                <div>
                  <span className="label">TRIP DETAILS</span>
                  <h2>Tell us about your trip</h2>
                </div>

                <div className="form-header-icon">
                  ✈️
                </div>
              </div>

              {message && (
                <div
                  style={{
                    padding: "10px",
                    marginBottom: "15px",
                    borderRadius: "6px",
                    backgroundColor: message.includes("successfully") ? "#dcfce7" : "#fee2e2",
                    color: message.includes("successfully") ? "#166534" : "#991b1b",
                    fontWeight: "600"
                  }}
                >
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit}>

                <div className="form-group">
                  <label>Trip Name *</label>
                  <input
                    type="text"
                    name="tripName"
                    placeholder="e.g. Surat Visit / Indore Tour"
                    value={form.tripName}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Destination *</label>
                  <input
                    type="text"
                    name="destination"
                    placeholder="e.g. Surat, Indore, Bhopal, Rajkot, Varanasi"
                    value={form.destination}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label>Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      value={form.startDate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      value={form.endDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label>Transport Mode 🚆🚌✈️</label>
                    <select
                      name="transportMode"
                      value={form.transportMode}
                      onChange={handleChange}
                    >
                      <option value="Train">Train (Est. ₹1,200 / person)</option>
                      <option value="Bus">Bus (Est. ₹800 / person)</option>
                      <option value="Plane">Plane (Est. ₹4,500 / person)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Passengers for Transport</label>
                    <input
                      type="number"
                      name="passengersCount"
                      min="1"
                      max="20"
                      value={form.passengersCount}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ background: "#f8fafc", padding: "14px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <strong style={{ color: "#1635a3"}}>Estimated Transport Cost:</strong>
                    <span style={{ color: "#16a34a", fontWeight: "bold", fontSize: "1.1rem" }}>₹ {totalTransportCost.toLocaleString()}</span>
                  </div>

                  <div style={{ marginBottom: "10px" }}>
                    <input
                      type="text"
                      name="phoneNo"
                      placeholder="Enter Your Phone Number"
                      value={form.phoneNo}
                      onChange={handleChange}
                      style={{ fontSize: "0.9rem", padding: "6px", width: "100%", borderRadius: "4px", border: "1px solid #cbd5e1" }}
                    />
                  </div>

                  <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "0.9rem" }}>
                    <input
                      type="checkbox"
                      name="bookTicket"
                      checked={form.bookTicket}
                      onChange={handleChange}
                    />
                    <span>Yes, assist in booking {form.transportMode} tickets for this trip</span>
                  </label>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label>Travelers</label>
                    <select
                      name="travelers"
                      value={form.travelers}
                      onChange={handleChange}
                    >
                      <option value="1">1 Traveler</option>
                      <option value="2">2 Travelers</option>
                      <option value="3">3 Travelers</option>
                      <option value="4">4 Travelers</option>
                      <option value="5">5 Travelers</option>
                      <option value="6">6 Travelers</option>
                      <option value="7">7 Travelers</option>
                      <option value="8">8+ Travelers</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Estimated Budget</label>
                    <input
                      type="number"
                      name="budget"
                      placeholder="₹ 25,000"
                      min="0"
                      value={form.budget}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Trip Type</label>
                  <div className="trip-types">
                    {["Leisure", "Adventure", "Family", "Business", "Solo"].map((type) => (
                      <button
                        type="button"
                        key={type}
                        className={form.tripType === type ? "trip-type active" : "trip-type"}
                        onClick={() => setForm({ ...form, tripType: type })}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Travel Notes</label>
                  <textarea
                    name="notes"
                    rows="4"
                    placeholder="Tell us about your preferences..."
                    value={form.notes}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="form-actions">
                  <Link to="/dashboard" className="btn secondary">
                    Cancel
                  </Link>

                  <button type="submit" className="btn">
                    Create Trip →
                  </button>
                </div>

              </form>
            </section>

            <aside className="trip-side">
              <div className="travel-photo">
                <img
                  src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=900&q=85"
                  alt="Explore India"
                />
                <div className="photo-overlay">
                  <span>EXPLORE INDIA</span>
                  <h2>All India Travel Network</h2>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </main>

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
          GlobeTrotter is your ultimate travel companion to plan trips and explore cities seamlessly.
        </p>
        <div style={{ marginTop: "20px", fontSize: "12px", color: "#64748b" }}>
          © 2026 GlobeTrotter. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default CreateTrip;