import React, { useState } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { FontAwesome, FontAwesome5 } from "react-native-vector-icons"
import HalfStar from "./HalfStar";

type CardProps = {
  image: any;
  name: string;
  ratedStars: number;
  numberOfDeliveries: string;
  vehicle: "velo" | "scooter" | "voiture" | "fourgon" ;
};




function Card(props: CardProps) {
  return (
    <View style={styles.container}>
      <View>
        <Image source={props.image} style={styles.image}/>
      </View>
      <View style={styles.infos}>
        <Text style={styles.name}>{props.name}</Text>
        <View style={styles.stars}>
        {renderStars(props.ratedStars)}
        </View>
        <Text style={styles.deliveries}>{props.numberOfDeliveries}</Text>
        <View style={styles.vehicle}>
          <FontAwesome5 name={getVehicleIcon(props.vehicle)} size={20} color="gray" />
        </View>
      </View>
    </View>
  );
}

const renderStars = (rated: number) => {
  const stars = [];
  const fullStars = Math.floor(rated);
  const hasHalfStar = rated - fullStars >= 0.5;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(
        <FontAwesome
          key={i}
          name="star"
          size={16}
          color="gold"
          style={{ marginRight: 2 }}
        />
      );
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(<HalfStar key={i} />);
    } else {
      stars.push(
        <FontAwesome
          key={i}
          name="star-o"
          size={16}
          color="gray"
          style={{ marginRight: 2 }}
        />
      );
    }
  }
  return stars;
};

const getVehicleIcon = (vehicle: "velo" | "scooter" | "voiture" | "fourgon" ) => {
  switch (vehicle) {
    case "velo":
      return "bicycle";
    case "scooter":
      return "motorcycle";
    case "voiture":
      return "car";
    case "fourgon":
      return "truck";
    default:
      return "bicycle";
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 80,
    height: 150,
    width: 350,
    padding: 15,
    },
  image: {
    width: 140,
    height: 140,
    borderRadius: "50%",
    borderWidth: 2,
    borderColor: "white",
  },
  infos: {
    flexDirection: "column",
    width: 200,
    height: 150,
    color: "#525252",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 20,
  },
  stars: {
    flexDirection: "row"
  },
  deliveries: {
    fontSize: 20,
  },
  vehicle: {

  }
});
export default Card;
