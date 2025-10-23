import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import ReactSearchBox from "react-search-box";
import { MDBCard, MDBCardBody, MDBCardText } from "mdb-react-ui-kit";
import { Tab, Tabs } from "@mui/material";
import "firebase/compat/database";
import "firebase/compat/storage";
import { firebase, database } from "../services/config";
import { useContext } from "react";
import { ServiceComContext } from "./dashboard";
import { useEffect } from "react";
import { useState } from "react";
import request from "superagent";
import { baseApiUrl } from "../services/setup";

const columns = [
  { id: "refrance", label: "Refrance", minWidth: 100 },
  { id: "description", label: "Description", minWidth: 150 },
  { id: "prevBal", label: "Previous Balance", minWidth: 70 },
  { id: "curBal", label: "Current Balance", minWidth: 70 },
  { id: "date", label: "Date", minWidth: 50 },
];
const services = [
  "All Transactions",
  "Data",
  "Airtime",
  "Data card",
  "Electricity",
  "TV Subscription",
];

export default function TransactionsComponent() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [tabIndex, setTabIndex] = React.useState(0);
  const [service, setService] = React.useState("Data");
  const [rows, setRows] = useState([]);
  const [init, setInit] = useState(false);
  const { uniqueId } = useContext(ServiceComContext);
  const userId = uniqueId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = {
          email: uniqueId,
        };

        const response = await request
          .post(baseApiUrl + "transactions.php")
          .type("application/json")
          .send(req);

        const theData = response.body;

        setRows(theData);
        setInit(true);
      } catch (err) {
        // console.error("Error message:", err.response);
        // console.error("ERROR", err);
      }
    };

    fetchData();
  }, [init]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = (e, i) => {
    setTabIndex(i);
    // setAccount(accounts[i]);
  };

  return (
    <div
      className="m-4 d-flex flex-column align-items-center"
      // ref={refBuyAirtime}
    >
      <MDBCardBody>
        <MDBCardText>
          <h3>TRANSACTIONS HISTORY</h3>
        </MDBCardText>
      </MDBCardBody>
      <MDBCard className="shadow-2 m-2 w-100">
        <Tabs
          textColor="white"
          variant="fullWidth"
          value={tabIndex}
          onChange={handleChange}
          scrollButtons="auto"
        >
          {services.map((e, i) => {
            return (
              <Tab
                key={i}
                className="tab-t-size "
                // style={{ whiteSpace: "nowrap" }}
                label={e}
              />
            );
          })}
        </Tabs>
        <div className="w-50 m-2">
          <ReactSearchBox
            placeholder="Search for record by refrance number"
            data={rows}
            leftIcon={
              <>
                <i class="fas fa-magnifying-glass"></i>
              </>
            }
            iconBoxSize="48px"
            autoFocus
          />
        </div>
      </MDBCard>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {service === "Data" &&
                  columns.map((column) => (
                    <TableCell
                      key={column.id}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, id) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={id}>
                    {<TableCell key={id + 1}>{row.refNo}</TableCell>}
                    {<TableCell key={id + 2}>{row.details}</TableCell>}
                    {<TableCell key={id + 3}>₦{row.prevBal}</TableCell>}
                    {<TableCell key={id + 4}>₦{row.newBal}</TableCell>}
                    {<TableCell key={id + 5}>{row.date}</TableCell>}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export function saveTransaction(data, uniqueId) {
  const transaction = {
    service: data.service,
    details: data.details,
    refNo: data.refNo,
    date: data.date,
  };

  let tref = database.ref("/Customers/" + uniqueId + "/transactions");
  tref.push(transaction);
}
