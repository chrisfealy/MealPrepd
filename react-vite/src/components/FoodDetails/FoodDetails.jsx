import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { thunkGetFood } from "../../redux/foods"
import UpdateFood from "../UpdateFood"
import OpenModalButton from "../OpenModalButton"
import DeleteFood from "../DeleteFood"
import './FoodDetails.css'

function FoodDetails() {
    const dispatch = useDispatch()
    const { foodId } = useParams()
    const user = useSelector(state => state.session.user)
    const food = useSelector(state => state.foods[foodId])

    useEffect(() => {
        dispatch(thunkGetFood(foodId))
    }, [dispatch, foodId])

    return (
        <div className="food-details-wrapper">
            <h2>{food?.name}</h2>
            <div className="food-details-container">
                <h3>Nutrition Facts</h3>
                <hr className="food-line" />
                <p>{food?.serving_size} g serving size</p>
                <hr className="food-line-thick" />
                <p>Amount per serving</p>
                <div className="food-calories">
                    <h3>Calories</h3>
                    <h3>{food?.calories}</h3>
                </div>
                <hr className="food-line" />
                <div className="food-macros">
                    <h4>Total Fat</h4>
                    <p>{food?.fats} g</p>
                </div>
                <div className="food-macros">
                    <h4>Total Carbohydrate</h4>
                    <p>{food?.carbs} g</p>
                </div>
                <div className="food-macros">
                    <h4>Protein</h4>
                    <p>{food?.proteins} g</p>
                </div>
            </div>
            {user && food?.user_id == user.id && (
                <div className="food-details-btns">
                    <OpenModalButton
                        modalComponent={<UpdateFood foodId={foodId} />}
                        buttonText='Update Food'
                        className='food-details-btn'
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
