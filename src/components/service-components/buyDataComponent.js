import { useCallback, useEffect, useState } from "react";
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
import { useRef } from "react";
import { Alert, Snackbar, TextField } from "@mui/material";
import Swal from "sweetalert2";
import request from "superagent";
import { useNavigate } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import { appMainColor, baseApiUrl } from "../../services/setup";
import { Phone } from "@mui/icons-material";
import PhoneNumberInput from "../mobile/components/PhoneInput";

export default function BuyDataComponent() {
  const navigate = useNavigate();
  const networks = [
    { network: "MTN", id: 1 },
    { network: "AIRTEL", id: 4 },
    { network: "GLO", id: 2 },
    { network: "9MOBILE", id: 3 },
  ];

  const userId = localStorage.getItem("email");
  const userAgent = localStorage.getItem("agent");
  const userPin = localStorage.getItem("pin");

  const [network, setNetwork] = useState(networks[0].network);
  const [networkId, setNetworkId] = useState(networks[0].id);
  const [planType, setPlanType] = useState("choose plan");
  const [dataPlan, setDataPlan] = useState("choose data plan");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dataPlanId, setDataPlanId] = useState(1);
  const [unit, setDataUnit] = useState("");

  const [filteredNetwork, setFilteredNetwork] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);

  const [services, setServices] = useState([]);
  const [plansType, setPlansType] = useState([]);
  const [dataPlans, setDataPlans] = useState([]);
  const [price, setPrice] = useState(0);
  const [portedNumber, setPortedNumber] = useState(false);
  const [init, setInit] = useState(false);
  const [validity, setvalidity] = useState(false);

  const refBuydata = useRef(null);

  useEffect(() => {
    if (init) return;
    let isMounted = true;

    const fetchPrices = async () => {
      if (navigator.onLine) {
        try {
          const response = await request
            .get(baseApiUrl + "pricing/prices/index.php")
            .type("application/json");
          if (isMounted) {
            const prices = response.body;
            setServices(prices);
            planTypeSearch(network, prices);
          }
        } catch (err) {
          if (isMounted) {
            let errorMsg = "";
            if (err.response && err.response.status === 400) {
              errorMsg = err.response.text;
            } else {
              errorMsg = err.message;
            }

            Swal.fire({
              title: "Error",
              text: "Data price loading error, try again or contact admin",
              icon: "error",
            });
          }
        }
      }
    };

    fetchPrices();

    return () => {
      isMounted = false; // cleanup flag
    };
  }, [init]);

  useEffect(() => {
    if (!init) {
      refBuydata.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      setInit(true);
    }
  }, [init]);

  const planTypeSearch = (net, priceList) => {
    const filteredPlans = priceList
      .filter((servicePack) => servicePack.Network === net)
      .map((servicePack) => servicePack.PlanType);

    setFilteredNetwork(
      priceList.filter((servicePack) => servicePack.Network === net)
    );

    // Use Set to remove duplicate plan types
    const uniquePlans = [...new Set(filteredPlans)];

    // Set the filtered and unique plan types
    setPlansType(uniquePlans);

    // Optionally set the first planType if available
    if (uniquePlans.length > 0) {
      setPlanType(uniquePlans[0]);
    }
  };

  const dataPlanSearch = (pln) => {
    let plans = [];

    const filteredPlans = filteredNetwork.filter(
      (plansPack) => plansPack.PlanType === pln
    );
    setFilteredPlans(filteredPlans);

    filteredPlans.map((pl) => {
      const dataPlan = `${pl.Unit} - ${pl.Price} - ${pl.Validity}`;

      plans.push(dataPlan);
    });

    setDataPlans(plans);

    // Set default values if the arrays are not empty
    if (filteredPlans.length > 0) {
      setDataPlan(plans[0]);
      setDataUnit(filteredPlans[0].Unit);
      setPrice(filteredPlans[0].Price);
      setDataPlanId(filteredPlans[0].PlanCode);
    }
  };

  const handleBuyData = () => {
    withReactContent(Swal).fire({
      title: "Enter your Pin",
      html:
        "You are about to send " +
        unit +
        " " +
        planType +
        " " +
        "Data" +
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
                  network: networkId,
                  mobile_number: phoneNumber,
                  plan: dataPlanId,
                  Ported_number: portedNumber,
                },
                amount: price,
                service: "data",
                planName: "",
                update: "v1",
                agent: userAgent,
              };

              console.log("REQ: ", req);

              await request
                .post(baseApiUrl + "data.php")
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
            handleBuyData();
          });
        }
      },
    });
  };

  useEffect(() => {
    dataPlanSearch(planType);
  }, [plansType]);

  const validateInput = () => {
    if (network === "choose beneficiary network") return false;
    if (planType === "choose plan") return false;
    if (dataPlan === "choose data plan") return false;
    if (phoneNumber === "") return false;

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
          <h3>BUY DATA</h3>
        </MDBCardText>
      </MDBCardBody>
      <MDBCard className="center service-container shadow-2 m-2">
        <MDBDropdown>
          <MDBDropdownToggle
            style={{ background: appMainColor, color: "white" }}
          >
            NETWORK
          </MDBDropdownToggle>
          <MDBDropdownMenu>
            {networks.map((e, index) => {
              return (
                <MDBDropdownItem
                  key={index}
                  onClick={() => {
                    setNetwork(e.network);
                    setNetworkId(e.id);
                    planTypeSearch(e.network, services);
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
      <MDBCard className="center service-container shadow-2">
        <MDBDropdown>
          <MDBDropdownToggle
            style={{ background: appMainColor, color: "white" }}
          >
            Plan Type
          </MDBDropdownToggle>
          <MDBDropdownMenu>
            {plansType.map((planTyp, i) => {
              return (
                <MDBDropdownItem
                  key={i}
                  onClick={() => {
                    setPlanType(planTyp);
                    dataPlanSearch(planTyp);
                  }}
                  link
                  childTag="button"
                >
                  {planTyp}
                </MDBDropdownItem>
              );
            })}
          </MDBDropdownMenu>
        </MDBDropdown>
        <MDBCardBody>
          <MDBCardText>{planType}</MDBCardText>
        </MDBCardBody>
      </MDBCard>
      <MDBCard className="shadow-2 service-container center m-2">
        <MDBDropdown>
          <MDBDropdownToggle
            style={{ background: appMainColor, color: "white" }}
          >
            Data Plan
          </MDBDropdownToggle>
          <MDBDropdownMenu>
            {dataPlans.map((dataPln, index) => {
              return (
                <MDBDropdownItem
                  key={index}
                  onClick={(e) => {
                    setDataPlanId(filteredPlans[index].PlanCode); // send to api
                    setDataPlan(dataPlans[index]); // this will be used for user validation
                    setDataUnit(filteredPlans[index].Unit);
                    setPrice(filteredPlans[index].Price);
                  }}
                  link
                  childTag="button"
                >
                  {dataPln}
                </MDBDropdownItem>
              );
            })}
          </MDBDropdownMenu>
        </MDBDropdown>
        <MDBCardBody>
          <MDBCardText>{dataPlan}</MDBCardText>
        </MDBCardBody>
      </MDBCard>
      <MDBCard className="shadow-2 service-container ">
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
            handleBuyData();
          } else {
            setvalidity(true);
          }
        }}
        className="m-2 button"
        style={{ background: appMainColor }}
      >
        BUY DATA
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
