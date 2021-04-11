import React from "react";
import './App.scss'
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

let Grid = () => {
  // Hooks for images
  const [images, setImages] = React.useState([]);

  React.useEffect(() => {
    fetchImages();
  }, []);

  // fetch images using any public API that returns photos(unsplash)
  const fetchImages = (count = 10) => {
    const apiRoot = "https://api.unsplash.com";
    const accessKey =
      "wyHH6b61LLtUgQmX93nPLSsrffoERj6gQ5jQiyGUwiA";

    // random images
    axios
      .get(`${apiRoot}/photos/random?client_id=${accessKey}&count=${count}`)
      .then(res => {
        setImages([...images, ...res.data]);
        setIsLoaded(true);

        console.log(images);
      });
  };

  return (
    <div className="container">
        {/* Some text */}
        <h2>Reelgood front-end dev team assignment</h2>
        <h1>
          Grid of photos 
        </h1>
        <small>By <a href="https://juansvc.netlify.app" target="_blank">@juansvc</a></small>

      </div>
  );
};

export default Grid;