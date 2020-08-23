const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];
//Unsplash API
const count = 5;
const apiKey = "";
const apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

//Create Elements for links & Photos, add to DOM
const displayPhotos = () => {
  photosArray.forEach((photo) => {
    //Create <a> to link to unsplash
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");
    //Create <img> for photo
    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description);
    img.setAttribute("title", photo.alt_description);
    //Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};

//Get phots from Unsplash API
const getPhotos = async () => {
  try {
    const response = await fetch(apiURL);
    photosArray = await response.json();
    // console.log(photosArray);
    displayPhotos();
  } catch (err) {
    //catch error
  }
};

//On Load
getPhotos();
