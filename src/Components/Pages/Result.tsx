import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroSection from "../HeroSection";
import MatchCard from "../MatchCard";
import "./Result.css";

const Result: React.FC = () => {
  const location = useLocation();
  const { recommendations } = location.state || { recommendations: [] };

  useEffect(() => {
    console.log("Recommendations received:", recommendations);
  }, [recommendations]);

  return (
    <div className="result-page">
      <div className="hero-half">
        <HeroSection
          title="Where to?"
          subtitle="Let us know where you want to go, and we’ll recommend alternatives"
          backgroundImage="/images/HeroSection2.png"
          showButton={false}
          showSearchBar={false}
          showLoadingBar={true}
        />
      </div>
      <div className="matchcard-section">
        <MatchCard recommendations={recommendations} />
      </div>
    </div>
  );
};

export default Result;
