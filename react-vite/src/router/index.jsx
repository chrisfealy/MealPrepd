import { NavLink, createBrowserRouter } from 'react-router-dom'
import Home from '../components/Home'
import LoginFormPage from '../components/LoginFormPage'
import SignupFormPage from '../components/SignupFormPage'
import Layout from './Layout'
import Foods from '../components/Foods'
import FoodDetails from '../components/FoodDetails'
import CreateFood from '../components/CreateFood'
import Meals from '../components/Meals'
import MealDetails from '../components/MealDetails'
import CreateMeal from '../components/CreateMeal'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'login',
        element: <LoginFormPage />,
      },
      {
        path: 'signup',
        element: <SignupFormPage />,
      },
      {
        path: 'foods',
        element: <Foods />
      },
      {
        path: 'foods/:foodId',
        element: <FoodDetails />
      },
      {
        path: 'foods/new',
        element: <CreateFood />
      },
      {
        path: 'meals/current',
        element: <Meals />
      },
      {
        path: 'meals/new',
        element: <CreateMeal />
      },
      {
        path: 'meals/:mealId',
        element: <MealDetails />
      }
    ],
  },
])
