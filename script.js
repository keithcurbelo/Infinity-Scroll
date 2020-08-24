//Dom Elements
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let images_loaded = 0;
let total_images = 0;
let photos_array = [];
//Unsplash API
let count = 5;
const apiKey = "";
let apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

//Helper Function to Set Attributes on DOM Elements
const setAttributes = (el, attributes) => {
  for (const key in attributes) {
    el.setAttribute(key, attributes[key]);
  }
};

//Check if all images were loaded
const imageLoaded = () => {
  images_loaded++;
  if (images_loaded === total_images) {
    loader.hidden = true;
    ready = true;
    count = 30;
  }
};

//Create Elements for links & Photos, add to DOM
const displayPhotos = () => {
  images_loaded = 0;
  total_images = photos_array.length;
  //Run function for each object in photos_array
  photos_array.forEach((photo) => {
    //Create <a> to link to unsplash
    const item = document.createElement("a");
    setAttributes(item, { href: photo.links.html, target: "_blank" });
    //Create <img> for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    //Event Listener, check when each is finished loading
    img.addEventListener("load", imageLoaded);
    //Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};

//Get phots from Unsplash API
const getPhotos = async () => {
  try {
    const response = await fetch(apiURL);
    photos_array = await response.json();
    // console.log(photos_array);
    displayPhotos();
  } catch (err) {
    //catch error
  }
};

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
    console.log("load more");
  }
});

//On Load
getPhotos();
