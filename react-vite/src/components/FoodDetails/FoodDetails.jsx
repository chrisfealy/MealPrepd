import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { thunkDeleteFood, thunkGetFood } from "../../redux/foods"
import UpdateFood from "../UpdateFood"
import OpenModalButton from "../OpenModalButton"

function FoodDetails() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {foodId} = useParams()
    const user = useSelector(state => state.session.user)
    const food = useSelector(state => state.foods[foodId])

    useEffect(() => {
        dispatch(thunkGetFood(foodId))
    }, [dispatch, foodId])

    const deleteFood = async (e) => {
        e.preventDefault()
        dispatch(thunkDeleteFood(foodId))
        .then(() => {
            navigate(`/foods`)
        })
    }

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
                    <button onClick={deleteFood}>Delete Food</button>
                </div>
            )}
        </div>
    )
}

export default FoodDetails
