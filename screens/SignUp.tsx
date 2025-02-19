// COMPONENTS
import Layout from "@/components/Layout";
import Input from "@/components/Input";
import CustomButton from "@/components/CustomButton";

import { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from "react-native";
import ArrowBack from "@/components/ArrowBack";

function SignUp({ navigation }) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);

  const handleSubmit = () => {
    console.log(email);
  };

  useEffect(() => {
    // Listener pour savoir si le clavier est visible
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Fonction pour enregistrer le nouvel utilisateur
  function handleRegisterUser() {
    fetch("http://192.168.1.189:3000/users/signup", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((data) => {
        // Envoie vers la page Account pour l'utilisateur puisse commpléter son profil
        if (data.result) {
          navigation.navigate("Account");
        }
      });
  }

  return (
    <Layout
      title="Inscription"
      description="Renseignez les informations de connexion"
      footer
      arrowBack
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 150 : 80}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          style={{ overflow: "visible" }}
          keyboardShouldPersistTaps="handled"
        >
          {!keyboardVisible && (
            <Image
              source={require("../assets/Return-and-collect-loader.gif")}
              style={{
                width: 200,
                height: 200,
                alignSelf: "center",
                paddingBottom: 0,
              }}
            />
          )}
          <Input label="Email"></Input>
          <Input label="Mot de passe"></Input>
          <Input label="Confirmation de mot de passe"></Input>
          <CustomButton
            onPressFunction={() => {
              navigation.navigate("Coordinates");
            }}
          >
            S'enregistrer
          </CustomButton>
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
  );
}

const styles = StyleSheet.create({});

export default SignUp;
