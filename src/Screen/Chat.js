import React, { useState, useEffect } from "react";
import { ref, push, onValue, getDatabase } from "firebase/database";
import { app } from "../firebase";
import { useParams } from "react-router-dom";
import backgroundImage from "../bg4.jpeg";

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
    <div
      className="chat-main-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <h1>Chat with {expertName}</h1>
      <div className="chat-screen-container">
        {messages.map((message, index) => (
          <div key={index}>
            {message.username === username ? (
              <div className="selfTextContainer">
                <div className="selfChatBubbleContainer">
                  <div className="selfMessageContainer">{message.text}</div>

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
                  <div className="oppMessageContainer">{message.text}</div>
                </div>
              </div>
            )}
          </div>
        ))}
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
            <button className="attachButton">Attach File</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;
