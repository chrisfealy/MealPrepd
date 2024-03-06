import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetMeals } from "../../redux/meals"

import './Home.css'
import { Link } from "react-router-dom"

function Home() {
    const dispatch = useDispatch()
    const meals = useSelector(state => Object.values(state.meals))

    useEffect(() => {
        dispatch(thunkGetMeals())
    }, [dispatch])

    return (
        <div>
            <h2>Home</h2>
            <div className="meals-container">
                <h3>Discover meals</h3>
                <div className="meals-grid">
                    {meals.map(meal => (
                        <Link to={`/meals/${meal.id}`} className="meal-card">
                            <img src={meal?.image_url} alt={meal?.name} className="meal-card-image" />
                            <div>{meal?.name}</div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home
