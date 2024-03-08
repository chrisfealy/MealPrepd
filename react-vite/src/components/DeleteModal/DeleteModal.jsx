import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { thunkDeleteFood } from "../../redux/foods"
import { useNavigate } from "react-router-dom"
import './DeleteModal.css'
import { thunkDeleteMeal } from "../../redux/meals"

function DeleteModal({ foodId, mealId }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { closeModal } = useModal()

    const remove = async (e) => {
        e.preventDefault()
        if (foodId) {
            dispatch(thunkDeleteFood(foodId))
                .then(closeModal)
                .then(navigate('/foods'))
        }
        if (mealId) {
            dispatch(thunkDeleteMeal(mealId))
                .then(closeModal)
                .then(navigate('/meals/current'))
        }
    }

    return (
        <div className="delete-food-container">
            <h2>Are you sure you want to delete?</h2>
            <div className="delete-food-btns">
                <button onClick={remove} className="delete-food-btn-del">Yes (Delete)</button>
                <button onClick={() => closeModal()} className="delete-food-btn">No (Keep)</button>
            </div>
        </div>
    )
}

export default DeleteModal
