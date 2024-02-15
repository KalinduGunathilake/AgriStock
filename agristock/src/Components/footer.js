import React from 'react'
import FooterLogo from '../Images/Asset 11.png'
import '../Styles/footer.css'

const Footer = () => {
  return (
    <div className='footerCont'>
        
        <div className='footerLogoCont footerItem'>
            <div className='footerLogoDiv'>
                <p className='footerLogo'>AgriStock</p>
            </div>
            <div className='footerCaption'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut hic natus debitis magni. Enim, fugit natus veritatis culpa recusandae praesentium
            </div>
        </div>
        <div className='footerLinks footerItem'>
            <h3>Quick Links</h3>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
        </div>
        <div className='footerContact footerItem'>
            <h3>Contact Us</h3>
            <ul>
                <li>+91 123456789</li>
                <li>+91 123456789</li>
                <li>+91 123456789</li>
                <li>+91 123456789</li>
            </ul>
        </div>
        <div className='footerEmail footerItem'>
            <h3>Email Us</h3>
            <p>Send us a mail to<br/><a href="mailto:agristock.services@gmail.com" target='_blank'>agristock.services@gmail.com</a>
            </p>
        </div>
        
    </div>
  )
}

export default Footer