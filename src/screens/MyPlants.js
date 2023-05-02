import React from "react";
import { Text, View, Button } from "react-native";
import Footer from "./HomeScreen/Components.js/Footer";
import Header from "./HomeScreen/Components.js/Header";
import styles from "./HomeScreen/styles";

export default function MyPlants(props, extraData) {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text>MyPlants</Text>
      </View>
      <View style={styles.footer}>
        <Footer />
      </View>
    </View>
  );
}
