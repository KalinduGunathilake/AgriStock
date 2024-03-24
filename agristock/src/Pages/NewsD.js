import React, { useState } from 'react';
import '../Styles/newsdetails.css';

function NewsD() {
  const [news, setNews] = useState([
    {
      
      description: 'Get ready to grow your green thumb! A new initiative is encouraging people to  build their gardens with love. This program offers resources and workshops to help people of all experience levels learn about gardening. No matter if you have a small balcony or a sprawling backyard, there are ways to get involved and enjoy the benefits of gardening.',
      poster: 'https://img.freepik.com/free-psd/garden-with-love-flyer-template_23-2148969683.jpg?size=626&ext=jpg&ga=GA1.1.1290981190.1705661824&semt=ais',
    },
  ]);

  return (
    <div className="newsD-App">
      <h1 className='latestnews'>latest News</h1>
      <div className="newsD-container">
        {news.map((article, index) => (
          <div className="newsD-item" key={index}>
            <div className="newsD-image-container">
              <img src={article.poster} alt="News Poster" />
            </div>
            <div className="n-details-container">
              <div className="newsD-details-h2">
                <h2>{article.title}</h2>
              </div> 
              <div className="newsD-details-p"> 
                <p>{article.description}</p>
              </div>  
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsD;
