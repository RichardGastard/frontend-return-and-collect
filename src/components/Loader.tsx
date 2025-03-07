import React from "react";
import { View, StyleSheet, Image } from "react-native";

type LoaderProps = {
  big?: boolean;
};

export default function Loader({ big = false }: LoaderProps) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/Return-and-collect-loader.gif")}
        style={big ? styles.bigImage : styles.image}
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
  bigImage: {
    width: 350,
    resizeMode: "contain",
    height: 350,
    marginRight: "5%",
  },
});
