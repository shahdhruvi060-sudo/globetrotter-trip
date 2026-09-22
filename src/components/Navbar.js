import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const menuItems = [
    { name: "Home", path: "/dashboard", icon: "🏠" },
    { name: "Create Trip", path: "/create-trip", icon: "➕" },
    { name: "My Trips", path: "/my-trips", icon: "🗺️" },
    { name: "Explore", path: "/explore", icon: "🌍" },
    { name: "Activities", path: "/activities", icon: "🎯" },
    { name: "Budget", path: "/budget", icon: "💰" },
    { name: "Calendar", path: "/calendar", icon: "📅" },
    { name: "Share Trip", path: "/share-trip", icon: "🔗" },
    { name: "Profile", path: "/profile", icon: "👤" }
  ];

  return (
    <aside className="navbar">

      {/* Yahan NavbarBrand ka path "/" kar diya hai taaki click karne par main landing page par chale jayein */}
      <NavLink to="/" className="navbar-brand">

        <span className="brand-icon">
          🌍
        </span>

        <span className="brand-text">
          GlobeTrotter
        </span>

      </NavLink>


      <div className="navbar-menu">

        {menuItems.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? "navbar-link active"
                : "navbar-link"
            }
          >

            <span className="nav-icon">
              {item.icon}
            </span>

            <span>
              {item.name}
            </span>

          </NavLink>

        ))}

      </div>


      <div className="navbar-bottom">

        <div className="travel-tip">

          <span>
            ✈️
          </span>

          <div>
            <strong>
              Plan your journey
            </strong>

            <small>
              Explore the world
            </small>
          </div>

        </div>

      </div>

    </aside>
  );
}

export default Navbar;