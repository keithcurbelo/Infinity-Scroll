//Unsplash API
const count = 5;
const apiKey = "";
const apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

//Get phots from Unsplash API
const getPhotos = async () => {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    console.log(data);
  } catch (err) {
    //catch error
  }
};

//On Load
getPhotos();
