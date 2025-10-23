import { Button } from "@mui/material";
import PropTypes from "prop-types";
import "./Frame.css";

const Frame = ({ className = "" }) => {
  return (
    <section className={`frame13 ${className}`}>
      <Button
        className="button-container"
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
      >
        Get Started
      </Button>
      <div className="frame-wrapper">
        <div className="frame14">
          <div className="image-wrapper">
            <div className="image-placeholder" />
            <div className="frame15" />
            <div className="image-placeholder1" />
          </div>
        </div>
      </div>
    </section>
  );
};

Frame.propTypes = {
  className: PropTypes.string,
};

export default Frame;
