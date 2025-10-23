import usersIcon from "../../pictures/users.png";
import sun from "../../pictures/sun_2.png";
import moon from "../../pictures/half_moon.png";
import settingsIcon from "../../pictures/settings.png";
import dashboardIco from "../../pictures/dashboard.png";
import notifIco from "../../pictures/notification.png";
import fundingIco from "../../pictures/funding.png";
import pricingIco from "../../pictures/price.png";
import subscribersIco from "../../pictures/customer.png";
import pendingIco from "../../pictures/pending.png";
import transactionsIco from "../../pictures/transactions.png";

import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Chip, Divider } from "@mui/material";
import { siteLogo, siteName } from "../../services/setup";

const SideNavBar = () => {
  const { collapsed, toggleSidebar } = useProSidebar();
  const navigate = useNavigate();

  const handleAccess = (loc) => {
    const access = localStorage.getItem("access");

    // if (access === "fullAccess" || access === "siteAdmin") {
    toggleSidebar();
    navigate(loc);
    // } else {
    //   Toast.fire({
    //     icon: "error",
    //     title: "You have restrictive access",
    //   });
    // }
  };

  return (
    <div style={{ height: "100vh", display: "flex" }}>
      <Sidebar
        breakPoint="sm"
        transitionDuration={800}
        style={{ height: "100vh", background: "#feffff" }}
      >
        <Menu>
          <div style={{ display: "flex" }}>
            <AppLogo />
          </div>

          <div className="mt-4">{!collapsed && <UserGreatings />}</div>

          <Divider className="my-1" />
          <MenuItem
            style={{ textAlign: "left" }}
            onClick={() => {
              handleAccess("");
            }}
            icon={<BarIcons img={dashboardIco} />}
          >
            DashBoard
          </MenuItem>
          <Divider className="my-1" />

          <MenuItem
            style={{ textAlign: "left" }}
            onClick={() => {
              handleAccess("funding");
            }}
            icon={<BarIcons img={fundingIco} />}
          >
            Account Funding
          </MenuItem>

          <MenuItem
            style={{ textAlign: "left" }}
            onClick={() => {
              handleAccess("service-pricing");
            }}
            icon={<BarIcons img={pricingIco} />}
          >
            Service Pricing
          </MenuItem>
          <MenuItem
            style={{ textAlign: "left" }}
            onClick={() => {
              handleAccess("subscribers");
            }}
            icon={<BarIcons img={subscribersIco} />}
          >
            Subscribers
          </MenuItem>
          <MenuItem
            style={{ textAlign: "left" }}
            onClick={() => {
              handleAccess("customers-transactons");
            }}
            icon={<BarIcons img={transactionsIco} />}
          >
            Transactions
          </MenuItem>
          <MenuItem
            style={{ textAlign: "left" }}
            onClick={() => {
              handleAccess("pending-transactons");
            }}
            icon={<BarIcons img={pendingIco} />}
          >
            Pending Transactions
          </MenuItem>
          <MenuItem
            style={{ textAlign: "left" }}
            onClick={() => {
              handleAccess("notifications");
            }}
            icon={<BarIcons img={notifIco} />}
          >
            Notifications
          </MenuItem>
          <MenuItem
            style={{ textAlign: "left" }}
            onClick={() => {
              handleAccess("users");
            }}
            icon={<BarIcons img={usersIcon} />}
          >
            Moderators
          </MenuItem>

          <MenuItem
            style={{ textAlign: "left" }}
            onClick={() => {
              handleAccess("settings");
            }}
            icon={<BarIcons img={settingsIcon} />}
          >
            Site Administration
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

const AppLogo = () => {
  const navigate = useNavigate();
  const { collapseSidebar, collapsed } = useProSidebar();

  const toggle = () => {
    collapseSidebar();
  };

  return (
    <div>
      <div
        onClick={() => {
          navigate("/");
        }}
        className=" align-items-center"
        style={{ display: "flex", margin: "10px", justifyContent: "end" }}
      >
        <img
          style={{ cursor: "pointer", width: "50px", height: "50px" }}
          src={siteLogo}
        />

        {!collapsed && (
          <h3 className="m-2" style={{ fontSize: "22px", fontWeight: 900 }}>
            {siteName}
          </h3>
        )}
      </div>
    </div>
  );
};

const BarIcons = (props) => {
  return (
    <img
      // className="circle"
      style={{ width: "48px", height: "48px", padding: "15px" }}
      src={props.img}
    />
  );
};

const UserGreatings = () => {
  const [greating, setGreating] = useState("");
  const [greatingIcon, setGreatingIcon] = useState(sun);

  useEffect(() => {
    const date = new Date();
    const formatter = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
      timeZone: "Africa/Lagos", // Set the time zone to Lagos
    });
    const time = formatter.format(date).split(" ")[1];
    const hour = formatter.format(date).split(" ")[0];
    const hourVal = parseInt(hour);

    let greeting = "";
    if (hourVal >= 5 && hourVal < 12 && time === "AM") {
      greeting = "Good Morning";
    } else if (
      (hourVal >= 1 && hourVal < 5 && time === "PM") ||
      hourVal === 12
    ) {
      greeting = "Good Afternoon";
      setGreatingIcon(moon);
    } else {
      greeting = "Good Evening";
      setGreatingIcon(moon);
    }

    setGreating(greeting);
  });

  return (
    <div className="greating-card p-3">
      <div
        className="center"
        style={{
          fontSize: "small",
          color: "white",
          display: "flex",
          alignItems: "center",
        }}
      >
        <b>{greating}</b>
        <Avatar
          src={greatingIcon}
          className="m-1"
          sx={{ width: 26, height: 26 }}
        >
          s
        </Avatar>
      </div>
      <div
        className="mx-4"
        style={{ display: "flex", justifyContent: "flex-start" }}
      >
        <Chip
          avatar={<Avatar sx={{ bgcolor: "#daab2a" }}>N</Avatar>}
          label={
            <div className="m-2" style={{ color: "white", fontWeight: 900 }}>
              ADMIN
            </div>
          }
          variant="outlined"
        />
      </div>
    </div>
  );
};

export default SideNavBar;
