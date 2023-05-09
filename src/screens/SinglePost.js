import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import Footer from "./HomeScreen/Components.js/Footer";
import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "@firebase/firestore";

const SinglePost = (props) => {
  const navigation = props.navigation;
  const db = getFirestore();
  const colRef = collection(db, "comments");
  const post = props.route.params.props; 
 const createTime = new Date(post.createdAt);
 const formattedDate= createTime.toLocaleDateString()
 const formattedTime = createTime.toLocaleTimeString()
  const [likes, setLikes] = useState(post.likes)
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  
 const handleLike = () => {
  if (liked) {
    setLikes(likes - 1);
    setLiked(false);
  } else {
    setLikes(likes + 1);
    setLiked(true);
  }

 }
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
      <ScrollView style={styles.content}>
        <View style={styles.imageContainer}>
          {post.img && (
            <Image
              style={styles.image}
              source={{ uri: post.img }}
              resizeMode="contain"
            />
          )}
        </View>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.body}>{post.body}</Text>
        <Text  style={styles.createdAt}>{post.username} posted at: {formattedDate}, {formattedTime} </Text>
      <TouchableOpacity style={liked ? styles.likedButton : styles.likeButton} onPress={handleLike}>
            <Text style={styles.likeButtonText}>{liked ? "You liked this!" : " ⭐ Like"}</Text>
          </TouchableOpacity>   
          <Text  style={styles.likes}>{likes} {likes === 1 ? "like" : "likes"}</Text>
         <Text style={styles.commentsTitle}>Comments</Text>
         {comments.map((comment) => {
          return (
              <View style= {styles.commentContainer} key={comment.id}>
             <Text style={styles.commentUsername}>
  <Text style={styles.boldUsername}>{comment.username}</Text> said:
</Text>
                <Text style={styles.commentBody}>{comment.body}</Text>
              </View>
            
           ) 
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
    marginLeft: 5
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 100,
  },
  imageContainer: {
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 10,
  },
  body: {
    fontSize: 15,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    borderWidth: 1.5,
    paddingTop: 10,
    paddingBottom: 30,
    paddingLeft: 5,
  },
  createdAt: {
fontSize: 10,
display: 'flex',
textAlign: 'right',
paddingRight: 3,
paddingTop: 3
  },
  likes: {
    paddingLeft: 3,
    paddingHorizontal: 7,
    paddingTop: 3,
    fontSize: 17,
    textAlign: 'right'
  },
  likeButton: {
    paddingLeft: 3,
    paddingBottom: 5,
    paddingTop: 10,
    fontSize: 17
  },
  likedButton : {
paddingLeft: 3,
paddingTop: 10,
fontSize: 17
  },
  likedButtontext: {
    paddingLeft: 3,
    paddingTop: 10,
    fontSize: 17
  },
  likeButtonText: {
    paddingLeft: 3,
    paddingTop: 10,
    fontSize: 17
  },
  commentsTitle: {
paddingRight: 50,
paddingLeft: 10,
paddingTop: 50,
paddingBottom: 25,
fontSize: 25,
  },
commentContainer: {
  borderWidth: 1,
  borderColor: "black",
  borderRadius: 10,
  borderWidth: 1.5,
  paddingTop: 10,
  paddingBottom: 20,
  marginBottom: 20,
  paddingLeft: 5,
},
commentUsername: {
  paddingBottom: 8,
},
boldUsername: {
fontWeight: "bold",
},
  footer: {
    padding: 25,
    backgroundColor: "blue",
  },
});

export default SinglePost;
