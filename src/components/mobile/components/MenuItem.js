import PropTypes from "prop-types";
import "./MenuItem.css";

const MenuItem = (props) => {
  return (
    <div onClick={props.handleClick} className="menu-item">
      <img className="menu-icon" loading="lazy" alt="" src={props.icon} />
      <div className="menu-label">{props.labelText}</div>
    </div>
  );
};

MenuItem.propTypes = {
  labelText: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default MenuItem;
