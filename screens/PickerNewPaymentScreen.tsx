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
import { useAppSelector } from "@/store/hooks";

function PickerNewPayementScreen({ navigation }) {
  const [bankName, setBankName] = useState<string>("");
  const [iban, setIban] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [bic, setBic] = useState<string>("");

  const userData = useAppSelector((state) => state.users.value);

  function handleRegistercreditMethod() {
    fetch(process.env.EXPO_PUBLIC_BACKEND_URL + "/payments/iban", {
      method: "POST",
      body: JSON.stringify({
        token: userData.token,
        name: name,
        bankName: bankName,
        iban: iban,
        bic: bic,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data)
        // Envoie vers la page Account pour que le picker puisse modifier son profil
        if (data.result) {
          navigation.navigate("PickerChangePayment");
        }
      })
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
              onChangeText={(value) => setBankName(value)}
              value={bankName}
            />
            <Input
              label="Titulaire du compte"
              onChangeText={(value) => setName(value)}
              value={name}
            />
            <Input
              label="IBAN"
              keyboardType="numeric"
              onChangeText={(value) => setIban(value)}
              value={iban}
            />
            <Input
              label="BIC"
              keyboardType="numeric"
              onChangeText={(value) => setBic(value)}
              value={bic}
            />
            <CustomButton
              onPressFunction={() => {
                handleRegistercreditMethod();
                console.log("click")
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
