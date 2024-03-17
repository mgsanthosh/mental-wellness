import React, { useContext, useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";
import { Button, TextField } from "@mui/material";
import backgroundImage from "../bg.jpeg";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";
import { ref, push, onValue, getDatabase, set } from "firebase/database";
import { signOut } from "firebase/auth";
import Loader from "./Loader";

const ExpertLogin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
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

  useEffect(() => {
    authContext.cleanLocalStorage();
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        notify("ERROR LOGOUT");
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    setLoader(true);
    setLoaderMessage("Logging In...");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log("Logged IN ", userCredentials.user.uid);
        const loginRef = ref(database, `userData/${userCredentials.user.uid}`);
        setLoaderMessage("Fetching User Details...");
        onValue(loginRef, (snapshot) => {
          let messagesData = snapshot.val();
          if (messagesData) {
            console.log("THE MESSAGES DATA ", messagesData);
            messagesData = { ...messagesData };
            messagesData.uid = userCredentials.user.uid;
            authContext.setUserInformation(messagesData);
            notify("Logged In Successfully");
            setLoader(false);
            navigate("/expert-chat-list");
          } else {
            console.log("ERROR ");
            notify("USER DATA NOT FOUND");
            setLoader(false);
          }
        });
      })
      .catch((e) => {
        notify("Error " + e.message);
        console.log("ERROR");
        setLoader(false);
      });
  };
  return (
    <div
      className="login-main-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="login-form-container">
        <div className="login-form-heading">Counsellor Login</div>

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

        <div className="homeButton" type="submit" onClick={handleSubmit}>
          Login
        </div>
        <div>or</div>
        <div
          className="auth-page-switcher"
          onClick={() => navigate("/expert-signup")}
        >
          New User? Sign Up
        </div>
      </div>
      {loader && <Loader message={loaderMessage}></Loader>}
    </div>
  );
};

export default ExpertLogin;
