import React, { useState, useEffect } from "react";
import API from "../api";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./CitySearch.css";

// 1. डेटाबेस जिसमें डिफ़ॉल्ट शहर और आपके बताए गए सभी नए शहर/राज्य शामिल हैं (बिना city_details के)
const ALL_DATABASE_CITIES = [
  // --- डिफ़ॉल्ट 6 शहर (होमपेज के लिए) ---
  { 
    id: 1, 
    name: "Jaipur", 
    country: "India", 
    budget: "₹10,000 - ₹18,000", 
    duration: "2-3 Days", 
    bestTime: "Oct - Mar", 
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=85"
  },
  { 
    id: 2, 
    name: "Ahmedabad", 
    country: "India", 
    budget: "₹8,000 - ₹15,000", 
    duration: "2-3 Days", 
    bestTime: "Nov - Feb", 
    image: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=1000&q=85"
  },
  { 
    id: 3, 
    name: "Surat", 
    country: "India", 
    budget: "₹8,000 - ₹14,000", 
    duration: "2 Days", 
    bestTime: "Oct - Mar", 
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1000&q=85"
  },
  { 
    id: 4, 
    name: "Vadodara", 
    country: "India", 
    budget: "₹7,000 - ₹13,000", 
    duration: "2 Days", 
    bestTime: "Oct - Mar", 
    image: "https://tse4.mm.bing.net/th/id/OIP.b05DjHa9Lun3wXTrJ-p8PgHaEo?r=0&pid=Api&h=220&P=0"
  },
  { 
    id: 5, 
    name: "Rajkot", 
    country: "India", 
    budget: "₹7,000 - ₹12,000", 
    duration: "2 Days", 
    bestTime: "Oct - Mar", 
    image: "https://i.ytimg.com/vi/8AlrXxTF1zs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAMx2_khooFiHpP8i-t0Izfydt8Hg"
  },
  { 
    id: 6, 
    name: "Jammu Kashmir", 
    country: "India", 
    budget: "₹15,000 - ₹30,000", 
    duration: "4-6 Days", 
    bestTime: "Mar - Oct", 
    image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1000&q=85"
  },

  // --- अन्य शहर और राज्य (सर्च बार के लिए) ---
  {
    id: 7, name: "Mumbai", country: "India", budget: "₹12,000 - ₹22,000", duration: "2-4 Days", bestTime: "Oct - Mar",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1000&q=85"
  },
  {
    id: 8, name: "Delhi", country: "India", budget: "₹10,000 - ₹20,000", duration: "2-4 Days", bestTime: "Oct - Mar",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1000&q=85"
  },
  {
    id: 9, name: "Kolkata", country: "India", budget: "₹10,000 - ₹19,000", duration: "3-5 Days", bestTime: "Oct - Mar",
    image: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1000&q=85"
  },
  {
    id: 10, name: "Andhra Pradesh", country: "India", budget: "₹10,000 - ₹18,000", duration: "4-6 Days", bestTime: "Oct - Mar",
    image: "https://images.unsplash.com/photo-1584646098378-0874589d76b1?auto=format&fit=crop&w=1000&q=85"
  },
  {
    id: 11, name: "Tamil Nadu", country: "India", budget: "₹12,000 - ₹22,000", duration: "5-7 Days", bestTime: "Nov - Feb",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=85"
  },
  {
    id: 12, name: "Varanasi", country: "India", budget: "₹7,000 - ₹14,000", duration: "2-4 Days", bestTime: "Nov - Feb",
    image: "https://tse4.mm.bing.net/th/id/OIP.HsCz6HMUq8F5YphTQKIj1QHaEy?r=0&pid=Api&h=220&P=0"
  },
  {
    id: 13, name: "Odalguri", country: "India", budget: "₹8,000 - ₹15,000", duration: "2 Days", bestTime: "Oct - Mar",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=85"
  },
  {
    id: 14, name: "Hyderabad", country: "India", budget: "₹12,000 - ₹22,000", duration: "3-4 Days", bestTime: "Oct - Mar",
    image: "https://images.unsplash.com/photo-1584646098378-0874589d76b1?auto=format&fit=crop&w=1000&q=85"
  },
  {
    id: 15, name: "Chennai", country: "India", budget: "₹11,000 - ₹20,000", duration: "3-4 Days", bestTime: "Nov - Feb",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=85"
  },
  {
    id: 16, name: "Goa", country: "India", budget: "₹12,000 - ₹22,000", duration: "3-5 Days", bestTime: "Nov - Feb",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=85"
  },
  {
    id: 17, name: "Manali", country: "India", budget: "₹10,000 - ₹18,000", duration: "3-5 Days", bestTime: "Oct - Jun",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1000&q=85"
  },
  {
    id: 18, name: "Shimla", country: "India", budget: "₹12,000 - ₹20,000", duration: "3-5 Days", bestTime: "Mar - Jun",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1000&q=85"
  },
  {
    id: 19, name: "Uttar Pradesh", country: "India", budget: "₹9,000 - ₹17,000", duration: "4-6 Days", bestTime: "Oct - Mar",
    image: "https://images.unsplash.com/photo-1561649983-4a11f211516f?auto=format&fit=crop&w=1000&q=85"
  },
  {
    id: 20, name: "Pune", country: "India", budget: "₹10,000 - ₹18,000", duration: "2-3 Days", bestTime: "Jul - Feb",
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1000&q=85"
  }
];

