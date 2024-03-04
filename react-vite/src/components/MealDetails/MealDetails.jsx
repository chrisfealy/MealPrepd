// import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { thunkDeleteMeal, thunkGetMeal } from "../../redux/meals"
import OpenModalButton from "../OpenModalButton"
import UpdateMeal from "../UpdateMeal"
import { useEffect } from "react"

function MealDetails() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {mealId} = useParams()
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

    return (
        <div>
            <h2>{meal?.name}</h2>
            <img src={meal?.image_url} alt="" />
            {meal?.user_id == user?.id && (
                <div>
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
