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
  ScrollView,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import ArrowBack from "@/components/ArrowBack";
import Layout from "@/components/Layout";

import Input from "@/components/Input";
import HomeScreen from "./HomeScreen";

function PickerNewPayementScreen({ navigation }) {
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
      navigation.navigate("PickerChangePayment");
    }
  };

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
                handleSubmit();
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

export default PickerNewPayementScreen;
