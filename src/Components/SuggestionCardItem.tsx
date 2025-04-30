import React from "react";
import { Link } from "react-router-dom";
import "./SuggestionCardItem.css";

// Define the prop types
interface SuggestionCardItemProps {
  path: string;
  src: string;
  name: string;
  description: string;
}

const SuggestionCardItem: React.FC<SuggestionCardItemProps> = ({
  path,
  src,
  name,
  description,
}) => {
  return (
    <li className="suggestion__cards__item">
      <Link className="suggestion__cards__item__link" to={path}>
        <figure className="suggestion__cards__item__pic-wrap">
          <img
            className="suggestion__cards__item__img"
            alt="Travel Image"
            src={src}
          />
        </figure>
        <div className="suggestion__cards__item__info">
          <h1 className="suggestion__cards__item__name">{name}</h1>
          <p className="suggestion__cards__item__description">{description}</p>
        </div>
      </Link>
    </li>
  );
};

export default SuggestionCardItem;
