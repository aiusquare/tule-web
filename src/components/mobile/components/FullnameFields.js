import { TextField,InputAdornment,Icon,IconButton } from "@mui/material"
import PropTypes from "prop-types";
import './FullnameFields.css';


const FullnameFields = ({ className="", fullname, fullnameSubLabelCPlacehol }) => {
  return (
    <div className={`fullname-fields ${className}`}>
      <div className="text-field1">
        <div className="fullname">{fullname}</div>
        <TextField className="fullname-sub-label-container" placeholder={fullnameSubLabelCPlacehol} variant="outlined" sx={{ "& fieldset": { border: "none" },"& .MuiInputBase-root": { height: "51px",backgroundColor: "rgba(238, 232, 222, 0.56)",borderRadius: "5px",fontSize: "12px" },"& .MuiInputBase-input": { color: "#000" } }} />
      </div>
    </div>);
};

FullnameFields.propTypes = {
  className: PropTypes.string,
  fullname: PropTypes.string,
  fullnameSubLabelCPlacehol: PropTypes.string
};

export default FullnameFields;
