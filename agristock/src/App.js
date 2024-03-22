import React, { useEffect, useState } from "react";
import Home from "./Pages/Home";
import Loader from "./Components/Loader";
// import { Hearts } from "react-loader-spinner";


function App() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // simulate an asynchronous operation
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }, []);

  if (isLoading) {
    // return <Hearts
    // height="80"
    // width="80"
    // color="#4fa94d"
    // ariaLabel="hearts-loading"
    // wrapperStyle={{}}
    // wrapperClass=""
    // visible={true}
    // />;
    return <Loader />
  }
  return (
    
    <div className="App">
      <Home />
      
      

    </div>
  );
}

export default App;
