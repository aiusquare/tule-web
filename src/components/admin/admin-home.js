import { Paper } from "@mui/material";
import { MDBCard, MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import * as React from "react";
import { useState } from "react";
import request from "superagent";
import ReactSearchBox from "react-search-box";
import { useEffect } from "react";
import { baseApiUrl } from "../../services/setup";
import walletIcon from "../../pictures/wallet.png";
import openingAccIcon from "../../pictures/openingAcc.png";
import salesIcon from "../../pictures/sales.png";
import fundingsIcon from "../../pictures/deposits.png";
import pendingTransIcon from "../../pictures/pendngTrans.png";
import refundIcon from "../../pictures/refund.png";
import profitIcon from "../../pictures/profit.png";
import openingDepositsIcon from "../../pictures/openingDeposit.png";
import salesMadeIcon from "../../pictures/sale_tag.png";
import curDeposit from "../../pictures/curDeposits.png";
import apiBalanceIcon from "../../pictures/api_balance.png";
import amountOfPendingIcon from "../../pictures/money.png";

const AdminHomePage = () => {
  return (
    <MDBContainer>
      <MDBRow>
        <Paper className="p-2">
          <StatusLabel />
        </Paper>
      </MDBRow>
    </MDBContainer>
  );
};

const StatusLabel = (props) => {
  const [walletBalance, setWalletBalance] = useState(0);
  const [currentUsersDeposits, setCurrentDeposits] = useState(0);
  const [costOfSale, setCostOfSale] = useState(0);
  const [pendingTransactions, setPendingTransactions] = useState(0);
  const [amountOfPendingTransactions, setAmountOfPendingTransactions] =
    useState(0);
  const [profit, setProfits] = useState(0);
  const [accountDifference, setAccountDifference] = useState(0);
  const [sales, setSales] = useState(0);
  const [init, setInit] = useState(false);
  const [openingAcount, setOpeningAcount] = useState(0);
  const [openingUsersDeposit, setopeningUsersDeposit] = useState(0);

  useEffect(() => {
    if (!init) {
      handleDataFetch();
    }
  }, [init]);

  const handleDataFetch = async () => {
    try {
      const response = await request.get(baseApiUrl + "bussinessreport.php");

      const retVal = response.body;

      setWalletBalance(retVal.ourapiwallet);
      setCurrentDeposits(retVal.currentUsersDeposit);
      setCostOfSale(retVal.costofsale);
      setPendingTransactions(retVal.pendingTransactions);
      setAmountOfPendingTransactions(retVal.amountOfPendingTransactions);
      setProfits(retVal.profits);
      setAccountDifference(retVal.apibalance);
      setSales(retVal.sales);
      setOpeningAcount(retVal.openingAcount);
      setopeningUsersDeposit(retVal.openingUsersDeposit);

      setInit(true);
    } catch (err) {
      console.error("Error message:", err.response);
      console.error("ERROR", err);
    }
  };

  return (
    <div className=" m-2">
      <MDBContainer>
        <MDBRow>
          <BalanceCard
            amount={walletBalance}
            label="Wallet Balance"
            icon={walletIcon}
          />

          <BalanceCard
            label="Opening Account"
            amount={openingAcount}
            icon={openingAccIcon}
          />

          <BalanceCard
            label="Cost of Sales"
            amount={costOfSale}
            icon={salesIcon}
          />
        </MDBRow>

        <MDBRow>
          <BalanceCard
            amount={openingUsersDeposit}
            label="Opening User Deposits"
            icon={openingDepositsIcon}
          />
          <BalanceCard
            label="Current User Deposits"
            amount={currentUsersDeposits}
            icon={curDeposit}
          />
          <BalanceCard label="Sales Made" amount={sales} icon={salesMadeIcon} />
        </MDBRow>

        <MDBRow>
          <BalanceCard amount={0} label="Fundings" icon={fundingsIcon} />

          <BalanceCard
            label="Pending Transactions"
            amount={pendingTransactions}
            icon={pendingTransIcon}
          />

          <BalanceCard
            label="Amount of Pending Transactions"
            amount={amountOfPendingTransactions}
            icon={amountOfPendingIcon}
          />
        </MDBRow>

        <MDBRow>
          <BalanceCard
            amount={accountDifference}
            label="Account difference"
            icon={apiBalanceIcon}
          />
          <BalanceCard label="Refunds" amount={0} icon={refundIcon} />
          <BalanceCard
            label="Profit Gained"
            amount={profit}
            icon={profitIcon}
          />
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

const BalanceCard = (props) => {
  return (
    <MDBCol>
      <MDBCard className="shadow-1 p-3 m-1">
        <img style={{ width: "60px", height: "60px" }} src={props.icon} />
        <strong>{props.label}</strong>
        <div style={{ fontWeight: 900, color: "green" }}>N{props.amount}</div>
      </MDBCard>
    </MDBCol>
  );
};

export default AdminHomePage;
