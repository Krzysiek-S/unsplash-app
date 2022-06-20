import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../axios";
import InfiniteScroll from "react-infinite-scroll-component";

import Loader from "./Loader";

import "./PhotoList.css";

const PhotoList = () => {
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState();
  const [isLoaded, setIsLoaded] = useState(true);
  const [loadingScroll, setLoadingScroll] = useState(false);

  const fetchPhotos = async () => {
    try {
      const res = await axios.get(`/search/photos/?client_id=${process.env.REACT_APP_API_KEY}&query=${value}&orientation=squarish&per_page=20`);
      setResults([...results, ...res.data.results]);
      setIsLoaded(false);
      setLoadingScroll(false);
    } catch (err) {
      alert(err.message)
    }
  };
  useEffect(() => {
    fetchPhotos();
  }, [query]);

  const searchImages = (e) => {
    if (e.keyCode === 13) {
      setQuery(e.target.value);
      setResults([]);
    }
  };
console.log(results)
  return (
    <div>
      <div className="searchContainer">
        <input
          type="text"
          value={value}
          placeholder="Type your picture"
          onKeyDown={(e) => searchImages(e)}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="inputButton" onClick={() => fetchPhotos()}>send</button>
      </div>
        <InfiniteScroll
          dataLength={results.length}
          next={fetchPhotos}
          hasMore={true}
          loader={loadingScroll ? <Loader /> : ""}
        >
          {isLoaded ? (
            <Loader />
          ) : (
            <div className="gallery">
              {results.map((item) => {
                return (
                  <div key={item.id}>
                      <Link
                        to={`/photos/${item.id}`}
                        style={{ color: "inherit", textDecoration: "inherit" }}
                      >
                        <img
                          className="itemGallery"
                          src={item.urls.regular}
                          alt={item.alt_desription}
                        />
                        <div className="photosDescription">
                          <p>Autor: {item.user.name}</p>
                          <p>Likes: {item.likes}</p>
                        </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </InfiniteScroll>
    </div>
  );
}

export default PhotoList;