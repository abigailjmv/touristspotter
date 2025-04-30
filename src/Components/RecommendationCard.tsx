// import { Link } from "react-router-dom";

interface RecommendationCardProps {
  src: string;
  name: string;
  city?: string; // Optional, since it's conditionally rendered
  summary?: string; // Optional, since it's conditionally rendered
  similarity?: number; // Optional, since it's conditionally rendered
  path: string; // Assuming it's always passed
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  src,
  name,
  city,
  summary,
  similarity,
}) => {
  return (
    <li className="suggestion__card__item">
      <div className="suggestion__card__image">
        <img src={src} alt={name} />
      </div>
      <div className="suggestion__card__info">
        <h5 className="suggestion__card__name">{name}</h5>
        <div className="suggestion__card__description">
          {city && <p><strong>📍 {city}</strong></p>}
          {summary && <p>{summary}</p>}
          {similarity !== undefined && (
            <p>Similarity: <strong>{(similarity * 100).toFixed(2)}%</strong></p>
          )}
        </div>
        {/* <Link to={path} className="suggestion__card__link">
          Learn more
        </Link> */}
      </div>
    </li>
  );
};

export default RecommendationCard;
