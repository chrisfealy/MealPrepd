import FoodForm from '../FoodForm'

function CreateFood() {
    const food = {
        name: '',
        serving_size: '',
        calories: '',
        carbs: '',
        proteins: '',
        fats: ''
    }
    return (
        <FoodForm food={food} formType='Create' />
    )
}

export default CreateFood
