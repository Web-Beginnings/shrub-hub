import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";


const AllPosts = ({props}) => {

    const { navigation } = props;

    const posts = [
        {
        id: '001',
        title: 'Help needed',
        body: 'Looking to buy this, does anyone know where from?',
        img: 'https://img1.wsimg.com/isteam/ip/f3c80ea8-f674-463c-b710-5e92222cd1f8/ols/x2.jpg',
        },
        {
        id: '002',
        title: 'When should I plant lillies?',
        body: 'What time of year is best?',
        },
        {
        id: '003',
        title: 'Can you identify this?',
        body: 'I want to know what this is',
        img: 'https://www.telegraph.co.uk/multimedia/archive/01439/corpse_1439302f.jpg',
        },
        {
        id: '004',
        title: 'How often should I water a cactus?',
        body: 'I keep killing them, help!',
        },
        {
        id: '005',
        title: 'Which plants are poisonous to cats?',
        body: 'Is this one toxic?',
        img: 'https://domf5oio6qrcr.cloudfront.net/medialibrary/10877/8098d632-589a-4a40-833a-0f62607bf99a.jpg',
        },
        {   
        id: '006',
        title: 'Is this an indoor plant?',
        body: "I just can't tell",
        img: 'https://www.gardeningknowhow.com/wp-content/uploads/2017/07/hardwood-tree.jpg',
        },
            
    ];

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <ScrollView>
                    {posts.map((post) => {
                        return (
                            <TouchableOpacity
                            key={post.id}
                            style={styles.individualPost}
                            onPress={() => {
                                navigation.navigate("SinglePost", { props: post })
                            }} >
                            <Text style={styles.title}>{post.title}</Text>
                            <Text style={styles.body}>{post.body}</Text>
                            </TouchableOpacity>
                    )})}
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    content: {
        
    },
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
})

export default AllPosts;