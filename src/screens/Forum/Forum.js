import {
  View,
  Text,
  Image,
  Alert,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useState } from "react";
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
import * as ImagePicker from "expo-image-picker";
import Footer from "../HomeScreen/Components.js/Footer";
import AllPosts from "./AllPosts";

const Forum = (props) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [photo, setPhoto] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const wholePost = {
    title: title,
    body: body,
    photo: photo,
    username: props.user.fullName,
    createdAt: Date.now(),
  };

  const { navigation } = props;

  const handleAttachPhoto = async () => {
    const galleryStatus =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    setHasGalleryPermission(galleryStatus.status === "granted");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowEditing: true,
      Aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) setPhoto(result.assets[0].uri);
  };

  if (hasGalleryPermission === false) {
    return <Text>No access to internal storage</Text>;
  }

  const handleSubmit = () => {
    if (wholePost.title.length === 0) {
      Alert.alert("Alert", "Please include a title for your post");
      return;
    }
    if (wholePost.body.length === 0) {
      Alert.alert("Alert", "Please include a body for your post");
      return;
    }

    const user = firebase.auth().currentUser;
    const db = getFirestore();
    if (!user) {
      console.log("No user found");
      return;
    }

    const dbRef = collection(db, "forumPosts");

    addDoc(dbRef, wholePost)
      .then((docRef) => {
        console.log("Post has been added successfully");
      })
      .catch((error) => {
        console.log("Error", error.message);
      });
    setTitle("");
    setBody("");
    setPhoto("");
  };

  // hello world

  return (
    <View style={styles.container}>
      <View style={styles.newPostInput}>
        <View>
          <Image
            style={styles.Icon}
            source={require("../../../assets/forumtitle.png")}
          />
          <TextInput
            style={styles.titleInput}
            placeholder="Enter your title here.."
            multiline={true}
            numberOfLines={1}
            value={title}
            onChangeText={(title) => setTitle(title)}
          />
          <TextInput
            style={styles.bodyInput}
            placeholder="Enter your post here.."
            multiline={true}
            numberOfLines={2}
            value={body}
            onChangeText={(body) => setBody(body)}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          {photo ? (
            <Image
              source={{ uri: photo }}
              style={{ width: 110, height: 110, marginLeft: 16 }}
            />
          ) : null}
          <Pressable onPress={handleSubmit}>
            <Image
              style={styles.Icontwo}
              source={require("../../../assets/SubmitButton.png")}
            />
          </Pressable>
          <Pressable onPress={handleAttachPhoto}>
            <Image
              style={styles.Icontwo}
              source={require("../../../assets/ATPHotoButton.png")}
            />
          </Pressable>

          {/* <TouchableOpacity onPress={handleAttachPhoto}>
            <Text style={styles.button}>Attach Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSubmit}>
            <Text style={styles.button}>Submit</Text>
          </TouchableOpacity> */}
        </View>
      </View>
      <View style={styles.allPosts}>
        <AllPosts props={props} />
      </View>
      <View style={styles.footer}>
        <Footer props={props} navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleimage: {
    height: "50%",
    width: 100,
  },
  Icontwo: {
    height: 5,
    width: 5,
    paddingRight: 80,
    paddingLeft: 80,
    // paddingVertical: 30,
    paddingBottom: 50,
    marginLeft: 10,
    marginTop: 0,
  },
  container: {
    justifyContent: "space-between",
    flex: 1,
    backgroundColor: "#484240",
  },
  allPosts: {
    flex: 1,
    margin: 5,
    padding: 5,
    borderRadius: 5,
    backgroundColor: "#2B937E",
  },
  bodyInput: {
    padding: 10,
    backgroundColor: "lightgray",
    margin: 15,
    marginTop: 0,
    borderRadius: 5,
  },
  titleInput: {
    padding: 10,
    backgroundColor: "lightgray",
    margin: 15,
    borderRadius: 5,
  },
  button: {
    fontSize: 16,
    backgroundColor: "#2B937E",
    color: "#fff",
    height: 35,
    borderRadius: 8,
    padding: 5,
    marginLeft: 14,
    textAlign: "center",
  },
  footer: {
    padding: 25,
    backgroundColor: "#484240",
  },
  Icon: {
    height: 10,
    width: 10,
    paddingRight: 120,
    paddingLeft: 120,
    // paddingVertical: 30,
    paddingBottom: 100,
    marginLeft: 70,
    marginTop: 30,
  },
});

export default Forum;
