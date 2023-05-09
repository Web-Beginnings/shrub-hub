interface CityCoordinates {
  latitude: number;
  latitudeDelta: number;
  longitude: number;
  longitudeDelta: number;
}

interface CityMap {
  [city: string]: CityCoordinates;
}

const cityCoordinates: CityMap = {
  London: {
    latitude: 51.497479011894086,
    latitudeDelta: 0.1740534870343282,
    longitude: -0.11505637317895889,
    longitudeDelta: 0.1791045069694519,
  },
  York: {
    latitude: 53.97662994598687,
    latitudeDelta: 0.18917522098996642,
    longitude: -1.0799391567707062,
    longitudeDelta: 0.2060627192258836,
  },
  Sheffield: {
    latitude: 53.364104927032244,
    latitudeDelta: 0.18848379442276553,
    longitude: -1.4647399261593819,
    longitudeDelta: 0.2023465186357496,
  },
  Leeds: {
    latitude: 53.80130280280241,
    latitudeDelta: 0.2503246670873196,
    longitude: -1.5464437007904053,
    longitudeDelta: 0.27153007686138153,
  },
  Birmingham: {
    latitude: 52.491348016535234,
    latitudeDelta: 0.2178187321831615,
    longitude: -1.8559132888913155,
    longitudeDelta: 0.2291712909936907,
  },
  Manchester: {
    latitude: 53.47313110392403,
    latitudeDelta: 0.2075178147392478,
    longitude: -2.2210343554615974,
    longitudeDelta: 0.22335223853588104,
  },
};

const cityOptions: string[] = [
  "Leeds",
  "Manchester",
  "York",
  "London",
  "Sheffield",
  "Birmingham",
];

export { cityCoordinates, cityOptions };
