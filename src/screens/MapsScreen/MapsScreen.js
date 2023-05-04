import React from "react";
import { useState, useEffect, useRef } from "react";
import MapView, {
  Callout,
  Marker,
  PROVIDER_GOOGLE,
  Animated,
  AnimatedRegion,
} from "react-native-maps";
import {
  Text,
  View,
  Button,
  StyleSheet,
  Dimensions,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";

import { GOOGLE_API_KEY } from "../../../environment";
import * as Location from "expo-location";

import Footer from "../HomeScreen/Components.js/Footer";

export default function MapsScreen({ navigation }) {
  const [findLocation, setFindLocation] = useState({
    latitude: 53.26573505600048,
    latitudeDelta: 4.2993060103804055,
    longitude: -1.519359592348337,
    longitudeDelta: 4.0593768283724785,
  });
  const [plantShops, setPlantShops] = useState([]);
  const [search, setSearch] = useState("United Kingdom");
  const [buttonPress, setButtonPress] = useState(false);

  const cityOptions = [
    "Leeds",
    "Manchester",
    "York",
    "London",
    "Sheffield",
    "Birmingham",
  ];

  const cityCoordinates = {
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

  const animate = (selectedItem) => {
    let chosenCity = {
      latitude: cityCoordinates[`${selectedItem}`].latitude,
      latitudeDelta: cityCoordinates[`${selectedItem}`].latitudeDelta,
      longitude: cityCoordinates[`${selectedItem}`].longitude,
      longitudeDelta: cityCoordinates[`${selectedItem}`].longitudeDelta,
    };
    // console.log("loggg", cityCoordinates[`${search}`].latitude);

    this.map.animateToRegion(chosenCity, 1000);
  };
  useEffect(() => {
    fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=plant+shops+${search}&key=${GOOGLE_API_KEY}`
    )
      .then((response) => response.json())
      .then(({ results }) => {
        setPlantShops(results);
      });
  }, [search]);

  const onRegionChange = (region) => {
    console.log(region);
  };

  const handleOnSelect = (selectedItem) => {
    setSearch(selectedItem);
    animate(selectedItem);
  };

  const showPlantShops = () => {
    return plantShops.map((item, index) => {
      return (
        <Marker
          key={index}
          coordinate={{
            latitude: item.geometry.location.lat,
            longitude: item.geometry.location.lng,
          }}
          title={item.name}
          description={item.formatted_address}
          tracksViewChanges={false}
          icon={require("../../../assets/PlantMarker.png")}
        >
          <Callout tooltip>
            <View>
              <View style={styles.bubble}>
                <Text style={styles.name}>{item.name}</Text>
                <Text>{item.formatted_address}</Text>
              </View>
              <View style={styles.arrowBorder} />
              <View style={styles.arrow} />
            </View>
          </Callout>
        </Marker>
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View>
          <Text style={styles.header}>FIND THOSE PLANTS</Text>
        </View>

        <View style={styles.spacer}>
          <Text>Locate your nearest plant nursery</Text>
        </View>
        {/* <TextInput
          style={styles.input}
          placeholder={"Tell us your location..."}
          onChangeText={(value) => setSearch(value)}
        />
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setButtonPress(!buttonPress)}
          >
            <Text>PRESS ME</Text>
          </TouchableOpacity>
        </TouchableWithoutFeedback> */}
        <SelectDropdown
          data={cityOptions}
          onSelect={(selectedItem) => handleOnSelect(selectedItem)}
        />
        <View style={styles.spacer}>
          <Text>Showing results near {search}</Text>
        </View>
        <MapView
          style={styles.map}
          ref={(map) => {
            this.map = map;
          }}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 53.26573505600048,
            latitudeDelta: 4.2993060103804055,
            longitude: -1.519359592348337,
            longitudeDelta: 4.0593768283724785,
          }}
          onRegionChange={onRegionChange}
        >
          {showPlantShops()}
        </MapView>
      </View>
      <View style={styles.footer}>
        <Footer navigation={navigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  spacer: {
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#1B7130",
    paddingTop: "30%",
  },
  bubble: {
    flexDirection: "column",
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 6,
    borderColor: "#ccc",
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  name: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 80,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
  arrow: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#fff",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#007a87",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -0.5,
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  map: {
    width: "90%",
    height: "90%",
    borderColor: "#3A914F",
    paddingTop: 30,
  },
  footer: {
    backgroundColor: "blue",
    padding: 25,
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
  },
  searchContainer: {
    position: "absolute",
    height: "5%",
    width: "65%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
  },
  input: {
    borderColor: "#888",
    borderWidth: 1,
  },
});

// const { width, height } = Dimensions.get("window");
// const ASPECT_RATIO = width / height;
// const LATITUDE_DELTA = 0.02;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
// const INITIAL_POSITION = {
//   latitude: 53.801277,
//   longitude: -1.548567,
//   latitudeDelta: LATITUDE_DELTA,
//   longitudeDelta: LONGITUDE_DELTA,
// };

/* <View style={styles.searchContainer}>
          <GooglePlacesAutocomplete
            styles={{ textInput: styles.input }}
            placeholder="Search"
            fetchDetails={true}
            onPress={(data, details = null) => {
              console.log(data, details);
            }}
            query={{
              key: GOOGLE_API_KEY,
              language: "en",
              components: "country:uk",
            }}
          />
        </View> */

// useEffect(() => {
//   const getPermissions = async () => {
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== "granted") {
//       console.log("Please grant location permission");
//       return;
//     }

//     let currentLocation = await Location.getCurrentPositionAsync({});
//     setFindLocation(currentLocation);
//     console.log("Location:");
//     console.log(currentLocation);
//   };
//   getPermissions();
// }, []);
