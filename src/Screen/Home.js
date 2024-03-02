import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home";

const Home = (props) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="homepage">
        <header className="hero-section">
          <div className="hero-container">
            <img src="/hero.jpeg"></img>
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
        </header>
      </div>
    </div>
  );
};

export default Home;
