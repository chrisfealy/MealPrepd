import { useSelector } from 'react-redux'
import FoodForm from '../FoodForm'

function CreateFood() {
    const user = useSelector(state => state.session.user)

    if(!user) {
        return (
            <h2>Access Denied</h2>
        )
    }

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
