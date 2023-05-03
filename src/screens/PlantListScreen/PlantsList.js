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
import { getPlants } from "../PlantApi";

export default function PlantsList(props, extraData) {
  const [plantsArray, setPlantsArray] = useState([]);
  const { navigation } = props;
  useEffect(() => {
    getPlants().then((result) => {
      setPlantsArray(result);
    });
  }, [setPlantsArray]);
  return (
    <View style={styles.container}>
      <Header />
      <View style={[styles.content, { flex: 1 }]}>
        <ScrollView>
          {plantsArray.map((plant) => {
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
          })}
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <Footer />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 10,
    paddingBottom: 50,
  },
  plantContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 5,
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
    backgroundColor: "#32d953",
    justifyContent: "space-between",
  },
});
