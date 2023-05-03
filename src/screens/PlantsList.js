import React, { useState, useEffect } from "react";
import { Text, View, Button, TouchableOpacity } from "react-native";
import Footer from "./HomeScreen/Components.js/Footer";
import Header from "./HomeScreen/Components.js/Header";
import styles from "./HomeScreen/styles";
import { ScrollView } from "react-native-gesture-handler";
import { getPlants } from "./PlantApi";
export default function PlantsList(props, extraData) {
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
        <ScrollView>
          {plantsArray.map((plant) => {
            return (
              <TouchableOpacity key={plant.id}>
                <Text>
                  {plant.scientific_name} AKA: {plant.common_name}
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
