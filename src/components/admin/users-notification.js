import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { MDBBtn, MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { appMainColor, baseApiUrl } from "../../services/setup";
import request from "superagent";
import { Toast } from "../alert";
import { loader } from "./alert";

export default function UsersNotification() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleSetNotification = async () => {
    const data = { message: message, type: messageType };

    loader({
      title: "Setting notification",
      text: "Please wait...",
    });

    await request
      .post(baseApiUrl + "admin/notifications/index.php")
      .type("application/json")
      .send(data)
      .then((response) => {
        Toast.fire({
          icon: "success",
          title: "Notification set successfully",
        });
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: err,
        });
      });
  };

  const handleDataFetch = async () => {
    await request
      .get(baseApiUrl + "admin/notifications/get/index.php")
      .then((response) => {
        const details = response.body;

        setMessage(details.message);
        setMessageType(details.type);
      })
      .catch((err) => {
        console.log("Error message:", err.response);
        console.log("ERROR", err);
      });
  };

  useEffect(() => {
    if (navigator.onLine) {
      handleDataFetch();
    }
  }, []);

  return (
    <div className="p-4">
      <div style={{ fontWeight: 700 }}>Users General Notification</div>
      <br /> <br />
      <MDBContainer>
        <MDBRow>
          <MDBCol>
            <FormControl className="w-50">
              <InputLabel>Message Type</InputLabel>
              <Select
                value={messageType}
                label="Choose Programme"
                onChange={(e) => {
                  setMessageType(e.target.value);
                }}
              >
                <MenuItem value="static">Static</MenuItem>
                <MenuItem value="one_time">One time</MenuItem>
              </Select>
            </FormControl>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>
            <TextField
              value={message}
              className=" w-50"
              variant="outlined"
              multiline
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>
            <MDBBtn
              style={{
                background: appMainColor,
              }}
              onClick={() => {
                handleSetNotification();
              }}
              className="p-2  m-2"
            >
              Set Notification
            </MDBBtn>

            <MDBBtn
              style={{
                background: appMainColor,
              }}
              className="p-2  m-2"
            >
              Clear
            </MDBBtn>
          </MDBCol>
          <MDBCol></MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
