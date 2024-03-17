import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import Login from './Pages/Login';
import Login from './Pages/LoginNew';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Crops from './Pages/Crops';
import Harvests from './Pages/HarvestsAvailable';
import Create from './Pages/Create';
import HarvestDetails from './Pages/HarvestDetails';
import HarvestsAvailable from './Pages/HarvestsAvailable';
import CreateHarvest from './Pages/CreateHarvest';
import Register from './Pages/Register';
import { AuthProvider } from './Context/AuthContext/authContext';
import Home from './Pages/Home';
import Profile from './Pages/Profile';

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
    element: <Harvests />,
  },
  {
    path: "/register-now",
    element: <Create />,
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
    path: "/createHarvest/userID",
    element: <CreateHarvest />,
  },
  {
    path: "/profile",
    element: AuthProvider.userLoggedIn ? <Profile /> : <Navigate to="/login"/>,
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
