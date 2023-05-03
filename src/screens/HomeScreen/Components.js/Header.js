import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

const Header = ({ navigation }, props) => {
  // console.log(props)
  return (
    <View style={styles.container}>
      <View>
      <Text style={styles.text}>Welcome User!</Text>
    </View>
    <View>
      <TouchableOpacity style={styles.button}
        onPress={() => {
          navigation.navigate("Settings", { props: props });
        }}>
        <Text>⚙</Text>
      </TouchableOpacity>
    </View>
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
