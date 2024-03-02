import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";
import { Button, TextField } from "@mui/material";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("Logged IN");
        navigate("/dashboard");
      })
      .catch((e) => {
        console.log("ERROR");
      });
  };
  return (
    <div className="login-main-container">
      <div>
        <img className="login-image" src="/hero.jpeg"></img>
      </div>
      <form>
        <div className="login-form-container">
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
          <div className="homeButton" type="submit" onClick={handleSubmit}>
            Login
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const auth = getAuth(app);
//     signInWithEmailAndPassword(auth, email, password)
//   .then(console.log("LOGGEDIN IN"))
//   .catch(console.log("ERROR"));
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default Login;
