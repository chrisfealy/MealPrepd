import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import FoodForm from '../FoodForm'
import { useEffect } from 'react'
import { thunkGetFood } from '../../redux/foods'

function UpdateFood() {
    const dispatch = useDispatch()
    const {foodId} = useParams()
    const food = useSelector(state => state.foods[foodId])

    useEffect(() => {
        dispatch(thunkGetFood(foodId))
    }, [dispatch, foodId])

    return (
        <FoodForm food={food} formType='Update' />
    )
}

export default UpdateFood
