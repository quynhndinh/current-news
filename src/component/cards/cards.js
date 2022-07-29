import React, { useState, useEffect } from "react";
import axios from "axios";
import "./cards.css";

function Cards() {
  const [data, setData] = useState([]);
  const getNews = () => {
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?country=us&apiKey=35683222129440eda7a4be80f0a8a48f"
      )
      .then((response) => {
        // console.log(response)
        setData(response.data.articles);
      });
  };

  useEffect(() => {
    getNews();
}, []);

function sortData(e) {
    e.preventDefault();
    setSort(e.target.dataset.sort); 
switch (sort) {
  case "date":
    let dataByDate = data
      .sort((a, b) => {
        return a.publishedAt < b.publishedAt ? 1 : -1;
      })
      .reverse();
    setData(dataByDate);
    break;
  case "alpha":
    let dataByAlpha = data
      .sort((a, b) => {
        return a.title > b.title ? -1 : 1;
      })
      .reverse();
    setData(dataByAlpha);
    break;
            default: setData(data);

}
    console.log("sorted data", data);
}


function Alpha() {
  const [news, setNews] = useState([]);
  const [isAlpha, setIsAlpha] = useState(false);

  useEffect(() => {
    axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=35683222129440eda7a4be80f0a8a48f').then((res) => {
      setNews(res?.data?.articles ?? []);
    });
  }, []);

  return (
    <div>
      <button onClick={() => setIsAlpha(true)}>Sort Alphabetical</button>
      <ul>
      {isAlpha
        ? news.sort(
            (a, b) =>
              a.title.length - b.title.length || a.title.localeCompare(b.title),
          ).map(n => <li>n.content</li>)
        : news.sort(
            (a, b) => new Date(a.publishedAt) - new Date(b.publishedAt),
          ).map(n => <li>n.content</li>)}
    </ul>
    </div>
  );
}




  return (
    <div>
      <h1>Sort</h1>
      <button className="btn btn-primary" onClick={getNews}>Top News</button>
				 
			{/* <button className="btn btn-primary" onClick={sortData} data-sort="date">Date Published</button> */}
				
			<button className="btn btn-primary" onClick={Alpha} data-sort="alpha">Alphabetically</button>
			
			

      <div className="container">
        <div className="row">
          {data.map((value) => {
            return (
              <div className="card" style={{ width: "18rem" }}>
                <img
                  src={value.urlToImage}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{value.title}</h5>
                  <h5 className="card-date">{value.published}</h5>
                  <p className="card-text">{value.description}</p>
                  <p className="card-date">{value.publishedAt}</p>
                  <a
                    href={value.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Source
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Cards;
