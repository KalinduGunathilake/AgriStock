import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './Pages/login';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Cropinfor from './Pages/Cropinfor';
import Harvests from './Pages/Harvests';


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
      element: <Cropinfor />,
  },
  {
      path: "/harvests",
      element: <Harvests />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
