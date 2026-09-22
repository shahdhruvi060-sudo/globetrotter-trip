import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./Dashboard.css";

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDestination, setSelectedDestination] = useState(null);
  
  // Recent trips
  const [recentTrips, setRecentTrips] = useState([
    {
      id: "Manali Escape",
      name: "Manali",
      location: "Himachal Pradesh, India",
      image: "https://media1.thrillophilia.com/filestore/anzgo2rvrlyun3nfcwndwia4v9jh_shutterstock_1439505056.jpg",
      stay: "Grand Royal Resort & Spa",
      budget: "₹20,000",
      travelers: "2 People",
      dates: "10 Oct - 15 Oct"
    },
    {
      id: "Udaipur Weekend",
      name: "Udaipur",
      location: "Rajasthan, India",
      image: "https://cdn.pixabay.com/photo/2018/03/15/22/02/udaipur-3229676_1280.jpg",
      stay: "Lake Palace",
      budget: "₹18,000",
      travelers: "2 People",
      dates: "05 Mar - 7 Mar"
    },
    {
      id: "Goa Beach Trip",
      name: "Goa",
      location: "Goa, India",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=85",
      stay: "Hotel Stay & Dining",
      budget: "₹18,000",
      travelers: "3 People",
      dates: "20 May - 23 May "}
  ]);

  // Comprehensive Searchable Cities Database with Proper Images for Places, Foods & Restaurants
  const [allSearchableCities] = useState([
    {
      id: "goa",
      name: "Goa",
      state: "GOA",
      duration: "Beach Paradise • 3–5 Days",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=85",
      places: [
        { name: "Baga Beach", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80" },
        { name: "Aguada Fort", img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80" }
      ],
      foods: [
        { name: "Goan Fish Curry", img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=400&q=80" },
        { name: "Bebinca", img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80" }
      ],
      restaurants: [
        { name: "Britto's", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80" },
        { name: "Thalassa", img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=400&q=80" },
        { name: "Mum's Kitchen", img: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=400&q=80" }
      ]
      
    },
    {
      id: "mumbai",
      name: "Mumbai",
      state: "MAHARASHTRA",
      duration: "City of Dreams • 2–4 Days",
      image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=85",
      places: [
        { name: "Gateway of India", img: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=400&q=80" },
        { name: "Marine Drive", img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80" }
      ],
      foods: [
        { name: "Vada Pav", img: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=400&q=80" },
        { name: "Pav Bhaji", img: "https://images.unsplash.com/photo-1626844131082-256783844137?auto=format&fit=crop&w=400&q=80" }
      ],
      restaurants: [
        { name: "Trishna", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80" },
        { name: "Bade Miyan", img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=400&q=80" },
        { name: "Leopold Cafe", img: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=400&q=80" }
      ]
    },
    {
      id: "udaipur",
      name: "Udaipur",
      state: "RAJASTHAN",
      duration: "City of Lakes • 2–3 Days",
      image: "https://cdn.pixabay.com/photo/2018/03/15/22/02/udaipur-3229676_1280.jpg",
      places: [
        { name: "City Palace", img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=400&q=80" },
        { name: "Lake Pichola", img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=400&q=80" }
      ],
      foods: [
        { name: "Gatte ki Sabzi", img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80" },
        { name: "Mirchi Bada", img: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=400&q=80" }
      ],
      restaurants: [
        { name: "Ambrai", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80" },
        { name: "Savage Garden", img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=400&q=80" },
        { name: "Charcoal", img: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=400&q=80" }
      ]
    },
    {
      id: "bengaluru",
      name: "Bengaluru",
      state: "KARNATAKA",
      duration: "Garden City • 2–3 Days",
      image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=85",
      places: [
        { name: "Bangalore Palace", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80" },
        { name: "Lalbagh Botanical Garden", img: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=400&q=80" }
      ],
      foods: [
        { name: "Bisi Bele Bath", img: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=400&q=80" },
        { name: "Mylari Dosa", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=400&q=80" }
      ],
      restaurants: [
        { name: "Vidyarthi Bhavan", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80" },
        { name: "MTR", img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=400&q=80" },
        { name: "Toit", img: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=400&q=80" }
      ]
    },
    {
      id: "delhi",
      name: "Delhi",
      state: "DELHI NCR",
      duration: "Capital City • 3–4 Days",
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=85",
      places: [
        { name: "Red Fort", img: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=400&q=80" },
        { name: "Qutub Minar", img: "https://www.bhavyaholidays.com/blogs/wp-content/uploads/2014/03/Qutub-Minar-Delhi.jpg" }
      ],
      foods: [
        { name: "Chole Bhature", img: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=400&q=80" },
        { name: "Delhi Chaat", img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80" }
      ],
      restaurants: [
        { name: "Karim's", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80" },
        { name: "Bukhara", img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=400&q=80" },
        { name: "Indian Accent", img: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=400&q=80" }
      ]
    },
    {
      id: "kolkata",
      name: "Kolkata",
      state: "WEST BENGAL",
      duration: "City of Joy • 2–4 Days",
      image: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=800&q=85",
      places: [
        { name: "Victoria Memorial", img: "https://tse3.mm.bing.net/th/id/OIP.uTR-QwaHfxLwyMEe9lIOKgHaEW?r=0&pid=Api&h=220&P=0" },
        { name: "Howrah Bridge", img: "https://wallpapercave.com/wp/wp8621025.jpg" }
      ],
      foods: [
        { name: "Rosogolla", img: "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=400&q=80" },
        { name: "Kolkata Biryani", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400&q=80" }
      ],
      restaurants: [
        { name: "Peter Cat", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80" },
        { name: "Arsalan", img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=400&q=80" },
        { name: "Flurys", img: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=400&q=80" }
      ]
    },
    {
      id: "varanasi",
      name: "Varanasi",
      state: "UTTAR PRADESH",
      duration: "Spiritual Capital • 2–3 Days",
      image: "https://wallpaperaccess.com/full/2714896.jpg",
      places: [
        { name: "Kashi Vishwanath Temple", img: "https://tse4.mm.bing.net/th/id/OIP.MDVr9VnQpZWKykU2HrZ0zwHaE8?r=0&pid=Api&h=220&P=0" },
        { name: "Dashashwamedh Ghat", img: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=400&q=80" }
      ],
      foods: [
        { name: "Banarasi Kachori Jalebi", img: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=400&q=80" },
        { name: "Malaiyyo", img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=400&q=80" }
      ],
      restaurants: [
        { name: "Deena Chaat Bhandar", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80" },
        { name: "Kashi Chat Bhandar", img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=400&q=80" },
        { name: "Pizzeria Vaatika Cafe", img: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=400&q=80" }
      ]
    },
    {
      id: "chennai",
      name: "Chennai",
      state: "TAMIL NADU",
      duration: "Gateway of South India • 2–3 Days",
      image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=85",
      places: [
        { name: "Marina Beach", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80" },
        { name: "Kapaleeshwarar Temple", img: "https://www.optimatravels.com/images/chennai-images/kapaleeshwarar-temple-chennai-head.jpg" }
      ],
      foods: [
        { name: "Idli Sambar", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=400&q=80" },
        { name: "Chettinad Chicken", img: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=400&q=80" }
      ],
      restaurants: [
        { name: "Murugan Idli Shop", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80" },
        { name: "Saravana Bhavan", img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=400&q=80" },
        { name: "Dakshin", img: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=400&q=80" }
      ]
    },
    {
      id: "shimla",
      name: "Shimla",
      state: "HIMACHAL PRADESH",
      duration: "Queen of Hills • 2–3 Days",
      image: "https://media1.thrillophilia.com/filestore/anzgo2rvrlyun3nfcwndwia4v9jh_shutterstock_1439505056.jpg",
      places: [
        { name: "The Ridge", img: "https://indiano.travel/wp-content/uploads/2022/07/The-Mall-Road-is-a-main-pedestrian-street-in-Shimla-town-1024x676.jpg" },
        { name: "Mall Road", img: "https://media1.thrillophilia.com/filestore/l5stwgse3qt889ohvpojpa13ftp0_Mall_Road_Shimla_1.jpg?w=1440&dpr=2" }
      ],
      foods: [
        { name: "Madra", img: "https://tse1.mm.bing.net/th/id/OIP.ihuOj-CDXt6j8m4XaUoHcgHaEo?r=0&pid=Api&h=220&P=0" },
        { name: "Chha Gosht", img: "https://www.slurrp.com/web/_next/image?url=https:%2F%2Fimages.slurrp.com%2Fprod%2Farticles%2F9hc3almwhe4.webp%3Fimpolicy%3Dslurrp-20210601%26width%3D1200%26height%3D675&w=3840&q=75" }
      ],
      restaurants: [
        { name: "Wake & Bake Cafe", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80" },
        { name: "Embassy", img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=400&q=80" },
        { name: "Cafe Sol", img: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=400&q=80" }
      ]
    },
    {
      id: "hyderabad",
      name: "Hyderabad",
      state: "TELANGANA",
      duration: "City of Pearls • 2–3 Days",
      image: "https://images.unsplash.com/photo-1584646098378-0874589d76b1?auto=format&fit=crop&w=800&q=85", // Updated dedicated Hyderabad city view image
      places: [
        { name: "Charminar", img: "https://tse4.mm.bing.net/th/id/OIP.QeQTbtFSXNXpEbeVN6Fr9gHaJP?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" },
        { name: "Golconda Fort", img: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=400&q=80" }
      ],
      foods: [
        { name: "Hyderabadi Biryani", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400&q=80" },
        { name: "Haleem", img: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=400&q=80" }
      ],
      restaurants: [
        { name: "Paradise", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80" },
        { name: "Bawarchi", img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=400&q=80" },
        { name: "Shah Ghouse", img: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=400&q=80" }
      ]
    },
    {
      id: "udaluguri",
      name: "Udalguri",
      state: "ASSAM",
      duration: "Nature & Culture • 2 Days",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=85",
      places: [
        { name: "Bhairabkunda", img: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=400&q=80" },
        { name: "Orang National Park (Nearby)", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80" }
      ],
      foods: [
        { name: "Assamese Thali", img: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=400&q=80" },
        { name: "Pitha", img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80" }
      ],
      restaurants: [
        { name: "Local Assamese Dhabas", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80" },
        { name: "Udalguri Town Eateries", img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=400&q=80" }
      ]
    },
    {
      id: "Surat",
      name: "Surat",
      state: "GUJARAT",
      duration: "City & Culture • 2 Days",
      image: "https://img.hexahome.in/media/blogs/hexahome-blogs/sachin-gidc-surat/kj87mh.webp",
      places: [
        { name: "Dumas Beach Surat ", img: "https://media.holidify.com/images/cmsuploads/compressed/dumas-beach-surat-tourism-entry-fee-timings-holidays-reviews-header_20241206165208.jpg" },
        { name: "surat castle", img: "https://media.holidify.com/images/cmsuploads/compressed/02_big_20241206165237.jpg" }
      ],
      foods: [
        { name: "Locho", img: "https://images.slurrp.com/prodarticles/2zehx50z2pk.webp" },
        { name: "Surti Ghari", img: "https://nishamadhulika.com/imgpst/featured/surti-ghari-thumbnail.jpg" }
      ],
      restaurants: [
        { name: "SBC - Surat Baking Company", img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/ac/34/ef/sbc.jpg?w=900&h=500&s=1" },
        { name: "RBG", img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/dc/3f/f7/caption.jpg?w=1200&h=-1&s=1" }
      ]
    },
    {
    id: "Rajkot",
    name: "Rajkot",
    state: "GUJARAT",
    duration: "Heritage & History • 2 Days",
    image: "https://i.ytimg.com/vi/8AlrXxTF1zs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAMx2_khooFiHpP8i-t0Izfydt8Hg",
    places: [
      { name: "Watson Museum", img: "https://chalbanjare.com/crmnew/img_master/package/WatsonMuseum_17716709210.webp" },
      { name: "Kaba Gandhi No Delo", img: "https://bestinthecity.in/wp-content/uploads/2025/07/kaba-gandhi-no-delo-1024x536.png" }
    ],
    foods: [
      { name: "Rajkot Ganthiya", img: "https://4.imimg.com/data4/JW/PR/MY-12836419/vanela-gathiya-1000x1000.jpg" },
      { name: "Rajkot Peda", img: "https://i.ytimg.com/vi/eCyoUPwv7L8/maxresdefault.jpg" }
    ],
    restaurants: [
      { name: "The Imperial Palace Dining", img: "https://tse1.mm.bing.net/th/id/OIP.CEb_mGg3LCXYUa18yGHWswHaE7?r=0&pid=Api&h=220&P=0" },
      { name: "Orbit Restaurant", img: "https://framerusercontent.com/images/HlVgNV2663UfzfRSaDTeA1Rwmk.jpg" }
    ]
  },

  // --- वडोदरा (Vadodara) ---
  {
    id: "Vadodara",
    name: "Vadodara",
    state: "GUJARAT",
    duration: "Art & Palaces • 2 Days",
    image: "https://tse4.mm.bing.net/th/id/OIP.b05DjHa9Lun3wXTrJ-p8PgHaEo?r=0&pid=Api&h=220&P=0",
    places: [
      { name: "Laxmi Vilas Palace", img: "https://tse1.mm.bing.net/th/id/OIP.CEb_mGg3LCXYUa18yGHWswHaE7?r=0&pid=Api&h=220&P=0" },
      { name: "Sayaji Garden", img: "https://tse2.mm.bing.net/th/id/OIP.CEb_mGg3LCXYUa18yGHWswHaE7?r=0&pid=Api&h=220&P=0" }
    ],
    foods: [
      { name: "Sev Usal", img: "https://www.nehascookbook.com/wp-content/uploads/2022/12/Sev-usal-WS-1068x601.jpg" },
      { name: "Bakarwadi", img: "http://tse2.mm.bing.net/th/id/OIP.ixH4nLBEotOXD-wwNwdb9wHaFt?r=0&pid=Api&h=220&P=0" }
    ],
    restaurants: [
      { name: "Mandap Restaurant", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80" },
      { name: "Kamat Restaurant", img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=400&q=80" }
    ]
  },

  // --- जम्मू-कश्मीर (Jammu-Kashmir) ---
  {
    id: "Jammu-Kashmir",
    name: "Jammu-Kashmir",
    state: "JAMMU & KASHMIR",
    duration: "Mountains & Valleys • 5 Days",
    image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1000&q=85",
    places: [
      { name: "Dal Lake Srinagar", img: "https://c8.alamy.com/comp/2T2MYTT/beautiful-view-of-the-colorful-shikara-boats-floating-on-dal-lake-srinagar-kashmir-india-the-beauty-of-dal-lake-and-the-beautiful-shikaras-2T2MYTT.jpg" },
      { name: "Gulmarg Gondola", img: "https://media1.thrillophilia.com/filestore/4fa1zb2dwgcbc4am28eypvpgnxx3_3u3m6e2l6bb0sglxk1w6aauqdbkt_shu.jpg" }
    ],
    foods: [
      { name: "Rogan Josh", img: "https://luminarecipes.com/wp-content/uploads/2025/03/lamb-rogan-josh-recipe.jpg" },
      { name: "Kahwa Tea", img: "https://tse3.mm.bing.net/th/id/OIP.Oz12xP10pjXAF9xz_IIRAQHaEX?r=0&pid=Api&h=220&P=0" }
    ],
    restaurants: [
      { name: "Ahdoo's Srinagar", img: "https://haniefatravels.com/wp-content/uploads/2024/11/ahdoos-restaurant-srinagar-1024x683.png" },
      { name: "Stream Restaurant", img: "https://media-cdn.tripadvisor.com/media/photo-s/0f/57/26/cc/a-beautiful-serene-view.jpg" }
    ]
  },

  // --- आंध्र प्रदेश (Andhra Pradesh) ---
  {
    id: "Andhra-Pradesh",
    name: "Andhra Pradesh",
    state: "ANDHRA PRADESH",
    duration: "Temples & Coastline • 4 Days",
    image: "https://voices.shortpedia.com/wp-content/uploads/2021/07/andhra-pradesh-1200x900-1.jpg",
    places: [
      { name: "Tirumala Temple", img: "https://c9admin.cottage9.com/uploads/2292/Our-Temples-Our-Heritage-Tirumala-Venkateshwara-Temple-Tirupati-Balaji.jpg" },
      { name: "Araku Valley", img: "https://tse2.mm.bing.net/th/id/OIP.JmjITeFECFPlFnoT3KDS_gHaE8?r=0&pid=Api&h=220&P=0" }
    ],
    foods: [
      { name: "Andhra Meals", img: "https://tse4.mm.bing.net/th/id/OIP.WaSrMnxM71oY_8dJy_7OGwHaE7?r=0&pid=Api&h=220&P=0" },
      { name: "Pulihora", img: "https://i.ytimg.com/vi/GLdLE_u13EY/maxresdefault.jpg" }
    ],
    restaurants: [
      { name: "Raju Gari Biryani", img: "https://tse3.mm.bing.net/th/id/OIP.e0vU04hbwt1GAE_1dMZvDgHaFj?r=0&pid=Api&h=220&P=0" },
      { name: "Novotel Dining", img: "https://cdn.siasat.com/wp-content/uploads/2022/07/6687_rsr001_03_p_1024x768.jpg" }
    ]
  },

  // --- केरल (Kerala) ---
  {
    id: "Kerala",
    name: "Kerala",
    state: "KERALA",
    duration: "Backwaters & Nature • 5 Days",
    image: "https://i.pinimg.com/originals/fd/d6/b2/fdd6b202a72b693bf2cd90f50e013323.jpg",
    places: [
      { name: "Alleppey Backwaters", img: "https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2025/08/27144202/Alappuzha-Kerala-India.jpg" },
      { name: "Munnar Tea Gardens", img: "https://www.holidify.com/images/cmsuploads/compressed/Munnar66_20171216205538.jpg" }
    ],
    foods: [
      { name: "Kerala Sadya", img: "https://i.pinimg.com/originals/88/5e/fb/885efbd7d385b50200042fb45a1bbf85.jpg" },
      { name: "Appam with Stew", img: "https://tse2.mm.bing.net/th/id/OIP.Zzx9QzMqph4zb5eVMdzUtAHaE8?r=0&pid=Api&h=220&P=0" }
    ],
    restaurants: [
      { name: "Grand Pavilion", img: "https://tse2.mm.bing.net/th/id/OIP.cxf843pzQwesfND-jHZyTQHaHa?r=0&pid=Api&h=220&P=0" },
      { name: "Paragon Restaurant", img: "https://th-i.thgim.com/public/incoming/sb1dgu/article67023065.ece/alternates/LANDSCAPE_1200/80692_24_6_2023_19_45_8_1_25TVKZPARAGON.JPG" }
    ]
  },

  // --- तमिलनाडु (Tamil Nadu) ---
  {
    id: "Tamil-Nadu",
    name: "Tamil Nadu",
    state: "TAMIL NADU",
    duration: "Temples & Heritage • 5 Days",
    image: "https://cdn.pixabay.com/photo/2017/05/30/21/37/brihadishvara-2358280_1280.jpg",
    places: [
      { name: "Meenakshi Temple", img: "https://mediaim.expedia.com/destination/2/5a433cd7f8ea09dfad052e052c4827f4.jpg" },
      { name: "Marina Beach", img: "https://lp-cms-production.imgix.net/image_browser/GettyImages-624091590.jpg?auto=format&fit=crop&q=40&sharp=10&vib=20&ixlib=react-8.6.4" }
    ],
    foods: [
      { name: "Chettinad Meal", img: "https://www.alphonsostories.com/AlphonSoStoriesImages/SubServiceImage/Chettinad-meal-in-Chennai-1.jpg" },
      { name: "Filter Coffee", img: "https://static.vecteezy.com/system/resources/previews/016/584/721/large_2x/south-indian-filter-coffee-served-in-a-traditional-brass-or-stainless-steel-cup-free-photo.jpg" }
    ],
    restaurants: [
      { name: "Saravana Bhavan", img: "https://c8.alamy.com/comp/3A37E40/saravanaa-bhavan-is-a-well-known-chain-of-indian-vegetarian-restaurants-kuala-lumpur-malaysia-asia-3A37E40.jpg" },
      { name: "Anjappar", img: "http://x4.sdimgs.com/sd_static/u/202212/639c41a608499.jpg" }
    ]
  },

  // --- जामनगर (Jamnagar) ---
  {
    id: "Jamnagar",
    name: "Jamnagar",
    state: "GUJARAT",
    duration: "Marine & Palaces • 2 Days",
    image: "https://i.pinimg.com/736x/eb/b1/12/ebb11238c185b7395c05c6649fcf3543.jpg",
    places: [
      { name: "Lakhota Lake", img: "https://1.bp.blogspot.com/-s8dzzpDp0kU/XO4WLiZebvI/AAAAAAAAP4g/5B3tEzW5USccD5J7vWPZQoYBThWSlyc0QCPcBGAYYCw/s1600/Screenshot_2019-05-20-16-41-42-39.png" },
      { name: "Marine National Park", img: "https://i.ytimg.com/vi/q0XCn-rOTgs/maxresdefault.jpg" }
    ],
    foods: [
      { name: "Jamnagari Ganthiya", img: "https://tse1.mm.bing.net/th/id/OIP.0wGjuoGXCv2F8fDRX2eI3wHaHa?r=0&pid=Api&h=220&P=0" },
      { name: "Dabeli", img: "https://www.indianhealthyrecipes.com/wp-content/uploads/2024/09/dabeli-recipe.jpg" }
    ],
    restaurants: [
      { name: "President Hotel Restaurant", img: "https://tse3.mm.bing.net/th/id/OIP.rkj7OF5yXB6QsQsgmxCucgHaE7?r=0&pid=Api&h=220&P=0" },
      { name: "Lal Bagh Dining", img: "https://tse2.mm.bing.net/th/id/OIP.QoYWN20LSZkQT76pCrmLwgHaFj?r=0&pid=Api&h=220&P=0" }
    ]
  },

  // --- झारखंड (Jharkhand) ---
  {
    id: "Jharkhand",
    name: "Jharkhand",
    state: "JHARKHAND",
    duration: "Waterfalls & Forests • 3 Days",
    image: "https://static.india.com/wp-content/uploads/2022/12/jharkhand-1.jpg",
    places: [
      { name: "Hundru Falls", img: "https://www.gosahin.com/go/p/e/1532787666_Hundru-Falls1.jpg" },
      { name: "Deoghar Baidyanath Temple", img: "https://tse2.mm.bing.net/th/id/OIP.mbwUvF-X8JalYa6xxrq1WgHaE8?r=0&pid=Api&h=220&P=0" }
    ],
    foods: [
      { name: "Litti Chokha", img: "https://www.secondrecipe.com/wp-content/uploads/2021/01/bihari-litti-chokha.jpg" },
      { name: "Dhuska", img: "https://veganuary.com/wp-content/uploads/2022/10/Dhuska1-scaled.jpeg" }
    ],
    restaurants: [
      { name: "Kaveri Restaurant", img: "https://tse2.mm.bing.net/th/id/OIP.KmCCkOleqF4DCMc6bHvdxQHaDf?r=0&pid=Api&h=220&P=0" },
      { name: "Yellow Sapphire", img: "https://tse1.mm.bing.net/th/id/OIP.XVOiipPOf00RzRUlitV2uQHaFo?r=0&pid=Api&h=220&P=0+" }
    ]
  }
  ]);

  const [apiCities, setApiCities] = useState([]);

  useEffect(() => {
    const loadTripsAndCities = async () => {
      try {
        const response = await fetch("http://localhost:8081/api/trips");
        if (response.ok) {
          const apiData = await response.json();
          if (apiData && apiData.length > 0) {
            setApiCities(apiData);
          }
        }
      } catch (error) {
        console.log("Backend API not reachable for dynamic cities.");
      }
    };

    loadTripsAndCities();

    window.addEventListener("focus", loadTripsAndCities);
    window.addEventListener("storage", loadTripsAndCities);
    
    return () => {
      window.removeEventListener("focus", loadTripsAndCities);
      window.removeEventListener("storage", loadTripsAndCities);
    };
  }, []);

  const stats = [
    { icon: "🗺️", value: recentTrips.length.toString(), title: "My Trips", text: "Trips planned" },
    { icon: "📍", value: "15+", title: "Available Cities", text: "Explore across India" },
    { icon: "🎯", value: "60+", title: "Activities", text: "Activities available" },
    { icon: "💰", value: "₹25K", title: "Total Budget", text: "Estimated budget" },
  ];

  const [staticPopularCities] = useState([
    {
      id: "jaipur",
      name: "Jaipur",
      state: "RAJASTHAN",
      duration: "Pink City • 2–4 Days",
      image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=85",
      places: [
        { name: "Hawa Mahal", img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=400&q=80" },
        { name: "Amer Fort", img: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=400&q=80" }
      ],
      foods: [
        { name: "Dal Baati Churma", img: "https://www.secondrecipe.com/wp-content/uploads/2020/11/dal-bati-churma.jpg" },
        { name: "Pyaaz Kachori", img: "https://images.herzindagi.info/image/2022/Apr/Pyaaz-Kachori-At-Rawat-Mishthan-Bhandar.jpg" }
      ],
      restaurants: [
        { name: "LMB", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80" },
        { name: "Handi Restaurant", img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=400&q=80" },
        { name: "Suvarna Mahal", img: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=400&q=80" }
      ]
    },
    {
      id: "ahmedabad",
      name: "Ahmedabad",
      state: "GUJARAT",
      duration: "Heritage City • 2–3 Days",
      image: "https://www.ajays.co.in/blog/wp-content/uploads/2024/04/ahmedabad-places.webp",
      places: [
        { name: "Sabarmati Ashram", img: "https://www.savaari.com/blog/wp-content/uploads/2020/08/Sabarmati-Ashram-Painting-and-Archives-Library.jpg" },
        { name: "Adalaj Stepwell", img: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=400&q=80" }
      ],
      foods: [
        { name: "Gujarati Thali", img: "https://i.pinimg.com/originals/8a/b4/fe/8ab4fead3dee52206bb7900d2b79a1c8.jpg" },
        { name: "Fafda Jalebi", img: "https://img.magnific.com/premium-photo/crispy-fafda-with-sweet-jalebi-is-indian-snack-most-popular-gujarat-selective-focus_466689-71767.jpg?size=626&ext=jpg" }
      ],
      restaurants: [
        { name: "Agashiye", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80" },
        { name: "Vishalla", img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=400&q=80" },
        { name: "Toran Dining Hall", img: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=400&q=80" }
      ]
    },
    {
      id: "manali",
      name: "Manali",
      state: "HIMACHAL PRADESH",
      duration: "Valley of the Gods • 3–5 Days",
      image: "https://media1.thrillophilia.com/filestore/anzgo2rvrlyun3nfcwndwia4v9jh_shutterstock_1439505056.jpg",
      places: [
        { name: "Solang Valley", img: "https://bharmour.com/wp-content/uploads/2024/03/Solang-Valley.jpg" },
        { name: "Hadimba Temple", img: "https://tse4.mm.bing.net/th/id/OIP.2JtHRuJ2J0iu7BlURxnLaAHaFA?r=0&pid=Api&h=220&P=0" }
      ],
      foods: [
        { name: "Siddu", img: "https://tse1.mm.bing.net/th/id/OIP.68UnPcjbv98_1ZjC6GE4VQHaEK?r=0&pid=Api&h=220&P=0" },
        { name: "Madra", img: "https://tse1.mm.bing.net/th/id/OIP.ihuOj-CDXt6j8m4XaUoHcgHaEo?r=0&pid=Api&h=220&P=0" }
      ],
      restaurants: [
        { name: "Johnson's Cafe", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80" },
        { name: "Casa Bella Vista", img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=400&q=80" },
        { name: "The Corner House", img: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=400&q=80" }
      ]
    }
  ]);

  // UNIQUE CITIES FILTER
  const rawCombinedSource = [...allSearchableCities, ...apiCities, ...staticPopularCities];
  const combinedSearchSource = rawCombinedSource.filter(
    (city, index, self) =>
      index === self.findIndex((c) => c.name.toLowerCase() === city.name.toLowerCase())
  );
  
  const searchedCities = searchQuery.trim() === "" 
    ? [] 
    : combinedSearchSource.filter((dest) =>
        dest.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        (dest.state && dest.state.toLowerCase().includes(searchQuery.toLowerCase().trim())) ||
        (dest.location && dest.location.toLowerCase().includes(searchQuery.toLowerCase().trim()))
      );

  const parseJsonField = (field) => {
    if (!field) return [];
    if (Array.isArray(field)) return field;
    try {
      return JSON.parse(field);
    } catch (e) {
      return typeof field === 'string' ? field.split(',').map(item => ({ name: item.trim(), img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80" })) : [];
    }
  };

  return (
    <div className="page dashboard-page-wrapper" style={{ background: "#f4f5f7", minHeight: "100vh" }}>
      <Navbar />

      <main className="dashboard-page" style={{ padding: "2rem 1.5rem" }}>
        <div className="container dashboard-container" style={{ maxWidth: "1200px", margin: "0 auto" }}>
          
          {/* HEADER & SEARCH BAR */}
          <section className="dashboard-header" style={{ 
            background: "#1e293b", 
            borderRadius: "16px", 
            padding: "2.5rem 2rem", 
            color: "#ffffff", 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center", 
            marginBottom: "2.5rem", 
            flexWrap: "wrap", 
            gap: "1.5rem",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
          }}>
            <div>
              <span className="label" style={{ color: "#94a3b8", fontWeight: "600", fontSize: "0.75rem", letterSpacing: "1px" }}>TRAVEL DASHBOARD</span>
              <h1 style={{ margin: "6px 0", color: "#ffffff", fontSize: "2rem" }}><b>Welcome Back!</b></h1>
              <p style={{ margin: 0, color: "#94a3b8", fontSize: "0.95rem" }}>Search cities like Delhi, Bengaluru, Chennai, Udalguri or explore top destinations.</p>
            </div>

            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <input
                type="text"
                placeholder="Search city (e.g. Delhi, Chennai)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  height: "44px",
                  padding: "0 18px",
                  width: "280px",
                  borderRadius: "22px",
                  border: "1px solid #475569",
                  fontSize: "0.9rem",
                  outline: "none",
                  backgroundColor: "#0f172a",
                  color: "#fff",
                  boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)"
                }}
              />
              <Link to="/create-trip" className="btn dashboard-create-btn" style={{ 
                padding: "11px 20px", 
                fontSize: "0.9rem", 
                textDecoration: "none", 
                backgroundColor: "#f8fafc", 
                color: "#0f172a", 
                borderRadius: "22px", 
                fontWeight: "600",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
              }}>
                + Create Trip
              </Link>
            </div>
          </section>

          {/* STATS */}
          <section className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", marginBottom: "3rem" }}>
            {stats.map((stat) => (
              <div className="stat-card card" key={stat.title} style={{ background: "#ffffff", padding: "22px", borderRadius: "14px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: "18px", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
                <div className="stat-icon" style={{ fontSize: "2.2rem" }}>{stat.icon}</div>
                <div className="stat-content" style={{ display: "flex", flexDirection: "column" }}>
                  <strong style={{ fontSize: "1.35rem", color: "#0f172a" }}>{stat.value}</strong>
                  <span style={{ fontSize: "0.9rem", fontWeight: "600", color: "#334155" }}>{stat.title}</span>
                  <small style={{ fontSize: "0.75rem", color: "#64748b" }}>{stat.text}</small>
                </div>
              </div>
            ))}
          </section>

          {/* POPULAR CITIES OR SEARCH RESULTS */}
          {searchQuery.trim() === "" ? (
            <section className="destination-section" style={{ marginBottom: "3.5rem" }}>
              <div className="section-header recent-header" style={{ background: "#1e293b", padding: "1.5rem 2rem", borderRadius: "14px", color: "#fff", marginBottom: "1.5rem", boxShadow: "0 4px 15px rgba(0,0,0,0.06)" }}>
                <span className="label" style={{ color: "#94a3b8", fontWeight: "600", fontSize: "0.75rem", letterSpacing: "1px" }}>FEATURED DESTINATIONS</span>
                <h2 style={{ color: "#ffffff", margin: "4px 0 0 0", fontSize: "1.6rem" }}>Popular Trips</h2>
              </div>

              <div className="destination-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}>
                {staticPopularCities.map((dest) => (
                  <div
                    className="destination-card"
                    key={dest.id}
                    onClick={() => setSelectedDestination(dest)}
                    style={{
                      cursor: "pointer",
                      borderRadius: "14px",
                      overflow: "hidden",
                      boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
                      position: "relative",
                      height: "260px",
                      backgroundColor: "#ffffff"
                    }}
                  >
                    <img src={dest.image} alt={dest.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div className="destination-overlay" style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "18px",
                      background: "linear-gradient(transparent, rgba(15, 23, 42, 0.9))",
                      color: "#fff"
                    }}>
                      <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "#38bdf8", fontWeight: "bold", letterSpacing: "0.5px" }}>{dest.state}</span>
                      <h3 style={{ margin: "4px 0 0 0", fontSize: "1.35rem" }}>{dest.name}</h3>
                      <p style={{ margin: "2px 0 0 0", fontSize: "0.8rem", opacity: 0.85 }}>Click to view details ↗</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : (
            <section className="destination-section" style={{ marginBottom: "3.5rem" }}>
              <div className="section-header recent-header" style={{ background: "#1e293b", padding: "1.5rem 2rem", borderRadius: "14px", color: "#fff", marginBottom: "1.5rem", boxShadow: "0 4px 15px rgba(0,0,0,0.06)" }}>
                <span className="label" style={{ color: "#94a3b8", fontWeight: "600", fontSize: "0.75rem", letterSpacing: "1px" }}>SEARCH RESULTS</span>
                <h2 style={{ color: "#ffffff", margin: "4px 0 0 0", fontSize: "1.6rem" }}>Matching Cities for "{searchQuery}"</h2>
              </div>

              <div className="destination-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}>
                {searchedCities.length > 0 ? (
                  searchedCities.map((dest, idx) => (
                    <div
                      className="destination-card"
                      key={dest.id || idx}
                      onClick={() => setSelectedDestination(dest)}
                      style={{
                        cursor: "pointer",
                        borderRadius: "14px",
                        overflow: "hidden",
                        boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
                        position: "relative",
                        height: "260px",
                        backgroundColor: "#ffffff"
                      }}
                    >
                      <img src={dest.image || "https://images.unsplash.com/photo-1488646953014-85cb44e25828"} alt={dest.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <div className="destination-overlay" style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: "18px",
                        background: "linear-gradient(transparent, rgba(15, 23, 42, 0.9))",
                        color: "#fff"
                      }}>
                        <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "#38bdf8", fontWeight: "bold", letterSpacing: "0.5px" }}>{dest.state || dest.location}</span>
                        <h3 style={{ margin: "4px 0 0 0", fontSize: "1.35rem" }}>{dest.name}</h3>
                        <p style={{ margin: "2px 0 0 0", fontSize: "0.8rem", opacity: 0.85 }}>Click to view details ↗</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{ color: "#64748b", gridColumn: "1 / -1", padding: "1rem" }}>No city found matching "{searchQuery}".</p>
                )}
              </div>
            </section>
          )}

          {/* DESTINATION DETAILS MODAL */}
          {selectedDestination && (
            <div className="modal-backdrop" onClick={() => setSelectedDestination(null)} style={{
              position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: "rgba(0,0,0,0.6)", zIndex: 1000, display: "flex",
              justifyContent: "center", alignItems: "center", padding: "20px"
            }}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{
                background: "#fff", borderRadius: "16px", maxWidth: "600px", width: "100%",
                maxHeight: "85vh", overflowY: "auto", padding: "24px", position: "relative",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
              }}>
                <button onClick={() => setSelectedDestination(null)} style={{
                  position: "absolute", top: "16px", right: "16px", background: "#f1f5f9",
                  border: "none", borderRadius: "50%", width: "32px", height: "32px",
                  cursor: "pointer", fontWeight: "bold", fontSize: "1rem"
                }}>✕</button>
                
                <span style={{ fontSize: "0.75rem", fontWeight: "700", color: "#0284c7", textTransform: "uppercase" }}>
                  {selectedDestination.state || selectedDestination.location || "Destination Details"}
                </span>
                <h2 style={{ margin: "4px 0 8px 0", fontSize: "1.8rem", color: "#0f172a" }}>{selectedDestination.name}</h2>
                <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "16px" }}>
                  {selectedDestination.duration || "Explore Food, Places & Restaurants"}
                </p>

                <img src={selectedDestination.image || "https://images.unsplash.com/photo-1488646953014-85cb44e25828"} alt={selectedDestination.name} style={{ width: "100%", height: "220px", objectFit: "cover", borderRadius: "10px", marginBottom: "16px" }} />

                {/* Places Section */}
                {(() => {
                  const resolvedPlaces = parseJsonField(selectedDestination.places || selectedDestination.top_places);
                  return resolvedPlaces.length > 0 ? (
                    <>
                      <h4 style={{ margin: "16px 0 8px 0", color: "#1e293b" }}>Top Places to Visit:</h4>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "10px" }}>
                        {resolvedPlaces.map((p, i) => (
                          <div key={i} style={{ background: "#f8fafc", padding: "8px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                            <img src={p.img || "https://images.unsplash.com/photo-1488646953014-85cb44e25828"} alt={p.name || p} style={{ width: "100%", height: "90px", objectFit: "cover", borderRadius: "6px", marginBottom: "6px" }} />
                            <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "#334155" }}>{typeof p === 'string' ? p : p.name}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : null;
                })()}

                {/* Foods Section */}
                {(() => {
                  const resolvedFoods = parseJsonField(selectedDestination.foods || selectedDestination.famous_food);
                  return resolvedFoods.length > 0 ? (
                    <>
                      <h4 style={{ margin: "16px 0 8px 0", color: "#1e293b" }}>Famous Food:</h4>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "10px" }}>
                        {resolvedFoods.map((f, i) => (
                          <div key={i} style={{ background: "#f8fafc", padding: "8px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                            <img src={f.img || "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=400&q=80"} alt={f.name || f} style={{ width: "100%", height: "90px", objectFit: "cover", borderRadius: "6px", marginBottom: "6px" }} />
                            <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "#334155" }}>{typeof f === 'string' ? f : f.name}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : null;
                })()}

                {/* Restaurants Section */}
                {(() => {
                  const resolvedRestaurants = parseJsonField(selectedDestination.restaurants || selectedDestination.famous_restaurants);
                  return resolvedRestaurants.length > 0 ? (
                    <>
                      <h4 style={{ margin: "16px 0 8px 0", color: "#1e293b" }}>Famous Restaurants:</h4>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "10px" }}>
                        {resolvedRestaurants.map((r, i) => (
                          <div key={i} style={{ background: "#f8fafc", padding: "8px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                            <img src={r.img || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80"} alt={r.name || r} style={{ width: "100%", height: "90px", objectFit: "cover", borderRadius: "6px", marginBottom: "6px" }} />
                            <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "#334155" }}>{typeof r === 'string' ? r : r.name}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : null;
                })()}

              </div>
            </div>
          )}

          {/* RECENT TRIPS */}
          <section className="recent-section">
            <div className="section-header recent-header" style={{ background: "#1e293b", padding: "1.5rem 2rem", borderRadius: "14px", color: "#fff", marginBottom: "1.5rem", boxShadow: "0 4px 15px rgba(0,0,0,0.06)" }}>
              <span className="label" style={{ color: "#94a3b8", fontWeight: "600", fontSize: "0.75rem", letterSpacing: "1px" }}>YOUR TRIPS HISTORY</span>
              <h2 style={{ color: "#ffffff", margin: "4px 0 0 0", fontSize: "1.6rem" }}>Recent Trips</h2>
            </div>

            <div className="recent-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" }}>
              {recentTrips.length > 0 ? (
                recentTrips.map((trip, idx) => (
                  <div className="recent-card card" key={idx} style={{ background: "#ffffff", borderRadius: "14px", overflow: "hidden", border: "1px solid #e2e8f0", boxShadow: "0 6px 18px rgba(0,0,0,0.05)" }}>
                    
                    <div className="recent-image" style={{ height: "200px", position: "relative" }}>
                      <img src={trip.image || "https://images.unsplash.com/photo-1488646953014-85cb44e25828"} alt={trip.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>

                    <div className="recent-content" style={{ padding: "20px" }}>
                      <h3 style={{ margin: "0 0 6px 0", fontSize: "1.3rem", color: "#0f172a" }}>{trip.name}</h3>
                      <p style={{ margin: "0 0 12px 0", fontSize: "0.85rem", color: "#64748b", fontWeight: "500" }}>📍 {trip.location || trip.state}</p>
                      
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.9rem", color: "#334155", borderTop: "1px solid #f1f5f9", paddingTop: "12px", marginTop: "8px" }}>
                        <div><b>Stay / Slot:</b> <span style={{ color: "#0284c7", fontWeight: "600", textDecoration: "underline", cursor: "pointer" }}>{trip.stay}</span></div>
                        <div><b>Budget:</b> <span style={{ color: "#16a34a", fontWeight: "600" }}>{trip.budget}</span></div>
                        <div><b>Travelers:</b> {trip.travelers}</div>
                        <div><b>Dates:</b> {trip.dates}</div>
                      </div>
                    </div>

                  </div>
                ))
              ) : (
                <p style={{ color: "#64748b", gridColumn: "1 / -1", padding: "1rem" }}>No recent trips found. Create one now!</p>
              )}
            </div>
          </section>

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

export default Dashboard;
