import React from "react";
import { View, StyleSheet, Text } from "react-native";

type BankProps = {
  bankName: string;
  iban: string;
  name: string;
  bic: string;
  status?: boolean;
};



function BankAccount({ bankName, name, iban, bic, status = false }: BankProps) {
  return (
    <View style={status ? styles.containerValid : styles.containerInvalid}>
      <View style={styles.bank}>
        <Text style={styles.bankName}>{bankName}</Text>
      </View>
      <View style={styles.infos}>
        <View style={styles.accountName}>
          <Text style={styles.nameText}>Titulaire du compte</Text>
          <Text style={styles.name}>{name}</Text>
        </View>
        <View style={styles.accountIban}>
          <Text style={styles.ibanText}>Iban</Text>
          <Text style={styles.iban}>{iban}</Text>
        </View>
        <View style={styles.accountBic}>
          <Text style={styles.bicText}>BIC</Text>
          <Text style={styles.bic}>{bic}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerInvalid: {
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
    height: "30%",
    width: "99%",
    borderWidth: 0.3,
    borderRadius: 30,
    borderColor: "#52525220",
    borderBottomColor: "#08CC0A35",
    borderRightColor: "#08CC0A40",
    boxShadow: "5px 5px 5px #08CC0A25",
  },
  bank: {
    alignItems: "center",
    alignSelf: "center",
    paddingRight: 10,
  },
  bankName: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
    paddingTop: 8,
    fontSize: 20,
    fontWeight: "bold",
  },
  infos: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginLeft: 15,
  },
  accountName: {
    marginTop: 15,
  },
  nameText: {
    fontWeight:"bold",
    paddingLeft: 10,
  },
  name: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",

  },
  accountIban: {
    marginVertical:10,
  },
  ibanText: {
    fontWeight:"bold",
    paddingLeft: 10,
  },
  iban: {
    fontFamily: "Poppins-Regular",

  },
  accountBic: {

  },
  bicText: {
    fontWeight:"bold",
    paddingLeft: 10,
  },
  bic: {
    fontFamily: "Poppins-Regular",
    
  },
});

export default BankAccount;
