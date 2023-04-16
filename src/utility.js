import axios from "axios";

const count = 30;

export const getImages = async () => {
  try {
    const imagesURL = `https://api.unsplash.com/photos/random?client_id=90LZaaieEsVBW1N0qQA4FsWmy3b4Zf5Myh9iX1y_ydA&count=${count}`;

    const response = await axios.get(imagesURL);
    const data = response.data;

    let imageURLs = [];
    data.forEach((data) => {
      imageURLs.push(data.urls.small);
    });
    return imageURLs;
  } catch (err) {
    console.log("err", err.response.data);
  }
};

export const getSearchImages = async (searchPrompt, page) => {
  try {
    const imagesURL = `https://api.unsplash.com/photos/random?client_id=90LZaaieEsVBW1N0qQA4FsWmy3b4Zf5Myh9iX1y_ydA&query=${searchPrompt}&per_page=${count}&page=${page}`;
    const response = await axios.get(imagesURL);
    const data = response.data.results;
    let imageURLs = [];
    data.forEach((data) => {
      imageURLs.push(data.urls.small);
    });
    return imageURLs;
  } catch (err) {
    console.log("err", err.response.data);
  }
};
