import React, { useState, useEffect } from "react";
import Landhome from "./landhome";
import IntroMob from "./mobile/pages/IntroMob";
import { Navigate } from "react-router-dom";

const ResponsiveManager = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (windowWidth >= 1024) {
    return <Landhome />;
  } else {
    const passedIntro = localStorage.getItem("passedIntro");
    if (passedIntro === "yes") {
      return <Navigate to={"/mob-login"} replace />;
    } else {
      return <IntroMob />;
    }
  }
};

export default ResponsiveManager;
