# MealPrepd

[MealPrepd](https://mealprepd.onrender.com) is a meal planner and nutrition tracker, inspired by [MyFitnessPal](https://www.myfitnesspal.com/).

- Mealprepd current offers the following features:
  - Food
  - Meals
- Users can add foods to a public database and share meals with others. Meal nutrition values are calculated by summing the macronutrients of each food that make up the meal.
- In the future, there are plans to implement a weekly meal generator. Users will be given a meal plan for each day of the week, including meals for: breakfast, lunch dinner, and optionally snacks. The total macronutrient values of ALL meals in a given day will equate to a user's particular macronutrient goals.

## Installation guide

### Clone the repo
  * run `git clone https://github.com/chrisfealy/MealPrepd.git` in a desired directory

### Install dependencies
  * run `pipenv install -r requirements.txt` in the root project folder
  * run `npm install` in `react-vite` folder

### Create and ensure that the .env file has the following fields
(You will need to create an AWS S3 Bucket)
  * SECRET_KEY
  * DATABASE_URL
  * SCHEMA
  * S3_BUCKET
  * S3_KEY
  * S3_SECRET

### Migration
  * run `pipenv shell flask db upgrade` in the root project folder

### Optional seedings
  * run `pipenv shell flask seed reset` in the root project folder

### Start up the servers
  * run `pipenv shell flask run` in the root project folder
  * run `npm run dev` in `react-vite` folder

## Contact Me
[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/christopher-fealy/)
![Gmail](https://img.shields.io/badge/Gmail-D14836?logo=gmail&logoColor=white)
![Gmail](https://img.shields.io/badge/chrismfealy@gmail.com-gray?logoColor=white)

## Tech Stack
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?logo=javascript&logoColor=%23F7DF1E)
![Python](https://img.shields.io/badge/python-3670A0?logo=python&logoColor=ffdd54)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?logo=css3&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?logo=npm&logoColor=white)
![Markdown](https://img.shields.io/badge/markdown-%23000000.svg?logo=markdown&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?logo=redux&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=react-router&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?logo=vite&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?logo=eslint&logoColor=white)
![Flask](https://img.shields.io/badge/flask-%23000.svg?logo=flask&logoColor=white)
![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?logo=ubuntu&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-FCC624?logo=linux&logoColor=black)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?logo=amazon-aws&logoColor=white)
![Static Badge](https://img.shields.io/badge/Amazon%20S3-green?logo=amazon%20s3&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?logo=sqlite&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?logo=postgresql&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?logo=docker&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?logo=postman&logoColor=white)
![Render](https://img.shields.io/badge/Render-%46E3B7.svg?logo=render&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?logo=visual-studio-code&logoColor=white)
![MDN Web Docs](https://img.shields.io/badge/MDN_Web_Docs-black?logo=mdnwebdocs&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?logo=github&logoColor=white)
![Static Badge](https://img.shields.io/badge/SQLAlchemy-white?logo=sqlalchemy&logoColor=blue)

# Demo
## Food
### Create Food
![create food](<demo/create_food.gif>)

### Update Food
![update food](<demo/update_food.gif>)

### Delete Food
![delete food](<demo/delete_food.gif>)

## Meals
### Create Meal
![create meal](<demo/create_meal.gif>)

### Update meal
![update meal](<demo/update_meal.gif>)

### Delete meal
![delete meal](<demo/delete_meal.gif>)

## API Documentation

## USER AUTHENTICATION/AUTHORIZATION

### All endpoints that require authentication

All endpoints that require a current user to be logged in.

* Request: endpoints that require authentication
* Error Response: Require authentication
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

### All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the
correct role(s) or permission(s).

* Request: endpoints that require proper authorization
* Error Response: Require proper authorization
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

### Get the Current User

Returns the information about the current user that is logged in.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/session
  * Body: none

* Successful Response when there is a logged in user
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
      }
    }
    ```

* Successful Response when there is no logged in user
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": null
    }
    ```

### Log In a User

Logs in a current user with valid credentials and returns the current user's
information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/session
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "credential": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
      }
    }
    ```

* Error Response: Invalid credentials
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Invalid credentials"
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "credential": "Email or username is required",
        "password": "Password is required"
      }
    }
    ```

### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/users
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "username": "JohnSmith",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
      }
    }
    ```

* Error response: User already exists with the specified email
  * Status Code: 500
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "errors": {
        "email": "User with that email already exists"
      }
    }
    ```

* Error response: User already exists with the specified username
  * Status Code: 500
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "errors": {
        "username": "User with that username already exists"
      }
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "email": "Invalid email",
        "username": "Username is required",
        "firstName": "First Name is required",
        "lastName": "Last Name is required"
      }
    }
    ```

## FOOD

### Get Foods

Returns all foods.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/foods
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "foods": [
        {
          "id": 1,
          "name": "Chicken Breast",
          "user_id": 2,
          "serving_size": 112,
          "calories": 140,
          "carbs": 0,
          "proteins": 25,
          "fats": 4
        }
      ]
    }
    ```

