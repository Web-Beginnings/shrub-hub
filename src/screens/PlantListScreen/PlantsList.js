import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import Footer from "../HomeScreen/Components.js/Footer";
import Header from "../HomeScreen/Components.js/Header";
import { ScrollView } from "react-native-gesture-handler";
import { getPlants, sortPlantsByHardiness } from "../PlantApi";
import Slider from "@react-native-community/slider";

export default function PlantsList(props, extraData) {
  const { navigation } = props;
  const [plantsArray, setPlantsArray] = useState([]);
  const [sortPlantsArray, setSortPlantsArray] = useState([]);
  const [range, setRange] = useState("0");
  const [sliding, setSliding] = useState("");

  useEffect(() => {
    getPlants().then((result) => {
      setPlantsArray(result);
    });
  }, [setPlantsArray]);
  if (!plantsArray) {
    return <Text style={styles.title}>Loading Plants...</Text>;
  }

  // useEffect(() => {
  //   sortPlantsByHardiness(range).then((result) => {
  //     setSortPlantsArray(result);
  //   });
  // }, [range]);

  const handleValueChange = (value) => {
    setRange(parseInt(value));
    // sortPlantsByHardiness(range).then((result) => {
    //   setPlantsArray(result);
    // });
  };

  const handleSlider = (value) => {
    const hardiness = parseInt(value);
    sortPlantsByHardiness(hardiness).then((result) => {
      setPlantsArray(result);
    });
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={[styles.content, { flex: 1 }]}>
        <View style={styles}>
          <Text style={styles.sliderText}>{range}</Text>
          <Slider
            style={{ width: 300, height: 10 }}
            minimumValue={0}
            maximumValue={13}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            thumbTintColor="#EA9547"
            value={0}
            // thumbImage={require("../../../assets/PlantLogo.png")}
            onValueChange={(value) => handleValueChange(value)}
            onSlidingComplete={(value) => handleSlider(value)}
          />
        </View>
        <ScrollView>
          {plantsArray === [] ? (
            <Text>No Results!</Text>
          ) : (
            plantsArray.map((plant) => {
              return (
                <TouchableOpacity
                  key={plant.id}
                  style={styles.plantContainer}
                  onPress={() => {
                    navigation.navigate("PlantCard", { plantId: plant.id });
                  }}
                >
                  <Text style={styles.title}>{plant.common_name}</Text>
                  <Image
                    source={{ uri: plant.default_image.medium_url }}
                    style={styles.plantImage}
                  />
                  <Text>
                    <Text style={styles.plantTitles}>Scientific Name:</Text>{" "}
                    {plant.scientific_name}
                  </Text>
                  <Text>
                    <Text style={styles.plantTitles}>Sunlight:</Text>{" "}
                    {plant.sunlight}
                  </Text>
                  <Text>
                    <Text style={styles.plantTitles}>Watering:</Text>{" "}
                    {plant.watering}
                  </Text>
                </TouchableOpacity>
              );
            })
          )}
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <Footer navigation={navigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 10,
    paddingBottom: 50,
    backgroundColor: "#484240",
  },
  sliderText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  slider: {},
  plantContainer: {
    alignItems: "center",
    marginBottom: 10,
    marginTop: 20,
    padding: 10,
    backgroundColor: "#D6D7DB",
    borderRadius: 25,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  plantImage: {
    width: "50%",
    height: 100,
    marginBottom: 10,
    borderRadius: 50,
  },
  plantTitles: {
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 65,
    left: 0,
    right: 0,
    height: 25,
    backgroundColor: "#484240",
    justifyContent: "space-between",
    padding: 5,
  },
});
