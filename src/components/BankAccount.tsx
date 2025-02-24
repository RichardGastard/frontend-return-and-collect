import React from "react";
import { View, StyleSheet, Text } from "react-native";


type BankProps = {
  bankName: string;
  iban: string;
  name: string;
  bic: string;
  status?: boolean;
};

function BankAccount({
    bankName,
    name,
    iban,
    bic,
    status = false
}: BankProps) {
  return (
    <View style={status ? styles.containerValid : styles.containerInvalid}>
        <View style={styles.bank}>
            <Text style={styles.bankName}>{bankName}</Text>
        </View>
        <View style={styles.infos}>
            <Text style={styles.textname}>{name}</Text>
            <Text style={styles.ibanNum}>{iban}</Text>
            <Text style={styles.bic}>{bic}</Text>
            
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
        borderWidth: 1,
      },
      bankName: {
        alignItems: "center",
        marginLeft:20,
        paddingTop: 8,
        fontSize: 20,
        fontWeight: "bold"
      },
      infos: {

      },
      textname: {
        fontSize: 14,
        fontFamily: "Poppins-Regular"
      },
      ibanNum: {

      },
      bic:{

      },
//   number: {
//     height: 100,
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   cardnum: {
//     paddingTop: 30,
//     fontSize: 20,
//   },
//   date: {
//     fontSize: 20,
//   },
//   name: {
//     marginLeft: 20,

//   },

 })
  
export default BankAccount;