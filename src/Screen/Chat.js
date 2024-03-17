import React, { useState, useEffect } from "react";
import { ref, push, onValue, getDatabase } from "firebase/database";
import { app } from "../firebase";
import { useParams } from "react-router-dom";
import backgroundImage from "../bg4.jpeg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { storage } from "../firebase";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { v4 } from "uuid";

const Chat = (props) => {
  const { chatUsername, roomId, expertName } = useParams();
  const database = getDatabase(app);
  const messagesRef = ref(database, `chats/${roomId}`);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [username, setUsername] = useState("Guest");
  const [imageUpload, setImageUpload] = useState(null);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const notify = (message) =>
    toast(message, {
      position: "top-right",
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "dark",
    });

  useEffect(() => {
    setUsername(chatUsername);
    onValue(messagesRef, (snapshot) => {
      const messagesData = snapshot.val();
      if (messagesData) {
        const messagesArray = Object.values(messagesData);
        console.log("Messages Array ", messagesArray);

        setMessages(messagesArray);
      } else {
        setMessages([]);
      }
    });
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const newMessageData = {
      username,
      text: newMessage.trim(),
      type: "text",
    };

    push(messagesRef, newMessageData);
    setNewMessage("");
  };

  const pushImageToDatabase = (imageUrl) => {
    const newMessageDataWithImage = {
      username,
      text: newMessage.trim(),
      link: imageUrl,
      type: "image",
    };
    push(messagesRef, newMessageDataWithImage);
    setImageUpload(null);
    setNewMessage("");
  };

  const uploadImage = () => {
    if (imageUpload == null) {
      notify("Please Select an Image to Upload");
      return;
    } else {
      const imageStorageRef = storageRef(
        storage,
        `images/${imageUpload.name + v4()}`
      );
      uploadBytes(imageStorageRef, imageUpload)
        .then((snapshot) => {
          console.log("Image Uploaded ", snapshot);
          getDownloadURL(snapshot.ref).then((url) => {
            console.log("THE IMAGE URL ", url);
            pushImageToDatabase(url);
          });
        })
        .catch((e) => {
          console.log("Errir in  Uploading ", e);
        });
    }
  };
  return (
    <div
      className="chat-main-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <button className="homeButton" onClick={() => navigate("/dashboard")}>
        Go Back To Dashboard
      </button>
      <h1>Chat with {expertName}</h1>

      <div className="chat-screen-container">
        <div className="chat-bubble-container">
          {messages.map((message, index) => (
            <div key={index}>
              {message.username === username ? (
                <div className="selfTextContainer">
                  <div className="selfChatBubbleContainer">
                    <div className="selfMessageContainer">
                      {message.type === "image" && (
                        <img
                          style={{ width: "300px", height: "150px" }}
                          src={message.link}
                        ></img>
                      )}
                      <div> {message.text}</div>
                    </div>

                    <div className="nameContainerSelf">
                      {message.username[0].toUpperCase()}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="oppositeTextContainer">
                  <div className="oppositeChatBubbleContainer">
                    <div className="nameContainerOpposite">
                      {message.username[0].toUpperCase()}
                    </div>
                    <div className="oppMessageContainer">
                      {message.type === "image" && (
                        <img
                          style={{ width: "300px", height: "150px" }}
                          src={message.link}
                        ></img>
                      )}
                      <div> {message.text}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="chat-text-container">
          <form onSubmit={handleSendMessage}>
            <div className="inputContainer">
              <input
                className="sendTextInput"
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
              />
              <button className="sendButton" type="submit">
                Send
              </button>
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={(event) => {
                  setImageUpload(event.target.files[0]);
                }}
              ></input>
              <button className="attachButton" onClick={uploadImage}>
                Attach File
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
