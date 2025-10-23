import React, { forwardRef, useImperativeHandle } from "react";
import * as htmlToImage from "html-to-image";
import "./Receipt.css"; // Import CSS for styling
import Swal from "sweetalert2";
import { Toast } from "../../alert";

const Receipt = forwardRef(({ id, ...props }, ref) => {
  const shareReceipt = async () => {
    const receiptNode = document.getElementById(id); // Use the unique ID
    receiptNode.style.display = "block";

    // Swal.fire({
    //   title: "Login...",
    //   html: `<p style="font-size: 14px; color: #333; margin: 0;">Please wait a bit more while we take you in</p>`,
    //   allowOutsideClick: false,
    //   allowEscapeKey: false,
    //   timerProgressBar: false,
    //   didOpen: async () => {
    //     Swal.showLoading();
    //   },
    // });

    Swal.showLoading();

    try {
      if (window.AndroidInterface && window.AndroidInterface.shareReceipt) {
        const dataUrl = await htmlToImage.toPng(receiptNode);
        const base64Image = dataUrl.split(",")[1];
        window.AndroidInterface.shareReceipt(base64Image);
      } else {
        const dataURL = await htmlToImage.toPng(receiptNode, {
          skipFonts: true,
        });
        const link = document.createElement("a");
        link.download = `${timeStamp()}.png`;
        link.href = dataURL;
        link.click();
      }
    } catch (error) {
      console.error("Failed to generate or share receipt:", error);
    } finally {
      receiptNode.style.display = "none";
      // Toast.fire({ title: "success", text: "shared successfully" });
      Swal.close();
    }
  };

  const timeStamp = () => new Date().toISOString().replace(/[:.]/g, "-");

  useImperativeHandle(ref, () => ({
    shareReceipt,
  }));

  return (
    <div id={id} className="receipt">
      <div id="invoice-POS">
        <center id="top">
          <div class="logo"></div>
          <div class="info">
            <h2>RECEIPT</h2>
          </div>
        </center>

        {/* <div id="mid">
          <div class="info">
            <h2>Contact Info</h2>
            <p>
              Address : street city, state 0000
              <br />
              Email : JohnDoe@gmail.com
              <br />
              Phone : 555-555-5555
              <br />
            </p>
          </div>
        </div> */}

        <div id="bot">
          <div id="table">
            <table>
              <tr class="tabletitle">
                <td class="item">
                  <h2>Details</h2>
                </td>

                <td class="Rate">
                  <h2></h2>
                </td>
              </tr>

              <tr class="service">
                <td class="tableitem">
                  <p class="itemtext">Transaction type</p>
                </td>

                <td class="tableitem">
                  <p class="itemtext">{props.service.toUpperCase()}</p>
                </td>
              </tr>

              <tr class="service">
                <td class="tableitem">
                  <p class="itemtext">Unit</p>
                </td>

                <td class="tableitem">
                  <p class="itemtext">{props.unit}</p>
                </td>
              </tr>

              <tr class="service">
                <td class="tableitem">
                  <p class="itemtext">Recipient</p>
                </td>

                <td class="tableitem">
                  <p class="itemtext">
                    <strong>{props.recipient}</strong>
                  </p>
                </td>
              </tr>

              <tr class="service">
                <td class="tableitem">
                  <p class="itemtext">Status</p>
                </td>

                <td class="tableitem">
                  <p
                    className="itemtext"
                    style={{
                      color:
                        props.status === "success"
                          ? "green"
                          : props.status === "fail"
                          ? "red"
                          : "orange",
                    }}
                  >
                    {props.status === "success"
                      ? "Successful"
                      : props.status === "fail"
                      ? "Failed"
                      : "Processing"}
                  </p>
                </td>
              </tr>

              <tr class="tabletitle">
                <td class="Rate">
                  <h2>Reference</h2>
                </td>
                <td class="payment">
                  <strong>{props.refNo}</strong>
                </td>
              </tr>

              <tr class="tabletitle">
                <td class="Rate">
                  <h2>Date</h2>
                </td>
                <td class="payment">
                  {/* <h2>15th Feb, 2025</h2> */}
                  <strong>{props.date}</strong>
                </td>
              </tr>
            </table>
          </div>

          <div id="legalcopy">
            <p class="legal">
              <strong>Thank you for your business!</strong> continue enjoying
              seemless services.
            </p>
          </div>
        </div>
      </div>

      {/* Use dynamic ID */}
      {/* <div className="header">
        <div style={{ fontSize: "18px" }}>
          <strong>{props.business}</strong>
        </div>
        <h1>
          <strong>{props.unit}</strong>
        </h1>
        <p style={{ color: props.status === "success" ? "green" : "orange" }}>
          {props.status === "success" ? "Successful" : "Processing"} Transaction
        </p>
        <p>
          <strong>{props.date}</strong>
        </p>
      </div>
      <div className="section">
        <h2>Recipient:</h2>
        <p>{props.recipient}</p>
      </div>
      <div className="section">
        <h2>Transaction Info</h2>
        <p>
          <strong>Transaction Type:</strong> {props.service.toUpperCase()}
        </p>
        <p>
          <strong>Transaction ID:</strong> {props.refNo}
        </p>
      </div>
      <footer>
        <p>Enjoy Seamless service.</p>
      </footer> */}
    </div>
  );
});

export default Receipt;
