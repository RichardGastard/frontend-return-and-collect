// COMPONENTS
import Layout from "@/components/Layout";
import CustomButton from "@/components/CustomButton";
import Input from "@/components/Input";

import { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

function Payment({ navigation }) {
  const [cardHolder, setCardHolder] = useState<string>("");
  const [cardNumber, setcardNumber] = useState<string>("");
  const [expirationDate, setExpirationDate] = useState<string>("");
  const [securityNumber, setSecurityNumber] = useState<string>("");

  const [cardHolderValidity, setCardHolderValidity] = useState<boolean>(true);
  const [cardNumberValidity, setcardNumberValidity] = useState<boolean>(true);
  const [expirationDateValidity, setExpirationDateValidity] =
    useState<boolean>(true);
  const [securityNumberValidity, setSecurityNumberValidity] =
    useState<boolean>(true);

  const handleSubmit = () => {
    const cardHolderRegex = /^[a-zA-Z\s]+$/;
    const cardNumberRegex = /^\d{16}$/;
    const expirationDateRegex = /^(0[1-9]|1[0-2])\/([0-9]{4})$/;
    const securityNumberRegex = /^\d{3}$/;

    setCardHolderValidity(true);
    setcardNumberValidity(true);
    setExpirationDateValidity(true);
    setSecurityNumberValidity(true);

    if (!cardHolder.match(cardHolderRegex) || cardHolder.length < 2) {
      setCardHolderValidity(false);
      console.log("Nom du titulaire incorrect");
      return;
    }
    if (!cardNumber.match(cardNumberRegex) || cardNumber.length !== 16) {
      setcardNumberValidity(false);
      console.log("Numéro de carte invalide");
      return;
    }
    if (
      !expirationDate.match(expirationDateRegex) ||
      expirationDate.length < 2
    ) {
      setExpirationDateValidity(false);
      console.log("Date d'expiration invalide");
      return;
    }
    if (
      !securityNumber.match(securityNumberRegex) ||
      securityNumber.length !== 3
    ) {
      setSecurityNumberValidity(false);
      console.log("Code secret invalide");
      return;
    } else {
      navigation.navigate("Validation"); // Penser à Changer la route ainsi que sur le bouton : "Passez cette étape" !!!
    }
  };

  // !!!!! CE CODE NE PERMET PAS D'AFFICHER PLUSIEURS ERREURS SIMULTANEMENT !!!!!!!

  return (
    <Layout
      title="Moyen de paiement"
      description="Ajoutez votre moyen de paiement"
      arrowBack
      arrowSkip="SignUpCongrats"
      footer
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 200 : 0}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
        >
          <View
            style={{
              alignSelf: "center",
              height: "80%",
              justifyContent: "center",
            }}
          >
            <Input label="Titulaire de la carte" />
            <Input label="Numéro de la carte" keyboardType="numeric" />
            <Input label="Date d'expiration" keyboardType="numeric" />
            <Input label="CVV" keyboardType="numeric" />
            <CustomButton
              onPressFunction={() => {
                navigation.navigate("SignUpCongrats");
              }}
            >
              Ajouter la carte
            </CustomButton>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
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
