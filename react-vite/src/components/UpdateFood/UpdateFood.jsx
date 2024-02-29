import FoodForm from '../FoodForm'

function UpdateFood({food}) {
    return (
        <FoodForm food={food} formType='Update' />
    )
}

export default UpdateFood
