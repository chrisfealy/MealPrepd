import { useDispatch, useSelector } from 'react-redux'
import FoodForm from '../FoodForm'
import { useEffect } from 'react'
import { thunkGetFood } from '../../redux/foods'

function UpdateFood({foodId}) {
    const dispatch = useDispatch()
    const food = useSelector(state => state.foods[foodId])

    useEffect(() => {
        thunkGetFood(foodId)
    }, [dispatch, foodId])

    return (
        <FoodForm food={food} formType='Update' />
    )
}

export default UpdateFood
