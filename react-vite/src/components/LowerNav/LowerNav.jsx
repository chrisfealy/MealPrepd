import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import './LowerNav.css'

function LowerNav() {
    const user = useSelector(state => state.session.user)

    return (
        <div className="lower-nav-container">
            {user && (
                <NavLink to='/meals/current'>Your Meals</NavLink>
            )}
            <NavLink to='/foods'>Food</NavLink>
        </div>
    )
}

export default LowerNav
