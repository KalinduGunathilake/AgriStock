// import React, { createContext, useState, useContext } from 'react';

// // Create a context for location
// const LocationContext = createContext();

// // Custom hook to use location context
// export const useLocation = () => useContext(LocationContext);

// // Location provider component
// export const LocationProvider = ({ children }) => {
//     const [location, setLocation] = useState(null);
//     const [error, setError] = useState(null);

//     // Function to handle location retrieval
//     const getLocation = () => {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(
//                 (position) => {
//                     setLocation({
//                         latitude: position.coords.latitude,
//                         longitude: position.coords.longitude
//                     });
//                 },
//                 (err) => {
//                     setError(err.message);
//                 }
//             );
//         } else {
//             setError("Geolocation is not supported by this browser.");
//         }
//     };

//     // Value object to be provided by context
//     const value = {
//         location,
//         error,
//         getLocation
//     };

//     return (
//         <LocationContext.Provider value={value}>
//             {children}
//         </LocationContext.Provider>
//     );
// };


// import React, { createContext, useState, useContext } from 'react';

// const LocationContext = createContext();

// export const useLocation = () => useContext(LocationContext);

// export const LocationProvider = ({ children }) => {
//     const [location, setLocation] = useState("");
//     const [error, setError] = useState("");

//     const getLocation = () => {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(
//                 (position) => {
//                     setLocation({
//                         latitude: position.coords.latitude,
//                         longitude: position.coords.longitude
//                     });
//                 },
//                 (err) => {
//                     setError(err.message);
//                 }
//             );
//         } else {
//             setError("Geolocation is not supported by this browser.");
//         }
//     };

//     const value = {
//         location,
//         error,
//         getLocation
//     };

//     return (
//         <LocationContext.Provider value={value}>
//             {children}
//         </LocationContext.Provider>
//     );
// };


// import React, { useState, useEffect, useContext } from 'react';

// // Create a context to hold the location data
// const LocationContext = React.createContext();

// // Custom hook to consume the location context
// export const useLocation = () => {
//   return useContext(LocationContext);
// };

// // Location provider component
// const LocationProvider = ({ children }) => {
//   const [location, setLocation] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getLocation = () => {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           position => {
//             setLocation({
//               latitude: position.coords.latitude,
//               longitude: position.coords.longitude
//             });
//           },
//           error => {
//             setError(error.message);
//           }
//         );
//       } else {
//         setError("Geolocation is not supported by this browser.");
//       }
//     };

//     getLocation();

//     // Cleanup function
//     return () => {
//       // Cleanup any ongoing processes if needed
//     };
//   }, []);

//   return (
//     <LocationContext.Provider value={{ location, error }}>
//       {children}
//     </LocationContext.Provider>
//   );
// };

// export default LocationProvider;


import { useState, useEffect } from 'react';

export const useLocation = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        error => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return location;
};