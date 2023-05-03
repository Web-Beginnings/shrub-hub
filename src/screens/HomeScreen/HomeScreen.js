import React from "react";
import { Text, View, Button, TouchableOpacity, ScrollView } from "react-native";
import Footer from "./Components.js/Footer";
import Header from "./Components.js/Header";
import styles from "./styles";

export default function HomeScreen(props, extraData) {
  const { navigation } = props;
  console.log("props in home:::", props);
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("PlantsList");
          }}
          style={styles.buttons}
        >
          <Text>View Plants List</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("MyPlants");
          }}
          style={styles.buttons}
        >
          <ScrollView style={styles.content}>
            <Text>MyPlants</Text>
            <Text>MyPlants</Text>
            <Text>MyPlants</Text>
            <Text>MyPlants</Text>
            <Text>MyPlants</Text>
            <Text>MyPlants</Text>
            <Text>MyPlants</Text>
            <Text>MyPlants</Text>
            <Text>MyPlants</Text>
            <Text>MyPlants</Text>
            <Text>MyPlants</Text>
            <Text>MyPlants</Text>
            <Text>MyPlants</Text>
            <Text>MyPlants</Text>
            <Text>MyPlants</Text>
            <Text>MyPlants</Text>
            <Text>MyPlants</Text>
            <Text>MyPlants</Text>
            <Text>MyPlants</Text>
            <Text>MyPlants</Text>
            <Text>MyPlants</Text>
            <Text>MyPlants</Text>
            <Text>MyPlants</Text>
            <Text>MyPlants</Text>
            <Text>MyPlants</Text>
            <Text>MyPlants</Text>
            <Text>MyPlants</Text>
            <Text>MyPlants</Text>
            <Text>MyPlants</Text>
            <Text>MyPlants</Text>
            <Text>MyPlants</Text>
            <Text>MyPlants</Text>
            <Text>MyPlants</Text>
          </ScrollView>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons}>
          <Text>Wishlist</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Footer navigation={navigation} />
      </View>
    </View>
  );
}
