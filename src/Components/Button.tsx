import React from "react";
import "./Button.css";
import { Link } from "react-router-dom";

// Define available button styles and sizes as constants
const STYLES = ["btn--primary", "btn--outline", "btn--test"] as const;
const SIZES = ["btn--medium", "btn--large"] as const;

// Define types for button style and size based on the above constants
type ButtonStyle = typeof STYLES[number];
type ButtonSize = typeof SIZES[number];

// Define ButtonProps with proper typing for props
type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  buttonStyle?: ButtonStyle;
  buttonSize?: ButtonSize;
  to: string; // 'to' prop is required for the Link
  className?: string; // Optional className prop for custom styling
};

export const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  onClick,
  buttonStyle = STYLES[0], // Default to 'btn--primary'
  buttonSize = SIZES[0],   // Default to 'btn--medium'
  to,
  className = "", // Optional className, default is empty string
}) => {
  return (
    <Link to={to} className={`btn-mobile ${className}`}>
      <button
        className={`btn ${buttonStyle} ${buttonSize}`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    </Link>
  );
};
