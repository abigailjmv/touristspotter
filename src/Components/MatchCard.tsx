import { useState, useEffect } from "react";
import "./MatchCard.css";
import RecommendationCard from "./RecommendationCard";
import { Button } from "./Button";
import MatchCardItem from "./MatchCardItem";

function MatchCard({ recommendations }: { recommendations: any[] }) {
  const [submittedData, setSubmittedData] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("submittedData");
    if (data) {
      setSubmittedData(JSON.parse(data));
    }
  }, []);

  const bestMatch = recommendations.length > 0 ? recommendations[0] : null;

  return (
    <div className="result__cards">
      {/* BEST MATCH CARD */}
      <div className="match__card__container">
        <div className="match__card__wrapper">
          <ul className="match__card__items">
            <MatchCardItem
              userText={submittedData?.text || "No text submitted"}
              userImage={submittedData?.image || "images/default.jpg"}
              matchText={bestMatch?.name || "No match found"}
              matchImage={bestMatch?.photo || "https://via.placeholder.com/400x200?text=No+Image"}
            />
          </ul>
        </div>
      </div>

      {/* SIMILARITY + EXTRA DETAILS */}
      {bestMatch && (
        <div className="similarity__score">
          {typeof bestMatch.similarity === "number" && (
            <p>
              Similarity Score: <strong>{(bestMatch.similarity * 100).toFixed(2)}%</strong>
            </p>
          )}
          <p>
            <strong>City:</strong> {bestMatch.city || "Unknown"}
          </p>
          <p>
            <strong>Summary:</strong> {bestMatch.summary || "No summary available."}
          </p>
        </div>
      )}

      {/* OTHER RECOMMENDATIONS */}
      <h1>Here are our other recommended spots!</h1>
      <div className="suggestion__card__container">
        <div className="suggestion__card__wrapper">
          <ul className="suggestion__card__items">
          {recommendations.length > 1 ? (
            recommendations
              .slice(1) // Skip the first item (best match)
              .map((rec, index) => (

                <RecommendationCard
                  key={index}
                  src={rec.photo || "https://via.placeholder.com/400x200?text=No+Image"}
                  name={rec.name}
                  city={rec.city}
                  summary={rec.summary}
                  similarity={rec.similarity}
                  path={`/place/${rec.placeId}`}
                />
              ))
            ) : (
              <p>No recommendations available.</p>
            )}
          </ul>
          <div className="matchcard-btn">
            {/* <Button
              className="btns--viewmore"
              buttonStyle="btn--outline"
              buttonSize="btn--large"
              to="/more-spots"
            >
              View More
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MatchCard;
