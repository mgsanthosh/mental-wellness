import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";
import { Button, TextField } from "@mui/material";
import backgroundImage from "../bg.jpeg";

const SignUp = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("User created successfully");
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error creating user:", errorCode, errorMessage);
      });
  };

  return (
    <div
      className="login-main-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="login-form-container">
        <div className="login-form-heading">Sign Up</div>

        <div style={{ display: "flex", gap: "20px" }}>
          <TextField
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            label="Email"
          />
          <TextField
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            label="Password"
          />
        </div>

        <div className="homeButton" onClick={handleSubmit}>
          Sign Up
        </div>

        <div>or</div>
        <div className="auth-page-switcher" onClick={() => navigate("/login")}>
          Already have an account? Login
        </div>
      </div>
    </div>
  );
};

export default SignUp;