// होमपेज पर डिफ़ॉल्ट दिखने वाली 6 मुख्य सिटीज़
const DEFAULT_CITIES_NAMES = ["Jaipur", "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Jammu Kashmir"];
const INITIAL_DEFAULT_CITIES = ALL_DATABASE_CITIES.filter(c => DEFAULT_CITIES_NAMES.includes(c.name));

function CitySearch() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Recommended");
  const [displayedCities, setDisplayedCities] = useState(INITIAL_DEFAULT_CITIES);
  const navigate = useNavigate();

  // सर्च हैंडलर
  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);

    if (!val.trim()) {
      setDisplayedCities(INITIAL_DEFAULT_CITIES);
    } else {
      const query = val.toLowerCase();
      const filtered = ALL_DATABASE_CITIES.filter((c) =>
        c.name.toLowerCase().includes(query) ||
        c.country.toLowerCase().includes(query)
      );
      setDisplayedCities(filtered);
    }
  };

  let sortedCities = [...displayedCities].sort((a, b) => {
    if (sort === "Name A-Z") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  return (
    <div className="page">
      <Navbar />

      <main className="city-search-page">
        <div className="container">

          <div className="city-header">
            <div>
              <span className="label">EXPLORE YOUR DATABASE</span>
              <h1>Find Your Next Destination</h1>
              <p>Search from your official database cities & states (Mumbai, Delhi, Kolkata, Pune, etc.).</p>
            </div>

            <Link to="/create-trip" className="btn">
              + Plan New Trip
            </Link>
          </div>

          <div className="city-search-box card">
            <div className="city-search-input">
              <span>🔍</span>
              <input
                type="text"
                placeholder="Search cities/states (e.g. Mumbai, Pune, Kolkata, Shimla)..."
                value={search}
                onChange={handleSearchChange}
              />
              {search && (
                <button onClick={() => { setSearch(""); setDisplayedCities(INITIAL_DEFAULT_CITIES); }}>×</button>
              )}
            </div>

            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option>Recommended</option>
              <option>Name A-Z</option>
            </select>
          </div>

          <div className="city-results-header">
            <div>
              <span className="label">{search ? "SEARCH RESULTS" : "FEATURED CITIES"}</span>
              <h2>{sortedCities.length} destinations found</h2>
            </div>
            <span className="city-result-note">
              📍 {search ? "Filtered from your database" : "Showing default popular database cities"}
            </span>
          </div>

          {sortedCities.length > 0 ? (
            <div className="city-grid">
              {sortedCities.map((city) => (
                <article className="city-card card" key={city.id}>
                  
                  {/* इमेज बॉक्स और उसके ऊपर + Plan Trip बटन */}
                  <div className="city-image" style={{ position: "relative" }}>
                    <img
                      src={city.image}
                      alt={`${city.name} destination`}
                      loading="eager"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1000&q=85";
                      }}
                    />
                    <div className="city-image-overlay"></div>
                    <div className="city-location">
                      📍 {city.name}, {city.country}
                    </div>
                    <span className="city-badge">
                      {DEFAULT_CITIES_NAMES.includes(city.name) ? "Featured" : "Database"}
                    </span>

                    {/* हर इमेज के ऊपर + वाला बटन जो create-trip से कनेक्टेड है */}
                    <Link 
                      to="/create-trip" 
                      title={`Plan trip to ${city.name}`}
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        backgroundColor: "#ffffff",
                        color: "#0f172a",
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "20px",
                        fontWeight: "bold",
                        textDecoration: "none",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
                        zIndex: 2,
                        transition: "transform 0.2s ease"
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                      onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                    >
                      +
                    </Link>
                  </div>

                  <div className="city-card-body">
                    <div className="city-title-row">
                      <div>
                        <h3>{city.name}</h3>
                        <p>{city.country}</p>
                      </div>
                      <span className="city-icon">🌍</span>
                    </div>

                    <div className="city-info-grid">
                      <div>
                        <span>💰</span>
                        <div>
                          <small>Budget</small>
                          <strong>{city.budget}</strong>
                        </div>
                      </div>
                      <div>
                        <span>📅</span>
                        <div>
                          <small>Duration</small>
                          <strong>{city.duration}</strong>
                        </div>
                      </div>
                      <div>
                        <span>☀️</span>
                        <div>
                          <small>Best Time</small>
                          <strong>{city.bestTime}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="city-actions" style={{ justifyContent: "center" }}>
                      <Link to="/create-trip" className="btn" style={{ width: "100%", textAlign: "center" }}>
                        Plan Trip →
                      </Link>
                    </div>
                  </div>

                </article>
              ))}
            </div>
          ) : (
            <div className="city-empty card">
              <div>🔎</div>
              <h2>No destinations found</h2>
              <p>The city/state you searched for is not present in your database records.</p>
              <button className="btn" onClick={() => { setSearch(""); setDisplayedCities(INITIAL_DEFAULT_CITIES); }}>
                Reset Search
              </button>
            </div>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer style={{ 
        backgroundColor: "#0f172a", color: "#ffffff", padding: "30px 20px", 
        marginTop: "50px", textAlign: "center", borderRadius: "12px 12px 0 0"
      }}>
        <h3 style={{ marginBottom: "10px", color: "#38bdf8" }}>GlobeTrotter - About Us</h3>
        <p style={{ maxWidth: "600px", margin: "0 auto 20px auto", color: "#94a3b8", fontSize: "14px", lineHeight: "1.5" }}>
          GlobeTrotter is your ultimate travel companion to plan trips, explore cities, manage budgets, and share adventures seamlessly.
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

export default CitySearch;