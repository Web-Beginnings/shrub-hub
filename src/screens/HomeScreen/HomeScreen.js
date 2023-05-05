import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import Footer from "./Components.js/Footer";
import Header from "./Components.js/Header";
import styles from "./styles";

export default function HomeScreen(props) {
  const user = props.extraData.fullName;
  console.log("b", user);
  const { navigation } = props;
  console.log("AAAAAA::::", navigation);
  return (
    <View style={styles.container}>
      <Header props={user} navigation={navigation} />
      <View style={styles.content}>
        <Pressable
          onPress={() => {
            navigation.navigate("PlantsList");
          }}
        >
          <Image
            style={styles.Icon}
            source={require("../../../assets/ViewAllButton.png")}
          />
        </Pressable>
        {/* <TouchableOpacity
          onPress={() => {
            navigation.navigate("MyPlants");
          }}
          style={styles.buttons}
        >
          <ScrollView style={styles.content}>
            <Text>MyPlants</Text>
            <Text>MyPlants</Text>
            <Text>MyPlants</Text>
          </ScrollView>
        </TouchableOpacity>
        <View style={styles.menuButtons}>
          <TouchableOpacity style={styles.buttons}>
            <Text style={styles.buttonText}>Wishlist</Text>
          </TouchableOpacity>
        </View> */}
      </View>
      <View style={styles.footer}>
        <Footer props={props} navigation={navigation} />
      </View>
    </View>
  );
}
