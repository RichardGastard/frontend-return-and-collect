import { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import ArrowBack from "@/components/ArrowBack";
import Layout from "@/components/Layout";

import Input from "@/components/Input";
import { useAppSelector } from "@/store/hooks";

function PickerPayement({ navigation }) {
  const [iban, setIban] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [bic, setBic] = useState<string>("");
  const [bankName, setbankName] = useState<string>("");

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
        if (data.result) {
          navigation.navigate("Validation");
        }
      });
  }

  // !!!!! CE CODE NE PERMET PAS D'AFFICHER PLUSIEURS ERREURS SIMULTANEMENT !!!!!!!

  return (
    <Layout
      title="Informations de paiement"
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
          <View
            style={{
              alignSelf: "center",
              height: "80%",
              justifyContent: "center",
            }}
          >
            <Input
              label="Titulaire du compte"
              keyboardType="none"
              onChangeText={(value) => setName(value)}
              value={name}
            />
            <Input
              label="Nom de la banque"
              keyboardType="none"
              onChangeText={(value) => setbankName(value)}
              value={bankName}
            />
            <Input
              label="Iban"
              keyboardType="none"
              onChangeText={(value) => setIban(value)}
              value={iban}
            />
            <Input
              label="Bic"
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
