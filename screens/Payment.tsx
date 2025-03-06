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
import { useAppSelector } from "@/store/hooks";

function Payment({ navigation }) {
  const [bankName, setBankName] = useState<string>("");
  const [cardHolder, setCardHolder] = useState<string>("");
  const [cardNumber, setcardNumber] = useState<string>("");
  const [expirationDate, setExpirationDate] = useState<string>("");
  const [securityNumber, setSecurityNumber] = useState<string>("");

  const userData = useAppSelector((state) => state.users.value);

  function handleRegisterpaymentMethod() {
    fetch(process.env.EXPO_PUBLIC_BACKEND_URL + "/payments/card", {
      method: "POST",
      body: JSON.stringify({
        token: userData.token,
        bankName: bankName,
        name: cardHolder,
        creditCardNumber: cardNumber,
        expirationDate: expirationDate,
        creditCardSecurityDigits: securityNumber,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data)
        if (data.result) {
          navigation.navigate("Validation");
        }
      });
  }

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
          <View style={styles.container}>
            <Input
              label="Nom de la banque"
              onChangeText={(value) => setBankName(value)}
              value={bankName}
            />
            <Input
              label="Titulaire de la carte"
              onChangeText={(value) => setCardHolder(value)}
              value={cardHolder}
            />
            <Input
              label="Numéro de la carte"
              keyboardType="numeric"
              onChangeText={(value) => setcardNumber(value)}
              value={cardNumber}
            />
            <Input
              label="Date d'expiration"
              keyboardType="numeric"
              onChangeText={(value) => setExpirationDate(value)}
              value={expirationDate}
            />
            <Input
              label="CVV"
              keyboardType="numeric"
              onChangeText={(value) => setSecurityNumber(value)}
              value={securityNumber}
            />
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
