import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Screen/Home";
import Dashboard from "./Screen/Dashboard";
import Login from "./Screen/Login";
import Questions from "./Screen/Questions";
import Chat from "./Screen/Chat";
import ChatFile from "./Screen/ChatFile";
import SignUp from "./Screen/SignUp";

function App() {
  return (
    <div className="App">
      <div className="header">
        <div className="logoDesign"></div>Gastrointestinal Wellness Center
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/questions" element={<Questions />} />
        <Route
          path="/chat/:chatUsername/:roomId/:expertName"
          element={<Chat />}
        />
        <Route path="/chatfile/:chatUsername/:roomId" element={<ChatFile />} />
      </Routes>
    </div>
  );
}

export default App;
