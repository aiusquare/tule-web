import * as React from "react";
import { useState } from "react";
import { MDBCard } from "mdb-react-ui-kit";
import { MenuItem, ProSidebarProvider } from "react-pro-sidebar";
import "../../css/style.css";
import SideNavBar from "./sideNavBar";
import { Menu } from "@mui/material";
import TopBar from "./dashboardNavbar";

import { Outlet, useLocation } from "react-router-dom";

export const ServiceComContext = React.createContext();

export default function AdminDashBoard() {
  const dashboardRef = React.useRef(null);
  const location = useLocation();

  // if (location.state.data !== null) {
  //   const userData = location.state.data;
  // }

  // const [userName, setUserName] = useState("");
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <ProSidebarProvider>
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
              <MDBCard className=" shadow-2 m-4 w-100">
                <ServiceComContext.Consumer>
                  {(contextData) => <Outlet {...contextData} />}
                </ServiceComContext.Consumer>
              </MDBCard>
            </div>
          </div>
        </div>
      </div>
    </ProSidebarProvider>
  );
}
