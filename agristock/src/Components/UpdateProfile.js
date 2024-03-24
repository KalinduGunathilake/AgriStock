import React, { useEffect } from 'react'
import { useAuth } from '../Context/AuthContext/authContext';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProfile = () => {

    const userID = useParams().userID
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    console.log("current user : " + currentUser.uid);
    console.log("userID : " + userID);
    const unauthorized = () => {
        alert("You are not authorized to edit this user");
        navigate('/home');
    }

    useEffect(() => {
        if (currentUser.uid !== userID) {
            unauthorized();
        }
    }, [])


    return (

        <div>
            {/* {currentUser.uid !== userID ? unauthorized() : */}
                {/* <> */}
                    {/* UpdateProfile */}
                {/* </> */}
            {/* } */}

            






        </div>
    )
}

export default UpdateProfile