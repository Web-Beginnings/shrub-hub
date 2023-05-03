import React from "react";
import Footer from "../HomeScreen/Components.js/Footer";
import Header from "../HomeScreen/Components.js/Header";
import { View, Text, ScrollView } from "react-native";
import styles from "./styles.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getAuth, signOut, deleteUser, User, updateEmail } from "firebase/auth";
import { Alert } from "react-native";

type SettingProps = any;
const auth = getAuth();
const user: User | any = auth.currentUser;
const SettingsScreen: React.FC<SettingProps> = ({ navigation }) => {
  
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully.");
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await deleteUser(user!);
              signOut(auth);
              console.log("User account deleted successfully!");
            } catch (error) {
              console.error(error);
            }
          },
          style: "destructive",
        },
      ]
    );
  };
  const handleUpdateEmail = (newEmail: string) => {
    console.log('email', user.email)
    updateEmail(user, newEmail)
    .then(() => {
      console.log("Email updated successfully")
    })
    .catch((error) => {
      console.error("Error updating email:", error);
    })
  }
  const settingsOptions = [
    { title: "Change avatar", onPress: () => {} },
    { title: "Change Location", onPress: () => {} },
    { title: "Update email address", onPress: handleUpdateEmail  },
    { title: "Update password", onPress: () => {} },
    { title: "Delete account", onPress: handleDeleteAccount },
    { title: "Sign out", onPress: handleSignOut },
  ];

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView>
        {settingsOptions.map(({ title, onPress }) => (
          <View key={title} style={styles.section}>
            <TouchableOpacity key={title} onPress={onPress}>
              <Text style={styles.sectionHeader}>{title}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <Footer navigation={navigation} />
      </View>
    </View>
  );
};
export default SettingsScreen;
