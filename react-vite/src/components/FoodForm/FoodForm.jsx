import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { thunkCreateFood } from "../../redux/foods"

function FoodForm({ food, formType }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState(food?.name)
    const [servingSize, setServingSize] = useState(food?.servingSize)
    const [calories, setCalories] = useState(food?.calories)
    const [carbs, setCarbs] = useState(food?.carbs)
    const [proteins, setProteins] = useState(food?.proteins)
    const [fats, setFats] = useState(food?.fats)
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        const valErrors = {}
        if (!name) valErrors.name = 'Name is required'
        if (servingSize < 0) valErrors.servingSize = 'Serving Size must be greater than or equal to 0'
        if (calories < 0) valErrors.calories = 'Calories must be greater than or equal to 0'
        if (carbs < 0) valErrors.carbs = 'Carbs must be greater than or equal to 0'
        if (proteins < 0) valErrors.proteins = 'Proteins must be greater than or equal to 0'
        if (fats < 0) valErrors.fats = 'Fats must be greater than or equal to 0'
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

        delete food.servingSize

        // console.log('FOOD DATA', food)

        if (formType === 'Create') { // Create
            return dispatch(thunkCreateFood(food))
                .then(food => {
                    navigate(`/foods/${food.id}`)
                })
        }
    }

    return (
        <div>
            <h2>{formType == 'Create' ? 'Add Food Item to Database' : 'Update Food Item'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
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
                <div>
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
                <div>
                    <div className="food-form-error">
                        {submitted && errors.calories && `${errors.calories}`}
                    </div>
                    <label>Calories (g)</label>
                    <input
                        type="text"
                        value={calories}
                        onChange={e => setCalories(e.target.value)}
                    />
                </div>
                <div>
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
                <div>
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
                <div>
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
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default FoodForm
