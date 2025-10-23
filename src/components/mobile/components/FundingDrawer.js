import React, { useState } from "react";
import { Drawer, Box, Button, Alert, Snackbar } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "./FundingDrawer.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import { MDBIcon, MDBInput, MDBInputGroup } from "mdb-react-ui-kit";
import CopyToClipboard from "react-copy-to-clipboard";

const FundingDrawer = ({ open, onClose, accounts }) => {
  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          borderRadius: "20px 20px 0px 0px", // Rounded corners at the top
          padding: "20px",
          boxShadow: "inset 0px 4px 10px rgba(0, 0, 0, 0.2)", // Inset shadow for the inset effect
          border: "1px solid #ddd", // Optional: border for a defined outline
          backgroundColor: "#ffffff", // Optional: change background color
        },
      }}
    >
      <Box>
        <h3 style={{ fontSize: "medium" }}>Funding Accounts</h3>

        <div>
          <p style={{ fontSize: "9px", whiteSpace: "normal" }}>
            Transfer to any of the below account to make an automatic funding to
            your wallet. Note that! <strong>N45</strong> charges is applied to
            cover transaction fees
          </p>
        </div>

        <div style={{ height: "100%" }} className="">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            pagination={{
              clickable: true,
            }}
            navigation={false}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {accounts.map((account) => {
              return (
                <SwiperSlide>
                  <AccountCard
                    accName={account.name}
                    accNumber={account.accountNumber}
                    bankName={account.bank}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </Box>
    </Drawer>
  );
};

export default FundingDrawer;

const AccountCard = (props) => {
  const [copied, setCopied] = useState(false);

  return (
    <div className="account-card">
      <div className="horizontal-container">
        <div>Account Name</div>
        <div>{props.accName}</div>
      </div>
      <div className="horizontal-container">
        <div>Account Number</div>

        <div>
          <Snackbar
            style={{ position: "absolute" }}
            open={copied}
            anchorOrigin={{
              horizontal: "center",
              vertical: "top",
            }}
            autoHideDuration={6000}
            onClose={() => {
              setCopied(false);
            }}
          >
            <Alert severity="success" sx={4}>
              link copied
            </Alert>
          </Snackbar>

          <MDBInputGroup
            noWrap
            textAfter={
              <CopyToClipboard
                text={props.accNumber}
                onCopy={() => {
                  setCopied(true);
                }}
              >
                <MDBIcon
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="zindex-alert"
                  style={{
                    cursor: "pointer",
                    color: "black",
                  }}
                  fas
                  icon="paste"
                />
              </CopyToClipboard>
            }
          >
            <MDBInput
              type="text"
              value={props.accNumber}
              disabled
              style={{
                width: "130px",
                background: "white",
                color: "black",
                fontStyle: "bold",
              }}
            />
          </MDBInputGroup>
        </div>
      </div>
      <div className="horizontal-container">
        <div>Bank Name</div>
        <div>{props.bankName}</div>
      </div>
    </div>
  );
};
