import React from "react";
import Questions from "./Questions";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
const Dashboard = (props) => {
  const navigate = useNavigate();
  return (
    <div className="dashboard-main-container">
      <h1>Your Dashboard</h1>
      <div>
        <Questions></Questions>
      </div>
      <div>
        <h1>Chat with Counselors</h1>
        <div style={{ display: "flex", gap: "20px" }}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 200 }}
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

          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 200 }}
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
                onClick={() => navigate("/chat/madhu/400/nethra")}
              >
                Chat With Nethra
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
