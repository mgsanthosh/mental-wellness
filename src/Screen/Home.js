import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home";
import backgroundImage from "../bg.jpeg";

const Home = (props) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="homepage">
        <div
          className="home-page-main-container"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="hero-content-container">
            <div className="hero-title">Calm the Gut, Soothe the Mind</div>
            <div className="hero-subtitle">
              Nurturing Mental Wellness with Gastrointestinal Health
            </div>
            <div
              onClick={() => {
                navigate("/login");
              }}
              className="homeButton"
            >
              Get Started
            </div>
          </div>
        </div>
        {/* <header className="hero-section">
          <div className="hero-container">
            <img src="/bg.jpeg" className="bg-image"></img>
            <div className="hero-content-container">
              <div>Calm the Gut, Soothe the Mind</div>
              <div>Nurturing Mental Wellness with Gastrointestinal Health</div>
              <div
                onClick={() => {
                  navigate("/login");
                }}
                className="homeButton"
              >
                Get Started
              </div>
            </div>
          </div>
        </header> */}
      </div>
    </div>
  );
};

export default Home;
