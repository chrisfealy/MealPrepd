export const LOAD_FOODS = 'spots/LOAD_FOODS'
export const RECEIVE_FOOD = 'spots/RECEIVE_FOOD'
export const UPDATE_FOOD = 'spots/UPDATE_FOOD'
export const REMOVE_FOOD = 'spots/REMOVE_FOOD'

export const loadFoods = (foods) => ({
    type: LOAD_FOODS,
    foods
})

export const receiveFood = (food) => ({
    type: RECEIVE_FOOD,
    food
})

export const updateFood = (food) => ({
    type: UPDATE_FOOD,
    food
})

export const deleteFood = (foodId) => ({
    type: REMOVE_FOOD,
    foodId
})

export const thunkGetFoods = () => async (dispatch) => {
    const response = await fetch('/api/foods')

    if(response.ok) {
        const foods = await response.json()
        dispatch(loadFoods(foods))
        return foods
    }
}

export const thunkGetUserFoods = () => async (dispatch) => {
  const response = await fetch('/api/foods/current')

  if(response.ok) {
      const foods = await response.json()
      dispatch(loadFoods(foods))
      return foods
  }
}

export const thunkGetFood = (foodId) => async (dispatch) => {
    const response = await fetch(`/api/foods/${foodId}`)

    if(response.ok) {
        const food = await response.json()
        dispatch(receiveFood(food))
        return food
    }
}

export const thunkCreateFood = (food) => async (dispatch) => {
    const response = await fetch('/api/foods/new', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(food)
    })

    if(response.ok) {
      const food = await response.json()
      dispatch(receiveFood(food))
      return food
    }
    else {
      const error = await response.json()
      return error
    }
}

export const thunkUpdateFood = (food) => async (dispatch) => {
    const response = await fetch(`/api/foods/${food.id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(food)
    })

    if(response.ok) {
      const food = await response.json()
      dispatch(updateFood(food))
      return food
    }
    else {
      const error = await response.json()
      return error
    }
}

export const thunkDeleteFood = (foodId) => async (dispatch) => {
    const response = await fetch(`/api/foods/${foodId}`, {
      method: 'DELETE'
    })

    if(response.ok) {
      dispatch(deleteFood(foodId))
    }
}

const foodsReducer = (state = {}, action) => {
    switch(action.type) {
        case LOAD_FOODS: {
            const newState = {}
            // console.log('ACTION', action)
            action.foods.foods.forEach((food) => {
              newState[food.id] = food
            })
            return newState
        }
        case RECEIVE_FOOD:
            return { ...state, [action.food.id]: action.food }
        case UPDATE_FOOD:
            return { ...state, [action.food.id]: action.food }
        case REMOVE_FOOD: {
            const newState = { ...state }
            delete newState[action.spotId]
            return newState
        }
        default:
            return state
    }
}

export default foodsReducer
