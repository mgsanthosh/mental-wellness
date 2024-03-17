import React from "react";

const Loader = ({ message }) => {
  return (
    <div className="loader-container">
      <div>
        <img
          style={{ width: "250px", borderRadius: "12px" }}
          src="./loader.gif"
        ></img>
        <div className="loader-text">{message ? message : "Loading...."}</div>
      </div>
    </div>
  );
};

export default Loader;
