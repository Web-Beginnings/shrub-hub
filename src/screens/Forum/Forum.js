import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
// import * as ImagePicker from 'expo-image-picker';
// import firestore from '@react-native-firebase/firestore';
import Footer from "../HomeScreen/Components.js/Footer";
import AllPosts from "./AllPosts";

const Forum = (props) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  // const [photo, setPhoto] = useState(null);
  // const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  // const wholePost = {
  //   title: title,
  //   text: body,
  //   photo: photo
  // }

  // const forumPostsCollection = firestore()
  //   .collection("forumPosts")
  //   .get()
  //   .then((collectionSnapshot) => {
  //     collectionSnapshot.forEach((documentSnapshot) => {
  //       console.log("Forum post:", documentSnapshot.data());
  //     });
  //   });
  // get request for all forum posts to send through to allPosts.js as props

  // const handleAttachPhoto = async () => {
  //   const galleryStatus =
  //     await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   setHasGalleryPermission(galleryStatus.status === "granted");
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowEditing: true,
  //     Aspect: [4, 3],
  //     quality: 1,
  //   });

  //   if (!result.canceled) setPhoto(result.assets[0].uri);
  // };

  // if (hasGalleryPermission === false) {
  //   return <Text>No access to internal storage</Text>;
  // }

  const handleSubmit = () => {
    // Submit post to forum Firebase collection here
    // Info gathered and stored in wholePost variable
  };

  return (
    <View style={styles.container}>
      <View style={styles.newPostInput}>
        <View>
          <TextInput
            style={styles.titleInput}
            placeholder="Enter your title here.."
            multiline={true}
            numberOfLines={1}
            onChangeText={(title) => setTitle(title)}
          />
          <TextInput
            style={styles.bodyInput}
            placeholder="Enter your post here.."
            multiline={true}
            numberOfLines={2}
            onChangeText={(body) => setBody(body)}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          {/* {photo ? (
            <Image
              source={{ uri: photo }}
              style={{ width: 110, height: 110, marginLeft: 16 }}
            />
          ) : null} */}
          <TouchableOpacity /*onPress={handleAttachPhoto}*/>
            <Text style={styles.button}>Attach Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSubmit}>
            <Text style={styles.button}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.allPosts}>
        <AllPosts props={props} /*forumPosts={forumPostsCollection}*/ />
      </View>
      <View style={styles.footer}>
        <Footer props={props} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flex: 1,
  },
  allPosts: {
    flex: 1,
    margin: 5,
    padding: 5,
    borderRadius: 5,
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
    backgroundColor: "#205930",
    color: "#fff",
    height: 35,
    borderRadius: 8,
    padding: 5,
    marginLeft: 14,
    textAlign: "center",
  },
  footer: {
    padding: 25,
    backgroundColor: "blue",
  },
});

export default Forum;
