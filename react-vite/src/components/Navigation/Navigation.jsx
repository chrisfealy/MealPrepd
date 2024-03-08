import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import logo from '../../../../images/mealprepd-light.png';

function Navigation() {
  return (
    <div className="nav-container">
      <div className="nav-left">
        <NavLink to='/'><img src={logo} alt="MealPrepd" className="nav-logo"/></NavLink>
        <NavLink to="/">MealPrepd</NavLink>
      </div>
      <div className="nav-right">
        <ProfileButton />
      </div>
    </div>
  );
}

export default Navigation;
