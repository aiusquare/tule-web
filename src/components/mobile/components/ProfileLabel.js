import "./ProfileLabel.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Toast } from "../../alert";
import request from "superagent";
import { baseApiUrl } from "../../../services/setup";

const ProfileLabel = (props) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [progress, setProgress] = useState(false);

  const handleSubmit = async () => {
    if (validateInputs()) {
      setProgress(true);

      if (navigator.onLine) {
        // fetch("https://www.bing.com", { mode: "no-cors" })
        //   .then(async () => {
        const req = {
          id: email,
          password: password,
        };

        await request
          .post(baseApiUrl + "login.php")
          .type("application/json")
          .send(req)
          .then((response) => {
            const resData = response.body;
            navigate("/mob-dashboard", { state: { data: resData } });

            localStorage.setItem("email", email);
            localStorage.setItem("pin", response.body.agent);
            localStorage.setItem("userName", response.body.firstname);
            localStorage.setItem("pin", response.body.pin);
            localStorage.setItem("balance", response.body.accountBalance);
            localStorage.setItem("agent", response.body.userAgent);

            // setting login session
            localStorage.setItem("lastActivityTime", Date.now().toString());
          })
          .catch((err) => {
            setProgress(false);

            Toast.fire({
              icon: "error",
              title: err,
            });
          });
        // });
        // .catch((err) => {
        //   setProgress(false);

        //   Toast.fire({
        //     icon: "error",
        //     title: "Seems like you have a poor network, please try again.",
        //   });
        // });
      } else {
        Toast.fire({
          icon: "error",
          title: "No network, please check your data and try again",
        });

        setProgress(false);
      }
    }
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const validateInputs = () => {
    if (email === "") {
      Toast.fire({
        icon: "error",
        title: "Email must be provided",
      });

      return false;
    }

    if (password === "") {
      Toast.fire({
        icon: "error",
        title: "Password must be provided",
      });

      return false;
    }

    return true;
  };

  return (
    <div className="profile-label">
      <div className="label">
        <b>{props.label}</b>
      </div>
      <div className="label-text">{props.text}</div>
    </div>
  );
};

export default ProfileLabel;
