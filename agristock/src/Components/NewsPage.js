import React, { useEffect, useState } from 'react';

import '../Styles/newspage.css'
import backendURL from '../Config/backendURL';
import { Link } from 'react-router-dom';

function NewsPage() {
  const [news, setNews] = useState([])

  useEffect(() => {
    fetch(backendURL + '/getnews')
      .then(response => response.json())
      .then(data => {
        setNews(data)
      })
  })



  //   {
  //     title: 'Breaking News',
  //     description: 'This is a breaking news article.',
  //     poster: 'https://img.freepik.com/free-psd/garden-with-love-flyer-template_23-2148969683.jpg?size=626&ext=jpg&ga=GA1.1.1290981190.1705661824&semt=ais',
  //   },
  //   {
  //     title: 'Latest Update',
  //     description: 'Get the latest updates here.',
  //     poster: 'https://img.freepik.com/free-psd/fruits-vegetables-year-print-template_23-2148887907.jpg?size=626&ext=jpg&uid=R134159092&ga=GA1.1.1290981190.1705661824&semt=ais',
  //   },
  //   {
  //     title: 'Breaking News',
  //     description: 'This is a breaking news article.',
  //     poster: 'https://img.freepik.com/free-psd/square-flyer-template-about-nature_23-2148403969.jpg?size=626&ext=jpg&uid=R134159092&ga=GA1.1.1290981190.1705661824&semt=ais',
  //   },
    
  // ]);

  return (
    <div className="App">
      <h1 className='latestnews'>Latest News</h1>
      <Link to="/newsDetails" className="news-container">
        {news.map((article, index) => (
          <div className="news-item" key={index}>
            <img src={article.poster} alt="News Poster" />
            <div className="news-details">
              <h2 className='articleTitle'>{article.title}</h2>
              <p>{article.description}</p>
            </div>
          </div>
        ))}
      </Link>
    </div>
  );
}

export default NewsPage;