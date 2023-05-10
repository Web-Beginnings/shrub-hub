import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Footer from "./HomeScreen/Components.js/Footer";
import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "@firebase/firestore";

const SinglePost = (props) => {
  const navigation = props.navigation;
  const db = getFirestore();
  const colRef = collection(db, "comments");
  const post = props.route.params.props;
  const createTime = new Date(post.createdAt);
  const formattedDate = createTime.toLocaleDateString();
  const formattedTime = createTime.toLocaleTimeString();
  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    } else {
      setLikes(likes + 1);
      setLiked(true);
    }
  };
  useEffect(() => {
    getDocs(colRef)
      .then((snapshot) => {
        const comments = [];
        snapshot.docs.forEach((doc) => {
          comments.push({ ...doc.data(), id: doc.id });
        });
        setComments(comments);
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
      {post.img && (
        <Image
          style={styles.image}
          source={{ uri: post.img }}
          // resizeMode="contain"
        />
      )}

      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.body}>{post.body}</Text>
      <Text style={styles.createdAt}>
        {post.username} posted at: {formattedDate}, {formattedTime}{" "}
      </Text>
      <TouchableOpacity
        style={liked ? styles.likedButton : styles.likeButton}
        onPress={handleLike}
      >
        <Text style={styles.likeButtonText}>
          {liked ? "You liked this!" : " ⭐ Like"}
        </Text>
      </TouchableOpacity>
      <Text style={styles.likes}>
        {likes} {likes === 1 ? "like" : "likes"}
      </Text>
      <Text style={styles.commentsTitle}>Comments</Text>
      <ScrollView style={styles.content}>
        {comments.map((comment) => {
          return (
            <View style={styles.commentContainer} key={comment.id}>
              <Text style={styles.commentUsername}>
                <Text style={styles.boldUsername}>{comment.username}</Text>{" "}
                said:
              </Text>
              <Text style={styles.commentBody}>{comment.body}</Text>
            </View>
          );
        })}
      </ScrollView>
      <Footer style={styles.footer} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    marginLeft: 0,
    backgroundColor: "#484240",
  },
  image: {
    width: 120,
    height: 120,
    marginTop: 30,
    borderRadius: 20,
    marginLeft: 125,
  },
  imageContainer: {
    marginBottom: 0,
    padding: 0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "red",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 27,
    color: "#EA9548",
  },
  body: {
    backgroundColor: "#2B2826",
    fontSize: 20,
    borderWidth: 100,
    borderColor: "#484240",
    borderRadius: 10,
    borderWidth: 5,
    paddingTop: 10,
    paddingBottom: 30,
    paddingHorizontal: 20,
    marginLeft: 0,
    color: "white",
  },
  createdAt: {
    fontSize: 10,
    display: "flex",
    textAlign: "right",
    paddingRight: 3,
    paddingTop: 3,
    color: "white",
  },
  likes: {
    paddingLeft: 3,
    paddingHorizontal: 320,
    paddingTop: 0,
    fontSize: 17,
    textAlign: "right",
    color: "#2B937E",
  },
  likeButton: {
    paddingLeft: 3,
    paddingBottom: 5,
    paddingTop: 0,
    fontSize: 17,
  },
  likedButton: {
    paddingLeft: 3,
    paddingTop: 0,
    fontSize: 17,
  },
  likedButtontext: {
    paddingLeft: 3,
    paddingTop: 0,
    fontSize: 17,
    color: "#2B937E",
  },
  likeButtonText: {
    paddingLeft: 3,
    paddingTop: 0,
    fontSize: 17,
    color: "#2B937E",
  },
  commentsTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 0,
    marginBottom: 10,
    marginLeft: 120,
    color: "#EA9548",
  },
  commentContainer: {
    backgroundColor: "#2B2826",
    fontSize: 20,
    borderWidth: 100,
    borderColor: "#484240",
    borderRadius: 10,
    borderWidth: 5,
    paddingTop: 10,
    paddingBottom: 30,
    paddingHorizontal: 20,
    marginLeft: 0,
    color: "white",
  },
  commentUsername: {
    paddingBottom: 8,
    color: "white",
  },
  boldUsername: {
    fontWeight: "bold",
    color: "#2B937E",
  },
  footer: {
    padding: 25,
    backgroundColor: "blue",
  },
  commentBody: {
    color: "white",
  },
});

export default SinglePost;
