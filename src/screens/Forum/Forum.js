import {View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import Footer from '../HomeScreen/Components/Footer.js';

const Forum = (props) => {
    const [text, setText] = useState('');
    const [photo, setPhoto] = useState(null);  
    const handleChoosePhoto = () => {
      // Open photo picker or camera here
    };  const handleSubmit = () => {
      // Submit post to forum here
    };  return (
        <View style={styles.container}>

      <View styles={styles.content}>
        <TextInput
          placeholder="Enter your post here"
          multiline={true}
          numberOfLines={10}
          onChangeText={(text) => setText(text)}
          />
        <TouchableOpacity onPress={handleChoosePhoto}>
          <Text>Choose Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSubmit}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
              <View style={styles.footer}>
              <Footer props={props}/>
              </View>
          </View>
    );
  };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    content: {
        flex: 1,
        backgroundColor: 'red',
    },
    footer: {
        backgroundColor: "blue",
        padding: 25,
    }
})

export default Forum;