import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./ActivitySearch.css";

function ActivitySearch() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Recommended");
  const [favorites, setFavorites] = useState([]);

  const activities = [
    {
      id: 1,
      name: "New York City Exploration",
      city: "New York, USA",
      category: "Culture",
      duration: "3 hours",
      price: 450,
      image: "https://images.unsplash.com/photo-1501466044931-62695aada8e9?auto=format&fit=crop&w=800&q=85",
      description: "Explore iconic places, city views and the vibrant culture of New York."
    },
    {
      id: 2,
      name: "Paragliding Adventure",
      city: "Manali",
      category: "Adventure",
      duration: "2 hours",
      price: 1800,
      image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=85",
      description: "Experience breathtaking mountain views from the sky."
    },
    {
      id: 3,
      name: "Beach Sunset Walk",
      city: "Goa",
      category: "Nature",
      duration: "1 hour",
      price: 0,
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=85",
      description: "Enjoy a peaceful walk along the beach during sunset."
    },
    {
      id: 4,
      name: "Rajasthani Food Tour",
      city: "Jaipur",
      category: "Food",
      duration: "2 hours",
      price: 900,
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=85",
      description: "Taste authentic local dishes and discover Jaipur's food culture."
    },
    {
      id: 5,
      name: "City Palace Visit",
      city: "Udaipur",
      category: "Culture",
      duration: "2 hours",
      price: 350,
      image: "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=800&q=85",
      description: "Discover royal history and architecture beside Lake Pichola."
    },
    {
      id: 6,
      name: "Mountain Trek",
      city: "Manali",
      category: "Adventure",
      duration: "5 hours",
      price: 1200,
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=85",
      description: "Walk through scenic mountain trails surrounded by nature."
    },
    {
      id: 7,
      name: "Backwater Cruise",
      city: "Kerala",
      category: "Nature",
      duration: "3 hours",
      price: 1500,
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=85",
      description: "Relax on a traditional boat while exploring Kerala's backwaters."
    },
    {
      id: 8,
      name: "Local Market Experience",
      city: "Delhi",
      category: "Food",
      duration: "2 hours",
      price: 600,
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=85",
      description: "Explore local markets and discover authentic street food."
    }
  ];

  const filteredActivities = activities
    .filter((activity) => {
      const matchesSearch =
        activity.name.toLowerCase().includes(search.toLowerCase()) ||
        activity.city.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || activity.category === category;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sort === "Price Low") return a.price - b.price;
      if (sort === "Price High") return b.price - a.price;
      if (sort === "Duration") return a.duration.localeCompare(b.duration);
      return 0;
    });

  const toggleFavorite = (id) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const addActivity = (activity) => {
    alert(`${activity.name} added to your itinerary.`);
  };

  return (
    <div className="page">
      <Navbar />

      <main className="activity-search-page">
        <div className="container">

          <div className="activity-header">
            <div>
              <span className="label">DISCOVER EXPERIENCES</span>
              <h1>Find Things To Do</h1>
              <p>
                Discover activities and experiences that make your trip memorable.
              </p>
            </div>

            <Link to="/itinerary-builder" className="btn">
              🗓️ My Itinerary
            </Link>
          </div>

          <div className="activity-search-box card">
            <div className="search-input-wrapper">
              <span>🔍</span>

              <input
                type="text"
                placeholder="Search activities or destinations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {search && (
                <button onClick={() => setSearch("")}>
                  ×
                </button>
              )}
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option>Recommended</option>
              <option>Price Low</option>
              <option>Price High</option>
              <option>Duration</option>
            </select>
          </div>

          <div className="category-bar">
            {["All", "Adventure", "Culture", "Nature", "Food"].map((item) => (
              <button
                key={item}
                className={
                  category === item
                    ? "category-btn active"
                    : "category-btn"
                }
                onClick={() => setCategory(item)}
              >
                {item === "All" && "✨"}
                {item === "Adventure" && "🧗"}
                {item === "Culture" && "🏛️"}
                {item === "Nature" && "🌿"}
                {item === "Food" && "🍽️"}

                <span>{item}</span>
              </button>
            ))}
          </div>

          <div className="activity-results-header">
            <div>
              <span className="label">EXPERIENCES</span>
              <h2>{filteredActivities.length} activities found</h2>
            </div>

            <span className="result-location">
              📍 Explore destinations
            </span>
          </div>

          {filteredActivities.length > 0 ? (
            <div className="activity-grid">

              {filteredActivities.map((activity) => (
                <article
                  className="activity-card card"
                  key={activity.id}
                >
                  <div className="activity-image">

                    <img
                      src={activity.image}
                      alt={activity.name}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />

                    <span className="activity-category">
                      {activity.category}
                    </span>

                    <button
                      className={
                        favorites.includes(activity.id)
                          ? "favorite-btn active"
                          : "favorite-btn"
                      }
                      onClick={() => toggleFavorite(activity.id)}
                    >
                      {favorites.includes(activity.id) ? "♥" : "♡"}
                    </button>
                  </div>

                  <div className="activity-card-body">

                    <div className="activity-title">
                      <h3>{activity.name}</h3>
                      <p>📍 {activity.city}</p>
                    </div>

                    <p className="activity-description">
                      {activity.description}
                    </p>

                    <div className="activity-meta">
                      <span>⏱ {activity.duration}</span>

                      <strong>
                        {activity.price === 0
                          ? "Free"
                          : `₹${activity.price}`}
                      </strong>
                    </div>

                    <button
                      className="btn activity-add-btn"
                      onClick={() => addActivity(activity)}
                    >
                      + Add Activity
                    </button>

                  </div>
                </article>
              ))}

            </div>
          ) : (
            <div className="activity-empty card">
              <div>🔎</div>

              <h2>No activities found</h2>

              <p>
                Try another activity name, destination or category.
              </p>

              <button
                className="btn"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
              >
                Clear Filters
              </button>
            </div>
          )}

          <div className="activity-tip">
            <div className="tip-icon">✨</div>

            <div>
              <span className="label">SMART TRAVEL TIP</span>

              <h3>Choose experiences near each other</h3>

              <p>
                Group nearby activities in your itinerary to reduce travel
                time and enjoy more of your destination.
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

export default ActivitySearch;