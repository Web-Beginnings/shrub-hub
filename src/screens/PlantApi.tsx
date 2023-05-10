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

    const axiosResponse: Promise<PlantResponseObject> =  axios
      .get(
        `https://perenual.com/api/species-list?page=${page}&key=sk-iNSs645a4a879844d827&indoor=1`
    );
    result.push(axiosResponse);
  });
  const responses = await Promise.all(result);
  return responses.flatMap((it) => it.data.data);
}
