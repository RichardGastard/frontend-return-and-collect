import React from "react";
import { View, StyleSheet, Image } from "react-native";

export default function Loader() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/Return-and-collect-loader.gif")}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    alignItems: "center",
    width: "100%",
  },
  image: {
    width: 200,
    resizeMode: "contain",
    height: 200,
    marginRight: "5%",
  },
});
