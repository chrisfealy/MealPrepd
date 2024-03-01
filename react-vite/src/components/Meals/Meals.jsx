import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { thunkGetMeals } from "../../redux/meals"

function Meals() {
    const dispatch = useDispatch()
    const meals = useSelector(state => Object.values(state.meals))


    useEffect(() => {
        dispatch(thunkGetMeals())
    }, [dispatch])

    return (
        <>
            <Link to={`/meals/new`}>Create meal</Link>
            <ul>
                {meals.map(meal => (
                    <li key={meal.id}>
                        <Link to={`/meals/${meal.id}`}>
                            {meal.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Meals
