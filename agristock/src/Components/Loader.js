import React from 'react'
import { Hearts } from 'react-loader-spinner'
import '../Styles/loader.css'
import loader from '../Images/loader.gif'

const Loader = () => {
    return (
        <div className='loader'>
            {/* <Hearts
                height="80"
                width="80"
                color="brown"
                ariaLabel="hearts-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            /> */}

            <div className='loaderGifCont'>
                <img src={loader} alt="loader" className='loaderGif' />
                {/* <lord-icon
                    src="https://cdn.lordicon.com/evvwiruv.json"
                    trigger="hover"
                    style="width:250px;height:250px">
                </lord-icon> */}
            </div>
            {/* <h3>Text here</h3> */}
        </div>
    )
}

export default Loader