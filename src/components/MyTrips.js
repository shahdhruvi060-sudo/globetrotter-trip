import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./MyTrips.css";

/*
  ============================================================
  CITY IMAGES
  ============================================================
  My Trips में image अब trip.image पर depend नहीं करेगी।
  पहले trip के name/location/city/destination में city खोजी जाएगी।
*/

const cityImages = {
  // Rajasthan
  jaipur:
    "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=85",

  udaipur:
    "https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=900&q=85",

  jodhpur:
    "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=85",

  // Gujarat
  surat:
    "https://img.hexahome.in/media/blogs/hexahome-blogs/sachin-gidc-surat/kj87mh.webp",

  rajkot:
    "https://i.ytimg.com/vi/8AlrXxTF1zs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAMx2_khooFiHpP8i-t0Izfydt8Hg",

  vadodara:
    "https://tse4.mm.bing.net/th/id/OIP.b05DjHa9Lun3wXTrJ-p8PgHaEo?r=0&pid=Api&h=220&P=0",

  ahmedabad:
    "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?auto=format&fit=crop&w=900&q=85",

  // Goa
  goa:
    "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=85",

  // Himachal Pradesh
  shimla:
    "https://media1.thrillophilia.com/filestore/anzgo2rvrlyun3nfcwndwia4v9jh_shutterstock_1439505056.jpg",

  manali:
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=85",

  // Delhi
  delhi:
    "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=900&q=85",

  // Agra
  agra:
    "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=900&q=85",

  // Maharashtra
  mumbai:
    "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=900&q=85",

  // Karnataka
  bengaluru:
    "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=900&q=85",

  bangalore:
    "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=900&q=85",

  // Telangana
  hyderabad:
    "https://images.unsplash.com/photo-1584646098378-0874589d76b1?auto=format&fit=crop&w=900&q=85",

  // Tamil Nadu
  chennai:
    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=900&q=85",

  // West Bengal
  kolkata:
    "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=900&q=85",

  // Uttar Pradesh
  varanasi:
    "https://wallpaperaccess.com/full/2714896.jpg",

  // Kerala
  kerala:
    "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=85",

  kochi:
    "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=85",

  // Ladakh
  ladakh:
    "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=85",

  leh:
    "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=85",

  // Kashmir
  kashmir:
    "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=900&q=85",

  srinagar:
    "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=900&q=85",

  // Assam
  assam:
    "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85",

  // Default travel image
  default:
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&q=85",
};


/*
  ============================================================
  GET CITY IMAGE
  ============================================================
*/

const getCityImage = (trip) => {
  const tripText = `
    ${trip?.name || ""}
    ${trip?.location || ""}
    ${trip?.city || ""}
    ${trip?.destination || ""}
    ${trip?.place || ""}
  `.toLowerCase();

  /*
    पहले exact city names check होंगे.
  */
  for (const city of Object.keys(cityImages)) {
    if (city !== "default" && tripText.includes(city)) {
      return cityImages[city];
    }
  }

  /*
    अगर city नहीं मिली तो saved trip.image use होगी.
  */
  if (trip?.image) {
    return trip.image;
  }

  /*
    Last fallback
  */
  return cityImages.default;
};


