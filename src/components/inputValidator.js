import React from "react";
import {
  Alert,
  Collapse,
  LinearProgress,
  Stack,
  Snackbar,
} from "@mui/material";

export default function Validator(props) {
  const isEmpty = (value) => {
    if (value === "") {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Collapse in={isEmpty(props.value)}>
      if(props.init === false)
      {<div style={{ color: "red" }}>Must be provided!</div>}
    </Collapse>
  );
}
