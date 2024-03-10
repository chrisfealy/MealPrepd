import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { thunkCreateFood, thunkUpdateFood } from "../../redux/foods"
import { useModal } from "../../context/Modal"
import './FoodForm.css'

function FoodForm({ food, formType }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { closeModal } = useModal()

    const [name, setName] = useState(food?.name)
    const [servingSize, setServingSize] = useState(food?.serving_size)
    const [calories, setCalories] = useState(food?.calories)
    const [carbs, setCarbs] = useState(food?.carbs)
    const [proteins, setProteins] = useState(food?.proteins)
    const [fats, setFats] = useState(food?.fats)
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        const valErrors = {}
        if (!name.length) valErrors.name = 'Name is required'
        if (name.length > 50) valErrors.name = 'Name must be less than or equal to 50 characters'
        if (!String(servingSize).length) valErrors.servingSize = 'Serving Size is required'
        if (servingSize < 0) valErrors.servingSize = 'Serving Size must be greater than or equal to 0'
        if (servingSize  > 10000) valErrors.servingSize = 'Serving Size must be less than or equal to 10,000'
        if (!String(calories).length) valErrors.calories = 'Calories are required'
        if (calories < 0) valErrors.calories = 'Calories must be greater than or equal to 0'
        if (calories > 10000) valErrors.calories = 'Calories must be less than or equal to 10,000'
        if (!String(carbs).length) valErrors.carbs = 'Carbs are required'
        if (carbs < 0) valErrors.carbs = 'Carbs must be greater than or equal to 0'
        if (carbs > 10000) valErrors.carbs = 'Carbs must be less than or equal to 10,000'
        if (!String(proteins).length) valErrors.proteins = 'Proteins are required'
        if (proteins < 0) valErrors.proteins = 'Proteins must be greater than or equal to 0'
        if (proteins > 10000) valErrors.proteins = 'Proteins must be less than or equal to 10,000'
        if (!String(fats).length) valErrors.fats = 'Fats are required'
        if (fats < 0) valErrors.fats = 'Fats must be greater than or equal to 0'
        if (fats > 10000) valErrors.fats = 'Fats must be greater than or equal to 10,000'
        setErrors(valErrors)
    }, [name, servingSize, calories, carbs, proteins, fats])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitted(true)

        if (Object.keys(errors).length) return

        food = {
            ...food,
            name,
            serving_size: servingSize,
            calories,
            carbs,
            proteins,
            fats
        }

        if (formType === 'Create') { // Create
            return dispatch(thunkCreateFood(food))
                .then(food => {
                    navigate(`/foods/${food.id}`)
                })
        }
        else {
            dispatch(thunkUpdateFood(food))
                .then(() => closeModal())
        }
    }

    return (
        <div className={formType == 'Create' ? "food-form-wrapper" : "food-form-wrapper-modal"}>
            <h2>{formType == 'Create' ? 'Add Food Item to Database' : 'Update Food Item'}</h2>
            <form onSubmit={handleSubmit} className={formType == 'Create' ? "food-form-container" : 'form-form-container-modal'}>
                <div className={formType == 'Create' ? "food-form-input" : "food-form-input-modal"}>
                    <div className="food-form-error">
                        {submitted && errors.name && `${errors.name}`}
                    </div>
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className={formType == 'Create' ? "food-form-input" : "food-form-input-modal"}>
                    <div className="food-form-error">
                        {submitted && errors.servingSize && `${errors.servingSize}`}
                    </div>
                    <label>Serving Size (g)</label>
                    <input
                        type="text"
                        value={servingSize}
                        onChange={e => setServingSize(e.target.value)}
                    />
                </div>
                <div className={formType == 'Create' ? "food-form-input" : "food-form-input-modal"}>
                    <div className="food-form-error">
                        {submitted && errors.calories && `${errors.calories}`}
                    </div>
                    <label>Calories</label>
                    <input
                        type="text"
                        value={calories}
                        onChange={e => setCalories(e.target.value)}
                    />
                </div>
                <div className={formType == 'Create' ? "food-form-input" : "food-form-input-modal"}>
                    <div className="food-form-error">
                        {submitted && errors.carbs && `${errors.carbs}`}
                    </div>
                    <label>Carbohydrates (g)</label>
                    <input
                        type="text"
                        value={carbs}
                        onChange={e => setCarbs(e.target.value)}
                    />
                </div>
                <div className={formType == 'Create' ? "food-form-input" : "food-form-input-modal"}>
                    <div className="food-form-error">
                        {submitted && errors.proteins && `${errors.proteins}`}
                    </div>
                    <label>Proteins (g)</label>
                    <input
                        type="text"
                        value={proteins}
                        onChange={e => setProteins(e.target.value)}
                    />
                </div>
                <div className={formType == 'Create' ? "food-form-input" : "food-form-input-modal"}>
                    <div className="food-form-error">
                        {submitted && errors.fats && `${errors.fats}`}
                    </div>
                    <label>Fats (g)</label>
                    <input
                        type="text"
                        value={fats}
                        onChange={e => setFats(e.target.value)}
                    />
                </div>
                <button type="submit" className={formType == 'Create' ? "food-form-btn" : "food-form-btn-modal"}>Submit</button>
            </form>
        </div>
    )
}

export default FoodForm
