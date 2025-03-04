// COMPONENT
import CustomButton from "@/components/CustomButton";
import Layout from "@/components/Layout";

import { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";

import Input from "@/components/Input";

function PickerNewPayementScreen({ navigation }) {
  const [bankName, setBankName] = useState<string>("");
  const [iban, setIban] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [bic, setBic] = useState<string>("");


  function handleRegistercreditMethod() {
    fetch(process.env.EXPO_PUBLIC_BACKEND_URL + "/payments/iban", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        bankName: bankName,
        iban: iban,
        bic: bic,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((data) => {
        // Envoie vers la page Account pour l'utilisateur puisse commpléter son profil
        if (data.result) {
          navigation.navigate("Validation");
        }
      });
  }

  return (
    <Layout
      title="Nouveau compte bancaire"
      description="Remplissez les informations ci-dessous"
      footer
      arrowBack
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
              keyboardType="none"
              onChangeText={(value) => setBankName(value)}
              value={bankName}
            />
            <Input
              label="Titulaire du compte"
              keyboardType="none"
              onChangeText={(value) => setName(value)}
              value={name}
            />
            <Input
              label="IBAN"
              keyboardType="none"
              onChangeText={(value) => setIban(value)}
              value={iban}
            />
            <Input
              label="BIC"
              keyboardType="none"
              onChangeText={(value) => setBic(value)}
              value={bic}
            />
            <CustomButton
              onPressFunction={() => {
                handleRegistercreditMethod();
              }}
            >
              Validez les informations
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
    marginTop: "5%",
    justifyContent: "center",
  },
});

export default PickerNewPayementScreen;
