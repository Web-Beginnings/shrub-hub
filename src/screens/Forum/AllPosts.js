import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { getFirestore, collection, getDocs } from "@firebase/firestore";
import React, { useState, useEffect } from "react";
const AllPosts = ({ props }) => {
  const { navigation } = props;
  const db = getFirestore();
  const colRef = collection(db, "forumPosts");
  const [isLoading, setIsLoading] = useState(true);
  const [forumPosts, setForumPosts] = useState([]);
  useEffect(() => {
    getDocs(colRef)
      .then((snapshot) => {
        const posts = [];
        snapshot.docs.forEach((doc) => {
          posts.push({ ...doc.data(), id: doc.id });
        });
        setForumPosts(posts);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setIsLoading(false);
      });
  }, []);
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ScrollView>
          {forumPosts.map((post) => {
            return (
              <TouchableOpacity
                key={post.id}
                style={styles.individualPost}
                onPress={() => {
                  navigation.navigate("SinglePost", {
                    props: post,
                    navigation: navigation,
                  });
                }}
              >
                <Text style={styles.title}>{post.title}</Text>
                <Text style={styles.body}>{post.body}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {},
  content: {},
  individualPost: {
    backgroundColor: "green",
    padding: 5,
    borderRadius: 5,
    margin: 5,
  },
  title: {
    color: "white",
    fontSize: 18,
  },
});
export default AllPosts;
