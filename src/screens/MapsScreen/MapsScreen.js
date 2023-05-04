import React from "react";
import { useState, useEffect } from "react";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  Text,
  View,
  Button,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "../../../environment";

import Footer from "../HomeScreen/Components.js/Footer";
import Header from "../HomeScreen/Components.js/Header";

export default function MapsScreen({ navigation }) {
  const [plantShops, setPlantShops] = useState([]);

  useEffect(() => {
    fetch(
      "https://maps.googleapis.com/maps/api/place/textsearch/json?query=plant+shops+leeds&key=AIzaSyCGAG_jQqT8-iTMV9xteNqgdY3X-GIoj64"
    )
      .then((response) => response.json())
      .then(({ results }) => {
        // console.log(results);
        setPlantShops(results);
      });
  }, []);

  const onRegionChange = (region) => {
    // console.log(region);
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
      {/* <Header /> */}
      <View style={styles.body}>
        <View>
          <Text style={styles.header}>FIND THOSE PLANTS</Text>
        </View>
        <View style={styles.spacer}>
          <Text>Locate your nearest plant nursery</Text>
        </View>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: 53.801277,
            longitude: -1.548567,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
          onRegionChange={onRegionChange}
          initialRegion={{
            latitude: 53.811646035962994,
            latitudeDelta: 0.24058985599031502,
            longitude: -1.558138132095337,
            longitudeDelta: 0.2888169139623642,
          }}
        >
          {showPlantShops()}
        </MapView>
        {/* <View style={styles.searchContainer}>
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
        </View> */}
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
    backgroundColor: "#70C064",
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
