import React from 'react';
import ReactDOM from 'react-dom/client';
// import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import Login from './Pages/Login';
import Login from './Pages/LoginNew';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Crops from './Pages/Crops';
import News from './Pages/News';
import HarvestDetails from './Pages/HarvestDetails';
import HarvestsAvailable from './Pages/HarvestsAvailable';
import CreateHarvest from './Pages/CreateHarvest';
import Register from './Pages/Register';
import { AuthProvider, useAuth } from './Context/AuthContext/authContext';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import AdditionalInfo from './Pages/AdditionalInfo';


// const userLoggedIn = getUserLoggedIn();
// const { userLoggedIn } = useAuth()
// Assuming crops are fetched successfully
const router = createBrowserRouter([

  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/stocks",
    element: <Crops />,
  },
  {
    path: "/harvests",
    element: <News/>,
  },
  {
    path: "/register-now",
    element: <Register />,
  },
  {
    path: "/stocks/:cropName/:harvestID",
    element: <HarvestDetails />,
  },
  {
    path: "/stocks/:cropName",
    element: <HarvestsAvailable />,
  },
  {
    path: "/createHarvest",
    element: <CreateHarvest />,
  },
  {
    path: "/profile",
    // element: AuthProvider.userLoggedIn ? <Profile /> : <Navigate to="/login"/>
    element:<Profile /> 

  },
  {
    path: "/additionalInfo",
    // element: AuthProvider.userLoggedIn ? <Profile /> : <Navigate to="/login"/>
    element:<AdditionalInfo /> 

  },

  
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} ></RouterProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
