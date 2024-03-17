import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ref, push, onValue, getDatabase } from "firebase/database";

import backgroundImage from "../bg.jpeg";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { storage } from "../firebase";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { v4 } from "uuid";

// Assuming Firebase is correctly configured and imported
import { app } from "../firebase";
import { toast } from "react-toastify";

const ChatFile = () => {
  const { chatUsername, roomId } = useParams();
  const database = getDatabase(app);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [username, setUsername] = useState("Guest");
  const authContext = useContext(AuthContext);
  const [imageUpload, setImageUpload] = useState(null);
  const [file, setFile] = useState(null);

  const messagesRef = ref(database, `chats/${roomId}`);
  const storagePath = `images`;
  const navigate = useNavigate();
  useEffect(() => {
    setUsername(chatUsername);

    onValue(messagesRef, (snapshot) => {
      const messagesData = snapshot.val();
      if (messagesData) {
        setMessages(Object.values(messagesData) || []);
      } else {
        setMessages([]);
      }
    });
  }, []);

  const notify = (message) =>
    toast(message, {
      position: "top-right",
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "dark",
    });

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const localData = authContext.getWebsiteState();
    const name = localData.userData.name;
    if (newMessage.trim() === "") return;

    const newMessageData = {
      username: name,
      text: newMessage.trim(),
      type: "text",
    };

    push(messagesRef, newMessageData);
    setNewMessage("");

    // e.preventDefault();
    // const localData = authContext.getWebsiteState();
    // const name = localData.userData.name;
    // if (file) {
    //   try {
    //     const storage = getStorage();
    //     const imageRef = ref(storage, storagePath);
    //     const uploadTask = uploadBytes(imageRef, file);

    //     const snapshot = await uploadTask;
    //     const fileURL = await getDownloadURL(snapshot.ref);

    //     const imageMessage = { username, image: fileURL };
    //     push(messagesRef, imageMessage);
    //     setFile(null);
    //   } catch (error) {
    //     console.error("Error uploading image:", error);
    //     // Handle error gracefully, e.g., display an error message to the user
    //   }
    // } else if (newMessage.trim()) {
    //   const textMessage = { username: name, text: newMessage.trim() };
    //   push(messagesRef, textMessage);
    // }

    // setNewMessage("");
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const pushImageToDatabase = (imageUrl) => {
    const localData = authContext.getWebsiteState();
    const name = localData.userData.name;
    const newMessageDataWithImage = {
      username: name,
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
      <button
        className="homeButton"
        onClick={() => navigate("/expert-chat-list")}
      >
        Go Back To Chats
      </button>
      <h1 style={{ color: "#fff" }}>Chat with {username}</h1>
      <div className="chat-screen-container">
        <div className="chat-bubble-container">
          {messages.map((message, index) => (
            <div key={index}>
              {message.username !== username ? (
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

        {/* <form onSubmit={handleSendMessage}>
          <div className="inputContainer">
            <input
              className="sendTextInput"
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <input type="file" onChange={handleFileChange} />
            <button className="sendButton" type="submit">
              Send
            </button>
          </div>
        </form> */}
      </div>
    </div>
  );
};

export default ChatFile;
