import React from "react";
import { Text, View, Button } from "react-native";
import Footer from "./Components.js/Footer";
import Header from "./Components.js/Header";
import styles from "./styles";

export default function HomeScreen(props) {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text>Home Screen</Text>
      </View>
      <View style={styles.footer}>
        <Footer />
      </View>
    </View>
  );
}
