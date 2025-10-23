import { useEffect, useState } from "react";
import { MDBCard, MDBCardBody, MDBCardText, MDBBtn } from "mdb-react-ui-kit";
import { useRef } from "react";
import "firebase/compat/storage";
import { firebase } from "../../services/config";
import "firebase/compat/database";
import { Alert, Snackbar, TextField } from "@mui/material";
import { useContext } from "react";
import { ServiceComContext } from "../dashboard";

const db = firebase.database();

export default function BulkSMSComponent() {
  const { uniqueId, userAgent } = useContext(ServiceComContext);
  const userId = uniqueId;
  const [sender, setSender] = useState("");
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");

  const [submit, setSubmit] = useState(false);

  const [init, setInit] = useState(false);
  const [order, setOrder] = useState({});
  const [validity, setvalidity] = useState(false);

  const refBuydata = useRef(null);

  useEffect(() => {
    if (!init) {
      refBuydata.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      setInit(true);
    }
  }, []);

  const validateInput = () => {
    if (sender === "") return false;
    if (recipient === "") return false;
    if (message === "") return false;

    return true;
  };

  return (
    <div
      className="d-flex flex-column align-items-center mt-4"
      ref={refBuydata}
      style={{ padding: "30px" }}
    >
      <MDBCardBody>
        <MDBCardText>
          <h3>BULK SMS</h3>
        </MDBCardText>
      </MDBCardBody>

      <MDBCard className="shadow-2 service-container ">
        <TextField
          className="m-3 w-2"
          label="SENDER"
          type="text"
          InputProps={{
            inputProps: {
              maxLength: 10,
              style: { textAlign: "center" },
            },
          }}
          onBlur={(e) => {
            setSender(e.target.value);
          }}
        />
      </MDBCard>
      <MDBCard className="shadow-2 service-container ">
        <TextField
          className="m-3 w-2"
          label="RECIPIENTS"
          type="text"
          InputProps={{
            inputProps: {
              style: { textAlign: "center" },
            },
          }}
          onBlur={(e) => {
            setRecipient(e.target.value);
          }}
          multiline
          minRows={2}
        />
      </MDBCard>
      <MDBCard className="shadow-2 service-container ">
        <TextField
          className="m-3 w-2"
          label="MESSAGE"
          type="text"
          InputProps={{
            inputProps: {
              style: { textAlign: "center" },
            },
          }}
          onBlur={(e) => {
            setMessage(e.target.value);
          }}
          multiline
          minRows={4}
        />
      </MDBCard>
      <MDBBtn
        onClick={() => {
          if (validateInput()) {
            const numberOfContacts = countPhoneNumbers(recipient);

            const orderReg = {
              message: message,
              sender: sender,
              recipient: recipient,
              userId: userId,
              userAgent: userAgent,
              amount: 2.5 * numberOfContacts,
              numCount: numberOfContacts,
            };

            let confirmMsg =
              "You are about to send BULK message to " +
              numberOfContacts +
              " varified phone numbers";

            setSubmit(true);
            setOrder({
              serviceType: "bulksms",
              order: orderReg,
              confirmMsg: confirmMsg,
            });
          } else {
            setvalidity(true);
          }
        }}
        className="m-2 button"
        size="lg"
      >
        SEND SMS
      </MDBBtn>
      <Snackbar
        open={validity}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        autoHideDuration={6000}
        onClose={() => {
          setvalidity(false);
        }}
      >
        <Alert severity="error" sx={4}>
          Invalid input please check.
        </Alert>
      </Snackbar>
    </div>
  );
}

function countPhoneNumbers(input) {
  // Remove any leading/trailing whitespace and split the input by comma
  const numbers = input.trim().split(",");

  // Count the valid phone numbers
  let count = 0;
  for (let i = 0; i < numbers.length; i++) {
    // Remove any whitespace from each number
    const phoneNumber = numbers[i].trim();

    // Validate the phone number using a regular expression
    const phoneRegex = /^\d{11}$/; // Assuming phone numbers have 10 digits
    if (phoneRegex.test(phoneNumber)) {
      count++;
    }
  }

  return count;
}
