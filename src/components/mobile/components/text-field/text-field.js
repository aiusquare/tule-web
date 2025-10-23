import {
  TextField,
  InputAdornment,
  Icon,
  IconButton,
  Button,
} from "@mui/material";
import "./style.css";

const CusTextField = (props) => {
  return (
    <div className="text-field-container">
      <div style={{ fontSize: "12px", fontWeight: "bold" }} className="label">
        {props.label}
      </div>
      <TextField
        onChange={(e) => {
          props.onChange(e.target.value);
        }}
        className="field"
        placeholder={props.placeholder}
        variant="outlined"
        type={props.type}
        sx={{
          "& fieldset": { border: "none" },
          "& .MuiInputBase-root": {
            height: "40px",
            backgroundColor: "rgba(238, 232, 222, 0.56)",
            borderRadius: "5px",
            fontSize: "12px",
          },
          "& .MuiInputBase-input": { color: "#000" },
        }}
      />
    </div>
  );
};

export default CusTextField;
