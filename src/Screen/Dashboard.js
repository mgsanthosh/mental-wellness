import React, { useEffect } from "react";
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

const Dashboard = (props) => {
  const navigate = useNavigate();
  const flowRoute = [
    "introScreen",
    "moodTracker",
    "questions",
    "mainDashboard",
  ];
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const [currentScreen, setCurrentScreen] = useState(flowRoute[0]);
  const handleSubmit = () => {
    const nextIndex = currentScreenIndex + 1;
    setCurrentScreenIndex(nextIndex);
    setCurrentScreen(flowRoute[nextIndex]);
  };
  const [backgroundImageState, setBackgroundImageState] =
    useState(backgroundImage);

  useEffect(() => {
    if (currentScreen == "mainDashboard") {
      setBackgroundImageState(mainDashboardImage);
    }
  }, [currentScreen]);
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
              <div className="mood-tracker-feeling-container">
                <div className="mood-img-container">
                  <img src="./happy.png"></img>
                  Happy
                </div>
                <div className="mood-img-container">
                  <img src="./sad.png"></img>
                  Sad
                </div>
                <div className="mood-img-container">
                  <img src="./angry.png"></img>
                  Angry
                </div>
                <div className="mood-img-container">
                  <img src="./anxious.png"></img>
                  Angry
                </div>
              </div>
            </div>
          )}
          {currentScreen === "questions" && (
            <div className="question-main-container">
              <div className="form-heading-text">2. Check the boxes!</div>
              <Questions></Questions>
            </div>
          )}
          <div className="homeButton" type="submit" onClick={handleSubmit}>
            NEXT
          </div>
        </div>
      )}
      {currentScreen === "mainDashboard" && (
        <div className="main-dashboard-layout">
          <div className="main-dashboard-container">
            <div className="email-intro">Hello, madhu@gmail.com</div>
            <div className="analysis-report">
              Analysis Report Captured at: <strong>1.45PM</strong>
            </div>
            <div style={{ marginBottom: "20px", fontStyle: "italic" }}>
              Note: Next Analysis Report to be captured after 8 hours
            </div>
            <div className="mood-card-dash">
              <div className="mood-img-container">
                <img src="./sad.png"></img>
                Sad
              </div>
              <div className="mood-desc">
                Feeling sad can indeed be difficult, as it encompasses a range
                of emotions that can weigh heavily on one's mind and spirit. It
                may stem from various sources, such as personal challenges,
                setbacks, or even just a general sense of melancholy. Sharing
                these feelings can be a vital step toward finding relief and
                support.
              </div>
            </div>
            <div>
              <div className="video-suggessions">
                Explore personalized videos tailored to your problems.
              </div>
              <div style={{ display: "flex", gap: "15px" }}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="iframe"
                    height="140"
                    image={`https://youtu.be/hJbRpHZr_d0?si=7_MVFUSNHe_0CF2u`}
                    title="Yoga for Anxiety and Stress"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      "Yoga for Anxiety and Stress"
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      "Practise your Yoga Sessions Here"
                    </Typography>
                  </CardContent>
                </Card>

                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="iframe"
                    height="140"
                    image={`https://youtu.be/hJbRpHZr_d0?si=7_MVFUSNHe_0CF2u`}
                    title="10 minute super deep Meditaion Music"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      "10 minute super deep Meditaion Music"
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      "Enjoy free 10 minutes music"
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          <div className="main-dashboard-container">
            <div className="analysis-report">
              Want to chat with our Experts?
            </div>
            <div style={{ marginBottom: "20px" }}>Online Experts</div>
            <div style={{ display: "flex", gap: "20px" }}>
              <Card sx={{ maxWidth: 200 }}>
                <CardMedia
                  sx={{ height: 100 }}
                  image="/counselor.jpeg"
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Dr Smita
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Expert in Mental Wellness
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => navigate("/chat/madhu/300/smita")}
                  >
                    Chat With Smita
                  </Button>
                </CardActions>
              </Card>

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
                    onClick={() => navigate("/chat/madhu/300/smita")}
                  >
                    Chat With Nethra
                  </Button>
                </CardActions>
              </Card>

              <Card sx={{ maxWidth: 200 }}>
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
                    onClick={() => navigate("/chat/madhu/300/smita")}
                  >
                    Chat With Shrithi
                  </Button>
                </CardActions>
              </Card>
            </div>

            <div>
              <div></div>
              <div></div>
            </div>
          </div>
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
