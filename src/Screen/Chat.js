import React, { useState, useEffect } from "react";
import { ref, push, onValue, getDatabase } from "firebase/database";
import { app } from "../firebase";
import { useParams } from "react-router-dom";

const Chat = (props) => {
  const { chatUsername, roomId, expertName } = useParams();
  const database = getDatabase(app);
  const messagesRef = ref(database, `chats/${roomId}`);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [username, setUsername] = useState("Guest");

  useEffect(() => {
    setUsername(chatUsername);
    onValue(messagesRef, (snapshot) => {
      const messagesData = snapshot.val();
      if (messagesData) {
        const messagesArray = Object.values(messagesData);
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
    };

    push(messagesRef, newMessageData);
    setNewMessage("");
  };
  return (
    <div>
      <h2>Chat with {username}</h2>
      <div
        style={{
          height: "300px",
          border: "1px solid #ccc",
          overflowY: "scroll",
        }}
      >
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.username}:</strong> {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
      <footer>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            window.open(
              "http://localhost:3000/chatfile/" + expertName + "/" + roomId
            );
          }}
        >
          Open Expert Chat Page
        </div>
      </footer>
    </div>
  );
};

export default Chat;
