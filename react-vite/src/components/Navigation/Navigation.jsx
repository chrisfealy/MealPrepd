import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <div className="nav-container">
      <div className="nav-left">
        <NavLink to='/'><i className="fa-solid fa-utensils"/></NavLink>
        <NavLink to="/">MealPrepd</NavLink>
      </div>
      <div className="nav-right">
        <ProfileButton />
      </div>
    </div>
  );
}

export default Navigation;
