import "./Login.css";

import walletInit from "../../../pictures/icn/wallet_blue.png";
import walletCur from "../../../pictures/icn/wallet_green.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Toast } from "../../alert";
import Spinner from "../../spinner";
import request from "superagent";
import { baseApiUrl } from "../../../services/setup";
import "./UserProfile.css";

const MobileUserProfile = () => {
  const navigate = useNavigate();

  const userId = localStorage.getItem("email");
  const [init, setInit] = useState(false);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = {
          email: userId,
        };

        const response = await request
          .post(baseApiUrl + "transactions.php")
          .type("application/json")
          .send(req);

        const theData = response.body;
        // console.log(theData);

        setRows(theData);
        setInit(true);
      } catch (err) {
        // console.error("Error message:", err.response);
        // console.error("ERROR", err);
      }
    };

    fetchData();
  }, [init]);

  return (
    <div className="d-flex flex-column align-items-center mt-4">
      <div>
        <strong>TRANSACTIONS</strong>
      </div>
      <div className="body-section">
        {rows.map((row, id) => {
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
            />
          );
        })}
      </div>
    </div>
  );
};

const TransactionCard = ({
  refNo,
  transType,
  details,
  initBalance,
  curBalance,
  transMode,
  amount,
  date,
}) => {
  return (
    <div style={{ fontSize: "small" }} className="card m-2 p-2 shadow-1">
      <table>
        <tr>
          <td colSpan={2}>
            <div>
              <strong>{transType}</strong>
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
    </div>
  );
};

export default MobileUserProfile;
