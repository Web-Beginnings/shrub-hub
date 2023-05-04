import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
const Header = ({ navigation }, props) => {
  const avatar =
    "https://images.assetsdelivery.com/compings_v2/asmati/asmati2004/asmati200400435.jpg";
  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        <Image
          alt="Profile picture"
          source={{ uri: avatar }}
          style={styles.avatar}
        />
      </View>
      <View>
        <Text style={styles.text}>Welcome User!</Text>
      </View>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Settings", { props: props });
          }}
        >
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
    fontWeight: "bold",
    marginRight: 100,
    marginTop: 10
  },
  avatar: {
    width: 50,
    height: 50,
    marginTop: 10,
    marginRight: 5,
    marginBottom: 0,
    marginLeft: 10,
    borderRadius: 9999,
  },
});
