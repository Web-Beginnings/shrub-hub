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

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);
  // console.log(user);

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
        <Stack.Screen name="Registration" component={RegistrationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );

  // return (
  //   <NavigationContainer>
  //     <Stack.Navigator>
  //       {user ? (
  //         <Stack.Screen name="HomeScreen">
  //           {(props: any) => <HomeScreen {...props} extraData={user} />}
  //         </Stack.Screen>
  //       ) : (
  //         <>
  //           <Stack.Screen name="Login" component={LoginScreen} />
  //           <Stack.Screen name="Registration" component={RegistrationScreen} />
  //         </>
  //       )}
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // );
}
