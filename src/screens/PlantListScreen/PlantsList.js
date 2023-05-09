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
import {
  getPlants,
  sortPlantsByHardiness,
  sortPlantsByWatering,
} from "../PlantApi";
import Slider from "@react-native-community/slider";

export default function PlantsList(props, extraData) {
  const { navigation } = props;
  const [plantsArray, setPlantsArray] = useState([]);
  const [sortPlantsArray, setSortPlantsArray] = useState([]);
  const [sliderValue, setSliderValue] = useState(0);
  // const [sliding, setSliding] = useState("");
  const [pageArray, setPageArray] = useState([]);

  const wateringDisplay = {
    0: "All",
    1: "Minimum",
    2: "average",
    3: "Frequent",
  };

  useEffect(() => {
    sliderValue === 0
      ? getPlants().then((result) => {
          setPlantsArray(result);
        })
      : sortPlantsByWatering(wateringDisplay[sliderValue]).then((result) => {
          setSortPlantsArray(result);
        });
  }, [sliderValue]);

  if (!plantsArray) {
    return <Text style={styles.title}>Loading Plants...</Text>;
  }

  useEffect(() => {
    if (sliderValue === 0) {
      setPageArray([...plantsArray]);
    } else {
      setPageArray([...sortPlantsArray]);
    }
  }, [plantsArray, sortPlantsArray, sliderValue]);

  return (
    <View style={styles.container}>
      <Header />
      <View style={[styles.content, { flex: 1 }]}>
        <View>
          <Text style={styles.filterText}>
            Filter by watering level: {wateringDisplay[sliderValue]}{" "}
          </Text>
        </View>
        <ScrollView>
          <View style={styles.slideContent}>
            <Text style={styles.sliderText}>
              {wateringDisplay[sliderValue]}
            </Text>
            <Slider
              style={{ width: 300, height: 10 }}
              minimumValue={0}
              maximumValue={3}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              thumbTintColor="#EA9547"
              step={1}
              value={0}
              onValueChange={(value) => setSliderValue(value)}
              // onSlidingComplete={() => setSliding("Complete")}
            />
          </View>
          {pageArray.map((plant) => {
            return (
              <TouchableOpacity
                key={plant.id}
                style={styles.plantContainer}
                onPress={() => {
                  navigation.navigate("PlantCard", { plantId: plant.id });
                }}
              >
                <Text style={styles.title}>{plant.common_name}</Text>
                {plant.default_image && (
                  <Image
                    source={{ uri: plant.default_image.small_url }}
                    style={styles.plantImage}
                  />
                )}
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
          })}
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
  filterText: {
    fontSize: 20,
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 10,
    paddingBottom: 50,
    backgroundColor: "#484240",
  },
  slideContent: {
    alignItems: "center",
  },
  sliderText: {
    paddingTop: 10,
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
