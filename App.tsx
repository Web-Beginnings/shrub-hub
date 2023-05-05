import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen, HomeScreen, RegistrationScreen } from "./src/screens";
import { decode, encode } from "base-64";
import { NavigationProp } from "@react-navigation/native";
import PlantsList from "./src/screens/PlantListScreen/PlantsList";
import MyPlants from "./src/screens/MyPlants";
import MapsScreen from "./src/screens/MapsScreen/MapsScreen";
import Forum from "./src/screens/Forum/Forum";
import SinglePost from "./src/screens/SinglePost";
import PlantCard from "./src/screens/PlantCardScreen/PlantCard";
import { firebase } from "./firebaseConfig.js";
import { View, Text } from "react-native";
import SettingsScreen from "./src/screens/SettingsScreen/Settings";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  // console.log(user);

  useEffect(() => {
    const usersRef = firebase.firestore().collection("users");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setLoading(false);
            setUser(userData);
          })
          .catch((error) => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return (
      <View>
        <Text>Bare with us...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "HomeScreen" : "Login"}>
        <Stack.Screen name="HomeScreen" options={{ headerShown: false }}>
          {(props) => <HomeScreen {...props} extraData={user} />}
        </Stack.Screen>
        <Stack.Screen name="MapsScreen" options={{ headerShown: false }}>
          {(props) => <MapsScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="PlantsList" options={{ headerShown: false }}> 
          {(props) => <PlantsList {...props} />}
        </Stack.Screen>
        <Stack.Screen name="PlantCard" options={{ headerShown: false }}>
          {(props) => <PlantCard {...props} />}
        </Stack.Screen>
        {/* <Stack.Screen name="MyPlants" component={MyPlants} /> */}
        {/* <Stack.Screen name="PlantsList" component={PlantsList} /> */}
        <Stack.Screen name="Forum" component={Forum} options={{ headerShown: false }} />
        <Stack.Screen name="SinglePost" component={SinglePost} options={{ headerShown: false }} />
        <Stack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
