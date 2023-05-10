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

export const getPlantsById = (id) => {
  return axios
    .get(
      `https://perenual.com/api/species/details/${id}?key=sk-euFV645bb6d37d879868`
    )
    .then((response) => {
      // console.log("hereeeeee?", response);
      return response.data;
    });
};
