import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./ShareTrip.css";

// Static Cities Database with all requested cities and details
const staticCities = [
  {
    id: 1,
    name: "Manali",
    state: "Himachal Pradesh",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1000&q=85",
    dates: "Jun 12 - Jun 16",
    travelers: "2 Travelers",
    budget: "25,000",
    subtitle: "Snow-capped mountains and adventure valleys",
    places: [
      { name: "Solang Valley", image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=500&q=80" },
      { name: "Rohtang Pass", image: "https://images.unsplash.com/photo-1593181629936-11c607b5383d?auto=format&fit=crop&w=500&q=80" },
      { name: "Hadimba Temple", image: "https://images.unsplash.com/photo-1588598198327-14b302db18d2?auto=format&fit=crop&w=500&q=80" }
    ],
    foods: ["Siddu", "Madra", "Babru", "Trout Fish"],
    restaurants: [
      { name: "Johnson's Cafe", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=500&q=80" },
      { name: "Casa Bella Vista", image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=500&q=80" }
    ],
    resorts: [
      { name: "The Anantmaya Resort", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=80" },
      { name: "Span Resort & Spa", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=500&q=80" }
    ]
  },
  {
    id: 2,
    name: "Ahmedabad",
    state: "Gujarat",
    image: "https://images.unsplash.com/photo-1617854818583-09e7f077a156?auto=format&fit=crop&w=1000&q=85",
    dates: "Jul 01 - Jul 05",
    travelers: "2 Travelers",
    budget: "15,000",
    subtitle: "The vibrant heritage city of Gujarat",
    places: [
      { name: "Sabarmati Ashram", image: "https://images.unsplash.com/photo-1598880940371-c756e015bc14?auto=format&fit=crop&w=500&q=80" },
      { name: "Adalaj Stepwell", image: "https://images.unsplash.com/photo-1609766418293-373a2464e8ac?auto=format&fit=crop&w=500&q=80" },
      { name: "Kankaria Lake", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=500&q=80" }
    ],
    foods: ["Gujarati Thali", "Fafda Jalebi", "Khaman", "Dabeli"],
    restaurants: [
      { name: "Agashiye", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=500&q=80" },
      { name: "Vishalla", image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=500&q=80" }
    ],
    resorts: [
      { name: "The House of MG", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=80" },
      { name: "Narayani Heights", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=500&q=80" }
    ]
  },
  {
    id: 3,
    name: "Udupi",
    state: "Karnataka",
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=1000&q=85",
    dates: "Aug 10 - Aug 14",
    travelers: "2 Travelers",
    budget: "18,000",
    subtitle: "Famous coastal town with pristine beaches and temples",
    places: [
      { name: "Malpe Beach", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80" },
      { name: "Udupi Sri Krishna Matha", image: "https://images.unsplash.com/photo-1609766418293-373a2464e8ac?auto=format&fit=crop&w=500&q=80" },
      { name: "St. Mary's Island", image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=500&q=80" }
    ],
    foods: ["Udupi Masala Dosa", "Neer Dosa", "Goli Baje", "Kadle Manoli"],
    restaurants: [
      { name: "Mitra Samaj", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=500&q=80" },
      { name: "Diana Restaurant", image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=500&q=80" }
    ],
    resorts: [
      { name: "Paradise Isle Beach Resort", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=80" },
      { name: "Tathagata Resort", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=500&q=80" }
    ]
  },
  {
    id: 4,
    name: "Chennai",
    state: "Tamil Nadu",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=85",
    dates: "Sep 05 - Sep 09",
    travelers: "2 Travelers",
    budget: "20,000",
    subtitle: "The cultural capital of South India",
    places: [
      { name: "Marina Beach", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80" },
      { name: "Kapaleeshwarar Temple", image: "https://images.unsplash.com/photo-1609766418293-373a2464e8ac?auto=format&fit=crop&w=500&q=80" },
      { name: "Mahabalipuram", image: "https://images.unsplash.com/photo-1593181629936-11c607b5383d?auto=format&fit=crop&w=500&q=80" }
    ],
    foods: ["Idli Sambar", "Chettinad Chicken", "Filter Coffee", "Kothu Parotta"],
    restaurants: [
      { name: "Murugan Idli Shop", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=500&q=80" },
      { name: "Saravana Bhavan", image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=500&q=80" }
    ],
    resorts: [
      { name: "Taj Fisherman's Cove", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=80" },
      { name: "GRT Radisson Blu", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=500&q=80" }
    ]
  },
  {
    id: 5,
    name: "Goa",
    state: "Goa",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=85",
    dates: "Oct 12 - Oct 16",
    travelers: "2 Travelers",
    budget: "30,000",
    subtitle: "Sun, sand, beaches and party vibes",
    places: [
      { name: "Baga Beach", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80" },
      { name: "Fort Aguada", image: "https://images.unsplash.com/photo-1593181629936-11c607b5383d?auto=format&fit=crop&w=500&q=80" },
      { name: "Dudhsagar Falls", image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=500&q=80" }
    ],
    foods: ["Goan Fish Curry", "Bebinca", "Pork Vindaloo", "Xacuti"],
    restaurants: [
      { name: "Curlies Beach Shack", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=500&q=80" },
      { name: "Gunpowder", image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=500&q=80" }
    ],
    resorts: [
      { name: "W Goa", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=80" },
      { name: "Taj Exotica Resort & Spa", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=500&q=80" }
    ]
  },
  {
    id: 6,
    name: "Hyderabad",
    state: "Telangana",
    image: "https://images.unsplash.com/photo-1617854818583-09e7f077a156?auto=format&fit=crop&w=1000&q=85",
    dates: "Nov 02 - Nov 06",
    travelers: "2 Travelers",
    budget: "22,000",
    subtitle: "The City of Pearls and Biryani",
    places: [
      { name: "Charminar", image: "https://images.unsplash.com/photo-1609766418293-373a2464e8ac?auto=format&fit=crop&w=500&q=80" },
      { name: "Golconda Fort", image: "https://images.unsplash.com/photo-1593181629936-11c607b5383d?auto=format&fit=crop&w=500&q=80" },
      { name: "Hussain Sagar Lake", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=500&q=80" }
    ],
    foods: ["Hyderabadi Biryani", "Haleem", "Double ka Meetha", "Irani Chai"],
    restaurants: [
      { name: "Paradise Biryani", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=500&q=80" },
      { name: "Bawarchi", image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=500&q=80" }
    ],
    resorts: [
      { name: "Taj Falaknuma Palace", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=80" },
      { name: "Novotel Hyderabad", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=500&q=80" }
    ]
  },
  {
    id: 7,
    name: "Delhi",
    state: "Delhi NCR",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1000&q=85",
    dates: "Nov 15 - Nov 19",
    travelers: "2 Travelers",
    budget: "20,000",
    subtitle: "The heart of India featuring history and street food",
    places: [
      { name: "India Gate", image: "https://images.unsplash.com/photo-1593181629936-11c607b5383d?auto=format&fit=crop&w=500&q=80" },
      { name: "Qutub Minar", image: "https://images.unsplash.com/photo-1609766418293-373a2464e8ac?auto=format&fit=crop&w=500&q=80" },
      { name: "Red Fort", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=500&q=80" }
    ],
    foods: ["Chole Bhature", "Butter Chicken", "Golgappa", "Parathas"],
    restaurants: [
      { name: "Karim's", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=500&q=80" },
      { name: "Bukhara", image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=500&q=80" }
    ],
    resorts: [
      { name: "The Leela Palace", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=80" },
      { name: "Taj Palace", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=500&q=80" }
    ]
  },
  {
    id: 8,
    name: "Mumbai",
    state: "Maharashtra",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1000&q=85",
    dates: "Dec 01 - Dec 05",
    travelers: "2 Travelers",
    budget: "28,000",
    subtitle: "The City of Dreams and Bollywood",
    places: [
      { name: "Gateway of India", image: "https://images.unsplash.com/photo-1593181629936-11c607b5383d?auto=format&fit=crop&w=500&q=80" },
      { name: "Marine Drive", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80" },
      { name: "Elephanta Caves", image: "https://images.unsplash.com/photo-1609766418293-373a2464e8ac?auto=format&fit=crop&w=500&q=80" }
    ],
    foods: ["Vada Pav", "Pav Bhaji", "Bombay Duck", "Modak"],
    restaurants: [
      { name: "Leopold Cafe", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=500&q=80" },
      { name: "Trishna", image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=500&q=80" }
    ],
    resorts: [
      { name: "The Taj Mahal Palace", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=80" },
      { name: "Trident Nariman Point", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=500&q=80" }
    ]
  },
  {
    id: 9,
    name: "Rajasthan",
    state: "Rajasthan",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1000&q=85",
    dates: "Dec 10 - Dec 15",
    travelers: "2 Travelers",
    budget: "35,000",
    subtitle: "Land of majestic forts, deserts and royal heritage",
    places: [
      { name: "Thar Desert", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80" },
      { name: "Mehrangarh Fort", image: "https://images.unsplash.com/photo-1593181629936-11c607b5383d?auto=format&fit=crop&w=500&q=80" },
      { name: "Lake Pichola", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=500&q=80" }
    ],
    foods: ["Dal Baati Churma", "Ghevar", "Laal Maas", "Pyaaz Kachori"],
    restaurants: [
      { name: "Chokhi Dhani", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=500&q=80" },
      { name: "15th Century Fort Cafe", image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=500&q=80" }
    ],
    resorts: [
      { name: "Umaid Bhawan Palace", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=80" },
      { name: "Rambagh Palace", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=500&q=80" }
    ]
  },
  {
    id: 10,
    name: "Jaipur",
    state: "Rajasthan",
    image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1000&q=85",
    dates: "Dec 18 - Dec 22",
    travelers: "2 Travelers",
    budget: "24,000",
    subtitle: "The Pink City famous for palaces and vibrant bazaars",
    places: [
      { name: "Hawa Mahal", image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=500&q=80" },
      { name: "Amber Fort", image: "https://images.unsplash.com/photo-1593181629936-11c607b5383d?auto=format&fit=crop&w=500&q=80" },
      { name: "City Palace", image: "https://images.unsplash.com/photo-1609766418293-373a2464e8ac?auto=format&fit=crop&w=500&q=80" }
    ],
    foods: ["Dal Baati Churma", "Ghevar", "Ker Sangri", "Mirchi Bada"],
    restaurants: [
      { name: "Tapri Central", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=500&q=80" },
      { name: "Laxmi Mishtan Bhandar", image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=500&q=80" }
    ],
    resorts: [
      { name: "Fairmont Jaipur", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=80" },
      { name: "Samode Haveli", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=500&q=80" }
    ]
  },
  {
    id: 11,
    name: "Kolkata",
    state: "West Bengal",
    image: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1000&q=85",
    dates: "Jan 05 - Jan 09",
    travelers: "2 Travelers",
    budget: "19,000",
    subtitle: "The City of Joy with rich art, literature and sweets",
    places: [
      { name: "Victoria Memorial", image: "https://images.unsplash.com/photo-1593181629936-11c607b5383d?auto=format&fit=crop&w=500&q=80" },
      { name: "Howrah Bridge", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=500&q=80" },
      { name: "Dakshineswar Kali Temple", image: "https://images.unsplash.com/photo-1609766418293-373a2464e8ac?auto=format&fit=crop&w=500&q=80" }
    ],
    foods: ["Rosogolla", "Kolkata Biryani", "Puchka", "Macher Jhol"],
    restaurants: [
      { name: "Arsalan", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=500&q=80" },
      { name: "Flurys", image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=500&q=80" }
    ],
    resorts: [
      { name: "The Oberoi Grand", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=80" },
      { name: "ITC Sonar", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=500&q=80" }
    ]
  },
  {
    id: 12,
    name: "Bengaluru",
    state: "Karnataka",
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1000&q=85",
    dates: "Jan 15 - Jan 19",
    travelers: "2 Travelers",
    budget: "21,000",
    subtitle: "The Silicon Valley of India and Garden City",
    places: [
      { name: "Bangalore Palace", image: "https://images.unsplash.com/photo-1593181629936-11c607b5383d?auto=format&fit=crop&w=500&q=80" },
      { name: "Lalbagh Botanical Garden", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=500&q=80" },
      { name: "Nandi Hills", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80" }
    ],
    foods: ["Bisi Bele Bath", "Benne Dosa", "Ragi Mudde", "Mysore Pak"],
    restaurants: [
      { name: "Vidyarthi Bhavan", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=500&q=80" },
      { name: "MTR (Mavalli Tiffin Room)", image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=500&q=80" }
    ],
    resorts: [
      { name: "The Leela Palace Bengaluru", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=80" },
      { name: "ITC Gardenia", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=500&q=80" }
    ]
  },
  {
    id: 13,
    name: "Shimla",
    state: "Himachal Pradesh",
    image: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1000&q=85",
    dates: "Feb 01 - Feb 05",
    travelers: "2 Travelers",
    budget: "23,000",
    subtitle: "The queen of hills with colonial architecture",
    places: [
      { name: "The Ridge", image: "https://images.unsplash.com/photo-1593181629936-11c607b5383d?auto=format&fit=crop&w=500&q=80" },
      { name: "Mall Road", image: "https://images.unsplash.com/photo-1609766418293-373a2464e8ac?auto=format&fit=crop&w=500&q=80" },
      { name: "Kufri", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80" }
    ],
    foods: ["Himachali Dham", "Chha Gosht", "Siddu", "Aktori"],
    restaurants: [
      { name: "Cafe Sol", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=500&q=80" },
      { name: "The Devicos", image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=500&q=80" }
    ],
    resorts: [
      { name: "The Oberoi Cecil", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=80" },
      { name: "Radisson Jass Shimla", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=500&q=80" }
    ]
  },
  {
    id: 14,
    name: "Surat",
    state: "Gujarat",
    image: "https://img.hexahome.in/media/blogs/hexahome-blogs/sachin-gidc-surat/kj87mh.webp",
    dates: "Feb 01 - Feb 05",
    travelers: "2 Travelers",
    budget: "23,000",
    subtitle: "The queen of hills with colonial architecture",
    places: [
     { name: "Dumas Beach Surat ", img: "https://media.holidify.com/images/cmsuploads/compressed/dumas-beach-surat-tourism-entry-fee-timings-holidays-reviews-header_20241206165208.jpg" },
    { name: "surat castle", img: "https://media.holidify.com/images/cmsuploads/compressed/02_big_20241206165237.jpg" }, 
    ],
    foods: [
      { name: "Locho", img: "https://images.slurrp.com/prodarticles/2zehx50z2pk.webp" },
        { name: "Surti Ghari", img: "https://nishamadhulika.com/imgpst/featured/surti-ghari-thumbnail.jpg" },
    ],
    restaurants: [
      { name: "SBC - Surat Baking Company", img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/ac/34/ef/sbc.jpg?w=900&h=500&s=1" },
        { name: "RBG", img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/dc/3f/f7/caption.jpg?w=1200&h=-1&s=1" }
    ],
    
  }, 
 {
    id: 15,
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
    id: 16,
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
    id: 17,
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
    id: 18,
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
    id: 19,
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
    id: 20,
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
    id: 21,
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
    id: 22,
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
];

function ShareTrip() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

  // States
  const [selectedCity, setSelectedCity] = useState(staticCities[0]); // Default to Manali
  const [activeView, setActiveView] = useState("share"); // "share" or "city-detail"

  // Dropdown Change Handler
  const handleCityChange = (e) => {
    const cityId = e.target.value;
    const city = staticCities.find((c) => String(c.id) === String(cityId));
    if (city) {
      setSelectedCity(city);
    }
  };

  // Dynamic shareable link
  const citySlug = selectedCity ? selectedCity.name.toLowerCase().replace(/\s+/g, "-") : "destination";
  const tripLink = `https://globetrotter.app/trip/${citySlug}-adventure-${selectedCity?.id || 1}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(tripLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Trip link copied: " + tripLink);
    }
  };

  const sendInvitation = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      alert("Please enter an email address.");
      return;
    }
    setSent(true);
    setEmail("");
    setMessage("");
    setTimeout(() => {
      setSent(false);
    }, 3000);
  };

  const quickShare = (type) => {
    const currentCityName = selectedCity ? selectedCity.name : "Dream";

    if (type === "WhatsApp") {
      const whatsappText = encodeURIComponent(
        `Check out my ${currentCityName} Adventure trip on GlobeTrotter: ${tripLink}`
      );
      window.open(`https://wa.me/?text=${whatsappText}`, "_blank");
      return;
    }

    if (type === "Telegram") {
      const telegramText = encodeURIComponent(
        `Check out my ${currentCityName} Adventure trip on GlobeTrotter: ${tripLink}`
      );
      window.open(`https://t.me/share/url?url=${encodeURIComponent(tripLink)}&text=${telegramText}`, "_blank");
      return;
    }

    if (type === "Instagram") {
      copyLink();
      alert("Link copied! You can now paste and send it directly in your Instagram DM or Story.");
      return;
    }

    if (type === "Email") {
      window.location.href = `mailto:?subject=My ${currentCityName} Adventure&body=Check out my trip: ${tripLink}`;
      return;
    }

    copyLink();
  };

  // If user clicked the image, show the Dedicated City Detail Page View
  if (activeView === "city-detail" && selectedCity) {
    return (
      <div className="page">
        <Navbar />
        <main className="share-page" style={{ paddingBottom: "60px" }}>
          <div className="container" style={{ maxWidth: "800px" }}>
            
            <button 
              onClick={() => setActiveView("share")} 
              className="btn secondary" 
              style={{ marginBottom: "20px", cursor: "pointer" }}
            >
              ← Back to Share Trip
            </button>

            <div className="card" style={{ padding: "30px", borderRadius: "16px", backgroundColor: "#fff" }}>
              <span style={{ color: "#0284c7", fontWeight: "700", fontSize: "12px", textTransform: "uppercase" }}>
                {selectedCity.state}
              </span>
              <h1 style={{ fontSize: "32px", color: "#0f172a", margin: "5px 0 10px 0" }}>
                {selectedCity.name} Adventure
              </h1>
              <p style={{ color: "#64748b", fontSize: "15px", marginBottom: "24px" }}>
                {selectedCity.subtitle}
              </p>

              <div style={{ width: "100%", height: "300px", borderRadius: "12px", overflow: "hidden", marginBottom: "30px" }}>
                <img src={selectedCity.image} alt={selectedCity.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>

              {/* Top Places to Visit */}
              <div style={{ marginBottom: "30px" }}>
                <h3 style={{ fontSize: "18px", color: "#1e293b", marginBottom: "14px" }}>📍 Top Places to Visit</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
                  {selectedCity.places.map((place, idx) => (
                    <div key={idx} style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid #e2e8f0", backgroundColor: "#f8fafc" }}>
                      <img src={place.image} alt={place.name} style={{ width: "100%", height: "120px", objectFit: "cover" }} />
                      <p style={{ padding: "10px", fontSize: "13px", fontWeight: "600", color: "#334155", margin: 0 }}>{place.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Famous Food */}
              <div style={{ marginBottom: "30px" }}>
                <h3 style={{ fontSize: "18px", color: "#1e293b", marginBottom: "14px" }}>🍲 Famous Food</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {selectedCity.foods.map((food, idx) => (
                    <span key={idx} style={{ backgroundColor: "#eff6ff", color: "#1d4ed8", padding: "8px 16px", borderRadius: "20px", fontSize: "13px", fontWeight: "600" }}>
                      {food}
                    </span>
                  ))}
                </div>
              </div>

              {/* Famous Restaurants */}
              <div style={{ marginBottom: "30px" }}>
                <h3 style={{ fontSize: "18px", color: "#1e293b", marginBottom: "14px" }}>🍽️ Famous Restaurants</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
                  {selectedCity.restaurants.map((rest, idx) => (
                    <div key={idx} style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid #e2e8f0", backgroundColor: "#f8fafc" }}>
                      <img src={rest.image} alt={rest.name} style={{ width: "100%", height: "120px", objectFit: "cover" }} />
                      <p style={{ padding: "10px", fontSize: "13px", fontWeight: "600", color: "#334155", margin: 0 }}>{rest.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Best Resorts */}
              <div>
                <h3 style={{ fontSize: "18px", color: "#1e293b", marginBottom: "14px" }}>🏡 Best Resorts & Stays</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
                  {selectedCity.resorts.map((resort, idx) => (
                    <div key={idx} style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid #e2e8f0", backgroundColor: "#f8fafc" }}>
                      <img src={resort.image} alt={resort.name} style={{ width: "100%", height: "120px", objectFit: "cover" }} />
                      <p style={{ padding: "10px", fontSize: "13px", fontWeight: "600", color: "#334155", margin: 0 }}>{resort.name}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </main>
      </div>
    );
  }

  // Main Share Trip View
  return (
    <div className="page">
      <Navbar />

      <main className="share-page">
        <div className="container">

          <div className="share-header">
            <div>
              <span className="label">TRIP COLLABORATION</span>
              <h1>Share Your Trip</h1>
              <p>
                Invite friends and family to view or collaborate on your travel plans.
              </p>
            </div>

            <Link to="/my-trips" className="btn secondary">
              ← My Trips
            </Link>
          </div>

          <div className="share-layout">

            <section className="trip-preview-card card">

              {/* Static Dropbox / Dropdown containing all requested cities */}
              <div style={{ padding: "15px 21px 5px 21px" }}>
                <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#315574", marginBottom: "6px" }}>
                  SELECT DESTINATION CITY
                </label>
                <select
                  value={selectedCity?.id || ""}
                  onChange={handleCityChange}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "1px solid #dce5ee",
                    backgroundColor: "#f9fbfd",
                    color: "#17324d",
                    fontSize: "12px",
                    fontWeight: "600",
                    outline: "none",
                    cursor: "pointer"
                  }}
                >
                  {staticCities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}, {city.state}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clickable Image: Clicking this opens the full dedicated page for the selected city */}
              <div
                className="preview-image"
                onClick={() => setActiveView("city-detail")}
                style={{ cursor: "pointer" }}
                title="Click to open full city guide page"
              >
                <img
                  src={selectedCity?.image}
                  alt={selectedCity?.name}
                />
                <span>🌍 GlobeTrotter Trip (Click to view details)</span>
              </div>

              <div className="preview-body">
                <span className="label">TRIP PREVIEW</span>

                <h2>{selectedCity ? `${selectedCity.name} Adventure` : "Select a City"}</h2>

                <p className="preview-location">
                  📍 {selectedCity ? `${selectedCity.name}, ${selectedCity.state}` : "Select destination"}
                </p>

                <div className="preview-details">
                  <div>
                    <span>📅</span>
                    <div>
                      <small>DATES</small>
                      <strong>{selectedCity?.dates}</strong>
                    </div>
                  </div>

                  <div>
                    <span>👥</span>
                    <div>
                      <small>TRAVELERS</small>
                      <strong>{selectedCity?.travelers}</strong>
                    </div>
                  </div>

                  <div>
                    <span>💰</span>
                    <div>
                      <small>BUDGET</small>
                      <strong>₹{selectedCity?.budget}</strong>
                    </div>
                  </div>
                </div>

                <div className="preview-progress">
                  <div className="progress-heading">
                    <span>Trip planning progress</span>
                    <strong>80%</strong>
                  </div>

                  <div className="progress-bar">
                    <span></span>
                  </div>
                </div>

                {/* "View Trip" button successfully removed as requested */}
              </div>

            </section>

            <section className="share-options">

              <div className="link-share-card card">
                <div className="share-card-heading">
                  <div>
                    <span className="label">PRIVATE LINK</span>
                    <h2>Share trip link</h2>
                  </div>

                  <span className="share-icon">🔗</span>
                </div>

                <p>Anyone with this link can view your trip details.</p>

                <div className="trip-link-box">
                  <span>{tripLink}</span>

                  <button onClick={copyLink}>
                    {copied ? "✓ Copied" : "Copy"}
                  </button>
                </div>

                {copied && (
                  <div className="share-success">
                    ✓ Trip link copied successfully.
                  </div>
                )}
              </div>

              <div className="invite-card card">
                <div className="share-card-heading">
                  <div>
                    <span className="label">INVITE PEOPLE</span>
                    <h2>Send an invitation</h2>
                  </div>

                  <span className="share-icon">✉️</span>
                </div>

                <form onSubmit={sendInvitation}>
                  <div className="form-group">
                    <label>Email address</label>
                    <input
                      type="email"
                      placeholder="friend@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Message</label>
                    <textarea
                      rows="3"
                      placeholder="Let's plan this trip together!"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn">
                    ✈️ Send Invitation
                  </button>
                </form>

                {sent && (
                  <div className="share-success">
                    ✓ Invitation sent successfully.
                  </div>
                )}
              </div>

            </section>

          </div>

          <section className="quick-share-section">
            <div className="section-heading">
              <div>
                <span className="label">QUICK SHARE</span>
                <h2>Share with one click</h2>
              </div>
            </div>

            <div className="quick-share-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px" }}>
              
              <button
                className="quick-share-card card"
                onClick={() => quickShare("WhatsApp")}
              >
                <span className="quick-icon">💬</span>
                <div>
                  <strong>WhatsApp</strong>
                  <small>Share with friends</small>
                </div>
                <span className="quick-arrow">→</span>
              </button>

              <button
                className="quick-share-card card"
                onClick={() => quickShare("Telegram")}
              >
                <span className="quick-icon">✈️</span>
                <div>
                  <strong>Telegram</strong>
                  <small>Send via Telegram</small>
                </div>
                <span className="quick-arrow">→</span>
              </button>

              <button
                className="quick-share-card card"
                onClick={() => quickShare("Instagram")}
              >
                <span className="quick-icon">📸</span>
                <div>
                  <strong>Instagram</strong>
                  <small>Copy for Instagram DM</small>
                </div>
                <span className="quick-arrow">→</span>
              </button>

              <button
                className="quick-share-card card"
                onClick={() => quickShare("Email")}
              >
                <span className="quick-icon">✉️</span>
                <div>
                  <strong>Email</strong>
                  <small>Send trip details</small>
                </div>
                <span className="quick-arrow">→</span>
              </button>

            </div>
          </section>

          <div className="privacy-grid">
            <div className="privacy-card">
              <span>🔒</span>
              <div>
                <strong>Your trip is private</strong>
                <p>Only people you share the trip with can access it.</p>
              </div>
            </div>

            <div className="privacy-card">
              <span>👥</span>
              <div>
                <strong>Plan together</strong>
                <p>Invite your travel partners and organize the trip together.</p>
              </div>
            </div>

            <div className="privacy-card">
              <span>🛡️</span>
              <div>
                <strong>Stay in control</strong>
                <p>You decide who can view and participate in your travel plans.</p>
              </div>
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

export default ShareTrip;