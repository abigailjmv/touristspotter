import React from "react";
import { useLocation } from "react-router-dom";
import MatchCardItem from "./MatchCardItem";

// Define the interface for the recommendation item
interface Recommendation {
  name: string;
  image_url?: string;
}

const Result: React.FC = () => {
  const location = useLocation();

  // Define the type of recommendations using the Recommendation interface
  const { recommendations }: { recommendations: Recommendation[] } = location.state || { recommendations: [] };

  // Log the recommendations to check their contents
  console.log(recommendations);
  console.log("Result component rendered");

  return (
    <div className="result-container">
      <h2>Recommended Tourist Spots</h2>
      <ul className="results__list">
        {recommendations.length > 0 ? (
          recommendations.map((item, index) => (
            <MatchCardItem
              key={index}
              userText={item.name}  // Passed as userText
              userImage={item.image_url || "https://via.placeholder.com/150"}  // Passed as userImage
              matchText="This is our best match for you!"  // Static or dynamic based on logic
              matchImage={item.image_url || "https://via.placeholder.com/150"}  // Passed as matchImage
            />
          ))
        ) : (
          <p>No recommendations available</p>
        )}
      </ul>
    </div>
  );
};

export default Result;
