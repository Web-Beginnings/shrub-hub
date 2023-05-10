import axios from "axios";

const plantAPI = axios.create({
  baseURL:
    "https://perenual.com/api/species-list?key=sk-yjo9645ba6a2ab6c5863&indoor=1",
});

export const getPlants = () => {
  return plantAPI.get("/").then((response) => {
    return response.data.data;
  });
};

export const getPlantsById = (id: number) => {
  return axios
    .get(

      `https://perenual.com/api/species/details/${id}?key=sk-fgc6645ba1a85a079861`
    )
    .then((response) => {
      return response.data;
    });
};
