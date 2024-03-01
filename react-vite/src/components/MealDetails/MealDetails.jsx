import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import OpenModalButton from "../OpenModalButton"

function MealDetails() {
    const dispatch = useDispatch()
    const {mealId} = useParams()
    const meal = useSelector(state => state.meals[mealId])
    const user = useSelector(state => state.session.user)


    return (
        <div>
            <h2>{meal?.name}</h2>
            <img src={meal?.image_url} alt="" />
            {meal.user_id == user.id && (
                <div>
                    <OpenModalButton
                        buttonText='Edit Meal'
                    />
                </div>
            )}
        </div>
    )
}

export default MealDetails
