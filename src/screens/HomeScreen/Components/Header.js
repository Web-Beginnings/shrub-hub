import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome User!</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "green",
    paddingVertical: 30,
  },
  text: {
    color: "blue",
    fontSize: 20,
    // display: "flex",
    // alignItems: "flex-end",
    fontWeight: "bold",
  },
});
