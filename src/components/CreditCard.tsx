import React from "react";
import { Image, View, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type CardProps = {
  cardNumber: string;
  expirationdate: string;
  name: string;
  bankName: string;
  status?: boolean;
};

function CreditCard({
    name,
  cardNumber,
  expirationdate,
  bankName,
  status = false
}: CardProps) {
  return (
    <View style={status ? styles.containerValid : styles.containerInvalid}>
        <View style={styles.bank}>
            <Text style={styles.bankName}>{bankName}</Text>
         <MaterialCommunityIcons
        name="card-bulleted"
        size={50}
        color="#525252"
        style={{ opacity: 0.8, 
            marginRight: 10,
        }}
      ></MaterialCommunityIcons>
      </View>
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
    containerInvalid: {
        backgroundColor: "#dcdcdc",
        height: "30%",
        width: "99%",
        borderWidth: 0.3,
        borderRadius: 30,
        justifyContent: "center",
        borderColor: "#52525220",
        borderBottomColor: "#febbba70",
        borderRightColor: "#febbba80",
        boxShadow: "5px 5px 5px #febbba50",
      },
      containerValid: {
        backgroundColor: "#dcdcdc",
        height: "30%",
        width: "99%",
        borderWidth: 0.3,
        borderRadius: 30,
        justifyContent: "center",
        borderColor: "#52525220",
        borderBottomColor: "#08CC0A35",
        borderRightColor: "#08CC0A40",
        boxShadow: "5px 5px 5px #08CC0A25",
      },
      bank: {
        flexDirection: "row",
        justifyContent: 'space-between',
      },
      bankName: {
        alignItems: "center",
        marginLeft:20,
        paddingTop: 8,
        fontSize: 20,
        fontWeight: "bold"
      },
  number: {
    height: 100,
    alignItems: "center",
    justifyContent: "center"
  },
  cardnum: {
    paddingTop: 30,
    fontSize: 20,
  },
  date: {
    fontSize: 20,
  },
  name: {
    marginLeft: 20,

  },
  textname: {
    fontSize: 14,
    fontFamily: "Poppins-Regular"
  },
})
  
export default CreditCard;