### Get all Foods owned by the Current User

Returns all the foods owned (created) by the current user.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/foods/current
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "foods": [
        {
          "id": 1,
          "name": "Chicken Breast",
          "user_id": 2,
          "serving_size": 112,
          "calories": 140,
          "carbs": 0,
          "proteins": 25,
          "fats": 4
        }
      ]
    }
    ```

### Get details of a Food from an id

Returns the details of a food specified by its id.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/foods/:foodId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "name": "Chicken Breast",
      "user_id": 2,
      "serving_size": 112,
      "calories": 140,
      "carbs": 0,
      "proteins": 25,
      "fats": 4
    }
    ```

* Error response: Couldn't find a Food with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Food couldn't be found"
    }
    ```

### Create a Food

Creates and returns a new food.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/foods
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "name": "Chicken Breast",
      "serving_size": 112,
      "calories": 140,
      "carbs": 0,
      "proteins": 25,
      "fats": 4
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "name": "Chicken Breast",
      "user_id": 1,
      "serving_size": 112,
      "calories": 140,
      "carbs": 0,
      "proteins": 25,
      "fats": 4
    }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "name": "Name is required",
        "serving_size": "Serving Size must be a positive number",
        "calories": "Calories must be a positive number",
        "carbs": "Carbohydrates must be a positive number",
        "proteins": "Proteins must be a positive number",
        "fats": "Fats must be a positive number"
      }
    }
    ```

### Edit a Food

Updates and returns an existing food.

* Require Authentication: true
* Require proper authorization: Food must belong to the current user
* Request
  * Method: PUT
  * URL: /api/foods/:foodId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "name": "Chicken Breast",
      "serving_size": 112,
      "calories": 140,
      "carbs": 0,
      "proteins": 25,
      "fats": 4
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "name": "Chicken Breast",
      "user_id": 1,
      "serving_size": 112,
      "calories": 140,
      "carbs": 0,
      "proteins": 25,
      "fats": 4
    }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "name": "Name is required",
        "serving_size": "Serving Size must be a positive number",
        "calories": "Calories must be a positive number",
        "carbs": "Carbohydrates must be a positive number",
        "proteins": "Proteins must be a positive number",
        "fats": "Fats must be a positive number"
      }
    }
    ```

* Error response: Couldn't find a Food with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Food couldn't be found"
    }
    ```

### Delete a Food

Deletes an existing food.

* Require Authentication: true
* Require proper authorization: Food must belong to the current user
* Request
  * Method: DELETE
  * URL: /api/foods/:foodId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

