import React from 'react'
import '../Styles/navbar.css'
const Navbar = () => {
  return (
    <div>
        <nav>
            <ul className='navbar'>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar