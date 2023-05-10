import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
  ImageSourcePropType,
} from "react-native";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";

interface FooterProps {
  props: any;
}

const Footer: React.FC<FooterProps> = ({ props }) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const handleMapsNav = () => {
    navigation.navigate("MapsScreen");
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          navigation.navigate("Forum", { props: props });
        }}
      >
        <Image
          style={styles.Icon}
          source={require("../../../../assets/ForumIcon.png")}
        />
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate("HomeScreen", { props: props });
        }}
      >
        <Image
          style={styles.Icon}
          source={require("../../../../assets/HomeIcon.png")}
        />
      </Pressable>
      <Pressable onPress={handleMapsNav}>
        <Image
          style={styles.Icon}
          source={require("../../../../assets/MapIcon.png")}
        />
      </Pressable>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "white",
    padding: 20,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#2B937E",
    paddingVertical: 5,
    borderRadius: 20,
  },
  button: {
    backgroundColor: "#EA9548",
    width: 65,
    height: 65,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    transform: [{ rotate: "45deg" }],
  },
  buttonText: {
    color: "#2B937E",
    fontSize: 10,
    // display: "flex",
    // alignItems: "flex-end",
    fontWeight: "bold",
    transform: [{ rotate: "-45deg" }],
    paddingTop: 11,
    paddingRight: 10,
  },
  Icon: {
    height: 50,
    width: 50,
    paddingRight: 100,
    paddingVertical: 30,
    paddingBottom: 50,
  },
});
