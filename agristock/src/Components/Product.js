import React from 'react'
import '../Styles/harvest.css' 
function Product(props) {
  return (
      
      <section className='card-container'>
        <section className='card'>
          <img src={props.image} alt='card-image' className='card-img'/>
          <div className='card-details'>
            
            <h4 className='location'>
                {props.location}
            </h4>
            <h5 className='expiresIn'>Expires in</h5>
          <section className='expireDate'>
            <div className='expireDate'>
              <del className='daysMore'><p>{props.ExpireDate} days</p></del>
            </div>
            <button className='button'type='button'>Click for details</button>
            
            
              
           
            </section>    

       </div>

        </section>
        </section> 
        
        
         
  )
}

export default Product
