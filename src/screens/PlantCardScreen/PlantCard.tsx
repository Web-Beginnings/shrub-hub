import { getPlantsById } from "../Api";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Footer from "../HomeScreen/Components.js/Footer";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../../../firebaseConfig";
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
} from "firebase/firestore";

interface PlantCardProps {
  route: any;
}

export default function PlantCard(props: PlantCardProps) {
  const [plant, setPlant] = useState<any>(null);
  const { route } = props;
  const navigation = useNavigation();
  const id = route.params.plantId;

  useEffect(() => {
    getPlantsById(id).then((result) => {
      setPlant(result);
    });
  }, [id]);

  if (!plant) {
    return <Text>Loading Plant...</Text>;
  }

  const db = getFirestore();

  // This code below gets the data from myPlants for the user - This will be needed for My Plants page.
  // const colRef = collection(
  //   db,
  //   "users",
  //   "GZ0fx9ooAAWqHxPpKynjFRmq3cj2",
  //   "myPlants"
  // );

  // const user = firebase.auth().currentUser;
  // const users: any = [];

  // getDocs(colRef)
  //   .then((snapshot) => {
  //     snapshot.docs.filter((doc) => {
  //       users.push({ ...doc.data(), id: doc.id });
  //     });
  //     console.log("users", users);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  const postPlant = (id: number) => {
    const user = firebase.auth().currentUser;
    // init services
    const db = getFirestore();
    if (!user) {
      console.log("No user found");
      return;
    }

    const { uid } = user;

    const dbRef = collection(db, "users", `${uid}`, "myPlants");

    const data = {
      plant_id: id,
    };
    addDoc(dbRef, data)
      .then((docRef) => {
        console.log("Document has been added successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.content}>
      <ScrollView>
        <Text style={styles.title}>{plant.common_name}</Text>
        <Image
          source={{ uri: plant.default_image.medium_url }}
          style={styles.plantImage}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={() => postPlant(id)}>
            + My Plants
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>+ Wish List</Text>
        </TouchableOpacity>
        <View style={styles.info}>
          <Text style={styles.plantInfo}>
            <Text style={styles.plantTitles}>Scientific Name: </Text>
            {plant.scientific_name}
          </Text>
          <Text style={styles.plantInfo}>
            <Text style={styles.plantTitles}>Care Level: </Text>
            {plant.care_level}
          </Text>
          <Text style={styles.plantInfo}>
            <Text style={styles.plantTitles}>Watering: </Text>
            {plant.watering}
          </Text>
          <Text style={styles.plantInfo}>
            <Text style={styles.plantTitles}>Cycle: </Text>
            {plant.cycle}
          </Text>
          <Text style={styles.plantInfo}>
            <Text style={styles.plantTitles}>Poisonous to Pets: </Text>
            {plant.poisonous_to_pets}
          </Text>
          <Text style={styles.plantInfo}>
            <Text style={styles.plantTitles}>Maintenance: </Text>
            {plant.maintenance}
          </Text>
          <Text style={styles.plantInfo}>
            <Text style={styles.plantTitles}>Growth Rate: </Text>
            {plant.growth_rate}
          </Text>
          <Text style={styles.plantInfo}>
            <Text style={styles.plantTitles}>Sunlight: </Text>
            {plant.sunlight}
          </Text>
          <Text style={styles.plantInfo}>
            <Text style={styles.plantTitles}>Flowering Season: </Text>
            {plant.flowering_season}
          </Text>
          <Text style={styles.plantInfo}>
            <Text style={styles.plantTitles}>Propagation: </Text>
            {plant.propagation}
          </Text>
          <Text>
            <Text style={styles.plantTitles}>Dimensions: </Text>
            {plant.dimensions}
          </Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Footer navigation={navigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: "#484240",
  },
  info: {
    paddingVertical: 20,
  },
  plantTitles: {
    fontWeight: "bold",
    color: "#EA9547",
  },
  plantInfo: {
    color: "white",
  },
  plantImage: {
    width: "75%",
    height: 200,
    marginBottom: 10,
    alignItems: "center",
    marginTop: 20,
    alignSelf: "center",
    borderRadius: 100,
  },
  title: {
    paddingTop: 10,
    marginBottom: 5,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#EA9547",
  },
  button: {
    backgroundColor: "#EA9547",
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 10,
    width: "50%",
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  footer: {
    position: "absolute",
    bottom: -110,
    left: 0,
    right: 0,
    height: 25,
    backgroundColor: "#32d953",
    justifyContent: "space-between",
  },
});
