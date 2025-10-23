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

const BuyElectricSubscription = () => {
  const [init, setInit] = useState(false);
  const refElectric = useRef(null);

  const discos = [
    { name: "Ikeja Electricity", planId: 1 },
    { name: "Eco Electricity", planId: 2 },
    { name: "Kano Electricity", planId: 3 },
    { name: "Port Harcourt Electricity", planId: 4 },
    { name: "Jos Electricity", planId: 5 },
    { name: "Ibadan Electricity", planId: 6 },
    { name: "Kaduna Electricity", planId: 7 },
    { name: "Abuja Electricity", planId: 8 },
    { name: "Benin Electricity", planId: 9 },
    { name: "Enugu Electricity", planId: 10 },
  ];
  const meterPlans = [
    { name: "Prepaid", id: "prepaid" },
    { name: "Postpaid", id: "postpaid" },
  ];

  const userId = localStorage.getItem("email");
  const userAgent = localStorage.getItem("agent");
  const userPin = localStorage.getItem("pin");

  const [disco, setDisco] = useState("");
  const [discoID, setDiscoID] = useState(0);
  const [meterType, setMeterType] = useState("");
  const [meterTypeId, setMeterTypeId] = useState("");
  const [meterNumber, setMeterNumber] = useState("");
  const [amount, setAmount] = useState(0);
  const [recipient, setRecipientNumber] = useState("");

  const [submit, setSubmit] = useState(false);

  const [order, setOrder] = useState({});
  const [validity, setvalidity] = useState(false);
  const smsSender = smsName;

  useEffect(() => {
    if (!init) {
      refElectric.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      setInit(true);
    }
  }, []);

  const validateInput = () => {
    if (discoID === 0) return false;
    if (meterNumber === "") return false;
    if (meterType === "") return false;
    if (amount === 0) return false;

    return true;
  };

  return (
    <div
      className="d-flex flex-column align-items-center mt-4"
      ref={refElectric}
      style={{ padding: "30px" }}
    >
      <MDBCardBody>
        <MDBCardText>
          <h3>Electricity Subscription</h3>
        </MDBCardText>
      </MDBCardBody>

      <MDBCard className="center service-container shadow-2 m-2">
        <MDBDropdown>
          <MDBDropdownToggle
            style={{ background: appMainColor, color: "white" }}
          >
            Disco Company
          </MDBDropdownToggle>
          <MDBDropdownMenu>
            {discos.map((e, index) => {
              return (
                <MDBDropdownItem
                  onClick={() => {
                    setDisco(e.name);
                    setDiscoID(e.planId);
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
          <MDBCardText>{disco}</MDBCardText>
        </MDBCardBody>
      </MDBCard>
      <MDBCard className="center service-container shadow-2 m-2">
        <MDBDropdown>
          <MDBDropdownToggle
            style={{ background: appMainColor, color: "white" }}
          >
            Meter type
          </MDBDropdownToggle>
          <MDBDropdownMenu>
            {meterPlans.map((e, index) => {
              return (
                <MDBDropdownItem
                  onClick={() => {
                    setMeterType(e.name);
                    setMeterTypeId(e.id);
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
          <MDBCardText>{meterType}</MDBCardText>
        </MDBCardBody>
      </MDBCard>
      <MDBCard className="shadow-2 service-container ">
        <TextField
          className="m-3 w-2"
          label="Meter Number"
          type="number"
          InputProps={{
            inputProps: {
              style: { textAlign: "center" },
            },
          }}
          onBlur={(e) => {
            setMeterNumber(e.target.value);
          }}
        />
      </MDBCard>
      <MDBCard className="shadow-2 service-container ">
        <TextField
          className="m-3 w-2"
          label="Amount"
          type="number"
          InputProps={{
            inputProps: {
              style: { textAlign: "center" },
            },
          }}
          onBlur={(e) => {
            setAmount(e.target.value);
          }}
        />
      </MDBCard>
      <MDBCard className="shadow-2 service-container ">
        <TextField
          className="m-3 w-2"
          label="Recepient number"
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
            const uniqueOrderID = Math.floor(Date.now() / 1000);
            const orderReg = {
              disco: discoID,
              meterNumber: meterNumber,
              meterType: meterTypeId,
              amount: Number(amount),
              userId: userId,
              userAgent: userAgent,
              recipient: recipient,
              smsSender: smsSender,
              orderId: "" + uniqueOrderID,
            };
            let confirmMsg =
              "You are about to subscribe for N" +
              amount +
              " Electric bill to meter number " +
              meterNumber;
            setSubmit(true);
            setOrder({
              serviceType: "electricity",
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

export default BuyElectricSubscription;
