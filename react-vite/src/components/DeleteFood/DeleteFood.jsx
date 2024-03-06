import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { thunkDeleteFood } from "../../redux/foods"
import { useNavigate } from "react-router-dom"
import './DeleteFood.css'

function DeleteFood({ foodId }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { closeModal } = useModal()

    const deleteFood = async (e) => {
        e.preventDefault()
        dispatch(thunkDeleteFood(foodId))
            .then(() => {
                navigate(`/foods`)
            })
            .then(() => closeModal())
    }

    return (
        <div className="delete-food-container">
            <h2>Are you sure you want to delete</h2>
            <div className="delete-food-btns">
                <button onClick={deleteFood} className="delete-food-btn-del">Yes (Delete)</button>
                <button onClick={() => closeModal()} className="delete-food-btn">No (Keep)</button>
            </div>
        </div>
    )
}

export default DeleteFood
