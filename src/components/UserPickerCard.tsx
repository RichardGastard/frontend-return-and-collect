import React, { useState } from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import { FontAwesome, FontAwesome5 } from "react-native-vector-icons";
import HalfStar from "./HalfStar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RandomPicker from "./RandomPicker";

type CardProps = {
  image: any;
  name: string;
  ratedStars: number;
  numberOfDeliveries: number;
  timeRemaining: string;
  distanceRemaining: string;
};

function UserPickerCard(props: CardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.infos}>
        <Text style={styles.name}>{props.name}</Text>
        <View>
          <RandomPicker></RandomPicker>
        </View>
        <View style={styles.stars}>{renderStars(props.ratedStars)}</View>
        <Text style={styles.deliveries}>
          Livraisons effectuées: {props.numberOfDeliveries}
        </Text>
        <View style={styles.timeRemaining}>
          <MaterialCommunityIcons
            name="av-timer"
            size={40}
            color="#febbba"
          ></MaterialCommunityIcons>
           <Text style = {{ fontFamily: "Poppins-Regular",color: "#525252", opacity: 0.8}}>{props.timeRemaining}</Text>
        </View>
        <View style={styles.distanceRemaining}>
          <MaterialCommunityIcons
            name="map-marker-distance"
            size={40}
            color="#febbba"
          ></MaterialCommunityIcons>
           <Text style = {{ fontFamily: "Poppins-Regular",color: "#525252", opacity: 0.8}}>{props.distanceRemaining}</Text>
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
          size={20}
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
          size={20}
          color="gray"
          style={{ marginRight: 2 }}
        />
      );
    }
  }
  return stars;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },

  infos: {
    flexDirection: "column",
    width: 300,
    height: 300,
    color: "#525252",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    marginTop: 5,
    color: "#525252",
    fontSize: 27,
    opacity: 0.8,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },
  stars: {
    marginTop: 5,
    flexDirection: "row",
  },
  deliveries: {
    marginTop: 20,
    color: "#525252",
    fontSize: 14,
    opacity: 0.8,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    borderBottomWidth: 1,
    borderColor: "#febbba",
  },
  timeRemaining: {
    alignItems:"center",
    flexDirection:"row",
    marginTop: 15,
    borderWidth: 2,
    borderRadius: 80,
    borderColor: "white",
  },
  distanceRemaining: {
    alignItems:"center",
    flexDirection:"row",
    marginTop: 15,
    borderWidth: 2,
    borderRadius: 80,
    borderColor: "white",
  },
});

export default UserPickerCard;
