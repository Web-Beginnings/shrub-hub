import axios from "axios";

const plantAPI = axios.create({
  baseURL:
    "https://perenual.com/api/species-list?key=sk-a8dQ645bbd8560b1b871&indoor=1",
});

export const getPlants = () => {
  return plantAPI.get("/").then((response) => {
    return response.data.data;
  });
};

export const getPlantsById = (id) => {
  return axios
    .get(
      `https://perenual.com/api/species/details/${id}?key=sk-a8dQ645bbd8560b1b871`
    )
    .then((response) => {
      // console.log("hereeeeee?", response);
      return response.data;
    });
};
