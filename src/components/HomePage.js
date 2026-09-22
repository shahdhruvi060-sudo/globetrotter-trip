import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();

  const destinations = [
    {
      name: "Goa",
      state: "Goa",
      budget: "₹8,000 - ₹14,000",
      duration: "3-4 Days",
      image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Udaipur",
      state: "Rajasthan",
      budget: "₹7,000 - ₹13,000",
      duration: "3-4 Days",
      image:
        "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Manali",
      state: "Himachal Pradesh",
      budget: "₹9,000 - ₹14,500",
      duration: "4-5 Days",
      image:
        "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Jaipur",
      state: "Rajasthan",
      budget: "₹6,000 - ₹12,000",
      duration: "2-3 Days",
      image:
        "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Rishikesh",
      state: "Uttarakhand",
      budget: "₹6,000 - ₹12,000",
      duration: "3-4 Days",
      image:
        "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Mount Abu",
      state: "Rajasthan",
      budget: "₹5,000 - ₹11,000",
      duration: "2-3 Days",
      image:
        "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=900&q=80",
    },
  ];

  return (
    <div style={styles.page}>

      {/* NAVBAR */}
      <nav style={styles.navbar}>
        <div style={styles.logo}>
          🌍 GlobeTrotter
        </div>

        <div style={styles.navLinks}>
          <a href="#home" style={styles.navLink}>
            Home
          </a>

          <a href="#destinations" style={styles.navLink}>
            Destinations
          </a>

          <a href="#about" style={styles.navLink}>
            About
          </a>

          <button
            style={styles.loginButton}
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="home" style={styles.hero}>

        <div style={styles.heroContent}>

          <p style={styles.tagline}>
            EXPLORE • DREAM • TRAVEL
          </p>

          <h1 style={styles.heroTitle}>
            Discover Your
            <br />
            <span style={styles.orangeText}>
              Next Adventure
            </span>
          </h1>

          <p style={styles.heroText}>
            Discover amazing destinations, plan unforgettable trips,
            manage your travel budget and create memories with
            GlobeTrotter.
          </p>

          <div style={styles.buttonGroup}>

            <button
              style={styles.primaryButton}
              onClick={() => navigate("/login")}
            >
              Start Planning →
            </button>

            <button
              style={styles.secondaryButton}
              onClick={() =>
                document
                  .getElementById("destinations")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Destinations
            </button>

          </div>
        </div>

        <div style={styles.heroImageContainer}>

          <img
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1000&q=80"
            alt="Beautiful travel destination"
            style={styles.heroImage}
          />

          <div style={styles.floatingCard}>
            <span style={{ fontSize: "28px" }}>✈️</span>

            <div>
              <strong>Plan your dream trip</strong>
              <br />
              <small style={{ color: "#777" }}>
                Everything in one place
              </small>
            </div>
          </div>

        </div>

      </section>

      {/* POPULAR DESTINATIONS */}
      <section
        id="destinations"
        style={styles.destinationSection}
      >

        <div style={styles.sectionHeading}>

          <p style={styles.tagline}>
            POPULAR DESTINATIONS
          </p>

          <h2 style={styles.sectionTitle}>
            Where do you want to go?
          </h2>

          <p style={styles.sectionText}>
            Explore some of India's most loved travel destinations.
          </p>

        </div>

        <div style={styles.destinationGrid}>

          {destinations.map((place) => (

            <div
              key={place.name}
              style={styles.destinationCard}
            >

              <img
                src={place.image}
                alt={place.name}
                style={styles.cardImage}
              />

              <div style={styles.cardContent}>

                {/* STATE */}
                <p style={styles.country}>
                  {place.state}
                </p>

                <h3 style={styles.placeName}>
                  {place.name}
                </h3>

                <p style={styles.detail}>
                  💰 <strong>Budget:</strong> {place.budget}
                </p>

                <p style={styles.detail}>
                  📅 <strong>Duration:</strong> {place.duration}
                </p>

                <button
                  style={styles.exploreButton}
                  onClick={() => navigate("/login")}
                >
                  Explore Trip →
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* WHY GLOBETROTTER */}
      <section id="about" style={styles.aboutSection}>

        <div style={styles.sectionHeading}>

          <p style={styles.tagline}>
            WHY GLOBETROTTER?
          </p>

          <h2 style={styles.sectionTitle}>
            Everything you need for your journey
          </h2>

        </div>

        <div style={styles.featureGrid}>

          <div style={styles.featureCard}>
            <div style={styles.icon}>🗺️</div>
            <h3>Plan Your Trip</h3>
            <p>
              Create and organize your complete travel plans easily.
            </p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.icon}>💰</div>
            <h3>Manage Budget</h3>
            <p>
              Keep track of your estimated travel expenses.
            </p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.icon}>📅</div>
            <h3>Organize Schedule</h3>
            <p>
              Manage your activities and travel dates in one place.
            </p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.icon}>📸</div>
            <h3>Save Memories</h3>
            <p>
              Keep your favorite travel memories connected to your trips.
            </p>
          </div>

        </div>

      </section>

      {/* CALL TO ACTION */}
      <section style={styles.cta}>

        <h2 style={styles.ctaTitle}>
          Ready to explore India?
        </h2>

        <p>
          Start planning your next adventure with GlobeTrotter. <br></br> <br></br>
        </p> 
          
        <button
          style={styles.primaryButton}
          onClick={() => navigate("/login")} 
        >
          Start Your Journey →
        </button>

      </section>

      {/* FOOTER */}
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

/* =========================
   STYLES
   ========================= */

const styles = {
  page: {
    minHeight: "100vh",
    fontFamily: "Arial, Helvetica, sans-serif",
    color: "#172033",
    backgroundColor: "#ffffff",
  },

  navbar: {
    height: "75px",
    padding: "0 7%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #eeeeee",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },

  logo: {
    fontSize: "24px",
    fontWeight: "bold",
  },

  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "25px",
  },

  navLink: {
    textDecoration: "none",
    color: "#555555",
    fontWeight: "600",
  },

  loginButton: {
    border: "none",
    backgroundColor: "#ff6b35",
    color: "#ffffff",
    padding: "11px 25px",
    borderRadius: "25px",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  hero: {
    minHeight: "570px",
    padding: "65px 7%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "40px",
    background:
      "linear-gradient(135deg, #fff7f2, #ffffff)",
  },

  heroContent: {
    width: "52%",
  },

  tagline: {
    color: "#ff6b35",
    fontSize: "13px",
    fontWeight: "bold",
    letterSpacing: "2px",
  },

  heroTitle: {
    fontSize: "60px",
    lineHeight: "1.1",
    margin: "20px 0",
  },

  orangeText: {
    color: "#ff6b35",
  },

  heroText: {
    maxWidth: "570px",
    color: "#687386",
    fontSize: "18px",
    lineHeight: "1.7",
  },

  buttonGroup: {
    display: "flex",
    gap: "15px",
    marginTop: "30px",
  },

  primaryButton: {
    border: "none",
    backgroundColor: "#ff6b35",
    color: "#ffffff",
    padding: "14px 25px",
    borderRadius: "30px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  secondaryButton: {
    border: "1px solid #dddddd",
    backgroundColor: "#ffffff",
    padding: "14px 25px",
    borderRadius: "30px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  heroImageContainer: {
    width: "43%",
    height: "430px",
    position: "relative",
  },

  heroImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "25px",
  },

  floatingCard: {
    position: "absolute",
    bottom: "25px",
    left: "25px",
    right: "25px",
    padding: "15px",
    backgroundColor: "#ffffff",
    borderRadius: "15px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
  },

  destinationSection: {
    padding: "85px 7%",
  },

  sectionHeading: {
    textAlign: "center",
    marginBottom: "45px",
  },

  sectionTitle: {
    fontSize: "38px",
    margin: "10px 0",
  },

  sectionText: {
    color: "#70798a",
  },

  destinationGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "25px",
  },

  destinationCard: {
    border: "1px solid #eeeeee",
    borderRadius: "18px",
    overflow: "hidden",
    backgroundColor: "#ffffff",
    boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
  },

  cardImage: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
  },

  cardContent: {
    padding: "20px",
  },

  country: {
    color: "#ff6b35",
    fontSize: "13px",
    fontWeight: "bold",
    marginBottom: "5px",
  },

  placeName: {
    fontSize: "25px",
    margin: "5px 0 15px",
  },

  detail: {
    color: "#666666",
    fontSize: "14px",
  },

  exploreButton: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#fff0e9",
    color: "#ff6b35",
    fontWeight: "bold",
    cursor: "pointer",
  },

  aboutSection: {
    padding: "80px 7%",
    backgroundColor: "#f8f9fb",
  },

  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
  },

  featureCard: {
    backgroundColor: "#ffffff",
    padding: "30px 20px",
    textAlign: "center",
    borderRadius: "18px",
  },

  icon: {
    fontSize: "35px",
  },

  cta: {
    padding: "75px 20px",
    textAlign: "center",
    backgroundColor: "#172033",
    color: "#ffffff",
  },

  ctaTitle: {
    fontSize: "38px",
  },

  footer: {
    padding: "35px",
    textAlign: "center",
    backgroundColor: "#101622",
    color: "#ffffff",
  },
};

export default HomePage;