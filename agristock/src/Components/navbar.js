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

import React, {  useEffect, useState } from 'react';
import '../Styles/navbarnew.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import 'boxicons'
import { doSignOut } from '../Firebase/auth';
import { useAuth } from '../Context/AuthContext/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
const Navbar = () => {

	useEffect(() => {
		document.body.style.overflow = 'auto';
	}, []);

	const [isOpen, setIsOpen] = useState(false);

	const toggleNav = () => {
		if (window.innerWidth < 768) {
			// setIsOpen(!isOpen);
			var menuIcon = document.getElementById("navIcon");
			var navCont = document.getElementsByClassName("navCont")[0];

			console.log(menuIcon.getAttribute("name"));
			if (menuIcon.getAttribute("name") === 'menu') {
				menuIcon.setAttribute('name', 'x'); // set name = 'x'; 
				navCont.style.height = '100svh';
				setIsOpen(true);
			} else {
				setIsOpen(false);
				menuIcon.setAttribute('name', 'menu'); // set name = 'x'; 
			}
			document.body.style.overflow = isOpen ? 'auto' : 'hidden';
		}
	};


	//   const handleScroll = () => {
	// 	  var scrollToTopBtn = document.getElementById("backToTopBtn");
	// 	  if (window.scrollY > 300) {
	// 		  scrollToTopBtn.style.opacity = 1;
	// 		  scrollToTopBtn.style.visibility = "visible";
	// 	  } else {
	// 		  scrollToTopBtn.style.opacity = 0;
	// 		  scrollToTopBtn.style.visibility = "hidden";
	// 	  }
	//   }

	const { userLoggedIn } = useAuth();
	const navigate = useNavigate();
	// const { doSignOut } = useAuth();

	return (
		<div className='navCont'>
			<nav>
				<div className='logo'>AgriStock</div>
				<div className='hamburger' onClick={toggleNav}>
					<box-icon name='menu' id='navIcon' ></box-icon>
				</div>
				<ul className={`navbar ${isOpen ? 'open' : ''}`}>
					<li><NavLink to="/" component={Link}>Home</NavLink></li>
					<li><NavLink component={Link} to="/stocks">Stocks</NavLink></li>
					<li><NavLink component={Link} to="/harvests">News</NavLink></li>

					{/* <li><NavLink component={Link} to="/harvests">Harvests</NavLink></li> */}

					{
						userLoggedIn
							?
							<>
								<li><NavLink to={'/profile'} ><FontAwesomeIcon icon={faCircleUser} /></NavLink></li>
							</>
							:
							<>
								<li><NavLink className='text-sm text-blue-600 underline' to={'/login'}>Login</NavLink></li>
								<li><NavLink className='text-sm text-blue-600 underline' to={'/register'}>Register</NavLink></li>
							</>
					}

					{/* <li><NavLink component={Link} to="/login">Login</NavLink></li> */}
					{/* <li className='close' onClick={toggleNav}><span>&times;</span></li> */}
				</ul>
			</nav>
		</div>
	);
};

export default Navbar;