function MyTrips() {
  const [filter, setFilter] = useState("All");
  const [expandedTripId, setExpandedTripId] = useState(null);

  // Separate photo storage for hotel and places
  const [hotelPhotos, setHotelPhotos] = useState({});
  const [placePhotos, setPlacePhotos] = useState({});

  const fileInputRef = useRef(null);
  const [uploadTarget, setUploadTarget] = useState(null);

  // Custom Modal State
  const [modalData, setModalData] = useState(null);


  /*
    ============================================================
    PARSE TRIP DATE
    ============================================================
  */

  const parseTripDatesAndCheckStatus = (trip) => {
    if (trip.status === "Completed") {
      return "Completed";
    }

    try {
      if (!trip.dates) {
        return trip.status || "Upcoming";
      }

      const parts = trip.dates.split("–");

      if (parts.length < 2) {
        return trip.status || "Upcoming";
      }

      const endDateStr = parts[1].trim();
      const endDate = new Date(endDateStr);

      const currentDate = new Date();

      currentDate.setHours(0, 0, 0, 0);

      if (!isNaN(endDate.getTime()) && endDate < currentDate) {
        return "Completed";
      }
    } catch (error) {
      console.error("Error parsing trip dates:", error);
    }

    return trip.status || "Upcoming";
  };


  /*
    ============================================================
    DEFAULT TRIPS
    ============================================================
  */

  const [trips, setTrips] = useState(() => {
    const defaultTrips = [
      {
        id: 1,

        image:
          "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=85",

        name: "Jaipur Adventure",

        location: "Jaipur, Rajasthan",

        dates: "12 Jun – 16 Jun 2026",

        travelers: "2 Travelers",

        budget: "₹25,000",

        status: "Upcoming",

        progress: 75,
      },

      {
        id: 2,

        image:
          "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=85",

        name: "Goa Beach Trip",

        location: "Goa, India",

        dates: "20 May – 23 May 2026",

        travelers: "3 Travelers",

        budget: "₹18,000",

        status: "Completed",

        progress: 100,
      },

      {
        id: 3,

        image:
          "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=85",

        name: "Manali Escape",

        location: "Manali, Himachal Pradesh",

        dates: "10 Apr – 15 Apr 2026",

        travelers: "2 Travelers",

        budget: "₹20,000",

        status: "Completed",

        progress: 100,
      },

      {
        id: 4,

        image:
          "https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=900&q=85",

        name: "Udaipur Weekend",

        location: "Udaipur, Rajasthan",

        dates: "05 Mar – 07 Mar 2026",

        travelers: "2 Travelers",

        budget: "₹12,000",

        status: "Completed",

        progress: 100,
      },
    ];


    /*
      ==========================================================
      GET SAVED TRIPS
      ==========================================================
    */

    const savedTrips1 = JSON.parse(
      localStorage.getItem("userCustomTrips") || "[]"
    );

    const savedTrips2 = JSON.parse(
      localStorage.getItem("globeTrotterTrips") || "[]"
    );

    const savedTrips3 = JSON.parse(
      localStorage.getItem("trips") || "[]"
    );


    /*
      ==========================================================
      COMBINE ALL TRIPS
      ==========================================================
    */

    const allCustomTrips = [
      ...savedTrips1,
      ...savedTrips2,
      ...savedTrips3,
    ];


    /*
      Remove duplicate IDs
    */

    const uniqueCustomTrips = Array.from(
      new Set(allCustomTrips.map((t) => t.id))
    ).map((id) =>
      allCustomTrips.find((t) => t.id === id)
    );


    const combined = [
      ...uniqueCustomTrips,
      ...defaultTrips,
    ];


    /*
      ==========================================================
      FINAL TRIP DATA
      ==========================================================
    */

    return combined.map((trip) => {
      const status = parseTripDatesAndCheckStatus(trip);

      return {
        ...trip,

        status: status,

        progress:
          status === "Completed"
            ? 100
            : trip.progress || 50,
      };
    });
  });


  /*
    ============================================================
    UPDATE COMPLETED TRIPS
    ============================================================
  */

  useEffect(() => {
    const updatedTrips = trips.map((trip) => {
      const newStatus =
        parseTripDatesAndCheckStatus(trip);

      return {
        ...trip,

        status: newStatus,

        progress:
          newStatus === "Completed"
            ? 100
            : trip.progress || 50,
      };
    });


    const completedTrips = updatedTrips.filter(
      (trip) => trip.status === "Completed"
    );


    localStorage.setItem(
      "recentCompletedTrips",
      JSON.stringify(completedTrips)
    );
  }, [trips]);


  /*
    ============================================================
    CANCEL TRIP
    ============================================================
  */

  const handleCancelTrip = (id) => {
    const updatedTrips = trips.filter(
      (trip) => trip.id !== id
    );

    setTrips(updatedTrips);


    [
      "userCustomTrips",
      "globeTrotterTrips",
      "trips",
    ].forEach((key) => {
      const saved = JSON.parse(
        localStorage.getItem(key) || "[]"
      );

      const filtered = saved.filter(
        (trip) => trip.id !== id
      );

      localStorage.setItem(
        key,
        JSON.stringify(filtered)
      );
    });
  };


  /*
    ============================================================
    TOGGLE ITINERARY
    ============================================================
  */

  const handleToggleItinerary = (trip) => {
    if (trip.status === "Completed") {
      setModalData({
        trip,

        title: "🎉 Completed Trip Revisit",

        message: `You have already completed your trip to "${trip.name}" (${trip.location})! Do you want to plan and visit this city again?`,
      });
    }

    else if (trip.status === "Upcoming") {
      setModalData({
        trip,

        title: "✈️ Upcoming Active Plan",

        message: `Your trip to "${trip.name}" (${trip.location}) is upcoming! Do you want to view or manage this active upcoming plan now?`,
      });
    }

    else {
      setExpandedTripId(
        expandedTripId === trip.id
          ? null
          : trip.id
      );
    }
  };


  /*
    ============================================================
    MODAL CONFIRM
    ============================================================
  */

  const handleModalConfirm = () => {
    if (modalData && modalData.trip) {
      setExpandedTripId(
        expandedTripId === modalData.trip.id
          ? null
          : modalData.trip.id
      );
    }

    setModalData(null);
  };


  /*
    ============================================================
    IMAGE UPLOAD
    ============================================================
  */

  const triggerUpload = (tripId, type) => {
    setUploadTarget({
      tripId,
      type,
    });

    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };


  /*
    ============================================================
    HANDLE FILE CHANGE
    ============================================================
  */

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && uploadTarget) {
      const {
        tripId,
        type,
      } = uploadTarget;


      const newPhoto = {
        id: Date.now(),

        url: URL.createObjectURL(file),

        name: file.name,
      };


      if (type === "hotel") {
        setHotelPhotos((prev) => ({
          ...prev,

          [tripId]: [
            ...(prev[tripId] || []),
            newPhoto,
          ],
        }));
      }

      else if (type === "place") {
        setPlacePhotos((prev) => ({
          ...prev,

          [tripId]: [
            ...(prev[tripId] || []),
            newPhoto,
          ],
        }));
      }
    }

    e.target.value = null;
  };


  /*
    ============================================================
    DELETE PHOTO
    ============================================================
  */

  const handleDeletePhoto = (
    tripId,
    photoId,
    type
  ) => {
    if (type === "hotel") {
      setHotelPhotos((prev) => ({
        ...prev,

        [tripId]: (prev[tripId] || []).filter(
          (p) => p.id !== photoId
        ),
      }));
    }

    else {
      setPlacePhotos((prev) => ({
        ...prev,

        [tripId]: (prev[tripId] || []).filter(
          (p) => p.id !== photoId
        ),
      }));
    }
  };


  /*
    ============================================================
    FILTER
    ============================================================
  */

  const filteredTrips =
    filter === "All"
      ? trips
      : trips.filter(
          (trip) => trip.status === filter
        );


  /*
    ============================================================
    RETURN
    ============================================================
  */

  return (
    <div className="page">

      <Navbar />


      {/* Hidden file input */}

      <input
        type="file"
        ref={fileInputRef}
        style={{
          display: "none",
        }}
        accept="image/*"
        onChange={handleFileChange}
      />


      {/* ======================================================
          MODAL
      ====================================================== */}

      {modalData && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",

            backgroundColor:
              "rgba(0, 0, 0, 0.5)",

            display: "flex",

            alignItems: "center",

            justifyContent: "center",

            zIndex: 1000,

            padding: "20px",
          }}
        >

          <div
            style={{
              backgroundColor: "#fff",

              padding: "24px",

              borderRadius: "12px",

              maxWidth: "400px",

              width: "100%",

              boxShadow:
                "0 10px 25px rgba(0,0,0,0.2)",

              textAlign: "center",
            }}
          >

            <h3
              style={{
                marginBottom: "12px",

                color: "#0b3d82",

                fontSize: "1.2rem",
              }}
            >
              {modalData.title}
            </h3>


            <p
              style={{
                marginBottom: "20px",

                color: "#475569",

                fontSize: "0.95rem",

                lineHeight: "1.5",
              }}
            >
              {modalData.message}
            </p>


            <div
              style={{
                display: "flex",

                gap: "10px",

                justifyContent: "center",
              }}
            >

              <button
                onClick={() => setModalData(null)}
                className="btn secondary"
                style={{
                  flex: 1,

                  padding: "10px",

                  cursor: "pointer",
                }}
              >
                Cancel
              </button>


              <button
                onClick={handleModalConfirm}
                className="btn"
                style={{
                  flex: 1,

                  padding: "10px",

                  cursor: "pointer",

                  backgroundColor: "#0b3d82",

                  color: "#fff",
                }}
              >
                Yes, Proceed
              </button>

            </div>

          </div>

        </div>
      )}


      {/* ======================================================
          MAIN PAGE
      ====================================================== */}

      <main className="my-trips-page">

        <div className="container">


          {/* ==================================================
              HEADER
          ================================================== */}

          <div className="my-trips-header">

            <div>

              <span className="label">
                MY JOURNEYS
              </span>

              <h1>
                My Trips
              </h1>

              <p>
                Manage your planned journeys,
                detailed hotel check-in/dining,
                sightseeing spots, and
                upload/manage your trip photos.
              </p>

            </div>


            <Link
              to="/create-trip"
              className="btn"
            >
              + Create New Trip
            </Link>

          </div>


          {/* ==================================================
              SUMMARY
          ================================================== */}

          <div className="trip-summary-row">

            <div className="summary-box card">

              <span className="summary-icon">
                🗺️
              </span>

              <div>

                <strong>
                  {trips.length}
                </strong>

                <small>
                  Total Trips
                </small>

              </div>

            </div>


            <div className="summary-box card">

              <span className="summary-icon">
                ✈️
              </span>

              <div>

                <strong>
                  {
                    trips.filter(
                      (t) =>
                        t.status === "Upcoming"
                    ).length
                  }
                </strong>

                <small>
                  Upcoming
                </small>

              </div>

            </div>


            <div className="summary-box card">

              <span className="summary-icon">
                ✓
              </span>

              <div>

                <strong>
                  {
                    trips.filter(
                      (t) =>
                        t.status === "Completed"
                    ).length
                  }
                </strong>

                <small>
                  Completed
                </small>

              </div>

            </div>


            <div className="summary-box card">

              <span className="summary-icon">
                💰
              </span>

              <div>

                <strong>
                  Dynamic
                </strong>

                <small>
                  Total Budget
                </small>

              </div>

            </div>

          </div>


          {/* ==================================================
              TRIP CONTROLS
          ================================================== */}

          <div className="trip-controls card">

            <div className="control-title">

              <span className="label">
                TRIP COLLECTION
              </span>

              <h2>
                Your Travel Plans
              </h2>

            </div>


            <div className="filter-buttons">

              {[
                "All",
                "Upcoming",
                "Completed",
              ].map((item) => (

                <button
                  key={item}

                  className={
                    filter === item
                      ? "filter-btn active"
                      : "filter-btn"
                  }

                  onClick={() =>
                    setFilter(item)
                  }
                >
                  {item}
                </button>

              ))}

            </div>

          </div>


          {/* ==================================================
              TRIP CARDS
          ================================================== */}

          <div className="trips-grid">

            {filteredTrips.map((trip) => (

              <article
                className="trip-card card"

                key={trip.id}

                style={{
                  display: "flex",

                  flexDirection: "column",
                }}
              >


                {/* ============================================
                    CITY IMAGE
                    IMPORTANT CHANGE IS HERE
                ============================================ */}

                <div
                  className="trip-card-image"

                  style={{
                    position: "relative",
                  }}
                >

                  <img
                    src={getCityImage(trip)}

                    alt={
                      trip.name ||
                      trip.location ||
                      "Trip destination"
                    }

                    style={{
                      width: "100%",

                      height: "100%",

                      objectFit: "cover",
                    }}
                  />


                  <span
                    className={
                      trip.status === "Upcoming"
                        ? "card-status upcoming"
                        : "card-status completed"
                    }
                  >
                    {trip.status}
                  </span>

                </div>


                {/* ==========================================
                    CARD BODY
                ========================================== */}

                <div className="trip-card-body">


                  <div className="trip-card-title">

                    <div>

                      <h2>
                        {trip.name}
                      </h2>

                      <p>
                        📍{" "}
                        {trip.location ||
                          trip.name}
                      </p>

                    </div>


                    {trip.status ===
                      "Upcoming" && (

                      <button
                        className="btn secondary"

                        onClick={() =>
                          handleCancelTrip(
                            trip.id
                          )
                        }

                        style={{
                          padding: "4px 10px",

                          fontSize: "0.8rem",

                          color: "#dc2626",

                          borderColor:
                            "#fca5a5",
                        }}

                        title="Cancel this trip"
                      >
                        Cancel
                      </button>

                    )}

                  </div>


                  {/* ========================================
                      TRIP DETAILS
                  ======================================== */}

                  <div className="trip-card-details">


                    <div>

                      <span>
                        📅
                      </span>

                      <div>

                        <small>
                          DATES
                        </small>

                        <strong>
                          {
                            trip.dates ||
                            "12 Jun – 16 Jun 2026"
                          }
                        </strong>

                      </div>

                    </div>


                    <div>

                      <span>
                        👥
                      </span>

                      <div>

                        <small>
                          TRAVELERS
                        </small>

                        <strong>
                          {
                            trip.travelers ||
                            "2 Travelers"
                          }
                        </strong>

                      </div>

                    </div>


                    <div>

                      <span>
                        💰
                      </span>

                      <div>

                        <small>
                          BUDGET
                        </small>

                        <strong>
                          {
                            trip.budget ||
                            "₹15,000"
                          }
                        </strong>

                      </div>

                    </div>

                  </div>


                  {/* ========================================
                      PROGRESS
                  ======================================== */}

                  <div className="trip-card-progress">

                    <div className="progress-heading">

                      <span>
                        Planning Progress
                      </span>

                      <strong>
                        {trip.progress}%
                      </strong>

                    </div>


                    <div className="progress-track">

                      <div
                        className="progress-value"

                        style={{
                          width: `${trip.progress}%`,
                        }}
                      />

                    </div>

                  </div>


                  {/* ========================================
                      EXPANDED ITINERARY
                  ======================================== */}

                  {expandedTripId ===
                    trip.id && (

                    <div
                      style={{
                        margin: "15px 0",

                        padding: "14px",

                        background:
                          "#f8fafc",

                        borderRadius:
                          "8px",

                        border:
                          "1px solid #cbd5e1",
                      }}
                    >


                      <span
                        className="label"

                        style={{
                          color: "#0b3d82",

                          marginBottom:
                            "10px",

                          display: "block",
                        }}
                      >
                        📍 {trip.name} -
                        ITINERARY DETAILS
                      </span>


                      {/* ==================================
                          HOTEL
                      ================================== */}

                      <div
                        style={{
                          marginBottom:
                            "16px",

                          paddingBottom:
                            "14px",

                          borderBottom:
                            "1px dashed #cbd5e1",
                        }}
                      >

                        <div
                          style={{
                            display: "flex",

                            justifyContent:
                              "space-between",

                            alignItems:
                              "center",
                          }}
                        >

                          <strong
                            style={{
                              fontSize:
                                "0.9rem",

                              color:
                                "#1e293b",
                            }}
                          >
                            🏨 1. Hotel Stay &
                            Dining
                          </strong>


                          <button
                            onClick={() =>
                              triggerUpload(
                                trip.id,
                                "hotel"
                              )
                            }

                            style={{
                              backgroundColor:
                                "#0b3d82",

                              color: "#fff",

                              border: "none",

                              borderRadius:
                                "50%",

                              width: "26px",

                              height: "26px",

                              cursor:
                                "pointer",

                              fontWeight:
                                "bold",

                              display:
                                "flex",

                              alignItems:
                                "center",

                              justifyContent:
                                "center",
                            }}
                          >
                            +
                          </button>

                        </div>


                        <div
                          style={{
                            margin:
                              "6px 0",

                            fontSize:
                              "0.82rem",

                            color:
                              "#475569",

                            lineHeight:
                              "1.4",
                          }}
                        >

                          <p>
                            <strong>
                              Hotel:
                            </strong>{" "}
                            Grand Royal
                            Resort & Spa
                          </p>

                          <p>
                            <strong>
                              Check-in:
                            </strong>{" "}
                            12:30 PM |
                            <strong>
                              {" "}
                              Check-out:
                            </strong>{" "}
                            10:00 AM
                          </p>

                        </div>


                        {/* HOTEL PHOTOS */}

                        {hotelPhotos[
                          trip.id
                        ] &&
                          hotelPhotos[
                            trip.id
                          ].length > 0 && (

                            <div
                              style={{
                                display:
                                  "flex",

                                gap: "8px",

                                flexWrap:
                                  "wrap",

                                marginTop:
                                  "10px",
                              }}
                            >

                              {hotelPhotos[
                                trip.id
                              ].map(
                                (photo) => (

                                  <div
                                    key={
                                      photo.id
                                    }

                                    style={{
                                      position:
                                        "relative",

                                      width:
                                        "60px",

                                      height:
                                        "60px",

                                      borderRadius:
                                        "6px",

                                      overflow:
                                        "hidden",

                                      border:
                                        "1px solid #94a3b8",
                                    }}
                                  >

                                    <img
                                      src={
                                        photo.url
                                      }

                                      alt={
                                        photo.name
                                      }

                                      style={{
                                        width:
                                          "100%",

                                        height:
                                          "100%",

                                        objectFit:
                                          "cover",
                                      }}
                                    />


                                    <button
                                      onClick={() =>
                                        handleDeletePhoto(
                                          trip.id,
                                          photo.id,
                                          "hotel"
                                        )
                                      }

                                      style={{
                                        position:
                                          "absolute",

                                        top:
                                          "2px",

                                        right:
                                          "2px",

                                        backgroundColor:
                                          "#dc2626",

                                        color:
                                          "#fff",

                                        border:
                                          "none",

                                        borderRadius:
                                          "50%",

                                        width:
                                          "18px",

                                        height:
                                          "18px",

                                        fontSize:
                                          "10px",

                                        cursor:
                                          "pointer",
                                      }}
                                    >
                                      ✕
                                    </button>

                                  </div>

                                )
                              )}

                            </div>

                          )}

                      </div>


                      {/* ==================================
                          PLACES
                      ================================== */}

                      <div>

                        <div
                          style={{
                            display: "flex",

                            justifyContent:
                              "space-between",

                            alignItems:
                              "center",
                          }}
                        >

                          <strong
                            style={{
                              fontSize:
                                "0.9rem",

                              color:
                                "#1e293b",
                            }}
                          >
                            🎯 2. Places &
                            Sightseeing
                            Explorer
                          </strong>


                          <button
                            onClick={() =>
                              triggerUpload(
                                trip.id,
                                "place"
                              )
                            }

                            style={{
                              backgroundColor:
                                "#0b3d82",

                              color: "#fff",

                              border: "none",

                              borderRadius:
                                "50%",

                              width: "26px",

                              height: "26px",

                              cursor:
                                "pointer",

                              fontWeight:
                                "bold",

                              display:
                                "flex",

                              alignItems:
                                "center",

                              justifyContent:
                                "center",
                            }}
                          >
                            +
                          </button>

                        </div>


                        <div
                          style={{
                            margin:
                              "6px 0",

                            fontSize:
                              "0.82rem",

                            color:
                              "#475569",

                            lineHeight:
                              "1.4",
                          }}
                        >

                          <p>
                            <strong>
                              Places Visited:
                            </strong>{" "}
                            Heritage monuments,
                            local viewpoint
                            hills, and
                            bustling town
                            markets.
                          </p>

                        </div>


                        {/* PLACE PHOTOS */}

                        {placePhotos[
                          trip.id
                        ] &&
                          placePhotos[
                            trip.id
                          ].length > 0 && (

                            <div
                              style={{
                                display:
                                  "flex",

                                gap: "8px",

                                flexWrap:
                                  "wrap",

                                marginTop:
                                  "10px",
                              }}
                            >

                              {placePhotos[
                                trip.id
                              ].map(
                                (photo) => (

                                  <div
                                    key={
                                      photo.id
                                    }

                                    style={{
                                      position:
                                        "relative",

                                      width:
                                        "60px",

                                      height:
                                        "60px",

                                      borderRadius:
                                        "6px",

                                      overflow:
                                        "hidden",

                                      border:
                                        "1px solid #94a3b8",
                                    }}
                                  >

                                    <img
                                      src={
                                        photo.url
                                      }

                                      alt={
                                        photo.name
                                      }

                                      style={{
                                        width:
                                          "100%",

                                        height:
                                          "100%",

                                        objectFit:
                                          "cover",
                                      }}
                                    />


                                    <button
                                      onClick={() =>
                                        handleDeletePhoto(
                                          trip.id,
                                          photo.id,
                                          "place"
                                        )
                                      }

                                      style={{
                                        position:
                                          "absolute",

                                        top:
                                          "2px",

                                        right:
                                          "2px",

                                        backgroundColor:
                                          "#dc2626",

                                        color:
                                          "#fff",

                                        border:
                                          "none",

                                        borderRadius:
                                          "50%",

                                        width:
                                          "18px",

                                        height:
                                          "18px",

                                        fontSize:
                                          "10px",

                                        cursor:
                                          "pointer",
                                      }}
                                    >
                                      ✕
                                    </button>

                                  </div>

                                )
                              )}

                            </div>

                          )}

                      </div>

                    </div>

                  )}


                  {/* ========================================
                      CARD BUTTONS
                  ======================================== */}

                  <div
                    className="trip-card-actions"

                    style={{
                      marginTop: "auto",
                    }}
                  >

                    <button
                      onClick={() =>
                        handleToggleItinerary(
                          trip
                        )
                      }

                      className="btn"

                      style={{
                        flex: 1,

                        textAlign:
                          "center",

                        cursor:
                          "pointer",
                      }}
                    >
                      {expandedTripId ===
                      trip.id
                        ? "Hide Itinerary"
                        : "View Itinerary"}
                    </button>


                    <Link
                      to="/itinerary-builder"
                      className="btn secondary"
                    >
                      End
                    </Link>

                  </div>

                </div>

              </article>

            ))}

          </div>


          {/* ==================================================
              NO TRIPS
          ================================================== */}

          {filteredTrips.length ===
            0 && (

            <div
              className="empty-trips card"
            >

              <div>
                🗺️
              </div>

              <h2>
                No trips found
              </h2>

              <p>
                There are no trips in
                this category yet.
              </p>

              <Link
                to="/create-trip"
                className="btn"
              >
                Create Your First Trip
              </Link>

            </div>

          )}

        </div>

      </main>


      {/* ======================================================
          FOOTER
      ====================================================== */}

      <footer
        style={{
          backgroundColor:
            "#0f172a",

          color: "#ffffff",

          padding: "30px 20px",

          marginTop: "50px",

          textAlign: "center",

          borderRadius:
            "12px 12px 0 0",
        }}
      >

        <h3
          style={{
            marginBottom: "10px",

            color: "#38bdf8",
          }}
        >
          GlobeTrotter - About Us
        </h3>


        <p
          style={{
            maxWidth: "600px",

            margin:
              "0 auto 20px auto",

            color: "#94a3b8",

            fontSize: "14px",

            lineHeight: "1.5",
          }}
        >
          GlobeTrotter is your ultimate
          travel companion to plan trips,
          explore cities, manage budgets,
          and share adventures seamlessly
          with your loved ones.
        </p>


        <div
          style={{
            display: "flex",

            justifyContent:
              "center",

            gap: "20px",

            flexWrap: "wrap",

            fontSize: "14px",
          }}
        >

          <span>
            📞 Phone: +91 98765 43210
          </span>

          <span>
            💬 WhatsApp:
            GlobeTrotter Support
          </span>

          <span>
            📸 Instagram:
            @globetrotter_official
          </span>

        </div>


        <div
          style={{
            marginTop: "20px",

            fontSize: "12px",

            color: "#64748b",
          }}
        >
          © 2026 GlobeTrotter.
          All rights reserved.
        </div>

      </footer>

    </div>
  );
}

export default MyTrips;