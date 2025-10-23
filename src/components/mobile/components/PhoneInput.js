import React, { useEffect, useState, useCallback } from "react";
import contactIcon from "../../../pictures/contact_book_2.png";

const PhoneNumberInput = (props) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  // Define normalizePhoneNumber inside the component
  const normalizePhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return "";
    let cleaned = phoneNumber.trim();
    // If the number starts with a plus, keep it for now and remove non-digits
    if (cleaned.startsWith("+")) {
      cleaned = "+" + cleaned.substring(1).replace(/[^0-9]/g, "");
    } else {
      cleaned = cleaned.replace(/[^0-9]/g, "");
    }
    // Remove any remaining plus sign for processing
    if (cleaned.startsWith("+")) {
      cleaned = cleaned.substring(1);
    }
    // If the number starts with Nigeria's country code "234", replace it with "0"
    if (cleaned.startsWith("234")) {
      const remainder = cleaned.substring(3);
      cleaned = !remainder.startsWith("0") ? "0" + remainder : remainder;
    }
    return cleaned;
  };

  const handleContactResult = (phoneNumber) => {
    setPhoneNumber(phoneNumber);
    props.setPhoneNumber(phoneNumber);
  };

  useEffect(() => {
    window.addEventListener("message", (event) => {
      handleContactResult(event.data);
    });

    return () => {
      window.removeEventListener("message", () => {});
    };
  }, []);

  const handleIconClick = () => {
    if (window.AndroidInterface?.triggerContactPicker) {
      window.AndroidInterface.triggerContactPicker();
    } else {
      console.error("AndroidInterface not available");
    }
  };

  const handleBlur = (e) => {
    const normalized = normalizePhoneNumber(e.target.value);
    setPhoneNumber(normalized);
    props.setPhoneNumber(phoneNumber);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <input
        type="tel"
        value={phoneNumber}
        onChange={handleBlur}
        onBlur={handleBlur}
        placeholder="Enter phone number"
        style={{ flex: 1, padding: "8px" }}
      />

      <button
        onClick={handleIconClick}
        style={{
          marginLeft: "8px",
          marginRight: "8px",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "4px",
        }}
        aria-label="Pick contact"
      >
        <img
          src={contactIcon}
          alt="Pick contact"
          style={{ width: "24px", height: "24px" }}
        />
      </button>
    </div>
  );
};

export default PhoneNumberInput;
