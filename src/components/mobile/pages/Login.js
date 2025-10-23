import "./Login.css";
import CusTextField from "../components/text-field/text-field";
import { Button, Collapse } from "@mui/material";
import { MDBCard, MDBCardImage } from "mdb-react-ui-kit";
import logo from "../../../pictures/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Toast } from "../../alert";
import Spinner from "../../spinner";
import request from "superagent";
import { appMainColor, baseApiUrl } from "../../../services/setup";
import ForgotPassword from "../../forgotPassword";
import ChatButton from "../components/ChatButton";
import Fingerprint from "@mui/icons-material/Fingerprint";
import Swal from "sweetalert2";

const MobileLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [progress, setProgress] = useState(false);

  const createRequestObject = (loginMode) => {
    if (loginMode === "finger") {
      const userId = localStorage.getItem("email");
      const password = localStorage.getItem("password");
      return { id: userId, password: password };
    } else {
      return { id: email, password: password };
    }
  };

  const displayToastMessage = (icon, title) => {
    Toast.fire({ icon, title });
  };

  const handleSubmit = async (loginMode) => {
    setProgress(true);

    if (!navigator.onLine) {
      displayToastMessage(
        "error",
        "No network connection. Please check your internet and try again."
      );
      setProgress(false);
      return;
    }

    console.log("THE URL", `${baseApiUrl}login.php`);

    const req = createRequestObject(loginMode);

    await request
      .post(`${baseApiUrl}login.php`)
      .type("application/json")
      .send(req)
      .then((response) => {
        const resData = response.body;

        // Preserve critical data and store new user data
        const { firstname, pin, accountBalance, userAgent } = resData;
        const userData = {
          email: email,
          pin: pin,
          userName: firstname,
          balance: accountBalance,
          agent: userAgent,
          lastActivityTime: Date.now().toString(),
          device: "mobile",
        };

        // Store user data in local storage
        Object.entries(userData).forEach(([key, value]) => {
          localStorage.setItem(key, value);
        });

        if (localStorage.getItem("auth_with_finger") === "yes") {
          localStorage.setItem("password", password);
        }

        displayToastMessage("success", "Login successful!");

        // Navigate to the dashboard
        navigate("/mob-dashboard");
      })
      .catch((err) => {
        console.log(err); // Log the error
        displayToastMessage(
          "error",
          err || "An error occurred. Please try again."
        );
      })
      .finally(() => {
        setProgress(false); // Ensure progress spinner stops
      });
  };

  useEffect(() => {
    const fetch = async () => {
      const userId = localStorage.getItem("email");
      const password = localStorage.getItem("password");
      const req = { id: userId, password: password };

      await request
        .post(`${baseApiUrl}login.php`)
        .type("application/json")
        .send(req)
        .then((response) => {
          const resData = response.body;

          // Preserve critical data and store new user data
          const { firstname, pin, accountBalance, userAgent } = resData;
          const userData = {
            email: userId,
            pin: pin,
            userName: firstname,
            balance: accountBalance,
            agent: userAgent,
            lastActivityTime: Date.now().toString(),
            device: "mobile",
          };

          // Store user data in local storage
          Object.entries(userData).forEach(([key, value]) => {
            localStorage.setItem(key, value);
          });

          displayToastMessage("success", "Login successful!");

          // Navigate to the dashboard
          navigate("/mob-dashboard");
        })
        .catch((err) => {
          console.log(err); // Log the error
          displayToastMessage(
            "error",
            err || "An error occurred. Please try again."
          );
        });
    };

    window.addEventListener("message", (event) => {
      console.log("Message received from parent window:", event.data);
      // Handle the message (e.g., update state)

      if (event.data === "successful") {
        Toast.fire({
          icon: "success",
          html: '<p style="font-size: 14px">authenticated successfully</p>',
        });
        const storedEmail = localStorage.getItem("email");
        if (storedEmail) {
          // handleSubmit("finger");
          fetch();
        } else {
          Toast.fire({
            icon: "error",
            title: "Email not found",
          });
        }
      }
    });

    return () => {
      window.removeEventListener("message", () => {});
    };
  }, []);

  const validateInputs = () => {
    if (email === "") {
      Toast.fire({
        icon: "error",
        title: "Email must be provided",
      });
      setProgress(false);

      return false;
    }

    if (password === "") {
      Toast.fire({
        icon: "error",
        title: "Password must be provided",
      });
      setProgress(false);

      return false;
    }

    return true;
  };

  return (
    <div className="mobile-login">
      <div className="head-section">
        <MDBCard
          // onClick={handleLogoClick}
          className="shadow-2 p-4"
          style={{ cursor: "pointer", width: "100px" }}
        >
          <MDBCardImage position="top" src={logo}></MDBCardImage>
        </MDBCard>

        <br />
        <span id="welcome-note">
          Welcome back, {localStorage.getItem("userName")}
        </span>
      </div>

      <div className="body-section">
        <span id="login-txt">LOGIN</span>

        <CusTextField
          onChange={(e) => {
            setEmail(e);
          }}
          label="Email"
          placeholder="Your login email"
          type="email"
          className="cus-text-field"
          value={email}
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

        <div className="mb-2">
          <Collapse in={progress}>
            <Spinner />
          </Collapse>
        </div>

        <div className="mb-2" style={{ width: "100%" }}>
          <RememberMe setEmail={setEmail} />
        </div>

        <Button
          onClick={() => {
            handleSubmit("password");
          }}
          className="w-50 mb-2"
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
        >
          Login
        </Button>

        <ForgotPassword device="mobile" tSize="12px" />

        <div style={{ fontSize: "12px" }}>
          Not yet registered?
          <b>
            <Link className="d_link p-2" to="/mob-register">
              Register here
            </Link>
          </b>
        </div>

        {/* Add Fingerprint Icon Below */}
        <div style={{ textAlign: "center", marginTop: "15px" }}>
          <div
            style={{
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              border: "2px solid #200647",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
              cursor: "pointer",
              backgroundColor: "#fff",
            }}
            onClick={() => {
              try {
                // first we request user permission set login with finger
                if (localStorage.getItem("auth_with_finger") === "yes") {
                  const userId = localStorage.getItem("email");
                  const password = localStorage.getItem("password");

                  if (userId === null || password === null) {
                    Swal.fire({
                      icon: "error",
                      html: `<p style="font-size: 14px; color: #333; margin: 0;">You must login first</p>`,
                    });
                  } else {
                    const checkAuth = (attempt = 0) => {
                      console.log(
                        `Attempt ${
                          attempt + 1
                        }: Trying fingerprint authentication...`
                      );

                      if (window.AndroidInterface?.authWithFingerPrint) {
                        window.AndroidInterface.authWithFingerPrint();
                        console.log("Fingerprint authentication triggered.");
                      } else if (attempt < 4) {
                        const delay = 50 * Math.pow(2, attempt); // Exponential backoff: 50ms, 100ms, 200ms, 400ms
                        console.log(`Retrying in ${delay}ms...`);
                        setTimeout(() => checkAuth(attempt + 1), delay);
                      } else {
                        console.error(
                          "Fingerprint authentication unavailable."
                        );
                        alert(
                          "Fingerprint authentication unavailable. Please try again."
                        );
                      }
                    };

                    // Ensure fingerprint authentication starts automatically after a short delay
                    setTimeout(() => checkAuth(), 50);
                  }
                } else {
                  Swal.fire({
                    html: `<p style="font-size: 14px; color: #333; margin: 0;">You are about to set up fingerprint authentication. Proceed by clicking OK, or cancel if you're not interested.</p>`,
                    icon: "info",
                    showCancelButton: true,
                    confirmButtonText: "OK",
                    confirmButtonColor: "#28a745",
                    cancelButtonText: "Cancel",
                    cancelButtonColor: "#d33",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      localStorage.setItem("auth_with_finger", "yes");

                      Swal.fire({
                        icon: "success",
                        html: `<p style="font-size: 14px; color: #333; margin: 0;">Now log in first to set up fingerprint authentication.</p>`,
                        confirmButtonColor: "#28a745",
                      });
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                      Swal.fire({
                        title: "Cancelled",
                        icon: "info",
                        html: `<p style="font-size: 14px; color: #333; margin: 0;">Fingerprint authentication setup was canceled.</p>`,
                        confirmButtonColor: "#007bff",
                      });
                    }
                  });
                }
              } catch (error) {
                alert("Failed to initiate authentication:", error);
              }
            }}
          >
            <Fingerprint
              style={{
                fontSize: "30px",
                color: "#200647",
              }}
            />
          </div>
        </div>

        <ChatButton />
      </div>
    </div>
  );
};

