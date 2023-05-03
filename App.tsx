import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen, HomeScreen, RegistrationScreen } from "./src/screens";
import { decode, encode } from "base-64";
import { NavigationProp } from "@react-navigation/native";
import PlantsList from "./src/screens/PlantsList";
import MyPlants from "./src/screens/MyPlants";
import MapsScreen from "./src/screens/MapsScreen";
import Forum from "./src/screens/Forum/Forum";
import { firebase } from "./firebaseConfig.js"
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
  const usersRef = firebase.firestore().collection('users');
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      usersRef
        .doc(user.uid)
        .get()
        .then((document) => {
          const userData = document.data()
          setLoading(false)
          setUser(userData)
        })
        .catch((error) => {
          setLoading(false)
        });
    } else {
      setLoading(false)
    }
  });
}, []);


if(loading) {
  return (
    <View>
       <Text>Bare with us...</Text> 
    </View>
  
  )
}

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "HomeScreen" : "Login"}>
        <Stack.Screen name="HomeScreen">
          {(props) => <HomeScreen {...props} extraData={user} />}
        </Stack.Screen>
        <Stack.Screen name="MapsScreen">
          {(props) => <MapsScreen />}
        </Stack.Screen>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="PlantsList" component={PlantsList} />
        {/* <Stack.Screen name="MyPlants" component={MyPlants} /> */}
        {/* <Stack.Screen name="PlantsList" component={PlantsList} /> */}
        <Stack.Screen name="Forum" component={Forum} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}



