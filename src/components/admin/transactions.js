import * as React from "react";
import Paper from "@mui/material/Paper";
import "../admin/css/style.css";
import { MDBCardBody, MDBCardText } from "mdb-react-ui-kit";
import {
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import request from "superagent";
import { baseApiUrl } from "../../services/setup";
import ReactSearchBox from "react-search-box";

export default function CustomersTransactionsPage() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [tabIndex, setTabIndex] = React.useState(0);
  const [rows, setRows] = useState([]);
  const [init, setInit] = useState(false);

  const statuses = ["All", "Successful", "Pending", "Failed"];

  const columns = [
    { id: "user", label: "User" },
    { id: "refrance", label: "Refrance" },
    { id: "description", label: "Description", minWidth: 150 },
    { id: "prevBal", label: "Previous Balance" },
    { id: "curBal", label: "Current Balance" },
    { id: "date", label: "Date" },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request.get(
          baseApiUrl + "admin/transactions/index.php"
        );

        const theData = response.body;

        setRows(theData);
        setInit(true);
      } catch (err) {
        console.error("Error message:", err.response);
      }
    };

    if (!init) {
      fetchData();
    }
  }, [init]);

  return (
    <div className="m-4 d-flex flex-column align-items-center">
      <MDBCardBody>
        <MDBCardText>
          <h4>Customers Transactions</h4>
        </MDBCardText>
      </MDBCardBody>
      <Paper className="p-2 w-100">
        <Tabs
          textColor="white"
          variant="fullWidth"
          value={tabIndex}
          onChange={(e, i) => {
            setTabIndex(i);
            // setAccount(accounts[i]);
          }}
          scrollButtons="auto"
        >
          {statuses.map((e, i) => {
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

        <TableContainer
          sx={{
            maxHeight: 440,
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
          }}
        >
          <Table stickyHeader aria-label="styled table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    sx={{
                      backgroundColor: "#1976d2",
                      color: "#ffffff",
                      fontWeight: "bold",
                      minWidth: column.minWidth,
                      textAlign: "center",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={index}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                    "&:hover": { backgroundColor: "#f1f1f1" },
                  }}
                >
                  <TableCell sx={{ padding: "8px", textAlign: "center" }}>
                    {row.userId}
                  </TableCell>
                  <TableCell sx={{ padding: "8px", textAlign: "center" }}>
                    {row.refNo}
                  </TableCell>
                  <TableCell sx={{ padding: "8px", textAlign: "center" }}>
                    {row.details}
                  </TableCell>
                  <TableCell sx={{ padding: "8px", textAlign: "center" }}>
                    ₦{row.prevBal}
                  </TableCell>
                  <TableCell sx={{ padding: "8px", textAlign: "center" }}>
                    ₦{row.newBal}
                  </TableCell>
                  <TableCell sx={{ padding: "8px", textAlign: "center" }}>
                    {row.date}
                  </TableCell>
                </TableRow>
              ))}
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
