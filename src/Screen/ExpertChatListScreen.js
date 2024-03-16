import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";

import { ref, push, onValue, getDatabase } from "firebase/database";
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
  uploadBytes,
} from "@firebase/storage";
import backgroundImage from "../cn.jpeg";
import { AuthContext } from "../Context/AuthContext";

const ExpertChatListScreen = (props) => {
  const authContext = useContext(AuthContext);
  const database = getDatabase(app);
  const [expertChatList, setExpertChatList] = useState(null);
  const [localDataState, setLocalDataState] = useState(null);
  const [message, setMessage] = useState("Searching For Chats");
  const navigate = useNavigate();

  useEffect(() => {
    const localData = authContext.getWebsiteState();
    const name = localData.userData.name;
    setLocalDataState(localData);
    const expertListRef = ref(database, `expertlogs/${name}`);
    onValue(expertListRef, (snapshot) => {
      console.log("The Expert Logs ", snapshot.val());
      const experData = snapshot.val();
      if (experData.chats) {
        const list = experData.chats;
        const chatList = [];
        Object.values(list).map((value) => {
          chatList.push(value);
        });
        console.log("THE EXPERETS CXHATS ", chatList);
        setMessage(chatList.length + " Chat found");
        setExpertChatList(chatList);
      } else {
        setMessage("No Chats Found!!!");
      }
    });
  }, []);

  const handleOpenChat = (chatData) => {
    console.log("THE SELECTED CHAT ", chatData);
    const roomId = chatData.roomId;
    const expertUserName = chatData.expertRequested;
    const userName = chatData.requestedUsername;
    navigate("/chatfile/" + userName + "/" + roomId);
  };
  return (
    <div
      className="chat-main-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {localDataState && (
        <div className="expert-chat-list-container">
          <div style={{ fontSize: "28px" }}>
            Welcome Counsellor <strong>{localDataState.userData.name}</strong>
          </div>
          <div className="expert-chat-container">
            <div style={{ textAlign: "center", fontSize: "24px" }}>
              My Chats
            </div>
            <div>{message}</div>
            {expertChatList && (
              <div>
                {expertChatList.map((chatData) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <div
                        className="chat-list-container"
                        onClick={() => {
                          handleOpenChat(chatData);
                        }}
                      >
                        <div className="chat-list-bullet">
                          {chatData.requestedUsername[0]}
                        </div>
                        <div>
                          <div style={{ fontWeight: "700" }}>
                            Name: {chatData.requestedUsername}
                          </div>
                          <div
                            style={{
                              fontStyle: "italic",
                              fontSize: "13px",
                              marginTop: "5px",
                            }}
                          >
                            Age: {chatData.userAge}
                          </div>
                          <div
                            style={{ fontStyle: "italic", fontSize: "13px" }}
                          >
                            Gender: {chatData.userGender}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpertChatListScreen;
