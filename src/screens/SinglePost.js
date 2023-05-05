import { Text, View, StyleSheet } from 'react-native';
import Footer from './HomeScreen/Components.js/Footer';

const SinglePost = (props) => {

    const post = props.route.params.props;

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>{post.title}</Text>
                <Text style={styles.body}>{post.body}</Text>
            </View>
        <Footer style={styles.footer}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 20,
    },
    body: {
        fontSize: 15,
    },
    footer: {
        padding: 25,
        backgroundColor: "blue",
      },
})

export default SinglePost;