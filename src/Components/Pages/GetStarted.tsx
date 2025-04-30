import "../../App.css";
import HeroSection from "../HeroSection";
import Popup from "../Popup";

function GetStarted() {
  return (
    <>
     <div className="get-started-page">
      <HeroSection
        title="TouristSpotter"
        subtitle="A Tourist Destination Recommender System"
        backgroundImage="/images/HeroSection.png" 
      />
      <Popup />
     </div>
    </>
  );
}

export default GetStarted;
