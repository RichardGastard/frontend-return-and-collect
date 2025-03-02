// COMPONENTS
import Layout from "@/components/Layout";
import Input from "@/components/Input";
import DropdownMenu from "@/components/DropdownMenu";
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

function CoordinatesScreen({ navigation }) {
  // User informations
  const [firstName, setFirstname] = useState<string>("");
  const [lastName, setLastname] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [userType, setUserType] = useState<string>("");
  const userData = useAppSelector((state) => state.users.value);

  function handleRegisterUser() {
    if (!userType) {
      alert("Veuillez choisir un type de compte");
      return;
    }

    fetch(process.env.EXPO_PUBLIC_BACKEND_URL + "/users/", {
      method: "PUT",
      body: JSON.stringify({
        token: userData.token,
        firstName,
        lastName,
        phone,
        userType: userType === "Collecteur" ? "PICKER" : "SENDER",
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((data) => {
        // Envoie vers la page Account pour l'utilisateur puisse commpléter son profil
        if (data.result) {
          navigation.navigate("Address");
        }
      });
  }

  return (
    <Layout
      title="Informations générales"
      description="Choisissez un profil et remplir les informations"
      footer
      arrowBack
      arrowSkip="Address"
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
            <DropdownMenu
              onChange={(value) => {
                console.log(value);
                setUserType(value);
              }}
              options={["Utilisateur", "Collecteur"]}
              placeholder="Sélectionnez un profil..."
            />
            <Input
              label="Prenom"
              keyboardType="none"
              onChangeText={(value) => setFirstname(value)}
              value={firstName}
            />
            <Input
              label="Nom"
              keyboardType="none"
              onChangeText={(value) => setLastname(value)}
              value={lastName}
            />
            <Input
              label="Mobile"
              keyboardType="tel"
              onChangeText={(value) => setPhone(value)}
              value={phone}
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

export default CoordinatesScreen;
