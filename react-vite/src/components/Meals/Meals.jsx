import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { thunkGetUserMeals } from "../../redux/meals"
import './Meals.css'

function Meals() {
    const dispatch = useDispatch()
    const meals = useSelector(state => Object.values(state.meals))

    useEffect(() => {
        dispatch(thunkGetUserMeals())
    }, [dispatch])

    return (
        <div className="user-meals-container">
            <div className="user-meals-create">
                <Link to={`/meals/new`}>Create meal</Link>
            </div>
            <div className="user-meals-grid">
                {meals.map(meal => (
                    <Link to={`/meals/${meal.id}`} key={meal.id}>
                        <div className="user-meal-card">
                            <img src={meal?.image_url} alt={meal?.name} className="user-meal-card-image" />
                            <div className="user-meal-card-info">
                                {meal?.name}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Meals
