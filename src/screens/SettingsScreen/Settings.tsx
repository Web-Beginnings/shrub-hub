import React, { useState } from "react";
import Footer from "../HomeScreen/Components.js/Footer";
import Header from "../HomeScreen/Components.js/Header";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
  Alert,
} from "react-native";
import styles from "./styles.js";
import { getAuth, signOut, deleteUser, User } from "firebase/auth";

import { firebase } from "../../../firebaseConfig";
type SettingProps = any;
const auth = getAuth();

const user: User | any = auth.currentUser;

const SettingsScreen: React.FC<SettingProps> = ({ navigation }) => {
  const [newEmail, setNewEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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
  function handleUpdateEmail(newEmail: string, password: string) {
    if (user) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const credential = firebase.auth.EmailAuthProvider.credential(
            user.email!,
            password
          );
          user
            .reauthenticateWithCredential(credential)
            .then(() => {
              user
                .updateEmail(newEmail)
                .then(() => {
                  console.log("Email updated successfully");
                  alert("Your email has been successfully updated!");
                })
                .catch((error: any) => console.log(error));
            })
            .catch((error: any) => console.log(error));
        } else {
          console.log("User is not authenticated");
        }
      });
    }
  }
  const handleChangePassword = () => {
    const userEmail: string = auth.currentUser?.email ?? "";
    if (!user || !user.email) {
      console.log("User is not authenticated.");
      return;
    }
    firebase
      .auth()
      .sendPasswordResetEmail(userEmail)
      .then(() => {
        alert("Password reset email has been sent! Check your inbox!");
      })
      .catch((error) => {
        alert(error);
      });
  };
  function handleChangeAvatar(url: string) {
    const user = firebase.auth().currentUser;
    let avatar =
      "https://images.assetsdelivery.com/compings_v2/asmati/asmati2004/asmati200400435.jpg";
    if (user) {
      user
        .updateProfile({
          photoURL: avatar,
        })
        .then(() => {
          console.log("Profile picture updated successfully");
          // show an alert or notification to the user
          console.log(user);
        })
        .catch((error) => console.log(error));
    }
  }

  const settingsOptions = [
    {
      title: "Update email address",
      onPress: handleUpdateEmail,
      source: require("../../../assets/UpdateEmailButton.png"),
    },
    {
      title: "Change avatar",
      onPress: handleChangeAvatar,
      source: require("../../../assets/ChangeAvatarButton.png"),
    },
    {
      title: "Update password",
      onPress: handleChangePassword,
      source: require("../../../assets/UpdatePWButton.png"),
    },
    {
      title: "Delete account",
      onPress: handleDeleteAccount,
      source: require("../../../assets/DeleteAccountButton.png"),
    },
    {
      title: "Sign out",
      onPress: handleSignOut,
      source: require("../../../assets/SignOutButton.png"),
    },
  ];
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.SettingsIcon}
          source={require("../../../assets/SettingsTitleIcon.png")}
        />
      </View>
      <ScrollView>
        {settingsOptions.map(({ title, onPress, source }) => (
          <View key={title} style={styles.section}>
            {title !== "Update email address" ? (
              <TouchableOpacity
                onPress={() => onPress && onPress(newEmail, password)}
              >
                <Image style={styles.Icon} source={source} />
              </TouchableOpacity>
            ) : (
              // <TouchableOpacity
              //   key={title}
              //   style={styles.sectionHeader}
              //   onPress={() => onPress && onPress(newEmail, password) }
              // >
              //   <Text style={styles.sectionHeader}>{title}</Text>
              // </TouchableOpacity>
              <View style={styles.inputContainer}>
                <Image
                  style={styles.Icon}
                  source={require("../../../assets/UpdateEmailButton.png")}
                />
                {/* <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600”,
                    textTransform: "uppercase”,
                    letterSpacing: 1.1,
                  }}
                >
                  Update email address
                </Text> */}
                <View>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter new email"
                    onChangeText={(text) => setNewEmail(text)}
                  />
                  <TextInput
                    style={styles.textInput2}
                    placeholder="Enter current password"
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                  />
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => onPress && onPress(newEmail, password)}
                  >
                    <Image
                      style={styles.saveIcon}
                      source={require("../../../assets/SaveButton.png")}
                    />
                  </TouchableOpacity>
                  {/* <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleUpdateEmail(newEmail, password)}
                  >
                    <Text style={styles.buttonText}>Save</Text>
                  </TouchableOpacity> */}
                </View>
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
