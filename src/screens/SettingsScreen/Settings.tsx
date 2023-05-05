import React, { useState } from "react";
import Footer from "../HomeScreen/Components.js/Footer";
import Header from "../HomeScreen/Components.js/Header";
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, Pressable } from "react-native";
import styles from "./styles.js";

import { getAuth, signOut, deleteUser, User, updateEmail} from "firebase/auth";
import { Alert } from "react-native";
import {firebase} from "../../../firebaseConfig";

type SettingProps = any;
const auth = getAuth();
const user: User | any = auth.currentUser;

const SettingsScreen: React.FC<SettingProps> = ({ navigation }) => {
  const [newEmail, setNewEmail] = useState<string>("");
  
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
  const handleUpdateEmail = (newEmail: string ) => {
    if (!newEmail) {
      console.log("New email is not provided.");
      return;
    }
    updateEmail(user, newEmail)
    .then(() => {
      console.log("Email updated successfully")
    })
    .catch((error) => {
      console.error("Error updating email:", error);
    })
  }

  const handleChangePassword = () => {
    const userEmail: string = auth.currentUser?.email ?? ''
    if (!user || !user.email) {
      console.log("User is not authenticated.");
      return;
    }
    firebase.auth().sendPasswordResetEmail(userEmail)
    .then(() => {
      alert("Password reset email has been sent! Check your inbox!")
    })
    .catch((error) => {
      alert(error)
    })
  }
  const settingsOptions = [
    { title: "Change avatar", onPress: () => {}, source: require("../../../assets/ChangeAvatarButton.png") },
    { title: "Change Location", onPress: () => {}, source: require("../../../assets/ChangeLocationButton.png") },
    { title: "Update email address", onPress: () => handleUpdateEmail(newEmail)  },
    { title: "Update password", onPress: handleChangePassword, source: require("../../../assets/UpdatePWButton.png") },
    { title: "Delete account", onPress: handleDeleteAccount, source: require("../../../assets/DeleteAccountButton.png") },
    { title: "Sign out", onPress: handleSignOut, source: require("../../../assets/SignOutButton.png") },
  ];

  return (
    <View style={styles.container}>
      <View>
          <Image
            style={styles.SettingsIcon}
            source={require("../../../assets/SettingsTitleIcon.png")}
          />
          {/* <Text style={styles.header}>FIND THOSE PLANTS</Text> */}
        </View>
    {/* <Header navigation={navigation} /> */}
    <ScrollView>
      {settingsOptions.map(({ title, onPress, source }) => (
        <View key={title} style={styles.section}>
          {title !== "Update email address" ? (
            <Pressable
            onPress={() => onPress()}
          >
            <Image
              style={styles.Icon}
              source={source}
            />
          </Pressable>
        //    <TouchableOpacity  key={title}  style={styles.sectionHeader} onPress={() => onPress()}>
        //    <Text style={styles.sectionHeader}>{title}</Text>
        //  </TouchableOpacity>
          ) : (
            <View style={styles.inputContainer}>
            <Text style={{fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1.1,}}>Update email address</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter new email"
              onChangeText={(text) => setNewEmail(text)}
            />
            <Pressable
          onPress={() => {
            navigation.navigate("PlantsList");
          }}
        >
          <Image
            style={styles.saveIcon}
            source={require("../../../assets/SaveButton.png")}
          />
        </Pressable>
            {/* <TouchableOpacity
              style={styles.button}
              onPress={() => onPress()}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity> */}
          </View>
          )}
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
