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
  const [bankName, setbankName] = useState<string>("")
  const [cardHolder, setCardHolder] = useState<string>("");
  const [cardNumber, setcardNumber] = useState<string>("");
  const [expirationDate, setExpirationDate] = useState<string>("");
  const [securityNumber, setSecurityNumber] = useState<string>("");


  function handleRegisterpaymentMethod() {
    fetch(process.env.EXPO_PUBLIC_BACKEND_URL + "/payments/card", {
      method: "POST",
      body: JSON.stringify({
      bankName: bankName,
      name: cardHolder,
      creditCardNumber: cardNumber,
      expirationDate: expirationDate,
      creditCardSecurityDigits: securityNumber
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((data) => {
        // Envoie vers la page Account pour l'utilisateur puisse commpléter son profil
        if (data.result) {
          navigation.navigate("UserChangePayment");
        }
      });
  }

  return (
    <Layout
      title="Moyen de paiement"
      description="Ajoutez votre nouveau moyen de paiement"
      arrowBack
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
          <View style={styles.container}>
            <Input label="Nom de la banque" />
            <Input label="Titulaire de la carte" />
            <Input label="Numéro de la carte" keyboardType="numeric" />
            <Input label="Date d'expiration" keyboardType="numeric" />
            <Input label="CVV" keyboardType="numeric" />
            <CustomButton
              onPressFunction={() => {
                handleRegisterpaymentMethod();
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
    alignSelf: "center",
    height: "80%",
    justifyContent: "center",
  },
});

export default Payment;
