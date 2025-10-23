import React from "react";
import { Navigate } from "react-router-dom";

// Helper function to calculate time remaining
const calculateTimeRemaining = (lastActivityTime) => {
  const now = Date.now();
  const lastActivity = lastActivityTime ? parseInt(lastActivityTime, 10) : now;
  const elapsed = now - lastActivity;
  const timeRemaining = 30 * 60 * 1000 - elapsed; // 30 minutes in milliseconds

  return timeRemaining > 0 ? timeRemaining : 0;
};

const ProtectedMobRoute = ({ children }) => {
  const lastActivityTime = localStorage.getItem("lastActivityTime");
  const userEmail = localStorage.getItem("email");

  const timeRemaining = calculateTimeRemaining(lastActivityTime);

  console.log("TIME REMAINING", timeRemaining);

  if (timeRemaining !== 0 && userEmail) {
    return children;
  } else {
    localStorage.clear(); //clear everything

    return <Navigate to={"/mob-login"} replace />;
  }
};

export default ProtectedMobRoute;
