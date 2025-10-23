import * as React from "react";
import Paper from "@mui/material/Paper";
import "../admin/css/style.css";
import {
  MDBBtn,
  MDBCardBody,
  MDBCardText,
  MDBCol,
  MDBRow,
} from "mdb-react-ui-kit";
import { useState } from "react";
import request from "superagent";
import Swal from "sweetalert2";
import { MuiFileInput } from "mui-file-input";
import CloseIcon from "@mui/icons-material/Close";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { appMainColor, baseApiUrl } from "../../services/setup";
import { loader } from "./alert";
import { Toast } from "../alert";

export default function ServicePricingPage() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e);
  };

  const handleSubmit = async (e) => {
    if (!file) {
      Swal.fire({
        title: "Error!",
        text: "No file selected",
        icon: "error",
      });
      return;
    }

    loader({
      title: "Uploading",
      text: "Please wait...",
    });

    const formData = new FormData();
    formData.append("csv", file); // Ensure the name 'csv' matches your PHP script

    try {
      const res = await request
        .post(baseApiUrl + "/pricing/upload/index.php")
        .send(formData)
        .set("Accept", "application/json");

      Toast.fire({
        icon: "success",
        title: "Uploaded successfully",
      });
      setFile(null);
    } catch (err) {
      console.error("Error uploading file", err);
      Swal.fire({
        title: "Error!",
        text: "There was an error uploading the file.",
        icon: "error",
      });
    }
  };

  return (
    <div className="m-4 d-flex flex-column align-items-center">
      <MDBCardBody>
        <MDBCardText>
          <h4>Service Pricing</h4>
        </MDBCardText>
      </MDBCardBody>

      <Paper className="mt-2" sx={{ width: "100%", overflow: "hidden" }}>
        <MDBRow style={{ padding: "10px" }}>
          <div style={{ fontWeight: "900", padding: "20px" }}>DATA PRICING</div>
          <MDBCol style={{ display: "flex", justifyContent: "center" }}>
            <div>
              <MuiFileInput
                InputProps={{
                  inputProps: {
                    accept: ".csv",
                  },
                  startAdornment: <AttachFileIcon />,
                }}
                value={file}
                placeholder="choose the pricing file here..."
                onChange={(e) => {
                  handleFileChange(e);
                }}
                clearIconButtonProps={{
                  title: "Remove",
                  children: <CloseIcon fontSize="small" />,
                }}
              />

              <MDBBtn
                onClick={handleSubmit}
                style={{ background: appMainColor, height: "56px" }}
                className="p-3"
              >
                Upload
              </MDBBtn>
            </div>
          </MDBCol>
        </MDBRow>
      </Paper>
    </div>
  );
}
