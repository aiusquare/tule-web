import "./Profile.css";
import CusTextField from "../components/text-field/text-field";
import { Button } from "@mui/material";
import { MDBCard } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Toast } from "../../alert";
import request from "superagent";
import { baseApiUrl } from "../../../services/setup";
import ProfileLabel from "../components/ProfileLabel";
import ForgotPassword from "../../forgotPassword";
import ForgotPin from "../../forgetPin";
import { loader } from "../../admin/alert";

const MobileProfile = () => {
  const navigate = useNavigate();

  const userId = localStorage.getItem("email");
  const [progress, setProgress] = useState(false);
  const [firstName, setFirstName] = useState("loading...");
  const [lastName, setLastName] = useState("loading...");
  const [phoneNumber, setPhoneNumber] = useState("loading...");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const req = {
        id: userId,
      };

      await request
        .post(baseApiUrl + "workers/user/profile/index.php")
        .type("application/json")
        .send(req)
        .then((response) => {
          const resData = response.body;

          setFirstName(resData.firstname);
          setLastName(resData.lastname);
          setPhoneNumber(resData.phonenumber);
        })
        .catch((err) => {
          setProgress(false);
        });
    };

    fetchData();
  }, []);

  const handleChangePassword = async () => {
    if (validatePasswordInputs()) {
      // Add parentheses here to call the function
      loader({ title: "Processing", text: "please wait..." });

      const data = {
        id: userId,
        oldauth: oldPassword,
        newauth: newPassword,
        mode: "password",
      };

      await request
        .post(baseApiUrl + "password/change/index.php")
        .type("application/json")
        .send(data)
        .then((response) => {
          Toast.fire({
            icon: "success",
            title: "Changed successfully",
          });

          // Reload the page to clear the form fields
          window.location.reload();
        })
        .catch((err) => {
          setProgress(false);

          Toast.fire({
            icon: "error",
            title: err,
          });
        });
    }
  };

  const handleChangePin = async () => {
    if (validatePinInputs()) {
      // Add parentheses here to call the function
      loader({ title: "Processing", text: "please wait..." });

      const data = {
        id: userId,
        oldauth: oldPin,
        newauth: newPin,
        mode: "pin",
      };

      await request
        .post(baseApiUrl + "pin/change/")
        .type("application/json")
        .send(data)
        .then((response) => {
          Toast.fire({
            icon: "success",
            title: "Changed successfully",
          });

          // Reload the page to clear the form fields
          window.location.reload();
        })
        .catch((err) => {
          setProgress(false);

          Toast.fire({
            icon: "error",
            title: err,
          });
        });
    }
  };

  // const handleSubmit = async () => {
  //   if (validateInputs()) {
  //     setProgress(true);

  //     if (navigator.onLine) {
  //       // fetch("https://www.bing.com", { mode: "no-cors" })
  //       //   .then(async () => {
  //       const req = {
  //         id: email,
  //         password: password,
  //       };

  //       await request
  //         .post(baseApiUrl + "login.php")
  //         .type("application/json")
  //         .send(req)
  //         .then((response) => {
  //           const resData = response.body;
  //           navigate("/mob-dashboard", { state: { data: resData } });
  //         })
  //         .catch((err) => {
  //           setProgress(false);

  //           Toast.fire({
  //             icon: "error",
  //             title: err,
  //           });
  //         });
  //       // });
  //       // .catch((err) => {
  //       //   setProgress(false);

  //       //   Toast.fire({
  //       //     icon: "error",
  //       //     title: "Seems like you have a poor network, please try again.",
  //       //   });
  //       // });
  //     } else {
  //       Toast.fire({
  //         icon: "error",
  //         title: "No network, please check your data and try again",
  //       });

  //       setProgress(false);
  //     }
  //   }
  // };

  const validatePasswordInputs = () => {
    if (oldPassword === "") {
      Toast.fire({
        icon: "error",
        title: "Existing password must be provided",
      });

      return false;
    }

    if (newPassword === "") {
      Toast.fire({
        icon: "error",
        title: "New Password must be provided",
      });

      return false;
    }

    if (newPassword !== confirmPassword) {
      Toast.fire({
        icon: "error",
        title: "New password and confirm password mismatched",
      });

      return false;
    }

    return true;
  };

  const validatePinInputs = () => {
    if (oldPin === "") {
      Toast.fire({
        icon: "error",
        title: "Existing pin must be provided",
      });

      return false;
    }

    if (newPin === "") {
      Toast.fire({
        icon: "error",
        title: "New pin must be provided",
      });

      return false;
    }

    if (newPin !== confirmPin) {
      Toast.fire({
        icon: "error",
        title: "New pin and confirm pin mismatched",
      });

      return false;
    }

    return true;
  };

  return (
    <div className="profile">
      <MDBCard className="shadow-2 p-4 m-2">
        <strong>Personal Info</strong>

        <ProfileLabel label="First name:" text={firstName} />
        <ProfileLabel label="Last name:" text={lastName} />
        <ProfileLabel label="Email:" text={userId} />
        <ProfileLabel label="Phone number:" text={phoneNumber} />
      </MDBCard>

      <MDBCard className="shadow-2 p-4 m-2">
        <strong>Change password</strong>
        <br />

        <CusTextField
          label="Existing password"
          placeholder="existing password"
          type="password"
          className="cus-text-field"
          onChange={(e) => {
            setOldPassword(e);
          }}
        />

        <CusTextField
          label="New password"
          placeholder="new password"
          type="password"
          className="cus-text-field"
          onChange={(e) => {
            setNewPassword(e);
          }}
        />

        <CusTextField
          label="Confirm password"
          placeholder="confirm password"
          type="password"
          className="cus-text-field"
          onChange={(e) => {
            setConfirmPassword(e);
          }}
        />

        <Button
          className="w-100 mb-3"
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
          onClick={handleChangePassword}
        >
          Change password
        </Button>

        <div className="w-50">
          <ForgotPassword device="mobile" tSize="12px" />
        </div>
      </MDBCard>

      <MDBCard className="shadow-2 p-4 m-2 d-flex justify-align-center">
        <strong>Change pin</strong>
        <br />

        <CusTextField
          label="Existing pin"
          placeholder="your pin"
          type="password"
          className="cus-text-field"
          onChange={(e) => {
            setOldPin(e);
          }}
        />

        <CusTextField
          label="New pin"
          placeholder="new password"
          type="password"
          className="cus-text-field"
          onChange={(e) => {
            setNewPin(e);
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

        <Button
          className="w-100 mb-3"
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
          onClick={handleChangePin}
        >
          Change pin
        </Button>

        <div className="w-50">
          <ForgotPin device="mobile" tSize="12px" />
        </div>
      </MDBCard>
    </div>
  );
};

export default MobileProfile;
