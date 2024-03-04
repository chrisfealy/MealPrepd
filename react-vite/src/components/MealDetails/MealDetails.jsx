import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { removeFoodFromMeal, thunkDeleteMeal, thunkGetMeal } from "../../redux/meals"
import OpenModalButton from "../OpenModalButton"
import UpdateMeal from "../UpdateMeal"
import AddToMeal from "./AddToMeal"

function MealDetails() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { mealId } = useParams()
    const user = useSelector(state => state.session.user)
    const meal = useSelector(state => state.meals[mealId])

    useEffect(() => {
        dispatch(thunkGetMeal(mealId))
    }, [dispatch, mealId])

    const deleteMeal = async (e) => {
        e.preventDefault()
        dispatch(thunkDeleteMeal(mealId))
            .then(() => {
                navigate('/meals')
            })
    }

    const removeFood = async (e, food) => {
        e.preventDefault()
        dispatch(removeFoodFromMeal(food.id, mealId))
            .then(() => {
                dispatch(thunkGetMeal(mealId))
            })
    }

    console.log(meal)

    return (
        <div>
            <h2>{meal?.name}</h2>
            <img src={meal?.image_url} alt={meal?.name} />
            <p>{meal?.description}</p>
            {meal?.foods.map(food => (
                <li key={food.id}>
                    <div>{food.name}</div>
                    {meal?.user_id == user?.id && (
                        <button onClick={(e) => removeFood(e, food)}>Remove</button>
                    )}
                </li>
            ))}
            {meal?.user_id == user?.id && (
                <div>
                    <OpenModalButton
                        modalComponent={<AddToMeal mealId={mealId} />}
                        buttonText='Add Foods to Meal'
                    />
                    <OpenModalButton
                        modalComponent={<UpdateMeal meal={meal} />}
                        buttonText='Edit Meal'
                    />
                    <button onClick={deleteMeal}>Delete Meal</button>
                </div>
            )}
        </div>
    )
}

export default MealDetails
