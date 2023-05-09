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
  const { user } = props;
  useEffect(() => {
    getPlants().then((result) => {
      setPlantsArray(result);
    });
  }, [setPlantsArray]);
  if (!plantsArray) {
    return <Text style={styles.title}>Loading Plants...</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image
          style={styles.titleIcon}
          source={require("../../../assets/AllPlantsTitleIcon.png")}
        />
        {/* <Text style={styles.header}>FIND THOSE PLANTS</Text> */}
      </View>
      {/* <Header user={user} navigation={navigation} /> */}
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
  content: {
    paddingHorizontal: 10,
    paddingBottom: 50,
    backgroundColor: "#484240",
  },
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
    backgroundColor: "#484240",
    padding: 25,
  },
  titleIcon: {
    height: 100,
    width: 200,
    paddingRight: 150,
    paddingLeft: 150,
    paddingVertical: 30,
    // paddingBottom: 50,
    marginLeft: 50,
    marginTop: 30,
  },
  titleContainer: {
    backgroundColor: "#484240",
  },
});
