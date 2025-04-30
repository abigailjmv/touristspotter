import React, { useState, useEffect } from "react";
import "./UserPreferences.css";
import { getVisitorId } from "../utils/visitor";

interface UserPreference {
  visitorId: string;
  selectedCategories: string[];
}

const UserPreferences: React.FC = () => {
  const [userPreferences, setUserPreferences] = useState<UserPreference | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]); // Added state for recommendations

  useEffect(() => {
    const visitorId = getVisitorId();
    const fetchVisitorPreference = async () => {
      try {
        const response = await fetch(
          `https://abgljmv-touristspotter-api.hf.space/get-visitor-preference?visitor_id=${visitorId}`
        );
        const data = await response.json();

        if (response.ok) {
          setUserPreferences(data); // Store the fetched data in state for display
          fetchRecommendations(data.selectedCategories); // Fetch recommendations when preferences are fetched
        } else {
          setError("Failed to fetch visitor preferences.");
        }
      } catch (err) {
        setError("Failed to fetch visitor preferences.");
      }
    };

    fetchVisitorPreference();
  }, []); // Empty dependency array ensures the request is made only once on component mount

  const fetchRecommendations = async (categories: string[]) => {
    try {
      // Send the selected categories as a query to the recommendations endpoint
      const response = await fetch(`https://abgljmv-touristspotter-api.hf.space/api/recommendations?query=${categories.join(",")}`);
      const data = await response.json();
      
      if (response.ok) {
        setRecommendations(data); // Store the recommendations in state
      } else {
        setError("Failed to fetch recommendations.");
      }
    } catch (err) {
      setError("Failed to fetch recommendations.");
    }
  };

  return (
    <div className="user-preference-container">
      {error && <div className="error">{error}</div>}
      {userPreferences ? (
        <div>
          <h2>Preferences</h2>
          <ul className="preference-list">
            {userPreferences.selectedCategories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
          
          {/* Display recommendations */}
          <h3>Recommendations</h3>
          <div className="recommendations">
            {recommendations.length > 0 ? (
              recommendations.map((rec, index) => (
                <div key={index} className="recommendation-item">
                  <h4>{rec.name}</h4>
                  <img src={rec.photo} alt={rec.name} />
                  <p>{rec.city}</p>
                  <p>{rec.summary}</p>
                  <p>Similarity: {rec.similarity}</p>
                </div>
              ))
            ) : (
              <p>Loading recommendations...</p>
            )}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default UserPreferences;
