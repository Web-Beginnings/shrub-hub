import axios from "axios";

const plantAPI = axios.create({
  baseURL:
    "https://perenual.com/api/species-list?key=sk-5hl6645ca7c4d58b6879&indoor=1",
});

export const getPlants = () => {
  return plantAPI.get("/").then((response) => {
    return response.data.data;
  });
};

export const getPlantsById = (id: any) => {
  return axios
    .get(
      `https://perenual.com/api/species/details/${id}?key=sk-5hl6645ca7c4d58b6879`
    )
    .then((response) => {
      // console.log("hereeeeee?", response);
      return response.data;
    });
};
