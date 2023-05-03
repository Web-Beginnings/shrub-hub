import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import Footer from "../HomeScreen/Components.js/Footer";
import AllPosts from "./AllPosts";

const Forum = (props) => {
  const [text, setText] = useState("");
  const [photo, setPhoto] = useState(null);
  const handleAttachPhoto = () => {
    // Open photo picker or camera here
  };
  const handleSubmit = () => {
    // Submit post to forum here
  };
  return (
    <View style={styles.container}>
      <View style={styles.newPostInput}>
        <View>
        <TextInput
          style={styles.titleInput}
          placeholder="Enter your title here"
          multiline={true}
          numberOfLines={1}
          onChangeText={(text) => setText(text)}
          />
        <TextInput
          style={styles.textInput}
          placeholder="Enter your post here"
          multiline={true}
          numberOfLines={2}
          onChangeText={(text) => setText(text)}
          />
        </View>
        <View style={{ flexDirection:"row" }}>
        <TouchableOpacity onPress={handleAttachPhoto}>
          <Text style={styles.button}>Attach Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={styles.button}>Submit</Text>
        </TouchableOpacity>
        </View>
      </View>
      <View style={styles.allPosts}>
        <AllPosts props={props}/>
      </View>
      <View style={styles.footer}>
        <Footer props={props} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flex: 1,
  },
  allPosts: {
    flex: 1,
    margin: 5,
    padding: 5,
    borderRadius: 5,
  },
  textInput: {
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
