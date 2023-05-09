import React from "react";
import { useState, useEffect, useRef } from "react";
import { Image } from "react-native";
import { cityCoordinates, cityOptions } from "./CityCoordinates";
import styles from "./styles";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
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

  const animate = (selectedItem) => {
    let chosenCity = {
      latitude: cityCoordinates[`${selectedItem}`].latitude,
      latitudeDelta: cityCoordinates[`${selectedItem}`].latitudeDelta,
      longitude: cityCoordinates[`${selectedItem}`].longitude,
      longitudeDelta: cityCoordinates[`${selectedItem}`].longitudeDelta,
    };

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
    // console.log(region);
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
          <Image
            style={styles.Icon}
            source={require("../../../assets/FindThosePlantsIcon.png")}
          />
        </View>

        <View style={styles.spacer}>
          <Text style={styles.infoText}>Locate your nearest plant nursery</Text>
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
          buttonStyle={styles.drop}
          data={cityOptions}
          onSelect={(selectedItem) => handleOnSelect(selectedItem)}
        />
        <View style={styles.spacer}>
          <Text style={styles.infoText}>Showing results near {search}</Text>
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
