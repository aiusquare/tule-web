import { Alert, Snackbar, TextField } from "@mui/material";
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDropdownToggle,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBBtn,
} from "mdb-react-ui-kit";
import request from "superagent";
import withReactContent from "sweetalert2-react-content";
import { useState, useRef, useEffect, useContext } from "react";
import { ServiceComContext } from "../dashboard";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { appMainColor, baseApiUrl } from "../../services/setup";
import PhoneNumberInput from "../mobile/components/PhoneInput";

export default function BuyAirtimeComponent() {
  const data = [
    { network: "MTN", plan: ["VTU", "Awoof", "Share and sale"], id: 1 },
    { network: "AIRTEL", plan: ["VTU"], id: 4 },
    { network: "GLO", plan: ["VTU"], id: 2 },
    { network: "9MOBILE", plan: ["VTU"], id: 3 },
  ];

  const userId = localStorage.getItem("email");
  const userAgent = localStorage.getItem("agent");
  const userPin = localStorage.getItem("pin");

  const navigate = useNavigate();

  const [network, setNetwork] = useState(data[0].network);
  const [networkId, setNetworkId] = useState(data[0].id);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState(0);
  const [plans, setPlans] = useState(data[0].plan);
  const [plan, setPlan] = useState(data[0].plan[0]);
  const refBuyAirtime = useRef(null);
  const [init, setInit] = useState(false);
  const [validity, setvalidity] = useState(false);
  const [portedNumber, setPortedNumber] = useState(false);

  const handleBuyAirtime = () => {
    withReactContent(Swal).fire({
      title: "Enter your Pin",
      html:
        "You are about to send NGN" +
        amount +
        " " +
        "Airtime" +
        " to " +
        phoneNumber,
      input: "password",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#d33",
      preConfirm: () => {
        if (Swal.getInput().value === userPin) {
          Swal.fire({
            title: "Processing...",
            html: "Please wait while we process your transaction",
            allowOutsideClick: false,
            allowEscapeKey: false,
            timerProgressBar: false,
            didOpen: async () => {
              Swal.showLoading();

              const req = {
                userId: userId,
                regBody: {
                  network: Number(networkId),
                  amount: Number(amount),
                  mobile_number: phoneNumber,
                  Ported_number: portedNumber,
                  airtime_type: plan,
                },
                amount: Number(amount),
                service: "airtime",
                update: "v1",
                agent: userAgent,
              };

              await request
                .post(baseApiUrl + "airtime.php")
                .type("application/json")
                .send(req)
                .then((response) => {
                  if (response.body.status === "success") {
                    localStorage.setItem("balance", response.body.newBalance);

                    Swal.fire({
                      title: "Success",
                      text: response.body.message,
                      icon: "success",
                    }).then(() => {
                      const device = localStorage.getItem("device");

                      if (device === "mobile") {
                        navigate("/mob-dashboard");
                      } else {
                        navigate("/dashboard");
                      }
                    });
                  }
                })
                .catch((err) => {
                  let errorMsg = "";

                  if (err.response && err.response.status === 400) {
                    errorMsg = err.response.text;
                  } else {
                    errorMsg = err;
                  }

                  Swal.fire({
                    title: "Error",
                    text: errorMsg,
                    icon: "error",
                  });
                });
            },
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "The code provided is incorrect, please  check and try again",
            icon: "error",
          }).then(() => {
            handleBuyAirtime();
          });
        }
      },
    });
  };

  useEffect(() => {
    if (!init) {
      setInit(true);
      return;
    }

    refBuyAirtime.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [init]);

  const validateInput = () => {
    if (amount === "") return false;
    if (phoneNumber === "") return false;

    return true;
  };

  return (
    <div
      className="m-4 d-flex flex-column align-items-center"
      ref={refBuyAirtime}
    >
      <MDBCardBody>
        <MDBCardText>
          <h3>BUY AIRTIME</h3>
        </MDBCardText>
      </MDBCardBody>
      <MDBCard className="shadow-2 center service-container m-2">
        <MDBDropdown>
          <MDBDropdownToggle
            style={{ background: appMainColor, color: "white" }}
          >
            NETWORK
          </MDBDropdownToggle>
          <MDBDropdownMenu>
            {data.map((e, index) => {
              return (
                <MDBDropdownItem
                  onClick={() => {
                    setNetwork(e.network);
                    setNetworkId(e.id);
                    setPlans(e.plan);
                  }}
                  link
                  childTag="button"
                >
                  {e.network}
                </MDBDropdownItem>
              );
            })}
          </MDBDropdownMenu>
        </MDBDropdown>
        <MDBCardBody>
          <MDBCardText>{network}</MDBCardText>
        </MDBCardBody>
      </MDBCard>

      <MDBCard className="shadow-2 center service-container">
        <MDBDropdown className="m-1">
          <MDBDropdownToggle
            style={{ background: appMainColor, color: "white" }}
          >
            Plan Type
          </MDBDropdownToggle>
          <MDBDropdownMenu>
            {plans.map((e, i) => {
              return (
                <MDBDropdownItem
                  onClick={() => {
                    setPlan(e);
                  }}
                  link
                  childTag="button"
                >
                  {e}
                </MDBDropdownItem>
              );
            })}
          </MDBDropdownMenu>
        </MDBDropdown>
        <MDBCardBody>
          <MDBCardText>{plan}</MDBCardText>
        </MDBCardBody>
      </MDBCard>

      <MDBCard className="shadow-2 center service-container m-2">
        <TextField
          className="m-1 w-100"
          onBlur={(e) => {
            setAmount(e.target.value);
          }}
          label="Amount"
          id="amount"
          type="number"
          InputProps={{
            inputProps: {
              style: { textAlign: "center" },
            },
          }}
        />
      </MDBCard>

      <MDBCard className="shadow-2  service-container">
        <PhoneNumberInput setPhoneNumber={setPhoneNumber} />
      </MDBCard>
      <MDBCard className="shadow-2 service-container my-2 p-4">
        <label>
          <input
            type="checkbox"
            checked={portedNumber}
            onChange={(e) => {
              setPortedNumber(e.target.checked);
            }}
            style={{ marginRight: "10px" }}
          />
          Bypass Ported number
        </label>
      </MDBCard>
      <MDBBtn
        onClick={() => {
          if (validateInput()) {
            handleBuyAirtime();
          } else {
            setvalidity(true);
          }
        }}
        className="m-2 button"
        style={{ background: appMainColor }}
      >
        BUY AIRTIME
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
