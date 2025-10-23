import WalletComponent from "../components/WalletComponent";
import MenuComponent from "../components/MenuComponent";
import BottomNavbar from "../components/BottomNavbar";
import "./MobDashboard.css";
import DashboardComponent from "../components/DashboardHeader";
import CardSlider from "../components/CardsSlider";
import FundingDrawer from "../components/FundingDrawer";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseApiUrl } from "../../../services/setup";
import ChatButton from "../components/ChatButton";
import Swal from "sweetalert2";
import request from "superagent";

export const ServiceComContext = React.createContext();

const MobDashboard = () => {
  const userEmail = localStorage.getItem("email");

  const [walletBalance, setWalletBalance] = useState(0);
  const [accounts, setAccounts] = useState([]);
  const [init, setInit] = useState(false);
  const [userPin, setUserPin] = useState("");
  const [userName, setUserName] = useState("");
  const [smsSender, setSmsSender] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [userAgent, setUserAgent] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [messageId, setMessageId] = useState("");

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setUserPin(localStorage.getItem("pin"));
        setUserName(localStorage.getItem("userName"));
        setUserAgent(localStorage.getItem("agent"));
        setWalletBalance(localStorage.getItem("balance"));
        setSmsSender(smsSender);

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

  const [isOpen, setIsOpen] = useState(false);

  const toggleBottomSheet = () => {
    setIsOpen(!isOpen);
  };

  const showNotification = (message) => {
    if (message) {
      Swal.fire({
        html: `<p style="font-size: 14px; color: #333; margin: 0;">${message}</p>`,
        confirmButtonColor: "#28a745",
        background: "#f9f9f9",
        icon: "info",
        customClass: {
          icon: "custom-swal-icon",
        },
      });
    }
  };

  const handleDataFetch = async () => {
    await request
      .get(baseApiUrl + "admin/notifications/get/index.php")
      .then((response) => {
        const details = response.body;

        const existingNotif = localStorage.getItem("notification");

        if (existingNotif !== details.id || details.type === "static") {
          localStorage.setItem("notification", details.id);

          setMessage(details.message);
          setMessageType(details.type);

          showNotification(details.message);
        }
      })
      .catch((err) => {
        console.error("Error message:", err.response);
        console.error("ERROR", err);
      });
  };

  useEffect(() => {
    if (navigator.onLine) {
      handleDataFetch();
    }
  }, []);

  return (
    <div className="mob-dashboard">
      <section id="header-section">
        <DashboardComponent />
      </section>
      <section id="wallet-section">
        <WalletComponent
          balance={walletBalance}
          getFunding={toggleBottomSheet}
        />
      </section>

      <section id="menu-section">
        <MenuComponent />
      </section>
      <section id="notif-section">
        <CardSlider />
        <ChatButton />
      </section>

      <section id="footer-section">
        <FundingDrawer
          accounts={accounts}
          open={isOpen}
          onClose={toggleBottomSheet}
        />
        <BottomNavbar getFunding={toggleBottomSheet} />
      </section>
    </div>
  );
};

export default MobDashboard;
