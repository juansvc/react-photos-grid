import React from "react";
import './App.scss'
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

let Grid = () => {
  // Hooks for images,loading
  const [images, setImages] = React.useState([]);
  const [loaded, setIsLoaded] = React.useState(false);

  //div for images
  const UnsplashImage = ({ url, key }) => (
    <div className="image-item" key={key} >
      <img src={url} onClick={() => setIsOpen(true)}/>
    </div>
  );

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

      {/* Infinityscroll every 5 images */}
      <InfiniteScroll
        dataLength={images}
        next={() => fetchImages(5)}
        hasMore={true}
        loader={
          <img
            src="https://cdn.dribbble.com/users/563824/screenshots/3907093/escalade.gif"
            alt="loading"
          />
        }
      >
        <div className="image-grid" style={{ marginTop: "30px" }}>
          {/* map images on loaded fetch axios request */}
          {loaded
            ? images.map((image, index) => (
                <UnsplashImage
                  url={image.urls.regular}
                  key={index}
                />
              ))
            : ""}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Grid;