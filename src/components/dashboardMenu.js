import { Avatar } from "@mui/material";
import { Menu, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import userLogo from "../pictures/user_1.png";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ServiceComContext } from "./dashboard";

export default function SettingsMenu() {
  const navigate = useNavigate();
  const { agent } = useContext(ServiceComContext);

  return (
    <div>
      <Menu
        menuButton={
          <Avatar
            style={{ cursor: "pointer" }}
            sx={{ bgcolor: "#eeeff1" }}
            src={userLogo}
            aria-label="recipe"
          />
        }
        arrow={"arrow"}
        transition
      >
        {agent !== null && (
          <div
            style={{
              textAlign: "center",
              padding: "15px",
              color: "white",
              backgroundColor: "GrayText",
            }}
          >
            <b>Agent code: {agent}</b>
          </div>
        )}

        <MenuItem
          onClick={() => {
            navigate("settings");
          }}
        >
          <i class="fas fa-gear pe-2"></i>
          SETTINGS
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/");
          }}
        >
          <i class="fas fa-right-from-bracket pe-2"></i>
          LOGOUT
        </MenuItem>
      </Menu>
    </div>
  );
}
