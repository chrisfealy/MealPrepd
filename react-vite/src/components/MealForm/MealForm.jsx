import { useState } from "react"

function MealForm({meal, formType}) {

    const [name, setName] = useState(meal?.name)
    const [description, setDescription] = useState(meal?.description)

    return (
        <div>MealForm</div>
    )
}

export default MealForm
