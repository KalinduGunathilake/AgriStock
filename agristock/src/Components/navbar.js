// import React from 'react'
// import '../Styles/navbar.css'
// const Navbar = () => {
//   return (
//     <div className='navCont'>
//         <nav>
//             <div className='logo'>AgriStock</div>
//             <ul className='navbar'>
//                 <li className='active'><a href="/" >Home</a></li>
//                 <li><a href="/stocks">Stocks</a></li>
//                 <li><a href="#">Contact</a></li> 
//                 <li><a href="/login">Login</a></li> 
//             </ul>
//         </nav>
//     </div>
//   )
// }

// export default Navbar

import React, { useState } from 'react';
import '../Styles/navbarnew.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='navCont'>
      <nav>
        <div className='logo'>AgriStock</div>
        <div className='hamburger' onClick={toggleNav}>
          <div className={`line ${isOpen ? 'open' : ''}`}></div>
          <div className={`line ${isOpen ? 'open' : ''}`}></div>
          <div className={`line ${isOpen ? 'open' : ''}`}></div>
        </div>
        <ul className={`navbar ${isOpen ? 'open' : ''}`}>
          <li className='active'><a href="/">Home</a></li>
          <li><a href="/stocks">Stocks</a></li>
          <li><a href="/harvests">Harvests</a></li>
          <li><a href="/login">Login</a></li>
          <li className='close' onClick={toggleNav}><span>&times;</span></li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
