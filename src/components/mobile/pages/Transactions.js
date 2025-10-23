import React, { useRef, useState, useEffect } from "react";
import "./Login.css";
import walletInit from "../../../pictures/icn/wallet_blue.png";
import walletCur from "../../../pictures/icn/wallet_green.png";
import { Button } from "@mui/material";
import Receipt from "../components/Reciept";
import request from "superagent";
import { appMainColor, baseApiUrl } from "../../../services/setup";

const MobileTransactions = () => {
  const userId = localStorage.getItem("email");
  const [init, setInit] = useState(false);
  const [rows, setRows] = useState([]);
  const receiptRefs = useRef({}); // Store refs for all receipts

  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = { email: userId };

        const response = await request
          .post(baseApiUrl + "transactions.php")
          .type("application/json")
          .send(req);

        const theData = response.body;
        setRows(theData);
        setInit(true);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    };

    fetchData();
  }, [init]);

  // Helper to initialize refs dynamically
  const getOrCreateRef = (refNo) => {
    if (!receiptRefs.current[refNo]) {
      receiptRefs.current[refNo] = React.createRef();
    }
    return receiptRefs.current[refNo];
  };

  return (
    <div className="d-flex flex-column align-items-center mt-4">
      <div>
        <strong>TRANSACTIONS</strong>
      </div>
      <div className="body-section">
        {rows.map((row, id) => {
          const receiptRef = getOrCreateRef(row.refNo); // Dynamically get or create ref
          return (
            <TransactionCard
              key={id + 1}
              refNo={row.refNo}
              details={row.details}
              initBalance={row.prevBal}
              curBalance={row.newBal}
              amount={row.amount}
              date={row.date}
              transMode={row.mode}
              transType={row.service}
              status={row.status}
              unit={row.serviceUnit}
              recipient={row.recipient}
              receiptRef={receiptRef} // Pass unique ref for each transaction
              {...row}
            />
          );
        })}
      </div>
    </div>
  );
};

const TransactionCard = ({
  status,
  refNo,
  transType,
  details,
  initBalance,
  curBalance,
  transMode,
  amount,
  date,
  unit,
  business,
  recipient,
  receiptRef, // Receive unique ref for this transaction
}) => {
  const handlePrintReceipt = () => {
    if (receiptRef.current) {
      receiptRef.current.shareReceipt(); // Trigger shareReceipt for this transaction
    }
  };

  return (
    <div style={{ fontSize: "small" }} className="card m-2 p-2 shadow-1">
      <table>
        <tr>
          <td colSpan="2">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <strong style={{ textTransform: "uppercase" }}>
                {transType}
              </strong>
              <div
                style={{
                  fontSize: "14px",
                  color: "green",
                  textTransform: "uppercase",
                }}
              >
                <strong>{status}</strong>
              </div>
            </div>
            <div>{details}</div>
          </td>
          <td></td>
        </tr>

        <tr>
          <td>
            <div style={{ fontSize: "smaller" }}>
              <img src={walletInit} className="wallet-icon" alt="w" />
              Initial balance:
            </div>
            <div style={{ color: "darkblue" }}>
              <strong>N{initBalance}</strong>
            </div>
          </td>
          <td>
            <div style={{ fontSize: "smaller" }}>
              <img src={walletCur} className="wallet-icon" alt="w" />
              Current balance:
            </div>
            <div style={{ color: "darkgreen" }}>
              <strong>N{curBalance}</strong>
            </div>
          </td>
        </tr>

        <tr>
          <td>
            <div>
              <strong>{transMode}</strong>
            </div>
          </td>
          <td>
            <div>
              Amount: <strong style={{ color: "darkred" }}>N{amount}</strong>
            </div>
          </td>
        </tr>

        <tr>
          <td>
            <div>Reference: {refNo}</div>
          </td>
          <td>
            <div>Date: {date}</div>
          </td>
        </tr>
      </table>

      <Button
        className="w-50"
        variant="contained"
        sx={{
          textTransform: "none",
          color: "#fff",
          fontSize: "12px",
          background: appMainColor,
          "&:hover": { background: appMainColor },
          height: 30,
        }}
        onClick={handlePrintReceipt} // Trigger the shareReceipt function for this transaction
      >
        Print Receipt
      </Button>

      <Receipt
        ref={receiptRef}
        id={`receipt-${refNo}`} // Generate a unique ID based on refNo
        recipient={recipient}
        refNo={refNo}
        service={transType}
        date={date}
        unit={unit}
        status={status}
        business={business}
      />
    </div>
  );
};

export default MobileTransactions;
