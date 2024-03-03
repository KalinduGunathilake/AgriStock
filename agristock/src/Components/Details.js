import React from 'react';
import '../Styles/Details.css' 


class Details extends React.Component{

  state = {
    products: [
      {
        "_id": "1",
        "title": "Carrot",
        "src": [
            "https://img.freepik.com/free-vector/hand-drawn-carrot-cartoon-illustration_23-2150650397.jpg?size=626&ext=jpg&uid=R134159092&ga=GA1.1.1290981190.1705661824&semt=ais"
          ],
        "name": "Mr.Siripala",
        "location": "Matara,Srilanka",
        "contactNumber":"0766821571",
        "expireDate":"3",
        "listedOn":"2001/02/24",
        "harvestOn":"2001/12/05",
        "quantityAvailable":"20",
        "price": 50,
        
        
      }
    ],
    index: 0
  };



  render(){
    const {products, index} = this.state;
    return(
      <div className="app">
        {
          products.map(item =>(
            <div className="details" key={item._id}>
              <div className="big-img">
                <img src={item.src} alt="Image"/>
              </div>

              <div className="box">
                <div className="row">
                  <h2>{item.title}</h2>
                  
                </div>
                

                <h3>{item.name}</h3>
                <p>{item.location}</p>
                <p>{item.contactNumber}</p>
                <p className='expiresIn'>Expires in:</p>
                <h4 className='expireDate'>{item.expireDate} days</h4>
                <p>Listed On :{item.listedOn}</p>
                <p>Harvest On:{item.harvestOn}</p>
                <p>Price per (kg):Rs.{item.price}</p>
                <p> Quantity Available(kg):{item.quantityAvailable}</p>

                 
                <button className="cart">Contact Famer</button>

              </div>
            </div>
          ))
        }
      </div>
    );
  };
}

export default Details;
