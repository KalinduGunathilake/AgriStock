import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import backendURL from '../Config/backendURL';
import { useAuth } from '../Context/AuthContext/authContext';
import '../Styles/additionalInfo.css';
import backgroundImage from '../Images/add.back.jpg';

const AdditionalInfo = () => {

    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [updatedFields, setUpdatedFields] = useState({
   
        name: '',
        role: '',
        contactNo: '',
        

    });

    const handleChange = (e) => {
        setUpdatedFields({ ...updatedFields, [e.target.name]: e.target.value });
    };
    const handleInfoSubmit = async (e) => {
        e.preventDefault();

        try {

            await fetch(backendURL + '/updateUser?id=' + currentUser.uid, {
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

    return (
        <div>
            <h1 className="ad-agristock-heading">AgriStock</h1>
            <div className="add-background-container" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></div>
           
            <div className="add-container">
            <h2 className='add-head'>Additional Details</h2>

     
            <form onSubmit={handleInfoSubmit}>
            <div className="add-radio-container">       
                <label className="radio-label" onChange={handleChange}>
                     <input type="radio" name="role" value="buyer" /> Buyer
                </label>
                <label className="radio-label" onChange={handleChange}>
                    <input type="radio" name="role" value="farmer" /> Farmer
                </label>
            </div>

            <label htmlFor="name"className='addleb'> Full Name:</label>
                <input type="text" className='add-in' name="name" placeholder="Full Name" required onChange={handleChange} />
            <label htmlFor="number"className='addleb'> Phone Number:</label>
                <input type="text" className='add-in' name="contactNo" placeholder="+94123456789" required onChange={handleChange} />
                <button type="submit" className='add-sub'>Submit</button>
            </form>
            </div>
        </div>

        
    )
}

export default AdditionalInfo