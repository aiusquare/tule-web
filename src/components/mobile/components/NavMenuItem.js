import "./NavMenuItem.css";

const NavMenuItem = (props) => {
  return (
    <div onClick={props.handleClick} className="nav-menu-item">
      <img className="nav-menu-icon" loading="lazy" alt="" src={props.icon} />
      <div className="nav-menu-label">{props.labelText}</div>
    </div>
  );
};

export default NavMenuItem;
