// ChatButton.js
import React from "react";
import "./ChatButton.css"; // Import the CSS for styling
import { whatsappChat } from "../../../services/setup";

const ChatButton = () => {
  const openWhatsApp = () => {
    window.open(whatsappChat); // Replace with your WhatsApp number
  };

  return (
    <div className="chat-button">
      <button className="floating-btn" onClick={openWhatsApp}>
        <img
          src="https://img.icons8.com/color/48/000000/whatsapp.png" // WhatsApp-like icon
          alt="chat-icon"
          className="chat-icon"
        />
      </button>
    </div>
  );
};

export default ChatButton;
