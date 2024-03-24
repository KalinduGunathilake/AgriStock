import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import backendURL from '../Config/backendURL';
import { useAuth } from '../Context/AuthContext/authContext';

const AdditionalInfo = () => {

    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [updatedFields, setUpdatedFields] = useState({
        // uuid: harvestUUIDRef.current,
        name: '',
        role: '',
        contactNo: '',
        // profilePic: '',

    });

    const handleChange = (e) => {
        setUpdatedFields({ ...updatedFields, [e.target.name]: e.target.value });
    };
    const handleInfoSubmit = async (e) => {
        e.preventDefault();

        try {

            await fetch(backendURL + '/updateUser?firebaseID=' + currentUser.uid, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedFields),
            })
                .then((response) => {
                    console.log("success:", response.ok);
                    navigate('/profile');
                })
        } catch (error) {
            console.error(error);
        }

    }

    // const handleSubmit = async (currentUserNew) => {
    //     // console.log("ready to send details to mongodb")
    //     // console.log(userLoggedIn)
    //     // console.log(currentUser.uid)

    //     try {

    //         await fetch(backendURL + '/updateUser?firebaseID=' + currentUser.uid, {
    //             method: 'PATCH',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(updatedFields),
    //         })
    //             .then((response) => {
    //                 console.log("success:", response.ok);
    //             })

    //     } catch (error) {
    //         console.error(error);
    //     }

    // }
    return (
        <div>
            <form onSubmit={handleInfoSubmit}>
                <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} />
                <input type="text" name="contactNo" placeholder="+94123456789" required onChange={handleChange} />

                <label onChange={handleChange}>
                    <input type="radio" name="role" value="buyer" /> Buyer<br />
                    <input type="radio" name="role" value="farmer" /> Farmer<br />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AdditionalInfo