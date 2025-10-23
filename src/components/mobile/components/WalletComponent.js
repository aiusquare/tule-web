import { Button } from "@mui/material";
import "./WalletComponent.css";
import { useNavigate } from "react-router-dom";
import { MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import { useState } from "react";

const WalletComponent = (props) => {
  const navigate = useNavigate();
  const [eyeToggle, setEyeToggle] = useState(false); // Initialize eyeToggle state

  const toggleEye = () => {
    setEyeToggle(!eyeToggle); // Toggle the eye state
  };

  return (
    <MDBContainer className="h-100">
      <div className="wallet-container">
        <div style={{ float: "left" }}>
          <div className="wallet-info">
            <b>Your Tule Data</b>
            <br />
            <br />
          </div>
        </div>
        <div className="balance-wrapper">
          <div className="wallet-balance-label">Wallet Balance</div>
          <div className="balance-amount">
            <MDBIcon
              style={{ cursor: "pointer" }}
              className="mx-1"
              far
              icon={eyeToggle ? "eye" : "eye-slash"} // Show either eye or eye-slash icon
              onClick={toggleEye} // Toggle eye on click
            />
            {eyeToggle ? `N ${props.balance}` : "******"}{" "}
            {/* Show balance or hidden */}
          </div>
        </div>

        <div className="action-buttons-wrapper">
          <div className="action-buttons">
            <Button
              className="fund-wallet-button"
              variant="contained"
              sx={buttonStyles}
              onClick={props.getFunding}
            >
              Fund Wallet
            </Button>
            <Button
              className="view-transactions-button"
              variant="contained"
              sx={buttonStyles}
              onClick={() => navigate("/mob-transactions")}
            >
              View Transactions
            </Button>
          </div>
        </div>
      </div>
    </MDBContainer>
  );
};

export default WalletComponent;

const buttonStyles = {
  textTransform: "none",
  color: "#fff",
  fontSize: "9px",
  background: "#200647",
  borderRadius: "5px",
  "&:hover": { background: "#200647" },
  width: "100%", // Ensures the button takes up full width
  margin: "0 5px",
};
