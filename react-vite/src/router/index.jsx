import { NavLink, createBrowserRouter } from 'react-router-dom'
import LoginFormPage from '../components/LoginFormPage'
import SignupFormPage from '../components/SignupFormPage'
import Layout from './Layout'
import Foods from '../components/Foods'
import FoodDetails from '../components/FoodDetails'
import CreateFood from '../components/CreateFood'
import UpdateFood from '../components/UpdateFood'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <NavLink to='/foods'>Foods</NavLink>,
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
        path: 'foods/:foodId/edit',
        element: <UpdateFood />
      }
    ],
  },
])
