import { NavLink } from "react-router-dom"

import './LowerNav.css'

function LowerNav() {
    return (
        <div className="lower-nav-container">
            <NavLink to='/meals/current'>Your Meals</NavLink>
            <NavLink to='/foods'>Food</NavLink>
        </div>
    )
}

export default LowerNav
