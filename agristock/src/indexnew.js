// import React, { useEffect, useState } from 'react';
// // import ReactDOM from 'react-dom';
// import { createRoot } from 'react-dom/client';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import Login from './Pages/Login';
// import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// import Crops from './Pages/Crops';
// import Harvests from './Pages/HarvestsAvailable';
// import Create from './Pages/Create';
// import HarvestDetails from './Pages/HarvestDetails';

// // const [crops, setCrops] = useState([]);
// const crops = [];

// // fetch('http://192.168.1.176:5000/getcrops')
// //     .then(response => response.json())
// //     .then(data => {
// //         if (Array.isArray(data.crop)) {
// //             // const { crops, setCrops } = data;
// //             // setCrops(data.crop);
// //             crops.push(...data.crop);
// //             console.log("Data Received successfully");
// //         } else {
// //             console.error('Invalid data format:', data);
// //         }
// //     })
// //     .catch(error => console.log('Error fetching crops:', error));

// const fetchCrops = () => {
//     fetch('http://192.168.1.176:5000/getcrops')
//         .then(response => response.json())
//         .then(data => {
//             if (Array.isArray(data.crop)) {
//                 crops.push(...data.crop);
//                 console.log("Data Received successfully");
//             } else {
//                 console.error('Invalid data format:', data);
//             }
//         })
//         .catch(error => console.log('Error fetching crops:', error));
// }
// const showCrops = () => {
//     if (crops.length > 0) {
//       console.log(crops);
//     }else {
//       console.log('No crops available');

//   }}

// fetchCrops().then(showCrops);

// // Assuming crops are fetched successfully
// const routes = [
//     {
//         path: "/",
//         element: <App />,
//     },
//     {
//         path: "/login",
//         element: <Login />,
//     },
//     {
//         path: "/stocks",
//         element: <Crops />,
//     },
//     {
//         path: "/harvests",
//         element: <Harvests />,
//     },
//     {
//         path: "/register-now",
//         element: <Create />,
//     },
//     ...crops.map(crop => ({
//         path: `/crop/${crop.CropName}`,
//         element: <HarvestDetails key={crop.CropName} cropName={crop.CropName} />,
//     })),
// ];

// const router = createBrowserRouter(routes);


// const root = createRoot(document.getElementById('root')); // Use createRoot from "react-dom/client"
// root.render(
//     <React.StrictMode>
//         <RouterProvider router={router} ></RouterProvider>
//     </React.StrictMode>
// );

// reportWebVitals();


import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter, matchPath } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './Pages/Login';
import Crops from './Pages/Crops';
import Harvests from './Pages/HarvestsAvailable';
import Create from './Pages/Create';
import HarvestDetails from './Pages/HarvestDetails';
import HarvestsAvailable from './Pages/HarvestsAvailable';

const crops = [];

const fetchCrops = () => {
    return new Promise((resolve, reject) => {
        fetch('http://192.168.1.176:5000/getcrops')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data.crop)) {
                    crops.push(...data.crop);
                    console.log("Data Received successfully");
                    resolve();
                } else {
                    console.error('Invalid data format:', data);
                    reject('Invalid data format');
                }
            })
            .catch(error => {
                console.log('Error fetching crops:', error);
                reject(error);
            });
    });
};

const showCrops = () => {
    if (crops.length > 0) {
        console.log(crops);
    } else {
        console.log('No crops available');
    }
};

fetchCrops()
    .then(showCrops)
    .then(() => {
        // Assuming crops are fetched successfully
        const routes = [
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
            // {
            //     path: "/harvest-details/:cropName",
            //     element: ({ match }) => <HarvestDetails cropName={match.params.cropName} />,
            // },
            {
                path: "/harvest-details/:cropName",
                element: ({ match }) => <HarvestDetails cropName={match.params.cropName}/>,
            },
            {
                path: "/crop/:cropName",
                element: ({ match }) => <HarvestsAvailable cropName={match.params.cropName} />,
            }
            // ...crops.map(crop => ({
            //     path: `/crop/${crop.CropName}`,
            //     element: <HarvestsAvailable key={crop.CropName} cropName={crop.CropName} />,
            // })),
        ];

        const router = createBrowserRouter(routes);

        const root = createRoot(document.getElementById('root'));
        root.render(
            <React.StrictMode>
                <RouterProvider router={router} />
            </React.StrictMode>
        );

        reportWebVitals();
    })
    .catch(error => {
        console.error('Error:', error);
    });
