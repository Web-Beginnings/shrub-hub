import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
const Header = (props, extraData) => {
  const user = props.props;
  const navigation = props.navigation;
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
      <View style={styles.titleContainer}>
        <Text numberOfLines={5} style={styles.text}>
          Welcome {user}
        </Text>
      </View>
      <View>
        <Pressable
          onPress={() => {
            navigation.navigate("Settings", { props: props });
          }}
        >
          <Image
            style={styles.Icon}
            source={require("../../../../assets/SettingsIcon.png")}
          />
        </Pressable>
        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Settings", { props: props });
          }}
        >
          <Text>⚙</Text>
        </TouchableOpacity> */}
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
    backgroundColor: "#EA9547",
    paddingVertical: 0,
  },
  titleContainer: {
    maxWidth: 200,
  },
  text: {
    color: "#484240",
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 0,
    marginLeft: 10,
    marginTop: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    marginTop: 10,
    marginRight: 5,
    marginBottom: 0,
    marginLeft: 20,
    borderRadius: 9999,
  },
  Icon: {
    height: 100,
    width: 100,
    paddingRight: 20,
    paddingLeft: 10,
    // paddingVertical: 30,
    paddingBottom: 50,
  },
});
