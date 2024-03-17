import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";
import { Button, TextField, MenuItem } from "@mui/material";
import backgroundImage from "../bg.jpeg";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { ref, push, onValue, getDatabase, set } from "firebase/database";
import Loader from "./Loader";

const ExpertSignUp = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();
  const database = getDatabase(app);
  const [loaderMessage, setLoaderMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const notify = (message) =>
    toast(message, {
      position: "top-right",
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "dark",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    setLoader(true);
    setLoaderMessage("Signing Up Counsellor...");
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        setLoader(false);
        setLoaderMessage("Storing Counsellor Details...");
        console.log("User created successfully", userCredentials.user.uid);
        const signUpRef = ref(database, `userData/${userCredentials.user.uid}`);
        console.log("The signup ref ", signUpRef);
        const firebaseData = {
          email,
          password,
          name,
          gender,
          phone,
          age,
        };
        set(signUpRef, firebaseData);
        const expertLogsRef = ref(database, `expertlogs/${name}`);
        set(expertLogsRef, firebaseData);

        notify("Signed Up Successfully, Please Login Again!!");

        navigate("/expert-login");
      })
      .catch((error) => {
        setLoader(false);

        notify("ERROR " + error.message);
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
        <div className="login-form-heading">Counsellor Sign Up</div>

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
        <div style={{ display: "flex", gap: "20px" }}>
          <TextField
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
            label="Name"
          />
          <TextField
            type="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter Phonenumber"
            label="Phonenumber"
          />
        </div>
        <div style={{ display: "flex", gap: "20px" }}>
          {/* <TextField
            type="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            placeholder="Enter Gender"
            label="Gender"
          /> */}
          <TextField
            select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            label="Gender"
            fullWidth
          >
            {/* Menu items for the dropdown */}
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
          <TextField
            type="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter Age"
            label="Age"
          />
        </div>

        <div className="homeButton" onClick={handleSubmit}>
          Sign Up
        </div>

        <div>or</div>
        <div
          className="auth-page-switcher"
          onClick={() => navigate("/expert-login")}
        >
          Already have an account? Login
        </div>
      </div>
      {loader && <Loader message={loaderMessage}></Loader>}
    </div>
  );
};

export default ExpertSignUp;
