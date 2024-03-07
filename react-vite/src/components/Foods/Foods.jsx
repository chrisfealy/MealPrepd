import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetFoods } from "../../redux/foods"
import { Link } from "react-router-dom"
import './Foods.css'

function Foods() {
    const dispatch = useDispatch()
    const foods = useSelector(state => Object.values(state.foods))

    useEffect(() => {
        dispatch(thunkGetFoods())
    }, [dispatch])

    console.log('FOODS', foods)

    return (
        <div className="foods-container">
            <h2>Foods Database</h2>
            <div className="food-create">
                <Link to={`/foods/new`}>Add Food</Link>
            </div>
            {foods.map(food => (
                <div key={food.id}>
                    <Link to={`/foods/${food.id}`}>
                        <div className="food-card">
                            <h4>{food?.name}</h4>
                            <p>{food?.calories} kcal</p>
                            <p>
                                {food?.carbs}g C, {food?.proteins}g P, {food?.fats}g F
                            </p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default Foods
