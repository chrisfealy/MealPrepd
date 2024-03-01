export const LOAD_MEALS = 'spots/LOAD_MEALS'
export const RECEIVE_MEAL = 'spots/RECEIVE_MEAL'
export const UPDATE_MEAL = 'spots/UPDATE_MEAL'
export const REMOVE_MEAL = 'spots/REMOVE_MEAL'

export const loadMeals = (meals) => ({
    type: LOAD_MEALS,
    meals
})

export const receiveMeal = (meal) => ({
    type: RECEIVE_MEAL,
    meal
})

export const updateMeal = (meal) => ({
    type: UPDATE_MEAL,
    meal
})

export const deleteMeal = (mealId) => ({
    type: REMOVE_MEAL,
    mealId
})

export const thunkGetMeals = () => async (dispatch) => {
    const response = await fetch('/api/meals')

    if(response.ok) {
        const meals = await response.json()
        dispatch(loadMeals(meals))
        return meals
    }
}

export const thunkGetUserMeals = () => async (dispatch) => {
  const response = await fetch('/api/meals/current')

  if(response.ok) {
      const meals = await response.json()
      dispatch(loadMeals(meals))
      return meals
  }
}

export const thunkGetMeal = (mealId) => async (dispatch) => {
    const response = await fetch(`/api/meals/${mealId}`)

    if(response.ok) {
        const meal = await response.json()
        dispatch(receiveMeal(meal))
        return meal
    }
}

export const thunkCreateMeal = (meal) => async (dispatch) => {
    const response = await fetch('/api/meals/new', {
      method: 'POST',
      body: meal
    })

    if(response.ok) {
      const meal = await response.json()
      dispatch(receiveMeal(meal))
      return meal
    }
    else {
      const error = await response.json()
      return error
    }
}

export const thunkUpdateMeal = (meal) => async (dispatch) => {
    const response = await fetch(`/api/meals/${meal.id}/edit`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(meal)
    })

    if(response.ok) {
      const meal = await response.json()
      dispatch(updateMeal(meal))
      return meal
    }
    else {
      const error = await response.json()
      return error
    }
}

export const thunkDeleteMeal = (mealId) => async (dispatch) => {
    const response = await fetch(`/api/foods/${mealId}`, {
      method: 'DELETE'
    })

    if(response.ok) {
      dispatch(deleteMeal(mealId))
    }
}

const mealsReducer = (state = {}, action) => {
    switch(action.type) {
        case LOAD_MEALS: {
            const newState = {}
            action.meals.meals.forEach((meal) => {
              newState[meal.id] = meal
            })
            return newState
        }
        case RECEIVE_MEAL:
            return { ...state, [action.meal.id]: action.meal }
        case UPDATE_MEAL:
            return { ...state, [action.meal.id]: action.meal }
        case REMOVE_MEAL: {
            const newState = { ...state }
            delete newState[action.mealId]
            return newState
        }
        default:
            return state
    }
}

export default mealsReducer
