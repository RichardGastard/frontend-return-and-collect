import React from "react";
import { useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import CustomButton from "./CustomButton";

type CardProps = {
  orderNumber: any;
  user: string;
  packageSize: string;
  distance: string;
  price: number;
  status: boolean;
  onAccept: () => void;
};

function UserDeliveryCard({
  user,
  packageSize,
  distance,
  orderNumber,
  price,
  status = false,
  onAccept,
}: CardProps) {
  const [isTaken, setIsTaken] = useState<boolean>(null);

  let todayDate = new Date();
  let dd = String(todayDate.getDate()).padStart(2, "0");
  let mm = String(todayDate.getMonth() + 1).padStart(2, "0");
  let yyyy = todayDate.getFullYear();

  let today = mm + "/" + dd + "/" + yyyy;

  return (
    <View
      style={
        status || isTaken ? styles.containerValid : styles.containerInvalid
      }
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
            N°{orderNumber} {status || isTaken ? "✅" : "⏳"}
          </Text>
          <Text style={styles.cardContent}>👤 {user}</Text>
          <Text style={styles.cardContent}>📦 {packageSize}</Text>
          <Text style={styles.cardContent}>📍 {distance}</Text>
          <Text style={styles.cardContent}>💶 {price}€</Text>
          <View
            style={{
              justifyContent: "flex-end",
              alignSelf: "flex-end",
              flex: 1,
            }}
          >
            <Text
              style={(styles.cardContent, { opacity: 0.2, fontSize: 11 })}
            ></Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          height: "20%",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        {!isTaken ? (
          <TouchableOpacity
            style={{
              borderTopWidth: 1,
              borderRightWidth: 1,
              borderLeftWidth: 1,
              borderColor: "#52525220",
              borderRadius: 50,
              width: "50%",
              alignItems: "center",
              paddingTop: 0,
              backgroundColor: "#fffbf0",
            }}
            onPress={() => {
              Alert.alert(
                "Êtes vous sûr de vouloir prendre ce colis ?",
                'En cliquant sur "Accepter" vous vous engagez à aller chercher le colis dans la journée',
                [
                  {
                    text: "Annuler",
                    style: "destructive",
                    onPress: () => {
                      console.log(isTaken);
                    },
                  },
                  {
                    text: "Accepter",
                    onPress: () => {
                      setIsTaken(true);
                      onAccept();
                    },
                  },
                ]
              );
            }}
          >
            <Text
              style={{
                color: "#52525255",
                alignSelf: "center",
                fontSize: 15,
                fontFamily: "Poppins-Regular",
              }}
            >
              Je prends !
            </Text>
          </TouchableOpacity>
        ) : (
          <View>
            <Text
              style={{
                color: "#52525255",
                alignSelf: "center",
                fontSize: 15,
                fontFamily: "Poppins-Regular",
              }}
            >
              Commande acceptée le : {today}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerInvalid: {
    height: "30%",
    width: "99%",
    borderWidth: 0.5,
    borderRadius: 30,
    justifyContent: "center",
    borderColor: "#52525220",
    borderBottomColor: "#febbba70",
    borderRightColor: "#febbba80",
    boxShadow: "5px 5px 5px #FF450050",
  },
  containerValid: {
    height: "30%",
    width: "99%",
    borderWidth: 0.5,
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
    fontSize: 12,
  },
});
export default UserDeliveryCard;
