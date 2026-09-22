//tsx
import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./components/HomePage";
import LoginScreen from "./components/LoginScreen";
import Dashboard from "./components/Dashboard";
import CreateTrip from "./components/CreateTrip";
import MyTrips from "./components/MyTrips";
import ItineraryBuilder from "./components/ItineraryBuilder";
import ItineraryView from "./components/ItineraryView";
import CitySearch from "./components/CitySearch";
import ActivitySearch from "./components/ActivitySearch";
import Budget from "./components/Budget";
import ShareTrip from "./components/ShareTrip";
import Profile from "./components/Profile";
import AdminDashboard from "./components/AdminDashboard";
import TripCalendar from "./components/TripCalendar";

function App() {
  return (
    <HashRouter>
      <Routes>

        {/* HOME PAGE */}
        <Route path="/" element={<HomePage />} />

        {/* LOGIN PAGE */}
        <Route path="/login" element={<LoginScreen />} />

        {/* DASHBOARD */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* TRIP MANAGEMENT */}
        <Route path="/create-trip" element={<CreateTrip />} />

        <Route path="/my-trips" element={<MyTrips />} />

        {/* ITINERARY */}
        <Route
          path="/itinerary-builder"
          element={<ItineraryBuilder />}
        />

        <Route
          path="/itinerary"
          element={<ItineraryView />}
        />

        {/* EXPLORE */}
        <Route
          path="/explore"
          element={<CitySearch />}
        />

        <Route
          path="/activities"
          element={<ActivitySearch />}
        />

        {/* BUDGET */}
        <Route
          path="/budget"
          element={<Budget />}
        />

        {/* SHARE TRIP */}
        <Route
          path="/share-trip"
          element={<ShareTrip />}
        />

        {/* PROFILE */}
        <Route
          path="/profile"
          element={<Profile />}
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        {/* CALENDAR */}
        <Route
          path="/calendar"
          element={<TripCalendar />}
        />

        {/* UNKNOWN URL */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </HashRouter>
  );
}

export default App;

