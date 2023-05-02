import axios from "axios";

const plantAPI = axios.create({
  baseURL:
    "https://perenual.com/api/species-list?key=sk-dH6O64511a48064c8649&indoor=1",
});

export const getPlants = () => {
  return plantAPI.get("/").then((response) => {
    return response.data.data;
  });
};
