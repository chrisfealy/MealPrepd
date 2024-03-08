import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { removeFoodFromMeal, thunkGetMeal } from "../../redux/meals"
import OpenModalButton from "../OpenModalButton"
import UpdateMeal from "../UpdateMeal"
import AddToMeal from "./AddToMeal"
import './MealDetails.css'
import DeleteModal from "../DeleteModal"

function MealDetails() {
    const dispatch = useDispatch()

    const { mealId } = useParams()
    const user = useSelector(state => state.session.user)
    const meal = useSelector(state => state.meals[mealId])

    useEffect(() => {
        dispatch(thunkGetMeal(mealId))
    }, [dispatch, mealId])

    const removeFood = async (e, food) => {
        e.preventDefault()
        dispatch(removeFoodFromMeal(food.id, mealId))
            .then(() => {
                dispatch(thunkGetMeal(mealId))
            })
    }

    return (
        <div className="meal-details-container">
            <h2>{meal?.name}</h2>
            {meal?.user_id == user?.id && (
                <div className="meal-details-btns">
                    <OpenModalButton
                        modalComponent={<AddToMeal mealId={mealId} />}
                        buttonText='Add Foods to Meal'
                    />
                    <OpenModalButton
                        modalComponent={<UpdateMeal meal={meal} />}
                        buttonText='Edit Meal'
                    />
                    <OpenModalButton
                        modalComponent={<DeleteModal mealId={mealId} />}
                        buttonText='Delete Meal'
                    />
                </div>
            )}
            <div className="meal-details-info">
                <img src={meal?.image_url} alt={meal?.name} className="meal-details-image" />
                <p>{meal?.description}</p>
                <h4>Ingredients:</h4>
                <div className="meal-foods">
                    {meal?.foods.map(food => (
                        <div className="meal-food" key={food.id}>
                            <Link to={`/foods/${food.id}`}>{food.name}</Link>
                            {meal?.user_id == user?.id && (
                                <button onClick={(e) => removeFood(e, food)} className="meal-food-btn">Remove</button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MealDetails
