import butDataIcon from "../pictures/cloud_hosting.png";
import airtimeIcon from "../pictures/airtime.png";
import airtimeToCash from "../pictures/airtime_to_cash.png";
import electricityIcon from "../pictures/electricity.png";
import resultPinIcon from "../pictures/school.png";
import tvSubIcon from "../pictures/tv_show.png";
import sun from "../pictures/sun_2.png";
import moon from "../pictures/half_moon.png";
import afterNoonSunIcon from "../pictures/sun.png";
import dashboardIco from "../pictures/dashboard.png";
import aboutIco from "../pictures/about.png";
import supportIco from "../pictures/tech_support.png";
import phoneIco from "../pictures/android.png";
import dataCardIco from "../pictures/gift_card.png";
import bulksmsIco from "../pictures/bulksms.png";
import reportIcon from "../pictures/report.png";
import pricingIcon from "../pictures/price_tag.png";

import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { ServiceComContext } from "./dashboard";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Chip, Divider } from "@mui/material";
import { siteLogo, siteName } from "../services/setup";

const SideNavBar = () => {
  const { collapsed, toggleSidebar } = useProSidebar();
  const { setComIndex } = useContext(ServiceComContext);
  const navigate = useNavigate();

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
            onClick={() => {
              navigate("");
              toggleSidebar();
            }}
            icon={<BarIcons img={dashboardIco} />}
          >
            DashBoard
          </MenuItem>
          <Divider className="my-1" />

          <Divider className="my-1" />

          <MenuItem
            onClick={() => {
              toggleSidebar();
              navigate("data");
            }}
            icon={<BarIcons img={butDataIcon} />}
          >
            Buy Data
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("data-card");
              toggleSidebar();
            }}
            icon={<BarIcons img={dataCardIco} />}
          >
            Buy Data Card
          </MenuItem>
          <MenuItem
            onClick={() => {
              toggleSidebar();
              navigate("/dashboard/airtime");
            }}
            icon={<BarIcons img={airtimeIcon} />}
          >
            Buy Airtime
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("airtime-to-cash");
              toggleSidebar();
            }}
            icon={<BarIcons img={airtimeToCash} />}
          >
            Convert Airtime
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("electric-sub");
              toggleSidebar();
            }}
            icon={<BarIcons img={electricityIcon} />}
          >
            Electric sub
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("tv-sub");
              toggleSidebar();
            }}
            icon={<BarIcons img={tvSubIcon} />}
          >
            TV Subscription
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("bulk-sms");
              toggleSidebar();
            }}
            icon={<BarIcons img={bulksmsIco} />}
          >
            Bulk SMS
          </MenuItem>
          <MenuItem
            onClick={() => {
              toggleSidebar();
              navigate("school-card");
            }}
            icon={<BarIcons img={resultPinIcon} />}
          >
            Scratch card
          </MenuItem>

          <div className="mt-4 mx-4">
            {!collapsed && (
              <Divider>
                <Chip label="general" />
              </Divider>
            )}
          </div>
          <MenuItem
            onClick={() => {
              toggleSidebar();
              navigate("pricing");
            }}
            icon={<BarIcons img={pricingIcon} />}
          >
            Pricing
          </MenuItem>

          <MenuItem
            onClick={() => {
              toggleSidebar();
              navigate("transactions");
            }}
            icon={<BarIcons img={reportIcon} />}
          >
            Transaction report
          </MenuItem>

          <MenuItem
            onClick={() => {
              toggleSidebar();
              setComIndex(7);
              navigate("ourapp");
            }}
            icon={<BarIcons img={phoneIco} />}
          >
            Our App
          </MenuItem>
          <MenuItem
            onClick={() => {
              toggleSidebar();
              navigate("about");
            }}
            icon={<BarIcons img={aboutIco} />}
          >
            About Us
          </MenuItem>
          <MenuItem
            onClick={() => {
              toggleSidebar();
              navigate("contact");
            }}
            icon={<BarIcons img={supportIco} />}
          >
            Support
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
        className="align-items-center"
        style={{ display: "flex", margin: "10px", justifyContent: "end" }}
      >
        <img
          style={{ cursor: "pointer", width: "50px", height: "50px" }}
          src={siteLogo}
        />

        {!collapsed && <h4 className="m-2">{siteName}</h4>}
      </div>
    </div>
  );
};

const BarIcons = (props) => {
  return (
    <img
      style={{ width: "60px", height: "60px", padding: "20px" }}
      src={props.img}
    />
  );
};

const UserGreatings = () => {
  const [greating, setGreating] = useState("");
  const [greatingIcon, setGreatingIcon] = useState(sun);
  const { userName } = useContext(ServiceComContext);

  useEffect(() => {
    const date = new Date();
    const formatter = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      hour12: true,
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
      setGreatingIcon(afterNoonSunIcon);
    } else {
      greeting = "Good Evening";
      setGreatingIcon(moon);
    }

    setGreating(greeting);
  });

  return (
    <div className="greating-card p-2">
      <div className="center" style={{ fontSize: "small", color: "white" }}>
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
          avatar={<Avatar sx={{ bgcolor: "#daab2a" }}>F</Avatar>}
          label={
            <div className="m-2" style={{ color: "white" }}>
              <b>{userName}</b>
            </div>
          }
          variant="outlined"
        />
      </div>
    </div>
  );
};

export default SideNavBar;
