import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBModalHeader,
  MDBModalTitle,
  MDBRow,
} from "mdb-react-ui-kit";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SuccessAlert = (props) => {
  const navigate = useNavigate();
  const message = props.message;

  return (
    <MDBModal open={props.showMe} tabIndex="1">
      <MDBModalDialog>
        <MDBContainer className="d-flex flex-column align-items-center justify-content-center p-4">
          <MDBRow>
            <MDBCol className="d-flex justify-content-center align-items-center text-center">
              <div>{message}</div>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol>
              <MDBBtn
                onClick={() => {
                  let nav = props.nav;
                  if (nav === "/login") {
                    navigate(props.nav);
                  } else {
                    window.location.reload();
                  }
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
  );
};

export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

export default SuccessAlert;
