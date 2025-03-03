import React from "react";
import { Image, View, StyleSheet, Text, TouchableOpacity } from "react-native";

type CardProps = {
  orderNumber: number;
  location: string;
  collector: string;
  price: number;
  status?: boolean;
  date: string; // DATE ?
};

function OrderCard({
  orderNumber,
  location,
  collector,
  price,
  status = false,
  date,
}: CardProps) {
  return (
    <TouchableOpacity
      style={status ? styles.containerValid : styles.containerInvalid}
    >
      <View style={{ flexDirection: "row" }}>
        <Image source={require("../../assets/logo.png")} style={styles.image} />
        <View
          style={{
            flexDirection: "column",
            flex: 1,
            marginRight: "5%",
            height: "80%",
            alignSelf: "center",
            borderLeftWidth: 0.3,
            borderLeftColor: "#52525250",
            paddingLeft: "5%",
          }}
        >
          <Text style={styles.title}>
            N°{orderNumber} {status ? "✅" : "❌"}
          </Text>
          <Text style={styles.cardContent}>📍 {location}</Text>
          <Text style={styles.cardContent}>👤 {collector}</Text>
          <Text style={styles.cardContent}>💶 {price}€</Text>
          <View
            style={{
              justifyContent: "flex-end",
              alignSelf: "flex-end",
              flex: 1,
            }}
          >
            <Text style={(styles.cardContent, { opacity: 0.2, fontSize: 11, position: "absolute", right: 10 })}>
              {date}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerInvalid: {
    height: 160,
    width: "99%",
    borderWidth: 0.3,
    borderRadius: 30,
    justifyContent: "center",
    borderColor: "#52525220",
    borderBottomColor: "#febbba70",
    borderRightColor: "#febbba80",
    boxShadow: "5px 5px 5px #ff525255",
  },
  containerValid: {
    height: 160,
    width: "99%",
    borderWidth: 0.3,
    borderRadius: 30,
    justifyContent: "center",
    borderColor: "#52525220",
    borderBottomColor: "#08CC0A35",
    borderRightColor: "#08CC0A40",
    boxShadow: "5px 5px 5px #08CC0A30",
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 100,
    alignSelf: "center",
    // borderRightWidth: 0.3,
    // borderRightColor: "#525252",
    // marginRight: "5%",
  },
  title: {
    fontFamily: "Public-Sans-Bold",
    alignSelf: "center",
    marginBottom: "5%",
    fontSize: 13,
  },
  cardContent: {
    fontFamily: "Poppins-Regular",
    color: "#525252",
    fontSize: 13,
  },
});
export default OrderCard;
