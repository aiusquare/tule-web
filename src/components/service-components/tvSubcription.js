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
import { appMainColor, smsName } from "../../services/setup";

const TvSubcription = (props) => {
  const [init, setInit] = useState(false);
  const refElectric = useRef(null);

  const cableCompanys = [
    { name: "DSTV", id: 2 },
    { name: "GOTV", id: 1 },
    { name: "STARTIME", id: 3 },
  ];

  const meterPlans = [
    { name: "Prepaid", id: "prepaid" },
    { name: "Postpaid", id: "postpaid" },
  ];
  const userId = props.userId;
  const [cableCompany, setCableCompany] = useState("");
  const [cableCompanyID, setCableCompanyID] = useState(0);
  const [subPlan, setSubPlan] = useState("");
  const [subPlanID, setSubPlanID] = useState(0);
  const [iucNumber, setIucNumber] = useState(0);
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

    refElectric.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [init]);

  const validateInput = () => {
    if (cableCompany === 0) return false;
    if (subPlanID === 0) return false;
    if (iucNumber === "") return false;

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
          <h3>TV Subscription</h3>
        </MDBCardText>
      </MDBCardBody>

      <MDBCard className="center service-container shadow-2 m-2">
        <MDBDropdown>
          <MDBDropdownToggle
            style={{ background: appMainColor, color: "white" }}
          >
            Cable Company
          </MDBDropdownToggle>
          <MDBDropdownMenu>
            {cableCompanys.map((e, index) => {
              return (
                <MDBDropdownItem
                  onClick={() => {
                    setCableCompany(e.name);
                    setCableCompanyID(e.id);
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
          <MDBCardText>{cableCompany}</MDBCardText>
        </MDBCardBody>
      </MDBCard>
      <MDBCard className="center service-container shadow-2 m-2">
        <MDBDropdown>
          <MDBDropdownToggle
            style={{ background: appMainColor, color: "white" }}
          >
            Sub plan
          </MDBDropdownToggle>
          <MDBDropdownMenu>
            {meterPlans.map((e, index) => {
              return (
                <MDBDropdownItem
                  onClick={() => {
                    setSubPlan(e.name);
                    setSubPlanID(e.id);
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
          <MDBCardText>{subPlan}</MDBCardText>
        </MDBCardBody>
      </MDBCard>
      <MDBCard className="shadow-2 service-container ">
        <TextField
          className="m-3 w-2"
          label="IUC Number"
          type="text"
          InputProps={{
            inputProps: {
              style: { textAlign: "center" },
            },
          }}
          onBlur={(e) => {
            setIucNumber(e.target.value);
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
            const orderReg = {
              iucNumber: iucNumber,
              subPlan: subPlanID,
              cableCompany: cableCompanyID,
              userId: userId,
              recipient: recipient,
              smsSender: smsSender,
            };
            let confirmMsg =
              "You are about to subscribe for " +
              cableCompany +
              " IUC Number: " +
              iucNumber;
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

export default TvSubcription;
