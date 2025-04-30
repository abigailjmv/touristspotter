import React from "react";
import { Button } from "./Button";
import "./HeroSection.css";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  backgroundImage: string;
  showButton?: boolean;
  buttonText?: string;
  buttonLink?: string;
  showSearchBar?: boolean;
  showLoadingBar?: boolean; // ✅ Added for loading bar
  children?: React.ReactNode;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  backgroundImage,
  showButton = true,
  buttonText = "GET STARTED",
  buttonLink = "/home",
  // showSearchBar = false,
  // showLoadingBar = false, // ✅ Default to false
  children,
}) => {
  return (
    <div
      className="hero-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {title && <h1>{title}</h1>}
      {subtitle && <p>{subtitle}</p>}

      {/* Optional search bar
      {showSearchBar && (
        <div className="hero-search-bar">
          <input
            type="text"
            placeholder="Search destinations..."
            className="search-input"
          />
        </div>
      )} */}

      {/* ✅ Optional loading bar
      {showLoadingBar && (
        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>
      )} */}

      {showButton && (
        <div className="hero-btns">
          <Button
            className="btns"
            buttonStyle="btn--outline"
            buttonSize="btn--large"
            to={buttonLink}
          >
            {buttonText}
          </Button>
        </div>
      )}

      <div className="main-ui">{children}</div>
    </div>
  );
};

export default HeroSection;
