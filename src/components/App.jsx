import React from "react";
import './App.scss'
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

let Grid = () => {
  // Hooks for images,loading,lightbox, lightbox-index
  const [images, setImages] = React.useState([]);
  const [loaded, setIsLoaded] = React.useState(false);
  const [open, setIsOpen] = React.useState(false); //lightbox
  const [photoIndex, setPhotoIndex] = React.useState(0);

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

      {/* open lightbox on image clicked */}
      {open && (
            <Lightbox
              mainSrc={images[photoIndex].urls.regular}
              nextSrc={images[photoIndex].urls.regular}
              prevSrc={images[photoIndex].urls.regular}
              onCloseRequest={() => setIsOpen(false)}
              onMovePrevRequest={() =>
                setPhotoIndex((photoIndex + images.length - 1) % images.length)
              }
              onMoveNextRequest={() =>
                setPhotoIndex((photoIndex + 1) % images.length)
              }
            />
          )}
    </div>
  );
};

export default Grid;
