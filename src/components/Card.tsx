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
import { FontAwesome, FontAwesome5 } from "react-native-vector-icons"

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
      <View>
        <Image source={props.image} style={styles.image}/>
      </View>
      <View style={styles.infos}>
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.rating}>{renderStars(props.rating)}</Text>
        <Text style={styles.deliveries}>{props.numberOfDeliveries}</Text>
        <Text style={styles.vehicle}>{props.vehicle}</Text>
      </View>
    </View>
  );
}

const renderStars = (rating: number) => {
  let stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <FontAwesome
        key={i}
        name={i <= rating ? "star" : "star-o"}
        size={16}
        color={i <= rating ? "gold" : "gray"}
        style={{ marginRight: 2 }}
      />
    );
  }
  return stars;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 100,
    height: 100,
    width: 230,
    padding: 15,
    },
  image: {
    flex: 1,
    alignItems: "center",
    width: 90,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: "white",
    marginLeft: 12,
  },
  infos: {
    flexDirection: "column",
    width: 115,
    height: 100,
    paddingTop: 15,
    marginLeft: 10,
  },
  name: {
    
  },
  rating: {

  },
  deliveries: {

  },
  vehicle: {

  }
});
export default Card;
