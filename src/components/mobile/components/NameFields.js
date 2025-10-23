import { TextField,InputAdornment,Icon,IconButton } from "@mui/material"
import FullnameFields from "./FullnameFields";
import PropTypes from "prop-types";
import './NameFields.css';


const NameFields = ({ className="" }) => {
  return (
    <section className={`text-field-parent ${className}`}>
      <div className="text-field2">
        <div className="fullname1">Fullname</div>
        <TextField className="frame16" placeholder="Your fullname" variant="outlined" sx={{ "& fieldset": { border: "none" },"& .MuiInputBase-root": { height: "51px",backgroundColor: "rgba(238, 232, 222, 0.56)",borderRadius: "5px",fontSize: "12px" },"& .MuiInputBase-input": { color: "#000" } }} />
      </div>
      <div className="text-field3">
        <div className="fullname2">Email</div>
        <TextField className="frame17" placeholder="Your email" variant="outlined" sx={{ "& fieldset": { border: "none" },"& .MuiInputBase-root": { height: "51px",backgroundColor: "rgba(238, 232, 222, 0.56)",borderRadius: "5px",fontSize: "12px" },"& .MuiInputBase-input": { color: "#000" } }} />
      </div>
      <div className="text-field4">
        <div className="fullname3">Phone number</div>
        <TextField className="frame18" placeholder="Your number" variant="outlined" sx={{ "& fieldset": { border: "none" },"& .MuiInputBase-root": { height: "51px",backgroundColor: "rgba(238, 232, 222, 0.56)",borderRadius: "5px",fontSize: "12px" },"& .MuiInputBase-input": { color: "#000" } }} />
      </div>
      <div className="text-field5">
        <div className="fullname4">Password</div>
        <TextField className="frame19" placeholder="Create password" variant="outlined" sx={{ "& fieldset": { border: "none" },"& .MuiInputBase-root": { height: "51px",backgroundColor: "rgba(238, 232, 222, 0.56)",borderRadius: "5px",fontSize: "12px" },"& .MuiInputBase-input": { color: "#000" } }} />
      </div>
      <div className="text-field6">
        <div className="fullname5">Confirm password</div>
        <TextField className="frame20" placeholder="Confirm your password" variant="outlined" sx={{ "& fieldset": { border: "none" },"& .MuiInputBase-root": { height: "51px",backgroundColor: "rgba(238, 232, 222, 0.56)",borderRadius: "5px",fontSize: "12px" },"& .MuiInputBase-input": { color: "#000" } }} />
      </div><FullnameFields fullname="Pin" fullnameSubLabelCPlacehol="Your pin" /><FullnameFields fullname="Confirm pin" fullnameSubLabelCPlacehol="Confirm your pin" />
    </section>);
};

NameFields.propTypes = {
  className: PropTypes.string
};

export default NameFields;
