import React from "react";
import {
  Image,
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

type CardProps = {
  image: any;
  name: string;
  rating: number;
  numberOfDeliveries: string;
  vehicle: string;
};


function Card(props: CardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image></Image>
      </View>
      <View style={styles.infos}>
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.rating}>{props.rating}</Text>
        <Text style={styles.deliveries}>{props.numberOfDeliveries}</Text>
        <Text style={styles.vehicle}>{props.vehicle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 100,
    height: 100,
    width: 300,
    },
  image: {
    flex: 1,
    backgroundColor: "blue", 
    marginLeft: 50,
    width: 50,
  },
  infos: {
    flexDirection: "column"
  },
  name: {
    color: "black",
  },
  rating: {

  },
  deliveries: {

  },
  vehicle: {

  }
});
export default Card;
