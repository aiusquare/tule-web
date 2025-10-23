import React from "react";

import Swal from "sweetalert2";
import request from "superagent";
import { Toast } from "./alert";
import { loader } from "./admin/alert";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import { baseApiUrl } from "../services/setup";

const ForgotPassword = (props) => {
  const navigate = useNavigate();

  return (
    <div
      style={{ fontSize: props.tSize }}
      className="d_link"
      onClick={() => {
        withReactContent(Swal).fire({
          title: "Password recovery",
          html: "Please enter your registered email, we will send you verification code there, use it to complete pasword recovery in the next screen.",
          input: "email",

          preConfirm: async () => {
            const suppliedEmail = Swal.getInput().value;
            loader({ title: "Processing", text: "please wait..." });

            const data = {
              email: suppliedEmail,
            };

            await request
              .post(baseApiUrl + "util/recovery_req/")
              .type("application/json")
              .send(data)
              .then((response) => {
                Swal.fire({
                  title: "Success",
                  text: "Please check your email for recovery code. If have any issue feel free to contact admin for help",
                  icon: "success",
                }).then(() => {
                  navigate("/passreset", {
                    state: { userEmail: suppliedEmail, device: props.device },
                  });
                });
              })
              .catch((err) => {
                let errorText = "";

                if (err.response) {
                  errorText = err.response.text;
                } else {
                  errorText = "Network error, please check and try again";
                }

                Toast.fire({
                  icon: "error",
                  title: errorText,
                });
              });
          },
        });
      }}
    >
      Forgot password?
    </div>
  );
};

export default ForgotPassword;
