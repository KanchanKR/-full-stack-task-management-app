# Food Delivery System

A full-stack food delivery application built with React.js for the frontend and Node.js with Express for the backend. The backend uses MongoDB for storing data, and JWT for authentication.

### Live Demo
- **Frontend URL**: `https://your-app-name.vercel.app`
- **Backend URL**: `https://full-stack-task-management-app-f4pa.onrender.com`

## Backend Setup

1. **Install dependencies**:
    ```bash
    npm install
    ```

2. **Set up environment variables**:

    Create a `.env` file in the root of the backend folder and add your MongoDB URI:
    ```makefile
    MONGODB_URI=<your-mongodb-uri>
    JWT_SECRET=<your-jwt-secret>
    ```

3. **Start the backend server**:
    ```bash
    npm start
    ```
    The server will run on `http://localhost:8080`.

## Frontend Setup (React.js)

1. **Clone the repository (if not already done)**:
    ```bash
    git clone https://github.com/KanchanKR/-full-stack-task-management-app.git
    cd food-delivery-system/frontend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the frontend development server**:
    ```bash
    npm start
    ```
    The React app will run on `http://localhost:5178`.

## API Endpoints

### Authentication
- `POST /register`: Register a new user.
- `POST /login`: Login and get JWT token.

### Menu Management
- `GET /menu`: Fetch all menu items.
- `POST /menu`: Add a new menu item.
- `PUT /menu/:id`: Update a menu item by ID.
- `DELETE /menu/:id`: Delete a menu item by ID.

### Order Management
- `POST /order`: Place an order with selected menu items and quantities.
- `GET /orders`: Fetch all orders for a logged-in user.

## Deployment

### Frontend
- **Vercel/Netlify**: The frontend application is deployed on Netlify.

### Backend
- **Heroku/Render**: The backend API is deployed on Render.

### MongoDB
- **MongoDB Atlas**: MongoDB Atlas is used to host the database for the project.



## Project Structure

### Backend
```plaintext
/backend
  ├── models/
  │   ├── User.js
  │   ├── Menu.js
  │   └── Order.js
  ├── routes/
  │   ├── auth.js
  │   ├── menu.js
  │   └── orders.js
  ├── controllers/
  │   ├── authController.js
  │   ├── menuController.js
  │   └── orderController.js
  ├── .env
  └── server.js

### Frontend
```plaintext

/frontend
  ├── components/
  │   ├── LoginPage.js
  │   ├── MenuPage.js
  │   ├── CartComponent.js
  │   └── OrderPage.js
  ├── redux/
  │   ├── actions/
  │   ├── reducers/
  │   └── store.js
  ├── App.js
  ├── index.js
  ├── tailwind.config.js
  └── package.json
