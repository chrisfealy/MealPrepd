import MealForm from "../MealForm"

function CreateMeal() {
    const meal = {
        name: '',
        description: '',
        image: ''
    }

    return (
        <MealForm meal={meal} formType='Create' />
    )
}

export default CreateMeal
