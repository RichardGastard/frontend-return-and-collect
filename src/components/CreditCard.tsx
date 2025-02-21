import React from "react";
import { Image, View, StyleSheet, Text } from "react-native";

type CardProps = {
  cardNumber: string;
  expirationdate: string;
  name: string;
};

function CreditCard({
    name,
  cardNumber,
  expirationdate,
}: CardProps) {
  return (
    <View style={styles.container}>
        <View style={styles.number}>
            <Text style={styles.cardnum}>{cardNumber}</Text>
            <Text style={styles.date}>{expirationdate}</Text>
        </View>
        <View style={styles.name}>
            <Text style={styles.textname}>{name}</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "25%",
    width: "99%",
    borderWidth: 0.3,
    borderRadius: 30,
    justifyContent: "center",
    borderColor: "#52525220",
    borderBottomColor: "#08CC0A35",
    borderRightColor: "#08CC0A40",
    boxShadow: "5px 5px 5px #08CC0A25",
  },
  
  number: {
    borderWidth: 1,
    height: 100,
    alignItems: "center"
  },
  cardnum: {
    paddingTop: 30,
    fontSize: 20,
  },
  date: {
    fontSize: 20,
  },
  name: {
    alignItems: "flex-start",
    marginLeft: 10,
  },
  textname: {
    fontSize: 25,
  },
})
  
export default CreditCard;