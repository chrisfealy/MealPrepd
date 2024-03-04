import MealForm from "../MealForm"

function UpdateMeal({meal}) {
    return (
        <MealForm meal={meal} formType='Update' />
    )
}

export default UpdateMeal
