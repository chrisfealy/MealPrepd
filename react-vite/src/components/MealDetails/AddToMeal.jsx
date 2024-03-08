import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetFoods } from "../../redux/foods"
import { addFoodToMeal, thunkGetMeal } from "../../redux/meals"
import { useModal } from "../../context/Modal"
import './MealDetails.css'

function AddToMeal({ mealId }) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const foods = useSelector(state => Object.values(state.foods))

    useEffect(() => {
        dispatch(thunkGetFoods())
    }, [dispatch])

    const addToMeal = async (e, food) => {
        e.preventDefault()

        return dispatch(addFoodToMeal(food, mealId))
            .then(() => {
                dispatch(thunkGetMeal(mealId))
            })
            .then(closeModal)
    }

    return (
        <div className="add-foods-container">
            {foods.map(food => (
                <div key={food.id} className="add-foods-food">
                    <p>{food.name}</p>
                    <button onClick={(e) => addToMeal(e, food)}>Add Food to Meal</button>
                </div>
            ))}
        </div>
    )
}

export default AddToMeal
