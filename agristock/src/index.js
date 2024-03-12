import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './Pages/Login';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Crops from './Pages/Crops';
import Harvests from './Pages/HarvestsAvailable';
import Create from './Pages/Create';
import HarvestDetails from './Pages/HarvestDetails';
import HarvestsAvailable from './Pages/HarvestsAvailable';
import CreateHarvest from './Pages/CreateHarvest';


// Assuming crops are fetched successfully
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
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
    element:<HarvestDetails />,
  },
  {
    path: "/stocks/:cropName",
    element:<HarvestsAvailable />,
  },
  {
    path: "/createHarvest/userID",
    element:<CreateHarvest />,
  },

]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} ></RouterProvider>
  </React.StrictMode>
);

reportWebVitals();
