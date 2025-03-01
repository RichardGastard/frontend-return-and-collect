// COMPONENTS
import Layout from "@/components/Layout";
import Input from "@/components/Input";
import CustomButton from "@/components/CustomButton";

import { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import useKeyboardHeight from "react-native-use-keyboard-height";
import { useAppSelector } from "@/store/hooks";

// TODO: Adjust the keyboard avoiding view

function AddressScreen({ navigation }) {
  const [number, setNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [zipcode, setZipCode] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const userData = useAppSelector((state) => state.users.value);

  const keyboardHeight = useKeyboardHeight();

  function handleRegisterUser() {
    fetch(process.env.EXPO_PUBLIC_BACKEND_URL + "/users/", {
      method: "PUT",
      body: JSON.stringify({
        token: userData.token,
        address: `${number}, ${address}`,
        zipcode,
        city,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((data) => {
        // Envoie vers la page Account pour l'utilisateur puisse commpléter son profil
        if (data.result) {
          navigation.navigate("Payment");
        }
      });
  }

  return (
    <Layout
      title="Adresse"
      description="Saisissez votre adresse complète"
      footer
      arrowBack
      arrowSkip="Payment"
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
              label="N°"
              keyboardType="none"
              onChangeText={(value) => setNumber(value)}
              value={number}
            />
            <Input
              label="Adresse"
              keyboardType="none"
              onChangeText={(value) => setAddress(value)}
              value={address}
            />
            <Input
              label="Code postal"
              keyboardType="none"
              onChangeText={(value) => setZipCode(value)}
              value={zipcode}
            />
            <Input
              label="Ville"
              keyboardType="none"
              onChangeText={(value) => setCity(value)}
              value={city}
            />
            <CustomButton
              onPressFunction={() => {
                handleRegisterUser();
              }}
            >
              Suivant
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

export default AddressScreen;
