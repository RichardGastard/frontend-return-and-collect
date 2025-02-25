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

  const keyboardHeight = useKeyboardHeight();

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
          <View
            style={{
              alignSelf: "center",
              height: "80%",
              justifyContent: "center",
            }}
          >
            <DropdownMenu
              onChange={(value) => setUserType(value)}
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
    flex: 1,
    backgroundColor: "#fffbf0",
    padding: 20,
  },
  Input: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    right: 10,
  },
  logo: {
    aspectRatio: 1,
    width: 300,
    height: 300,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16.0,

    elevation: 24,
  },
  logoView: {
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
  },
  description: {
    color: "#525252",
  },
  inputContainer: {
    marginTop: 20,
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
  },
  adress: {
    alignItems: "center",
  },
  adtext: {
    paddingTop: 30,
    fontSize: 24,
    color: "#525252",
  },
  input: {
    borderColor: "#525252",
    borderWidth: 1,
    borderRadius: 5,
    height: 35,
    paddingHorizontal: 10,
  },
  submitbtn: {
    width: "97%",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 30,
  },
  submitButton: {
    backgroundColor: "#febbba",
    height: 45,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 55,
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "30%",
  },
  adInput: {
    marginTop: 10,
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
  },
  dropDown: {
    marginTop: 15,
  },
  title: {
    marginTop: 10,
    alignItems: "center",
  },
  skip: {
    borderWidth: 1,
    alignItems: "flex-end",
    position: "absolute",
  },
});

export default CoordinatesScreen;
