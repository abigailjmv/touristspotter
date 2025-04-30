import { useState, useEffect } from "react";
import TouristSpotCard from "./TouristSpotCard";
import "./RecommendedDestinations.css";

// Define an interface for the recommendation spot structure
interface Recommendation {
  placeId: string;
  name: string;
  city: string;
  placePhoto: string;
  editorialSummary?: string; // Optional field
  captions?: string; // Optional field
}

export default function RecommendedDestinations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]); // Specify that the state is an array of Recommendation objects
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(
          `https://abgljmv-touristspotter-api.hf.space/api/random-destinations`
        );
        const data = await response.json();
        setRecommendations(data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) return <p>Loading destinations...</p>;

  return (
    <div className="recommendation-container">
      <h2>Recommended Destinations</h2>
      <div className="recommendation-list">
        {recommendations.length > 0 ? (
          recommendations.map((spot) => (
            <div className="recommendation-item" key={spot.placeId}>
              <TouristSpotCard
                name={spot.name}
                city={spot.city}
                photo={spot.placePhoto}
                description={spot.editorialSummary || spot.captions || "No description available"} // Fallback value
              />
            </div>
          ))
        ) : (
          <p>No recommendations available.</p>
        )}
      </div>
    </div>
  );
}
