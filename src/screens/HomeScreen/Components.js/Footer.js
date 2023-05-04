import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

const Footer = ({ navigation }, props) => {
  const handleMapsNav = () => {
    navigation.navigate("MapsScreen");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Forum", { props: props });
        }}
      >
        <Text style={styles.buttonText}>Forum</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("HomeScreen", { props: props });
        }}
      >
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleMapsNav()}>
        <Text style={styles.buttonText}>Maps</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "blue",
    padding: 20,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#2e9a43",
    paddingVertical: 5,
  },
  button: {
    backgroundColor: "#fff",
    width: 65,
    height: 65,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    transform: [{ rotate: "45deg" }],
  },
  buttonText: {
    color: "#cea742",
    fontSize: 7,
    // display: "flex",
    // alignItems: "flex-end",
    fontWeight: "bold",
    transform: [{ rotate: "-45deg" }],
    paddingTop: 11,
    paddingRight: 10,
  },
});
