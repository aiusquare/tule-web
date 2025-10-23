import { MDBBtn, MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SuccessAlert = (props) => {
  const refModal = useRef(null);
  const navigate = useNavigate();
  const message = props.message;

  useEffect(() => {
    if (props.showMe) {
      showModal();
    }
  }, [props.showMe]);

  const showModal = () => {
    refModal.current.show();
  };

  const hideModal = () => {
    refModal.current.hide();
  };

  return (
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
              hideModal();
            }}
            className="m-2 p-2 w-100"
          >
            Okay
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export const loader = ({ title, text }) => {
  Swal.fire({
    title: title,
    html: text,
    allowOutsideClick: false, // Disallow closing on click outside the modal
    allowEscapeKey: false,
    timerProgressBar: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
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
