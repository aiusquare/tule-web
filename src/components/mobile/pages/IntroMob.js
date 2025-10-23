import { Button } from "@mui/material";
import "./IntroMob.css";
import logo from "../../../pictures/logo.png";
import { useNavigate } from "react-router-dom";

const IntroMob = () => {
  const navigate = useNavigate();

  return (
    <div class="intro-mob">
      <div class="welcome-section">
        <span style={{ color: "white", fontWeight: 900, fontSize: "18px" }}>
          {/* Welcome to */}
        </span>
      </div>
      <div class="logo-section">
        <img id="lemon-img" loading="lazy" alt="logo" src={logo} />
      </div>
      <div class="short-note-section p-4">
        <span style={{ textAlign: "center", fontSize: "12px" }}>
          Your one-stop solution for all your data and airtime needs!
        </span>
      </div>
      <div class="bottom-section">
        <Button
          style={{ position: "absolute", bottom: "5%" }}
          variant="contained"
          sx={{
            textTransform: "none",
            color: "#fff",
            fontSize: "12",
            background: "#200647",
            borderRadius: "20px",
            "&:hover": { background: "#200647" },
            width: 196,
            height: 35,
          }}
          onClick={() => {
            localStorage.setItem("passedIntro", "yes"); // this will make sure that the window shos once on app installation

            navigate("/mob-login");
          }}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default IntroMob;
