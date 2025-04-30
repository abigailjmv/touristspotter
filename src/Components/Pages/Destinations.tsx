import { useEffect, useState } from "react";
import TouristSpotCard from "../TouristSpotCard";
import "./Destinations.css";

const DestinationsPage = () => {
  const [spots, setSpots] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState("All");
  const [view, setView] = useState("destinations"); // or "hotels"

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const response = await fetch("https://abgljmv-touristspotter-api.hf.space/api/destinations-gallery");
        const data = await response.json();
        setSpots(data);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSpots();
  }, []);

  const fetchHotels = async () => {
    if (hotels.length > 0) return; // Don't refetch
    try {
      setLoading(true);
      const response = await fetch("https://abgljmv-touristspotter-api.hf.space/api/hotels");
      const data = await response.json();
      setHotels(data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleViewChange = (newView) => {
    setView(newView);
    if (newView === "hotels") {
      fetchHotels(); // Load hotels only if user switches to hotel view
    }
  };

  const allCities = [...new Set([...spots.map(s => s.city), ...hotels.map(h => h.city)])];
  const cities = ["All", ...allCities.filter(Boolean)];

  const filteredSpots =
    selectedCity === "All"
      ? spots
      : spots.filter((spot) => spot.city === selectedCity);

  const filteredHotels =
    selectedCity === "All"
      ? hotels
      : hotels.filter((hotel) => hotel.city === selectedCity);

  return (
    <div className="destinations-page">
      <h1>Explore Mindanao</h1>

      <div className="filter">
        <select onChange={handleCityChange} value={selectedCity}>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        <div className="view-toggle-buttons">
          <button
            onClick={() => handleViewChange("destinations")}
            className={view === "destinations" ? "active" : ""}
          >
            Destinations
          </button>
          <button
            onClick={() => handleViewChange("hotels")}
            className={view === "hotels" ? "active" : ""}
          >
            Hotels
          </button>
        </div>
      </div>

      {loading && <p>Loading...</p>}

      {view === "destinations" && !loading && (
        <div className="destinations-grid">
          {filteredSpots.length === 0 ? (
            <p>No destinations found.</p>
          ) : (
            filteredSpots.map((spot) => (
              <TouristSpotCard
                key={spot.placeId}
                name={spot.name}
                city={spot.city}
                photo={spot.placePhoto}
                description={spot.editorialSummary || spot.captions}
              />
            ))
          )}
        </div>
      )}

      {view === "hotels" && !loading && (
        <div className="hotels-list">
          {filteredHotels.length === 0 ? (
            <p>No hotels found.</p>
          ) : (
            <ul>
              {filteredHotels.map((hotel, idx) => (
                <li key={idx}>
                  <a href={hotel.URL} target="_blank" rel="noopener noreferrer">
                    {hotel["Hotel Name"]}
                  </a>{" "}
                  – {hotel.city}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default DestinationsPage;
