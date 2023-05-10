
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, PagerView} from 'react-native';
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    onSnapshot,
  } from "firebase/firestore";
import { getPlantsById } from "../Api";
import styles from "./styles";


const Wishlist = ({props}) => {

    const db = getFirestore();
    const colRef = collection(db, "users");
    const users = [];
    const currentUser = [];
    const [myWishlistArray, setMyWishlistArray] = useState([]);
    const wishlistResArray = [];

    // useEffect(() => {
    //     getDocs(colRef)
    //       .then((snapshot) => {
    //         snapshot.docs.filter((doc) => {
    //           users.push({
    //             myWishlist: Object.values({ ...doc.data().Wishlist }),
    //             id: doc.id,
    //           });
    //           console.log(users)
    //           users.map((person) => {
    //             if (person.id === props.extraData.id) {
    //               currentUser.push(person);
    //               currentUser[0].Wishlist.map((plantid) => {
    //                 getPlantsById(plantid).then((result) => {
    //                   wishlistResArray.push(result);
    //                   setMyWishlistArray(wishlistResArray);
    //                   // return result;
    //                 });
    //               });
    //             }
    //           });
    //         });
    //       })
    //       .catch((error) => {
    //         console.log("error", error.message);
    //       });
    //   }, [setMyWishlistArray]);

    //   console.log(myWishlistArray)

    // original useEffect ^^^





    // useEffect(() => {
    //   const getWishlist = onSnapshot(colRef, (snapshot) => {
    //       snapshot.docs.forEach((doc) => {
    //         users.push({Wishlist: {...doc.data().Wishlist}, id: doc.id });
    //         })
    //         users.map((person) => {
    //           if (person.id === props.extraData.id) {
    //             currentUser.push(person);
    //             console.log('wishlis', currentUser[0].Wishlist)
    //             currentUser[0].Wishlist.forEach((plantid) => {
    //                 console.log('plantid', plantid)
    //               getPlantsById(plantid).then((result) => {
    //                 // console.log('result', result)
    //                 wishlistResArray.push(result);
    //                 setMyWishlistArray(wishlistResArray);
    //             })
    //         })}
    //     })
    // });
    // return () => {
    //     getWishlist();
    // }
    // }, []);

    // attempt at onSnapshot useEffect ^^^


    return (
        <View>
            <Image
            style={styles.Icontwo}
            source={require("../../../assets/MPIconS.png")}
            />
            {/* <View>
            <PagerView style={styles.pager} initialPage={0}>
                <Text>hello world</Text>
            </PagerView>
            </View> */}
        </View>
    )
}

export default Wishlist;