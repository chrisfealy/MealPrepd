import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetFoods } from "../../redux/foods"
import { Link } from "react-router-dom"

function Foods() {
    const dispatch = useDispatch()
    const foods = useSelector(state => Object.values(state.foods))

    useEffect(() => {
        dispatch(thunkGetFoods())
    }, [dispatch])

    return (
        <>
            <ul>
                <Link to={`/foods/new`}>Add Food</Link>
                {foods.map(food => (
                    <li key={food.id}>
                        <Link to={`/foods/${food.id}`}>
                            {food.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Foods
