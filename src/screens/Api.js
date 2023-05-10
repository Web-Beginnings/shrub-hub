import axios from "axios";



const plantAPI = axios.create({
  baseURL:
    "https://perenual.com/api/species-list?key=sk-iNSs645a4a879844d827=&indoor=1",
});

export const getPlants = () => {
  return plantAPI.get("/").then((response) => {
    return response.data.data;
  });
};


export const getPlantsById = (id) => {
  return axios
    .get(
      `https://perenual.com/api/species/details/${id}?key=sk-oyGu645b4adab7ecf847`)
    .then((response) => {
      // console.log("hereeeeee?", response);
      return response.data;
    });
};
