import { Button } from "@mui/material";
import "./DashboardHeader.css";
import moonIcn from "../../../pictures/sun_2.png";
import sun from "../../../pictures/sun_2.png";
import moon from "../../../pictures/half_moon.png";
import profileIcn from "../../../pictures/user_1.png";
import notifIcon from "../../../pictures/alarm.png";
import { MDBContainer } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardComponent = () => {
  const userName = localStorage.getItem("userName") || "User";
  const navigate = useNavigate();

  return (
    <div id="header-container">
      <MDBContainer className="d-flex justify-content-between align-items-center">
        <div className="header-icon-container">
          <img
            className="header-icons"
            loading="lazy"
            alt="Profile Icon"
            src={profileIcn}
            onClick={() => {
              navigate("/mob-profile");
            }}
          />
        </div>

        {/* Greetings and Moon Icon */}
        <div id="greetings" className="d-flex flex-column align-items-center">
          <UserGreatings />
          <div style={{ fontWeight: "bolder" }}>{userName}</div>
        </div>

        {/* Notification Icon */}
        <div className="header-icon-container">
          <img
            className="header-icons"
            loading="lazy"
            alt="Notification Icon"
            src={notifIcon}
          />
        </div>
      </MDBContainer>
    </div>
  );
};

const UserGreatings = () => {
  const [greating, setGreating] = useState("");
  const [greatingIcon, setGreatingIcon] = useState(sun);

  useEffect(() => {
    const date = new Date();
    const formatter = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
      timeZone: "Africa/Lagos", // Set the time zone to Lagos
    });
    const time = formatter.format(date).split(" ")[1];
    const hour = formatter.format(date).split(" ")[0];
    const hourVal = parseInt(hour);

    let greeting = "";
    if (hourVal >= 5 && hourVal < 12 && time === "AM") {
      greeting = "Good Morning";
    } else if (
      (hourVal >= 1 && hourVal < 5 && time === "PM") ||
      hourVal === 12
    ) {
      greeting = "Good Afternoon";
      setGreatingIcon(moon);
    } else {
      greeting = "Good Evening";
      setGreatingIcon(moon);
    }

    setGreating(greeting);
  });

  return (
    <div className="horizontal-align">
      <span style={{ fontSize: "small" }}>{greating}</span>
      <img
        className="moon-and-stars"
        loading="lazy"
        alt="Moon Icon"
        src={greatingIcon}
      />
    </div>
  );
};

export default DashboardComponent;
