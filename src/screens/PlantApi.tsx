import axios from "axios";

interface PlantResponseObject {
  data: PlantResponse;
}

interface PlantResponse {
  data: PlantData[];
}

interface PlantData {
  id: number;
  common_name: string;
  scientific_name: string[];
  cycle: string;
  watering: string;
  other_name: string[];
  sunlight: string[];
  default_image: PlantDefaultImage;
}

interface PlantDefaultImage {
  license: number;
  license_name: string;
  license_url: string;
  original_url: string;
  regular_url: string;
  medium_url: string;
  small_url: string;
  thumbnail: string;
}

export async function getPlants(): Promise<PlantData[]> {
  const pageNumbers = [1, 2, 3, 4, 5, 6];
  let result: Promise<PlantResponseObject>[] = [];
  pageNumbers.forEach((page) => {
    const axiosResponse: Promise<PlantResponseObject> = axios.get(
      `https://perenual.com/api/species-list?page=${page}&key=sk-nQ6L645a477412dfe827&indoor=1`
    );
    result.push(axiosResponse);
  });
  const responses = await Promise.all(result);
  return responses.flatMap((it) => it.data.data);
}

// export const sortPlantsByHardiness = (hardinessLevel: any) => {
//   return axios
//     .get(
//       `https://perenual.com/api/species-list?key=sk-QnAZ64551cecd426b769&indoor=1&hardiness=${hardinessLevel}`
//     )
//     .then((response) => {
//       return response.data;
//     });
// };

export async function sortPlantsByWatering(
  watering: string
): Promise<PlantData[]> {
  const pageNumbers = [1, 2, 3, 4, 5, 6];
  let result: Promise<PlantResponseObject>[] = [];
  pageNumbers.forEach((page) => {
    const axiosResponse: Promise<PlantResponseObject> = axios.get(
      `https://perenual.com/api/species-list?page=${page}&key=sk-nQ6L645a477412dfe827&indoor=1&watering=${watering}`
    );
    result.push(axiosResponse);
  });
  const responses = await Promise.all(result);
  return responses.flatMap((it) => it.data.data);
}

// export const sortPlantsByWatering = (watering: string) => {
//   return axios
//     .get(
//       `https://perenual.com/api/species-list?key=sk-QnAZ64551cecd426b769&indoor=1&watering=${watering}`
//     )
//     .then((response) => {
//       return response.data;
//     });
// };
