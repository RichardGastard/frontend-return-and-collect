import React, { useState } from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import { FontAwesome, FontAwesome5 } from "react-native-vector-icons";
import HalfStar from "./HalfStar";

type CardProps = {
  image: any;
  name: string;
  ratedStars: number;
  numberOfDeliveries: string;
  vehicle: "velo" | "scooter" | "voiture" | "fourgon";
};

function Card(props: CardProps) {
  return (
    <View style={styles.container}>
      <View>
        <Image source={props.image} style={styles.image} />
      </View>
      <View style={styles.infos}>
        <Text style={styles.name}>{props.name}</Text>
        <View style={styles.stars}>{renderStars(props.ratedStars)}</View>
        <Text style={styles.deliveries}>{props.numberOfDeliveries}</Text>
        <View style={styles.vehicle}>
          <FontAwesome5
            name={getVehicleIcon(props.vehicle)}
            size={20}
            color="gray"
          />
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

const getVehicleIcon = (
  vehicle: "velo" | "scooter" | "voiture" | "fourgon"
) => {
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
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.3,
    borderColor: "#febbba",
    borderRadius: 80,
    height: 150,
    width: 350,
    padding: 15,
    backgroundColor: "#fffbf0",
    boxShadow: "5px 5px 5px #febbba70",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: "50%",
    borderWidth: 0.5,
    borderColor: "#febbba20",
  },
  infos: {
    flexDirection: "column",
    width: 200,
    height: 100,
    color: "#525252",
    paddingLeft: 30,
    alignItems: "flex-start",
    justifyContent: "center",
    borderLeftWidth: 0.2,
    borderLeftColor: "#52525250",
    marginLeft: 30
  },
  name: {
    fontSize: 20,
    fontFamily: "Public-Sans-Bold",
    color: "#525252",
    fontWeight: "900",
  },
  stars: {
    flexDirection: "row",
  },
  deliveries: {
    fontSize: 15,
    fontFamily: "Poppins-Regular",
    color: "#525252",
  },
  vehicle: { position: "relative", left: 30 },
});
export default Card;
