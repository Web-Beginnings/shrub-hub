import axios from "axios";

const plantAPI = axios.create({
  baseURL:
    "https://perenual.com/api/species-list?keysk-qE0N6459fe42e68c6734=&indoor=1",
});


export const getPlants = () => {
  return plantAPI.get("/").then((response) => {
    return response.data.data;
  });
};

export const getPlantsById = (id) => {
  return axios
    .get(
      `https://perenual.com/api/species/details/${id}?key=sk-qE0N6459fe42e68c6734
      `
    )
    .then((response) => {
      return response.data;
    });
};
