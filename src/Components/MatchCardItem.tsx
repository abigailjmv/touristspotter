import React from "react";
import "./MatchCardItem.css";
import { Link } from "react-router-dom";

interface MatchCardItemProps {
  userText: string;
  userImage: string;
  matchText: string;
  matchImage: string;
}

const MatchCardItem: React.FC<MatchCardItemProps> = ({
  userText,
  userImage,
  matchText,
  matchImage,
}) => {
  const defaultUserImage = "images/default.jpg"; // Define default user image
  const placeholderMatchImage = "images/image2.jpg"; // Define placeholder image for match

  return (
    <>
      {/* User's preferred tourist spot */}
      <li className="search__cards__item">
        <div className="search__cards__item__link">
          <figure className="search__cards__item__pic-wrap">
            {userImage && userImage !== defaultUserImage ? (
              <img
                className="search__cards__item__img"
                alt="Your Tourist Spot"
                src={userImage}
              />
            ) : (
              <p className="text__card__item">{userText}</p>
            )}
          </figure>
          <div className="search__cards__item__text">
            <h3>Your preferred tourist spot</h3>
            {/* Optionally display the userText */}
            <p>{userText}</p>
          </div>
        </div>
      </li>

      {/* System's best match tourist spot */}
      <li className="result__cards__item">
        <Link className="result__cards__item__link" to="#">
          <figure className="result__cards__item__pic-wrap">
            <img
              className="result__cards__item__img"
              alt="Best Match Tourist Spot"
              src={matchImage || placeholderMatchImage}
            />
          </figure>
          <div className="result__cards__item__text">
            <h3>Our best match tourist spot</h3>
            <p>{matchText}</p>
          </div>
        </Link>
      </li>
    </>
  );
};

export default MatchCardItem;
