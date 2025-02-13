import React from "react";
import { View, StyleSheet, Image, ActivityIndicator } from "react-native";

// NEW IMPORT
import { PuffLoader } from "react-spinners";

export default function Loader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#febbba" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
