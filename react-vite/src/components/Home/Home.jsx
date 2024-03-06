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
            <div className="meals-container">
                <h2>Discover meals</h2>
                <div className="meals-grid">
                    {meals.map(meal => (
                        <div className="meal-card">
                            <Link to={`/meals/${meal.id}`}>
                                <img src={meal?.image_url} alt={meal?.name} className="meal-card-image" />
                            </Link>
                            <h4>{meal?.name}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home
