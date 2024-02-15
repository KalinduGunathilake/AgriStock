import React from 'react'
import '../Styles/navbar.css'
const Navbar = () => {
  return (
    <div className='navCont'>
        <nav>
            <div className='logo'>AgriStock</div>
            <ul className='navbar'>
                <li className='active'><a href="#" >Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar