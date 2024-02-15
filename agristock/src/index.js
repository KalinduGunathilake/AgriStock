import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './Pages/login';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';


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
      path: "/reports",
      // element: <Reports />,
  },
  {
      path: "/submit",
      // element: <Submit />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
