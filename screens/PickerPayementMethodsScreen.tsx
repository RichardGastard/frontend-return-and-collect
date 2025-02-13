import { useState, useRef } from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import ArrowBack from "@/components/ArrowBack";

import Input from "@/components/Input";
import HomeScreen from "./HomeScreen";

function PickerPayement({ navigation }) {
  const [iban, setIban] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [bic, setBic] = useState<string>("");

  const [ibanNumber, setIbanNumber] = useState<boolean>(true);
  const [bicNumber, setBicNumber] = useState<boolean>(true);

  const handleSubmit = () => {
    const ibanRegex =
      /b[A-Z]{2}[0-9]{2}(?:[ ]?[0-9]{4}){4}(?!(?:[ ]?[0-9]){3})(?:[ ]?[0-9]{1,2})?b/;
    const bicRegex = /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?/;

    if (!iban.match(ibanRegex) || iban.length < 2) {
      setIbanNumber(false);
      console.log("Iban incorrect");
      return;
    }
    if (!bic.match(bicRegex) || bic.length < 2) {
      setBicNumber(false);
      console.log("Bic invalide");
      return;
    } else {
      navigation.navigate("Validation"); // Penser à Changer la route ainsi que sur le bouton : "Passez cette étape" !!!
    }
  };

  // !!!!! CE CODE NE PERMET PAS D'AFFICHER PLUSIEURS ERREURS SIMULTANEMENT !!!!!!!

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View style={styles.topButtons}>
            <ArrowBack />

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Validation"); //
              }}
            >
              <Text style={{ fontSize: 16, color: "#525252" }}>
                Passer cette étape
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.header}>
            <Text style={styles.title}>Informations de paiement</Text>
            <TouchableOpacity style={styles.container}></TouchableOpacity>
          </View>
          <View style={styles.inputs}>
            <Text style={{ fontSize: 16, color: "#525252" }}>
              Nom du titulaire du compte
            </Text>
            <Input
              label="Nom du titulaire"
              onChangeText={(value) => setName(value)}
              value={name}
            />
            <Text style={{ fontSize: 16, color: "#525252" }}>IBAN</Text>
            <Input
              keyboardType="numeric"
              label="IBAN"
              onChangeText={(value) => setIban(value)}
              value={iban}
            />
            <Text style={{ fontSize: 16, color: "#525252" }}>BIC</Text>
            <Input
              keyboardType="numeric"
              label="BIC"
              onChangeText={(value) => setBic(value)}
              value={bic}
            />
          </View>
          <View style={styles.smallInputAlign}>
            <View style={styles.ValidateButton}>
              <CustomButton onPressFunction={() => handleSubmit()}>
                Valider les informations
              </CustomButton>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffbf0",
    padding: 20,
  },
  header: {},

  topButtons: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  title: {
    paddingTop: 50,
    paddingBottom: 10,
    textAlign: "center",
    fontSize: 36,
    color: "#525252",
  },
  error: {
    color: "red",
  },
  inputs: {
    marginTop: 35,
    width: "97%",
    justifyContent: "space-between",
    marginRight: "auto",
    marginLeft: "auto",
    gap: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },

    elevation: 24,
    paddingBottom: 50,
  },
  CVV: {
    width: 20,
  },
  input: {
    borderColor: "#525252",
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
    paddingHorizontal: 10,
  },
  smallInputAlign: {
    borderColor: "#525252",

    justifyContent: "space-between",
  },
  smallInput: {
    borderColor: "#525252",
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
    paddingHorizontal: 10,
    width: 150,
  },
  ValidateButton: {
    width: "97%",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 30,
    paddingTop: 50,
  },
});

export default PickerPayement;
