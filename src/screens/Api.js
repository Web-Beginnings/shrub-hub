import axios from "axios";

// const plantAPI = axios.create({
//   baseURL:
//     "https://perenual.com/api/species-list?key=sk-xEgo645a42fd862a8687&indoor=1",
// });

// export const getPlants = () => {
//   return plantAPI.get("/").then((response) => {
//     return response.data.data;
//   });
// };

export const getPlantsById = (id) => {
  return axios
    .get(
      `https://perenual.com/api/species/details/${id}?key=sk-3eka645a469b4f3bc687`
    )
    .then((response) => {
      return response.data;
    });
};
