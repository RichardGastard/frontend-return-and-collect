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

function Payment({ navigation }) {
  const [cardHolder, setCardHolder]= useState<string>("");
  const [cardNumber, setcardNumber] = useState<string>("");
  const [expirationDate, setExpirationDate] = useState<string>("");
  const [securityNumber, setSecurityNumber] = useState<string>("");

  const [cardHolderValidity, setCardHolderValidity]= useState<boolean>(true);
  const [cardNumberValidity, setcardNumberValidity] = useState<boolean>(true);
  const [expirationDateValidity, setExpirationDateValidity] = useState<boolean>(true);
  const [securityNumberValidity, setSecurityNumberValidity] = useState<boolean>(true);

  const handleSubmit = () => {
    const cardHolderRegex = /^[a-zA-Z\s]+$/
    const cardNumberRegex  = /^\d{16}$/;
    const expirationDateRegex = /^(0[1-9]|1[0-2])\/([0-9]{4})$/;
    const securityNumberRegex = /^\d{3}$/;

    setCardHolderValidity(true);
    setcardNumberValidity(true);
    setExpirationDateValidity(true);
    setSecurityNumberValidity(true);

    if (!cardHolder.match(cardHolderRegex) || cardHolder.length <2){
      setCardHolderValidity(false)
      console.log("Nom du titulaire incorrect")
      return;
    } if (!cardNumber.match(cardNumberRegex) || cardNumber.length <2){
      setcardNumberValidity(false)
      console.log("Numéro de carte invalide")
      return;
    } if (!expirationDate.match(expirationDateRegex) || expirationDate.length <2){
      setExpirationDateValidity(false)
      console.log("Date d'expiration invalide")
      return;
    } if (!securityNumber.match(securityNumberRegex) || securityNumber.length <2){
      setSecurityNumberValidity(false)
      console.log("Code secret invalide")
      return;
    } else {
      navigation.navigate("Validation") // Penser à Changer la route ainsi que sur le bouton : "Passez cette étape" !!!
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
                navigation.navigate(""); //
              }}
            >
              <Text style={{ fontSize: 16, color: "#525252" }}>
                Passer cette étape
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.header}>
            <Text style={styles.title}>Informations de paiemment</Text>
            <TouchableOpacity style={styles.container}></TouchableOpacity>
          </View>
          <View style={styles.inputs}>
          <Text style={{ fontSize: 16, color: "#525252" }}>
                Nom du titulaire de la carte
              </Text>
          <Input  label = "Nom du titulaire" onChangeText={(value) => setCardHolder((value))}
                value={cardHolder} />
                {!cardHolderValidity&& <Text style = {styles.error}> Nom du titulaire invalide</Text>}
            <View>
              <Text style={{ fontSize: 16, color: "#525252" }}>
                Numéro de carte
              </Text>
              <Input keyboardType="numeric" label = "numéro de carte" onChangeText={(value) => setcardNumber((value))}
              value={cardNumber} />
              {!cardNumberValidity&& <Text style = {styles.error}> Numéro de carte invalide</Text>}
            </View>
            <View style={styles.smallInputAlign}>
              <View>
                <Text style={{ fontSize: 16, color: "#525252" }}>
                  date d'expiration
                </Text>
                <Input keyboardType="numeric" label = "date d'expiration" onChangeText={(value) => setExpirationDate((value))}
                value={expirationDate} />
                {!expirationDateValidity&& <Text style = {styles.error}> Date d'expiration invalide</Text>}
              </View>
              <View>
                <Text style={{ fontSize: 16, color: "#525252" }}>Code secret</Text>
                <Input  keyboardType="numeric" label = "CVV" onChangeText={(value) => setSecurityNumber((value))}
                value={securityNumber}/>
              </View>
              {!securityNumberValidity&& <Text style = {styles.error}> Code secret invalide</Text>}
            </View>
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
    color: "red"
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
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

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

export default Payment;
