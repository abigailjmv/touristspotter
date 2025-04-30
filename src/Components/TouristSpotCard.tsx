import React from "react";
import "./TouristsSpotCard.css";

// Define the types for the props
interface TouristSpotCardProps {
  name: string;
  city: string;
  photo: string;
  description: string;
}

const TouristSpotCard: React.FC<TouristSpotCardProps> = ({
  name,
  city,
  photo,
  description,
}) => {
  return (
    <div className="tourist-spot-card">
      <img src={photo} alt={name} className="spot-image" />
      <div className="spot-details">
        <h3>{name}</h3>
        <p>
          <strong>City:</strong> {city}
        </p>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default TouristSpotCard;
