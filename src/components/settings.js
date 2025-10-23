import { Alert, Snackbar, TextField } from "@mui/material";
import { MDBCard, MDBCardBody, MDBCardText, MDBBtn } from "mdb-react-ui-kit";
import { useState, useRef, useEffect, useContext } from "react";
import { ServiceComContext } from "./dashboard";
import { Navigate } from "react-router-dom";

export default function Settings() {
  const { uniqueId } = useContext(ServiceComContext);
  const userId = uniqueId;
  const [businessName, setBusinessName] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [businessContact, setBusinessContact] = useState("");

  const settingsRef = useRef(null);

  useEffect(() => {
    settingsRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });

  return (
    <div
      className="m-4 d-flex flex-column align-items-center"
      ref={settingsRef}
    >
      <MDBCardBody>
        <MDBCardText>
          <h3>SETTINGS</h3>
        </MDBCardText>
      </MDBCardBody>

      <MDBCard className="shadow-2 center service-container m-2">
        <div>
          <b>{businessName}</b>
        </div>
        <TextField
          className="m-1 w-100"
          onBlur={(e) => {
            let text = e.target.value;
          }}
          label="Edit Bussiness Name here..."
          type="text"
          InputProps={{
            inputProps: {
              maxLength: 10,
              style: { textAlign: "center" },
            },
          }}
          helperText="We use business name for data card and sms services we render to your customers."
        />
      </MDBCard>

      <MDBCard className="shadow-2 center service-container">
        <div>
          <b>{businessDescription}</b>
        </div>
        <TextField
          className="m-1 w-100"
          onBlur={(e) => {
            let text = e.target.value;
          }}
          label="Edit business description here..."
          error={false}
          type="text"
          InputProps={{
            inputProps: {
              style: { textAlign: "center" },
            },
          }}
          helperText="E.g We sale Data, Airtime, Electricity, Utility ETC."
        />
      </MDBCard>

      <MDBCard className="shadow-2 center service-container">
        <div>
          <b>{businessContact}</b>
        </div>
        <TextField
          className="m-1 w-100"
          onBlur={(e) => {
            let text = e.target.value;
          }}
          label="Edit business contact here..."
          error={false}
          type="text"
          InputProps={{
            inputProps: {
              style: { textAlign: "center" },
            },
          }}
          helperText="Your phone number, which will be used by your customers to contact you"
        />
      </MDBCard>

      <MDBBtn
        onClick={() => {
          Navigate("");
        }}
        className="m-2"
        size="lg"
      >
        DONE
      </MDBBtn>
    </div>
  );
}
