// COMPONENTS
import Layout from "@/components/Layout";
import Input from "@/components/Input";
import CustomButton from "@/components/CustomButton";

import { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  Text,
} from "react-native";

function SignUp({ navigation }) {
  // Email statess
  const [email, setEmail] = useState<string>("");
  const [isEmailAlreadyUsed, setIsEmailAlreadyUsed] = useState<boolean>(false);

  // Password states
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(true);
  const [isPasswordCompliant, setIsPasswordCompliant] = useState<boolean>(true);

  // Keyboard state
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);

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

  function handleSubmit() {
    // TODO : Put real version when not in dev
    // Minimum 8 chars, minimum 1 special char, minimum 1 digit, minimum 1 uppercase
    // const strongPasswordRegex =
      // /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    // Minimum 8 chars
    // const strongPasswordRegex = /.{8,}$/;
    // Accept all
    const strongPasswordRegex = /[\s\S]+/;
    if (!password.match(strongPasswordRegex)) {
      setIsPasswordCompliant(false);
    } else {
      setIsPasswordCompliant(true);
    }

    if (confirmPassword !== password) {
      setIsPasswordMatch(false);
      return;
    } else {
      setIsPasswordCompliant(true);
    }
    handleRegisterUser();
  }

  // Fonction pour enregistrer le nouvel utilisateur
  function handleRegisterUser() {
    fetch(process.env.EXPO_PUBLIC_BACKEND_URL + "/users/signup", {
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
          navigation.navigate("Coordinates");
        } else {
          setIsEmailAlreadyUsed(true);
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
          keyboardShouldPersistTaps="handled"
        >
          {/* {!keyboardVisible && (
            <Image
              source={require("../assets/Return-and-collect-loader.gif")}
              style={{
                width: 200,
                height: 200,
                alignSelf: "center",
                paddingBottom: 0,
              }}
            />
<<<<<<< HEAD:screens/SignUp.tsx
          )} */}
          <View
            style={{
              alignSelf: "center",
              height: "80%",
              justifyContent: "center",
            }}
          >
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
          </View>
=======
          )}

          {/* Email input */}
          <Input
            label="Email"
            onChangeText={(value) => setEmail(value)}
            value={email}
          />
          {isEmailAlreadyUsed && (
            <Text style={{ fontFamily: "Poppins-Regular", color: "red" }}>
              L'email est déjà utilisé
            </Text>
          )}

          {/* Password input */}
          <Input
            label="Mot de passe"
            onChangeText={(value) => setPassword(value)}
            value={password}
          />
          {!isPasswordCompliant && (
            <Text style={{ fontFamily: "Poppins-Regular", color: "red" }}>
              Le mot de passe doit faire au moins 8 caractères
            </Text>
          )}

          {/* Confirm password input */}
          <Input
            label="Confirmation de mot de passe"
            onChangeText={(value) => setConfirmPassword(value)}
            value={confirmPassword}
          />
          {!isPasswordMatch && (
            <Text style={{ fontFamily: "Poppins-Regular", color: "red" }}>
              Les mots de passe ne correspondent pas
            </Text>
          )}

          <CustomButton onPressFunction={handleSubmit}>
            S'enregistrer
          </CustomButton>
>>>>>>> main:screens/SignUpScreen.tsx
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
  );
}

const styles = StyleSheet.create({});

export default SignUp;
