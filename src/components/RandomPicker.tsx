import { Image, StyleSheet } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { View } from "react-native-reanimated/lib/typescript/Animated";

function randomPickerPicture() {
  const [pickedPicker, setPickedPicker] = useState<any>(null);

  const pickers = [
    require("../../assets/livreur-1.jpg"),
    require("../../assets/livreur-2.jpg"),
    require("../../assets/livreur-3.jpg"),
    require("../../assets/livreur-4.jpg"),
    require("../../assets/livreur-5.jpg"),
    require("../../assets/livreur-6.jpg"),
    require("../../assets/livreur-7.jpg"),
    require("../../assets/livreur-8.jpg"),
    require("../../assets/livreur-9.jpg"),
  ];

  useEffect(() => {
    const random = Math.floor(Math.random() * pickers.length);
    setPickedPicker(pickers[random]);
    console.log(pickedPicker)
  },[]);

  return pickedPicker ? <Image style={styles.image} source={pickedPicker} /> : null
}
const styles = StyleSheet.create({
  image: {
    borderRadius: 100,
    width: 200,
    height: 200,
    borderWidth: 3,
    borderColor: "white",
  },
});

export default randomPickerPicture;
