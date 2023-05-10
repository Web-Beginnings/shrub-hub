import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import PagerView from "react-native-pager-view";
import Footer from "./Components.js/Footer";
import Header from "./Components.js/Header";
import Wishlist from "./Wishlist.js";
import styles from "./styles";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  doc,
  onSnapshot,
  where,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { getPlantsById } from "../Api";

export default function HomeScreen(props) {
  const db = getFirestore();
  const colRef = collection(db, "users");
  const users = [];
  const currentUser = [];
  const [myPlantsArray, setMyPlantsArray] = useState([]);
  const plantsResArray = [];
  useEffect(() => {
    getDocs(colRef)
      .then((snapshot) => {
        snapshot.docs.filter((doc) => {
          users.push({
            myPlants: Object.values({ ...doc.data().MyPlants }),
            id: doc.id,
          });
          users.map((person) => {
            if (person.id === props.extraData.id) {
              currentUser.push(person);
              currentUser[0].myPlants.map((plantid) => {
                getPlantsById(plantid).then((result) => {
                  plantsResArray.push(result);
                  setMyPlantsArray(plantsResArray);
                  // return result;
                });
              });
            }
          });
        });
      })
      .catch((error) => {
        console.log("error");
      });
  }, [setMyPlantsArray]);
  const user = props.extraData.fullName;
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <Header props={user} navigation={navigation} />
      <ScrollView>
        <View style={styles.content}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PlantsList");
            }}
          >
            <Image
              style={styles.Icon}
              source={require("../../../assets/AllPlantsWArrow.png")}
            />
          </TouchableOpacity>
          <Image
            style={styles.Icontwo}
            source={require("../../../assets/MPIconS.png")}
          />
          <View>
            <PagerView style={styles.pager} initialPage={0}>
              {/* <View key={100}>
            <Text>{myPlantsArray[0].common_name}</Text>
          </View> */}
              {myPlantsArray.map((plant) => {
                // {
                //   console.log("heloooooo", plant);
                // }
                return (
                  <View key={plant.id} style={styles.plantcard}>
                    <TouchableOpacity
                      key={plant.id}
                      style={styles.plantContainer}
                      onPress={() => {
                        navigation.navigate("PlantCard", { plantId: plant.id });
                      }}
                    >
                      <Text style={styles.title}>{plant.common_name}</Text>
                      {plant.default_image && (
                        <Image
                          source={{ uri: plant.default_image.thumbnail }}
                          style={styles.plantImage}
                        />
                      )}

                      <Text style={styles.title}>Scientific Name:</Text>

                      <Text> {plant.scientific_name}</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </PagerView>
            <Image
              style={styles.arrows}
              source={require("../../../assets/ArrowsIcon.png")}
            />
          </View>
          <View>
            <Wishlist props={props} />
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Footer props={props} navigation={navigation} />
      </View>
    </View>
  );
}
