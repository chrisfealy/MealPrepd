import { useDispatch, useSelector } from "react-redux"
import MealForm from "../MealForm"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { thunkGetMeal } from "../../redux/meals"



function UpdateMeal() {
    const dispatch = useDispatch()
    const { mealId } = useParams()

    const meal = useSelector(state => state.meals[mealId])

    useEffect(() => {
        dispatch(thunkGetMeal(mealId))
    }, [dispatch, mealId])

    return (
        <MealForm meal={meal} formType='Update' />
    )
}

export default UpdateMeal
