import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { thunkGetFood } from "../../redux/foods"
import UpdateFood from "../UpdateFood"
import OpenModalButton from "../OpenModalButton"
import DeleteFood from "../DeleteFood"

function FoodDetails() {
    const dispatch = useDispatch()
    const {foodId} = useParams()
    const user = useSelector(state => state.session.user)
    const food = useSelector(state => state.foods[foodId])

    useEffect(() => {
        dispatch(thunkGetFood(foodId))
    }, [dispatch, foodId])

    return (
        <div>
            <h2>{food?.name}</h2>
            <p>Serving Size (g): {food?.serving_size}</p>
            <p>Calories: {food?.calories}</p>
            <p>Carbohydrates (g): {food?.carbs}</p>
            <p>Proteins (g): {food?.proteins}</p>
            <p>Fats (g): {food?.fats}</p>
            {food?.user_id == user.id && (
                <div>
                    <OpenModalButton
                        modalComponent={<UpdateFood food={food} />}
                        buttonText='Update Food'
                    />
                    <OpenModalButton
                        modalComponent={<DeleteFood foodId={foodId} />}
                        buttonText='Delete Food'
                    />
                </div>
            )}
        </div>
    )
}

export default FoodDetails
