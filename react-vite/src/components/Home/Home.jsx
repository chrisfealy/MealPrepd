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

    console.log('MEALS', meals)

    return (
        <div>
            <div className="meals-container">
                <h2>Discover meals</h2>
                <div className="meals-grid">
                    {meals.map(meal => (
                        <Link to={`/meals/${meal.id}`}>
                            <div className="meal-card" key={meal.id}>
                                <img src={meal?.image_url} alt={meal?.name} className="meal-card-image" />
                                <div className="meal-card-info">
                                    {meal?.name}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home
