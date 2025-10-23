import {
  MDBBtn,
  MDBCard,
  MDBCol,
  MDBContainer,
  MDBModal,
  MDBModalDialog,
  MDBRow,
} from "mdb-react-ui-kit";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// import DropModal from "reboron/DropModal";
const htmlToImage = require("html-to-image");

const DataCard = (props) => {
  const refModal = useRef(null);
  const navigate = useNavigate();
  const cardData = props.cardData;
  const [imageURL, setImageURL] = useState(null);

  const showModal = () => {
    refModal.current.show();
  };

  const hideModal = () => {
    refModal.current.hide();
  };

  if (props.showMe) {
    showModal();
  }

  return (
    // <DropModal
    //   className="rounded s-dialod-box d-flex justify-content-center align-items-center"
    //   ref={refModal}
    //   closeOnClick={false}
    //   keyboard={() => this.callback()}
    // >
    <MDBModal>
      <MDBModalDialog>
        <MDBContainer className="d-flex flex-column align-items-center justify-content-center p-4">
          <MDBRow>
            <MDBCol>
              <div className="py-4" style={{ fontSize: "18px" }}>
                Successful!
              </div>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol>
              <DataCouponCard {...cardData} />
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol>
              <MDBBtn
                onClick={() => {
                  let nav = props.nav;
                  if (nav == "/login") {
                    navigate(props.nav);
                  } else {
                    window.location.reload();
                  }
                  hideModal();
                }}
                className="m-2 p-2 w-100"
              >
                Okay
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </MDBModalDialog>
    </MDBModal>

    // </DropModal>
  );
};

function DataCouponCard(props) {
  const downloadReceipt = () => {
    const receiptNode = document.getElementById("receipt");
    htmlToImage
      .toPng(receiptNode)
      .then((dataURL) => {
        const link = document.createElement("a");
        link.download = timeStamp() + ".png";
        link.href = dataURL;
        link.click();
      })
      .catch((error) => {
        console.error("Error generating receipt image:", error);
      });
  };

  useEffect(() => {
    downloadReceipt();
  });

  return (
    <div id="receipt" className="data-coupon-card rounded">
      <div>
        <div>
          <h5 className="p-4" style={{ color: "white", textAlign: "center" }}>
            <b>{props.cardName}</b>
          </h5>
        </div>
        <div className="d-flex flex-column align-items-center justify-content-center p-1">
          <div className="pin-bg rounded px-2 d-flex align-items-center">
            <p
              className="m-auto"
              style={{ color: "white", textAlign: "center" }}
            >
              <b>
                PIN:<span className="px-2">{props.pin}</span>
              </b>
            </p>
          </div>
        </div>
        <div>
          <p
            className="mx-4 px-4"
            style={{
              color: "whitesmoke",
              textAlign: "left",
              whiteSpace: "nowrap",
            }}
          >
            <b>
              SERIAL NUMBER:<span className="px-2">{props.serial}</span>
            </b>
          </p>
        </div>
        <div>
          <p
            className="mt-2"
            style={{
              color: "whitesmoke",
              fontSize: "12px",
              textAlign: "center",
            }}
          >
            redeem it by dailing {props.code}
          </p>
        </div>
      </div>
    </div>
  );
}

function ElectricSubCard(props) {
  const downloadReceipt = () => {
    const receiptNode = document.getElementById("receipt");
    htmlToImage
      .toPng(receiptNode)
      .then((dataURL) => {
        const link = document.createElement("a");
        link.download = timeStamp() + ".png";
        link.href = dataURL;
        link.click();
      })
      .catch((error) => {
        console.error("Error generating receipt image:", error);
      });
  };

  useEffect(() => {
    downloadReceipt();
  });

  return (
    <div id="receipt" className="data-coupon-card rounded">
      <div>
        <div>
          <h5 className="p-4" style={{ color: "white", textAlign: "center" }}>
            <b>{props.cardName}</b>
          </h5>
        </div>
        <div className="d-flex flex-column align-items-center justify-content-center p-1">
          <div className="pin-bg rounded px-2 d-flex align-items-center">
            <p
              className="m-auto"
              style={{ color: "white", textAlign: "center" }}
            >
              <b>
                TOKEN:<span className="px-2">{props.pin}</span>
              </b>
            </p>
          </div>
        </div>
        <div>
          <p
            className="mx-4 px-4"
            style={{
              color: "whitesmoke",
              textAlign: "left",
              whiteSpace: "nowrap",
            }}
          >
            <b>
              SERIAL NUMBER:<span className="px-2">{props.serial}</span>
            </b>
          </p>
        </div>
        <div>
          <p
            className="mt-2"
            style={{
              color: "whitesmoke",
              fontSize: "12px",
              textAlign: "center",
            }}
          >
            redeem it by dailing {props.code}
          </p>
        </div>
      </div>
    </div>
  );
}

const timeStamp = () => {
  // Get current date and time using Date object
  const currentDate = new Date();

  // Extract individual parts of the date and time
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Month is zero-indexed, so add 1
  const day = currentDate.getDate();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  // Format the timestamp as a string
  const timestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return timestamp;
};

export default DataCard;
