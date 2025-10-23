import React, { useState } from "react";
import { MDBNavbar, MDBContainer, MDBNavbarNav } from "mdb-react-ui-kit";

import userLogo from "../pictures/user_1.png";
import telIcon from "../pictures/telephone.png";
import { MenuItem, useProSidebar } from "react-pro-sidebar";
import { Avatar, Badge, Menu } from "@mui/material";
import { styled } from "@mui/material/styles";
import SettingsMenu from "./dashboardMenu";
import Notification from "./notification";
import { contactNumber } from "../services/setup";

export default function TopBar() {
  const { broken, toggleSidebar } = useProSidebar();

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  return (
    <MDBNavbar expand="lg" light bgColor="light">
      <MDBContainer className="d-flex" fluid>
        {broken && (
          <i
            style={{ cursor: "pointer" }}
            onClick={() => {
              toggleSidebar();
            }}
            class="fas fa-bars ml-4"
          ></i>
        )}
        {!broken && <ActionTogler />}
        <MDBNavbarNav className="w-auto ">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              className="mx-2 dashboard-contact"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Avatar
                sx={{ width: 30, height: 30 }}
                src={telIcon}
                variant="rounded"
              />
              <span style={{ marginLeft: "5px" }}>{contactNumber}</span>
            </div>

            <div className="mx-2">
              <Notification />
            </div>
            <div className="mx-4">
              <SettingsMenu />
            </div>
          </div>
        </MDBNavbarNav>
      </MDBContainer>
    </MDBNavbar>
  );
}

const ActionTogler = () => {
  const { collapsed, toggled, toggleSidebar, collapseSidebar } =
    useProSidebar();

  const toggle = () => {
    toggleSidebar();
    if (toggled) {
      console.log(true);
      collapseSidebar();
    } else {
      console.log(false);
      collapseSidebar();
    }
  };

  return (
    <div>
      {!collapsed && (
        <i
          onClick={() => {
            toggle();
          }}
          style={{ cursor: "pointer" }}
          class="fas fa-angle-double-left"
        ></i>
      )}
      {collapsed && (
        <i
          onClick={() => {
            toggle();
          }}
          style={{ cursor: "pointer" }}
          class="fas fa-angle-double-right"
        ></i>
      )}
    </div>
  );
};
