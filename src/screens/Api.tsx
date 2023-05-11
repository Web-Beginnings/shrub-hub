import axios from "axios";

const plantAPI = axios.create({
  baseURL:
    "https://perenual.com/api/species-list?key=sk-6dw0645cb3f13ea99882&indoor=1",
});

export const getPlants = () => {
  return plantAPI.get("/").then((response) => {
    return response.data.data;
  });
};

export const getPlantsById = (id: any) => {
  return axios
    .get(
      `https://perenual.com/api/species/details/${id}?key=sk-lBZ2645ceb4b7bcec890`
    )
    .then((response) => {
      // console.log("hereeeeee?", response);
      return response.data;
    });
};
