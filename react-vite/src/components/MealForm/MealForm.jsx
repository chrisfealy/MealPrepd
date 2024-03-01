import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { thunkCreateMeal } from "../../redux/meals"

function MealForm({meal, formType}) {
    const dispatch = useDispatch()

    const [name, setName] = useState(meal?.name)
    const [description, setDescription] = useState(meal?.description)
    const [image, setImage] = useState()
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        const valErrors = {}
        if(!name) valErrors.name = 'Name is required'
        setErrors(valErrors)
    }, [name])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitted(true)

        if(Object.keys(errors).length) return

        const formData = new FormData()
        formData.append('name', name)
        formData.append('description', description)
        formData.append('image', image)

        dispatch(thunkCreateMeal(formData))

    }

    return (
        <div>
            <h2>{formType == 'Create' ? 'Add Meal to Database' : 'Update Meal'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        type="text"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label>Image</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={e => setImage(e.target.files[0])}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default MealForm
