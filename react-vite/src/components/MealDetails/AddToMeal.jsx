import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetFoods } from "../../redux/foods"
import { addFoodToMeal, thunkGetMeal } from "../../redux/meals"
import { useModal } from "../../context/Modal"

function AddToMeal({mealId}) {
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
            .then(() => closeModal())
    }

    return (
        <ul>
            {foods.map(food => (
                <div key={food.id}>
                    <p>{food.name}</p>
                    <button onClick={(e) => addToMeal(e, food)}>Add Food to Meal</button>
                </div>
            ))}
        </ul>
    )
}

export default AddToMeal
