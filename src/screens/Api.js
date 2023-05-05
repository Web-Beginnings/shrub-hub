import axios from "axios";

const plantAPI = axios.create({
  baseURL:
    "https://perenual.com/api/species-list?key=sk-CMwS6454fbfd085e4768&indoor=1",
});

export const getPlants = () => {
  return plantAPI.get("/").then((response) => {
    return response.data.data;
  });
};

export const getPlantsById = (id) => {
  return axios
    .get(
      `https://perenual.com/api/species/details/${id}?key=sk-CMwS6454fbfd085e4768`
    )
    .then((response) => {
      return response.data;
    });
};
