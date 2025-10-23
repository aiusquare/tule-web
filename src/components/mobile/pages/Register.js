import "./Register.css";
import CusTextField from "../components/text-field/text-field";
import { Button, Collapse } from "@mui/material";
import { MDBCard, MDBCardImage } from "mdb-react-ui-kit";
import logo from "../../../pictures/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { Toast } from "../../alert";
import { baseApiUrl } from "../../../services/setup";
import request from "superagent";
import Spinner from "../../spinner";

const MobRegisteration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [agentEmail, setAgentEmail] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [progress, setProgress] = useState(false);
  const [validate, setValidate] = useState(false);
  const [netCon, setNetCon] = useState(false); // network connection checker
  const [progressStatus, setProgressStatus] = useState("initialising...");
  const navigate = useNavigate();
  const [ninOrBvn, setNinOrBvn] = useState("");
  const [idType, setIdType] = useState("bvn"); // State to track BVN or NIN selection

  const handleSubmit = async () => {
    if (handleVerification()) {
      setProgress(true);
      if (navigator.onLine) {
        register();
      } else {
        setProgress(false);
        setNetCon(true);
      }
    } else {
      setProgress(false);
    }
  };

  function register() {
    try {
      fetch("https://www.google.com/", { mode: "no-cors" })
        .then(async () => {
          const req = {
            firstname: toSentenceCase(firstName),
            lastname: toSentenceCase(surname),
            phonenumber: phoneNumber,
            email: email,
            ninOrBvn: ninOrBvn,
            password: password,
            pin: pin,
            userAgent: agentEmail,
            idType: idType,
          };

          await request
            .post(baseApiUrl + "registration.php")
            .type("application/json")
            .send(req)
            .then((response) => {
              Swal.fire({
                icon: "success",
                title: "Successful",
                text: "You have successfully register, please login to continue",
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate("/mob-login");
                }
              });
            })
            .catch((err) => {
              setProgress(false);

              Toast.fire({
                icon: "error",
                title: err,
              });
            });
        })
        .catch((err) => {});
    } catch (error) {
      alert(error);
      setProgress(false);
    }
  }

  function toSentenceCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  const handleVerification = () => {
    setValidate(true);
    setProgressStatus("varification");

    if (firstName === "") {
      Toast.fire({
        icon: "error",
        title: "First name must be provided",
      });
      return;
    }
    if (surname === "") {
      Toast.fire({
        icon: "error",
        title: "Surname must be provided",
      });
      return;
    }
    if (phoneNumber === "") {
      Toast.fire({
        icon: "error",
        title: "Phone number name must be provided",
      });
      return;
    }
    if (email === "") {
      Toast.fire({
        icon: "error",
        title: "Email must be provided",
      });
      return;
    }
    if (password === "") {
      Toast.fire({
        icon: "error",
        title: "Password must be provided",
      });
      return;
    }

    if (password !== confirmPassword) {
      Toast.fire({
        icon: "error",
        title: "Password mismatched",
      });
      return;
    }

    if (pin === "") {
      Toast.fire({
        icon: "error",
        title: "Pin must be provided",
      });
      return;
    }
    if (pin !== confirmPin) {
      Toast.fire({
        icon: "error",
        title: "PIN mismatched",
      });
      return;
    }

    return true;
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="register">
      <div className="head-section">
        <MDBCard
          className="shadow-2 p-4"
          style={{ cursor: "pointer", width: "100px" }}
        >
          <MDBCardImage position="top" src={logo}></MDBCardImage>
        </MDBCard>
      </div>

      <div className="body-section">
        <span id="login-txt">Sign Up</span>

        <CusTextField
          label="First name"
          placeholder="first name"
          className="cus-text-field"
          onChange={(e) => {
            setFirstName(e);
          }}
        />

        <CusTextField
          label="Last name"
          placeholder="last name"
          className="cus-text-field"
          onChange={(e) => {
            setSurname(e);
          }}
        />

        <CusTextField
          label="Email"
          placeholder="your email"
          type="email"
          className="cus-text-field"
          onChange={(e) => {
            setEmail(e);
          }}
        />

        <CusTextField
          label="Phone number"
          placeholder="phone number"
          className="cus-text-field"
          onChange={(e) => {
            setPhoneNumber(e);
          }}
        />

        <CusTextField
          label="Password"
          placeholder="Your password"
          type="password"
          className="cus-text-field"
          onChange={(e) => {
            setPassword(e);
          }}
        />

        <CusTextField
          label="Confirm password"
          placeholder="confirm the password"
          type="password"
          className="cus-text-field"
          onChange={(e) => {
            setConfirmPassword(e);
          }}
        />

        <CusTextField
          label="Pin"
          placeholder="set pin"
          type="password"
          className="cus-text-field"
          onChange={(e) => {
            setPin(e);
          }}
        />

        <CusTextField
          label="Confirm pin"
          placeholder="confirm the pin"
          type="password"
          className="cus-text-field"
          onChange={(e) => {
            setConfirmPin(e);
          }}
        />

        {/* Dropdown to choose either BVN or NIN */}
        <div style={{ fontSize: "small" }} className="w-100">
          <label>
            <strong>Means of identification</strong>{" "}
          </label>
          <select
            className="mx-2 p-2"
            value={idType}
            onChange={(e) => setIdType(e.target.value)}
          >
            <option value="bvn">BVN</option>
            <option value="nin">NIN</option>
          </select>
        </div>

        {/* Conditional placeholder and label for BVN or NIN */}
        <CusTextField
          label={idType === "bvn" ? "BVN" : "NIN"}
          placeholder={idType === "bvn" ? "Enter your BVN" : "Enter your NIN"}
          className="cus-text-field"
          onChange={(e) => {
            setNinOrBvn(e);
          }}
        />
        <div style={{ fontSize: "9px", color: "green" }}>
          <strong style={{ color: "red" }}>Please note!</strong> We are in no
          way misusing your NIN or BVN, nor are we storing it in our database.
          We are simply complying with CBN regulations for static account
          creation.
        </div>

        <div className="mb-2">
          <Collapse in={progress}>
            <Spinner />
          </Collapse>
        </div>

        <Button
          className="w-50 mb-3"
          variant="contained"
          sx={{
            textTransform: "none",
            color: "#fff",
            fontSize: "12",
            background: "#200647",
            borderRadius: "20px",
            "&:hover": { background: "#200647" },
            height: 35,
          }}
          onClick={handleSubmit}
        >
          Register
        </Button>

        <div style={{ fontSize: "12px" }}>
          Already registered?
          <b>
            <Link className="d_link p-2" to="/mob-login">
              Login here
            </Link>
          </b>
        </div>
      </div>
    </div>
  );
};

export default MobRegisteration;
