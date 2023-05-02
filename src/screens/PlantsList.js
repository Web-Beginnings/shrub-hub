import React, { useState, useEffect } from "react";
import { Text, View, Button } from "react-native";
import Footer from "./HomeScreen/Components.js/Footer";
import Header from "./HomeScreen/Components.js/Header";
import styles from "./HomeScreen/styles";
import { getPlants } from "./Api";

export default function PlantsList(props, extraData) {
  console.log(getPlants(), "eggs");
  const [plantsArray, setPlantsArray] = useState([]);

  useEffect(() => {
    getPlants().then((result) => {
      setPlantsArray(result);
    });
  }, [setPlantsArray]);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        {console.log(plantsArray, "plants!")}
        {plantsArray.map((plant) => {
          <Text key={plant.id}>{plant.common_name}</Text>;
        })}
      </View>
      <View style={styles.footer}>
        <Footer />
      </View>
    </View>
  );
}
