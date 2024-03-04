export const LOAD_MEALS = 'meals/LOAD_MEALS'
export const RECEIVE_MEAL = 'meals/RECEIVE_MEAL'
export const UPDATE_MEAL = 'meals/UPDATE_MEAL'
export const REMOVE_MEAL = 'meals/REMOVE_MEAL'
export const ADD_TO_MEAL = 'meals/ADD_TO_MEAL'
export const REMOVE_FROM_MEAL = 'meals/REMOVE_FROM_MEAL'

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

export const addFood = (food, mealId) => ({
  type: ADD_TO_MEAL,
  food,
  mealId
})

export const removeFood = (foodId, mealId) => ({
  type: REMOVE_FROM_MEAL,
  foodId,
  mealId
})

export const thunkGetMeals = () => async (dispatch) => {
  const response = await fetch('/api/meals')

  if (response.ok) {
    const meals = await response.json()
    dispatch(loadMeals(meals))
    return meals
  }
}

export const thunkGetUserMeals = () => async (dispatch) => {
  const response = await fetch('/api/meals/current')

  if (response.ok) {
    const meals = await response.json()
    dispatch(loadMeals(meals))
    return meals
  }
}

export const thunkGetMeal = (mealId) => async (dispatch) => {
  const response = await fetch(`/api/meals/${mealId}`)

  if (response.ok) {
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

  if (response.ok) {
    const meal = await response.json()
    dispatch(receiveMeal(meal))
    return meal
  }
  else {
    const error = await response.json()
    return error
  }
}

export const thunkUpdateMeal = (meal, mealId) => async (dispatch) => {
  const response = await fetch(`/api/meals/${mealId}/edit`, {
    method: 'PUT',
    body: meal
  })

  if (response.ok) {
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
  const response = await fetch(`/api/meals/${mealId}`, {
    method: 'DELETE'
  })

  if (response.ok) {
    dispatch(deleteMeal(mealId))
  }
}

export const addFoodToMeal = (food, mealId) => async (dispatch) => {
  const response = await fetch(`/api/meals/${mealId}/add/${food.id}`, {
    method: 'POST'
  })

  if (response.ok) dispatch(addFood(food, mealId))
}

export const removeFoodFromMeal = (foodId, mealId) => async (dispatch) => {
  const response = await fetch(`/api/meals/${mealId}/remove/${foodId}`, {
    method: 'DELETE'
  })

  if (response.ok) dispatch(removeFood(foodId, mealId))
}

const mealsReducer = (state = {}, action) => {
  switch (action.type) {
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
    case ADD_TO_MEAL: {
      const newState = { ...state }
      newState[action.mealId].foods.push(action.food)
      return newState
    }
    case REMOVE_FROM_MEAL: {
      const newState = { ...state }
      const newFoods = newState[action.mealId].foods.filter(food => food.id !== action.foodId)
      newState[action.mealId].foods = newFoods
      return newState
    }
    default:
      return state
  }
}

export default mealsReducer