const RememberMe = (props) => {
  const [rememberMe, setRememberMe] = useState();

  useEffect(() => {
    if (localStorage.getItem("r_me") === "true") {
      props.setEmail(localStorage.getItem("email"));
      setRememberMe(true);
    }
  }, []);

  return (
    <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
      <input
        type="checkbox"
        checked={rememberMe}
        onChange={(e) => {
          setRememberMe(e.target.checked);
          console.log("REMEMBER ME: ", e.target.checked);
          localStorage.setItem("r_me", e.target.checked);
        }}
        style={{
          display: "none", // Hide the native checkbox
        }}
      />
      <span
        style={{
          display: "inline-block",
          width: "20px",
          height: "20px",
          marginRight: "10px",
          backgroundColor: rememberMe ? appMainColor : "#fff",
          border: "2px solid #999",
          borderRadius: "4px",
          position: "relative",
          transition: "background 0.3s",
        }}
      >
        {rememberMe && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="white"
            width="14px"
            height="14px"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <path d="M13.485 3.515a1 1 0 0 1 1.415 1.415l-7 7a1 1 0 0 1-1.415 0l-3-3a1 1 0 0 1 1.415-1.415L7.5 9.586l5.985-5.985z" />
          </svg>
        )}
      </span>
      Remember Me
    </label>
  );
};

export default MobileLogin;
