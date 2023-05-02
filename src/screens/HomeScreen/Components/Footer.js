import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

const Footer = (props) => {
  const { navigation } = props.props;
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate("Forum", {props: props})}}>
        <Text style={styles.buttonText}>Forum</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Maps</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "blue",
    padding: 40,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "blue",
    paddingVertical: 2,
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
    color: "blue",
    fontSize: 7,
    // display: "flex",
    // alignItems: "flex-end",
    fontWeight: "bold",
    transform: [{ rotate: "-45deg" }],
    paddingTop: 11,
    paddingRight: 10,
  },
});
