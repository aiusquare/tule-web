import { useContext, useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBBtn,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDropdownToggle,
} from "mdb-react-ui-kit";
import { useRef } from "react";
import "firebase/compat/storage";
import "firebase/compat/database";
import { Alert, Snackbar, TextField } from "@mui/material";
import { ServiceComContext } from "../dashboard";
import { appMainColor, smsName } from "../../services/setup";

const ResultChecking = (props) => {
  const [init, setInit] = useState(false);
  const refExam = useRef(null);

  const exams = [
    { name: "WAEC", id: 1, amount: 2700 },
    { name: "NECO", id: 2, amount: 800 },
    { name: "NABTEB", id: 3, amount: 800 },
  ];

  const userId = localStorage.getItem("email");
  const userAgent = localStorage.getItem("agent");
  const userPin = localStorage.getItem("pin");

  const validateInput = () => {
    return true;
  };

  const [exam, setExam] = useState("");
  const [qauntity, setQuantity] = useState(0);
  const [recipient, setRecipientNumber] = useState("");

  const [submit, setSubmit] = useState(false);

  const [order, setOrder] = useState({});
  const [validity, setvalidity] = useState(false);
  const smsSender = smsName;

  useEffect(() => {
    if (!init) {
      setInit(true);
      return;
    }

    refExam.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });

  return (
    <div
      className="d-flex flex-column align-items-center mt-4"
      ref={refExam}
      style={{ padding: "30px" }}
    >
      <MDBCardBody>
        <MDBCardText>
          <h3>EXAMS PIN</h3>
        </MDBCardText>
      </MDBCardBody>

      <MDBCard className="center service-container shadow-2 m-2">
        <MDBDropdown>
          <MDBDropdownToggle
            style={{ background: appMainColor, color: "white" }}
          >
            EXAM TYPE
          </MDBDropdownToggle>
          <MDBDropdownMenu>
            {exams.map((e, index) => {
              return (
                <MDBDropdownItem
                  onClick={() => {
                    setExam(e.name);
                  }}
                  link
                  childTag="button"
                >
                  {e.name}
                </MDBDropdownItem>
              );
            })}
          </MDBDropdownMenu>
        </MDBDropdown>
        <MDBCardBody>
          <MDBCardText>{exam}</MDBCardText>
        </MDBCardBody>
      </MDBCard>

      <MDBCard className="shadow-2 service-container ">
        <TextField
          className="m-3 w-2"
          label="Quantity"
          type="text"
          InputProps={{
            inputProps: {
              style: { textAlign: "center" },
            },
          }}
          onBlur={(e) => {
            setQuantity(e.target.value);
          }}
        />
      </MDBCard>

      <MDBCard className="shadow-2 service-container ">
        <TextField
          className="m-3 w-2"
          label="Recipient Number(Optional)"
          type="text"
          InputProps={{
            inputProps: {
              style: { textAlign: "center" },
            },
          }}
          onBlur={(e) => {
            setRecipientNumber(e.target.value);
          }}
        />
      </MDBCard>
      <MDBBtn
        onClick={() => {
          if (validateInput()) {
            const orderReg = {};
            let confirmMsg =
              "You are about to subscribe for " +
              exam +
              " quantity: " +
              qauntity;
            setSubmit(true);
            setOrder({
              serviceType: "tvsubscription",
              order: orderReg,
              confirmMsg: confirmMsg,
            });
          } else {
            setvalidity(true);
          }
        }}
        className="m-2 button"
        style={{ background: appMainColor, color: "white" }}
      >
        SUBSCRIBE
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
};

export default ResultChecking;