* Error response: Couldn't find a Food with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Food couldn't be found"
    }
    ```

## MEALS

### Get Meals

Returns all foods.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/meals
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "meals": [
        {
          "id": 1,
          "user_id": 1,
          "name": "Chicken and Rice",
          "description": "Chicken, broccoli, and rice.",
          "image_url": "image url",
          "foods": [
            {
              "id": 1,
              "name": "Chicken Breast",
              "user_id": 1,
              "serving_size": 112,
              "calories": 140,
              "carbs": 0,
              "proteins": 25,
              "fats": 4
            },
            {
              "id": 1,
              "name": "White Rice",
              "user_id": 1,
              "serving_size": 45,
              "calories": 160,
              "carbs": 35,
              "proteins": 3,
              "fats": 0
            },
            {
              "id": 1,
              "name": "Broccoli",
              "user_id": 1,
              "serving_size": 85,
              "calories": 30,
              "carbs": 6,
              "proteins": 2,
              "fats": 0
            }
          ]
        }
      ]
    }
    ```

### Get all Meals owned by the Current User

Returns all the meals owned (created) by the current user.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/foods/current
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "meals": [
        {
          "id": 1,
          "user_id": 1,
          "name": "Chicken and Rice",
          "description": "Chicken, broccoli, and rice.",
          "image_url": "image url",
          "foods": [
            {
              "id": 1,
              "name": "Chicken Breast",
              "user_id": 1,
              "serving_size": 112,
              "calories": 140,
              "carbs": 0,
              "proteins": 25,
              "fats": 4
            },
            {
              "id": 1,
              "name": "White Rice",
              "user_id": 1,
              "serving_size": 45,
              "calories": 160,
              "carbs": 35,
              "proteins": 3,
              "fats": 0
            },
            {
              "id": 1,
              "name": "Broccoli",
              "user_id": 1,
              "serving_size": 85,
              "calories": 30,
              "carbs": 6,
              "proteins": 2,
              "fats": 0
            }
          ]
        }
      ]
    }
    ```

### Get details of a Meal from an id

Returns the details of a meal specified by its id.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/meals/:mealId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "user_id": 1,
      "name": "Chicken and Rice",
      "description": "Chicken, broccoli, and rice.",
      "image_url": "image url",
      "foods": [
        {
          "id": 1,
          "name": "Chicken Breast",
          "user_id": 1,
          "serving_size": 112,
          "calories": 140,
          "carbs": 0,
          "proteins": 25,
          "fats": 4
        },
        {
          "id": 1,
          "name": "White Rice",
          "user_id": 1,
          "serving_size": 45,
          "calories": 160,
          "carbs": 35,
          "proteins": 3,
          "fats": 0
        },
        {
          "id": 1,
          "name": "Broccoli",
          "user_id": 1,
          "serving_size": 85,
          "calories": 30,
          "carbs": 6,
          "proteins": 2,
          "fats": 0
        }
      ]
    }
    ```

* Error response: Couldn't find a Meal with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Meal couldn't be found"
    }
    ```

### Create a Meal

Creates and returns a new meal.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/meals
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "name": "Chicken and Rice",
      "description": "Chicken, broccoli, and rice.",
      "image_url": "image url",
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "user_id": 1,
      "name": "Chicken and Rice",
      "description": "Chicken, broccoli, and rice.",
      "image_url": "image url",
      "foods": []
    }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "name": "Name is required",
        "image_url": "Image URL is required",
      }
    }
    ```

### Edit a Meal

Updates and returns an existing meal.

* Require Authentication: true
* Require proper authorization: Meal must belong to the current user
* Request
  * Method: PUT
  * URL: /api/meals/:mealId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "name": "Chicken and Rice",
      "description": "Chicken, broccoli, and rice.",
      "image_url": "image url",
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "user_id": 1,
      "name": "Chicken and Rice",
      "description": "Chicken, broccoli, and rice.",
      "image_url": "image url",
      "foods": []
    }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "name": "Name is required",
        "image_url": "Image URL is required",
      }
    }
    ```

* Error response: Couldn't find a Meal with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Meal couldn't be found"
    }
    ```

### Delete a Meal

Deletes an existing meal.

* Require Authentication: true
* Require proper authorization: Meal must belong to the current user
* Request
  * Method: DELETE
  * URL: /api/meals/:mealId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

* Error response: Couldn't find a Meal with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Meal couldn't be found"
    }
    ```
