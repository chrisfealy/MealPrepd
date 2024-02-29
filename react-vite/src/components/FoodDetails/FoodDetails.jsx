import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { thunkDeleteFood, thunkGetFood } from "../../redux/foods"

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

    console.log('CURRENT USER', user)
    console.log('FOOD', food)

    return (
        <div>
            <h2>{food?.name}</h2>
            {food?.user_id == user.id && (
                <div>
                    <Link to={`/foods/${foodId}/edit`}>Update Food</Link>
                    <button onClick={deleteFood}>Delete Food</button>
                </div>
            )}
        </div>
    )
}

export default FoodDetails
