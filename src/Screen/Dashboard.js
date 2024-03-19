import React, { useContext, useEffect } from "react";
import Questions from "./Questions";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../bg4.jpeg";
import mainDashboardImage from "../bg3.jpeg";
import { useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ref, push, onValue, getDatabase, set } from "firebase/database";
import { app } from "../firebase";

const Dashboard = (props) => {
  const navigate = useNavigate();
  const flowRoute = [
    "introScreen",
    "moodTracker",
    "questions",
    "mainDashboard",
  ];
  const moodData = {
    anxious: "It is overwhelming to navigate GI problems and anxiety, but having support is consoling. Knowing you're not alone in the struggles you face gives you hope. Healing becomes an enjoyable journey with others when supported and resilient.",
    happy: "Happiness a state of joy, contentment, or satisfaction. It indicates that the individual is experiencing positive emotions and is generally pleased with their current circumstances or outlook on life. ",
    sad: "I am I'm depressed because of gastrointestinal and psychological problems. I can't quite put my finger on it, but they're both wearing me down. I'm looking for help to get by. Your comprehension is greatly appreciated.",
    angry: "My anger arises from both gastrointestinal and mental health struggles, a complex battle. Juggling physical discomfort and psychological strain, I seek understanding and support in navigating this challenge.",
  };
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const [currentScreen, setCurrentScreen] = useState(flowRoute[0]);
  const [localDataState, setLocalDataState] = useState(null);
  const [websiteData, setWebsiteData] = useState(null);
  const [expertList, setExpertList] = useState(null);
  const [backgroundImageState, setBackgroundImageState] =
    useState(backgroundImage);
  const authContext = useContext(AuthContext);
  const database = getDatabase(app);
  const [suggestedVideos, setSuggestedVideos] = useState([]);
  const [questionsSelectedState, setQuestionsSelectedState] = useState(null);

  const getSuggestedVideosList = () => {
    if (questionsSelectedState != null) {
      questionsSelectedState.map((questi) => {
        if (questi.isSelected) {
          console.log("THE QUESTO ", questi);
          setSuggestedVideos((prevSuggestedVideos) => [
            ...prevSuggestedVideos,
            ...questi.category,
          ]);
        }
      });
    } else {
      return;
    }
  };

  useEffect(() => {
    console.log("The suggested Videos ", suggestedVideos);
    const loca = authContext.getWebsiteState();
    if (loca.questionsSelected.length === 0) {
      authContext.setQuestionsList(suggestedVideos);
    } else {
      // setSuggestedVideos(loca.questionsSelected);
    }
  }, [suggestedVideos]);

  useEffect(() => {
    const loca = authContext.getWebsiteState();
    if (loca.questionsSelected.length > 0) {
      setSuggestedVideos(loca.questionsSelected);
    }
  }, []);

  const handleSubmit = () => {
    getSuggestedVideosList();
    const nextIndex = currentScreenIndex + 1;
    setCurrentScreenIndex(nextIndex);
    setCurrentScreen(flowRoute[nextIndex]);
  };

  useEffect(() => {
    if (currentScreen == "mainDashboard") {
      setBackgroundImageState(mainDashboardImage);
    }
    if (currentScreen === "mainDashboard") {
      setWebsiteData(authContext.getWebsiteState());
    }
  }, [currentScreen]);

  useEffect(() => {
    const expertLogsRef = ref(database, `expertlogs`);
    onValue(
      expertLogsRef,
      (snapshot) => {
        console.log("The Expert Logs ", snapshot.val());
        const list = snapshot.val();
        if (list) {
          const finalList = [];
          Object.values(list).map((value) => {
            finalList.push(value);
          });
          console.log("The final List ", finalList);
          setExpertList(finalList);
        }
      },
      []
    );
  }, []);

  useEffect(() => {
    console.log("DATA " + authContext.getWebsiteState());
    const localData = authContext.getWebsiteState();
    setLocalDataState(localData);
    console.log("THE LOCAL DATA ", localData.moodTracker);
    if (
      localData.moodTracker !== "" &&
      localData.questionsSelected.length >= 0
    ) {
      console.log("THE 8 HR Valdiatipon ", authContext.isEightHoursPassed());
      if (authContext.isEightHoursPassed()) {
        setCurrentScreen(flowRoute[0]);
      } else {
        setCurrentScreen(flowRoute[3]);
      }
    }
  }, []);

  function generateRandomAlphaNumeric(length) {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      result += charset.charAt(randomIndex);
    }
    return result;
  }

  const sendWhatsappMessage = (
    expertName,
    phoneNumber,
    userName,
    userAge,
    userGender
  ) => {
    fetch(
      "https://api.twilio.com/2010-04-01/Accounts/ACca983c05457a37a8c37a50e716c1c37c/Messages.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            btoa(
              "ACca983c05457a37a8c37a50e716c1c37c:ea2d3ccf51346237fe1c4d49fc099680"
            ),
        },
        body: new URLSearchParams({
          To: "whatsapp:+918438078754",
          From: "whatsapp:+14155238886",
          Body:
            "Hi " +
            expertName +
            "! You have a message from " +
            userName +
            " on Gastrointestinal Wellness Center\n\nUSER DETAILS\nAge: " +
            userAge +
            "\nGender:" +
            userGender,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  };

  const handleChat = (expert) => {
    console.log("THE EXPERT DETAILS ", expert);
    const username = localDataState.userData.name;
    const roomId = generateRandomAlphaNumeric(10);
    const expertChatLogsRef = ref(database, `expertlogs/${expert.name}/chats`);
    const chatUserData = {
      expertRequested: expert.name,
      requestedUsername: username,
      roomId,
      userAge: localDataState.userData.age,
      userGender: localDataState.userData.gender,
    };
    push(expertChatLogsRef, chatUserData);
    navigate(`/chat/${username}/${roomId}/${expert.name}`);
    sendWhatsappMessage(
      expert.name,
      expert.phone,
      username,
      localDataState.userData.age,
      localDataState.userData.gender
    );
  };

  const handleQuestionsChange = (questions) => {
    console.log("THE OARENT ", questions);
    setQuestionsSelectedState(questions);
  };
  return (
    <div
      className="dashboard-main-container"
      style={{ backgroundImage: `url(${backgroundImageState})` }}
    >
      {currentScreen !== "mainDashboard" && (
        <div className="form-flow-container">
          {currentScreen === "introScreen" && (
            <div>
              <div className="intoTitle">Welcome Aboard!</div>
              <div className="intoSubtitle">
                To better assist you, kindly provide insights into your current
                feelings. This helps tailor our solutions to your needs.
              </div>
            </div>
          )}
          {currentScreen === "moodTracker" && (
            <div className="mood-tracker-container">
              <div className="form-heading-text">
                1. What is your Mood Now ?
              </div>
              <div style={{ textAlign: "center" }}>
                Please click on the Emoji according to your current mood
              </div>
              <div className="mood-tracker-feeling-container">
                <div
                  className="mood-img-container"
                  onClick={() => {
                    handleSubmit();
                    authContext.setMoodTracker("happy");
                  }}
                >
                  <img src="./happy.png"></img>
                  Happy
                </div>
                <div
                  className="mood-img-container"
                  onClick={() => {
                    handleSubmit();
                    authContext.setMoodTracker("sad");
                  }}
                >
                  <img src="./sad.png"></img>
                  Sad
                </div>
                <div
                  className="mood-img-container"
                  onClick={() => {
                    handleSubmit();
                    authContext.setMoodTracker("angry");
                  }}
                >
                  <img src="./angry.png"></img>
                  Angry
                </div>
                <div
                  className="mood-img-container"
                  onClick={() => {
                    handleSubmit();
                    authContext.setMoodTracker("anxious");
                  }}
                >
                  <img src="./anxious.png"></img>
                  Anxious
                </div>
              </div>
            </div>
          )}
          {currentScreen === "questions" && (
            <div className="question-main-container">
              <div className="form-heading-text">2. Check the boxes!</div>
              <Questions updateQuestions={handleQuestionsChange}></Questions>
            </div>
          )}
          {currentScreen !== "moodTracker" && (
            <div className="homeButton" type="submit" onClick={handleSubmit}>
              NEXT
            </div>
          )}
        </div>
      )}
      {currentScreen === "mainDashboard" && (
        <div className="main-dashboard-layout">
          {websiteData && (
            <div className="main-dashboard-container">
              <div className="email-intro">
                Hello, {websiteData.userData.name}
              </div>
              <div className="analysis-report">
                Analysis Report Captured at:
                <strong>
                  {authContext.getDateFormat(localDataState.date)}
                </strong>
              </div>
              <div>{authContext.timeRemaining()}</div>
              <div style={{ marginBottom: "20px", fontStyle: "italic" }}>
                Note: Next Analysis Report to be captured after 8 hours
              </div>
              <div className="mood-card-dash">
                <div className="mood-img-container">
                  <img src={authContext.getMood().image}></img>
                  <div style={{ color: "#513d87", fontWeight: "600" }}>
                    {authContext.getMood().mood}
                  </div>
                </div>
                <div className="mood-desc">
                  {moodData[websiteData.moodTracker]}
                </div>
              </div>
              <div>
                <div className="video-suggessions">
                  Explore personalized videos tailored to your problems.
                </div>
                {suggestedVideos && (
                  <div
                    style={{ display: "flex", gap: "15px", overflow: "scroll" }}
                  >
                    {suggestedVideos.map((video, index) => {
                      return (
                        <div key={index}>
                          <iframe
                            width="200"
                            height="200"
                            src={video.link}
                          ></iframe>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
          {localDataState && (
            <div className="main-dashboard-container">
              <div className="analysis-report">
                Want to chat with our Experts?
              </div>
              <div style={{ marginBottom: "20px" }}>Online Experts</div>
              {expertList ? (
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {expertList.map((expert, index) => {
                    return (
                      <Card sx={{ maxWidth: 200, borderRadius: 2 }} key={index}>
                        <CardMedia
                          sx={{ height: 180 }}
                          image="/cn.jpeg"
                          title="green iguana"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            Dr {expert.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Expert in Mental Wellness
                          </Typography>
                          <div
                            className="expert-details"
                            color="text.secondary"
                          >
                            Gender: {expert.gender}
                          </div>
                          <div
                            className="expert-details"
                            color="text.secondary"
                          >
                            Age: {expert.age}
                          </div>
                        </CardContent>
                        <CardActions>
                          <Button
                            size="small"
                            onClick={() => {
                              // navigate("/chat/madhu/300/smita");
                              handleChat(expert);
                            }}
                          >
                            Chat With {expert.name}
                          </Button>
                        </CardActions>
                      </Card>
                    );
                  })}

                  {/* 
                <Card sx={{ maxWidth: 200 }}>
                  <CardMedia
                    sx={{ height: 100 }}
                    image="/expert.jpeg"
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Dr Nethra
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Expert in Mental Wellness
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => {
                        handleChat("Nethra");
                      }}
                    >
                      Chat With Nethra
                    </Button>
                  </CardActions>
                </Card> */}

                  {/* <Card sx={{ maxWidth: 200 }}>
                  <CardMedia
                    sx={{ height: 100 }}
                    image="/counselor.jpeg"
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Dr Shrithi
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Expert in Mental Wellness
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => {
                        handleChat("Shruthi");
                      }}
                    >
                      Chat With Shruthi
                    </Button>
                  </CardActions>
                </Card> */}
                </div>
              ) : (
                <div>Loading Available Experts....</div>
              )}

              <div>
                <div></div>
                <div></div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>

    // <div className="dashboard-main-container">
    //   <h1>Your Dashboard</h1>
    //   <div>
    //     <Questions></Questions>
    //   </div>
    //   <div>
    //     <h1>Chat with Counselors</h1>
    //     <div style={{ display: "flex", gap: "20px" }}>
    //       <Card sx={{ maxWidth: 345 }}>
    //         <CardMedia
    //           sx={{ height: 200 }}
    //           image="/counselor.jpeg"
    //           title="green iguana"
    //         />
    //         <CardContent>
    //           <Typography gutterBottom variant="h5" component="div">
    //             Dr Smita
    //           </Typography>
    //           <Typography variant="body2" color="text.secondary">
    //             Expert in Mental Wellness
    //           </Typography>
    //         </CardContent>
    //         <CardActions>
    //           <Button
    //             size="small"
    //             onClick={() => navigate("/chat/madhu/300/smita")}
    //           >
    //             Chat With Smita
    //           </Button>
    //         </CardActions>
    //       </Card>

    //       <Card sx={{ maxWidth: 345 }}>
    //         <CardMedia
    //           sx={{ height: 200 }}
    //           image="/expert.jpeg"
    //           title="green iguana"
    //         />
    //         <CardContent>
    //           <Typography gutterBottom variant="h5" component="div">
    //             Dr Nethra
    //           </Typography>
    //           <Typography variant="body2" color="text.secondary">
    //             Expert in Mental Wellness
    //           </Typography>
    //         </CardContent>
    //         <CardActions>
    //           <Button
    //             size="small"
    //             onClick={() => navigate("/chat/madhu/400/nethra")}
    //           >
    //             Chat With Nethra
    //           </Button>
    //         </CardActions>
    //       </Card>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Dashboard;
