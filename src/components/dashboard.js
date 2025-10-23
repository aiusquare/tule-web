import * as React from "react";
import { useState } from "react";
import { MDBCard } from "mdb-react-ui-kit";
import { MenuItem, ProSidebarProvider } from "react-pro-sidebar";
import "../css/style.css";
import axios from "axios";
import SideNavBar from "./sideNavBar";
import { Menu } from "@mui/material";
import { useEffect } from "react";
import TopBar from "./dashboardNavbar";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { baseApiUrl, smsName } from "../services/setup";

export const ServiceComContext = React.createContext();

export default function DashBoard() {
  const location = useLocation();
  let navigate = useNavigate();
  const userEmail = localStorage.getItem("email");
  let uniqueId = userEmail;
  const dashboardRef = React.useRef(null);

  const [walletBalance, setWalletBalance] = useState(0);

  const [accounts, setAccounts] = useState([]);
  const [init, setInit] = useState(false);
  const [comIndex, setComIndex] = useState(0);
  const [userPin, setUserPin] = useState("");
  const [userName, setUserName] = useState("");
  const [smsSender, setSmsSender] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const [businessName, setBusinessName] = useState("");
  // const [agent, setAgent] = useState(null);
  const [userAgent, setUserAgent] = useState("");
  const [userData, setUserData] = useState({});

  useEffect(() => {
    let isMounted = true; // Flag to track whether the component is mounted

    const fetchData = async () => {
      try {
        setUserPin(localStorage.getItem("pin"));
        setUserName(localStorage.getItem("userName"));
        setUserAgent(localStorage.getItem("agent"));
        setWalletBalance(localStorage.getItem("balance"));
        setSmsSender(smsName);

        const req = { email: userEmail };

        const response = await axios.post(
          baseApiUrl + "reservedAccounts.php",
          req,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const inputString = response.data;
        const lines = inputString
          .split("\n")
          .filter((line) => line.trim() !== "");

        // Step 2 & 3: Convert each line into an object and push it into an array
        const jsonArray = lines.map((line) => {
          const [accountNumber, name, bank] = line.split(",");
          return { accountNumber, name, bank };
        });

        setAccounts(jsonArray);

        if (isMounted) {
          setInit(true);
        }
      } catch (e) {}
    };

    // Call the async function
    fetchData();

    return () => {
      isMounted = false;
    };
  });

  return (
    <ProSidebarProvider>
      <ServiceComContext.Provider
        value={{
          comIndex,
          setComIndex,
          userPin,
          userName,
          walletBalance,
          smsSender,
          userEmail,
          uniqueId,
          accounts,
          userAgent,
        }}
      >
        <div ref={dashboardRef} style={{ display: "flex" }}>
          <SideNavBar />
          <div style={{ width: "100%", height: "100vh" }}>
            <div>
              <TopBar />
              <Menu open={openMenu}>
                <MenuItem>Profile</MenuItem>
              </Menu>
            </div>
            <div className="main-content-dsb">
              <div className="d-flex align-items-center justify-content-center">
                <MDBCard className="shadow-2 m-4 w-100">
                  <ServiceComContext.Consumer>
                    {(contextData) => <Outlet {...contextData} />}
                  </ServiceComContext.Consumer>
                </MDBCard>
              </div>
            </div>
          </div>
        </div>
      </ServiceComContext.Provider>
    </ProSidebarProvider>
  );
}
