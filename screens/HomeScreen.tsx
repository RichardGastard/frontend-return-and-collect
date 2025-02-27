// COMPONENTS
import Input from "@/components/Input";
import CustomButton from "@/components/CustomButton";
import Checkbox from "expo-checkbox"; // because Checkbox has been removed from react-native
import Layout from "@/components/Layout";

import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useDispatch } from "react-redux";

import BankAccount from "@/components/BankAccount";

import { logIn } from "@/reducers/users";

function HomeScreen({ navigation }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);

  const [isLoginSuccessful, setIsLoginSuccessful] = useState<boolean>(true);

  const handleLoginSubmit = () => {
    fetch(process.env.EXPO_PUBLIC_BACKEND_URL + "/users/signin", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(logIn({ email, token: data.token }));
          navigation.navigate("TabNavigator");
        } else {
          setIsLoginSuccessful(false);
        }
      });
  };

  const handleRememberMe = () => {
    if (!isChecked) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
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

  return (
    <Layout
      footer
      title="Bienvenue"
      description="Connectez-vous ou créez un compte"
      logo={keyboardVisible}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 150 : 80}
        style={{ flex: 1 }}
      >
        {/* fermer le clavier quand clique en dehors */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
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
            <Input
              label="Email"
              keyboardType="email"
              onChangeText={(value) => setEmail(value)}
              value={email}
            />
            <Input
              label="Mot de passe"
              onChangeText={(value) => setPassword(value)}
              value={password}
            />
            {!isLoginSuccessful && (
              <Text style={{ fontFamily: "Poppins-Regular", color: "red" }}>
                Le mot de passe ou l'email est incorrect
              </Text>
            )}
            <View style={styles.tips}>
              <View style={styles.checkbox}>
                <Checkbox
                  value={isChecked}
                  onValueChange={() => handleRememberMe()}
                  color="#ff5252"
                />
                <Text
                  style={{
                    opacity: isChecked ? 1 : 0.2,
                    color: "#525252",
                    fontFamily: "Poppins-Regular",
                  }}
                >
                  Se souvenir de moi
                </Text>
              </View>
              <TouchableOpacity>
                <Text
                  style={{
                    color: "#ff5252",
                    opacity: 0.8,
                    fontFamily: "Poppins-Regular",
                  }}
                >
                  Mot de passe oublié ?
                </Text>
              </TouchableOpacity>
            </View>

            <CustomButton
              onPressFunction={() => {
                handleLoginSubmit();
              }}
            >
              Se connecter
            </CustomButton>

            <View style={styles.register}>
              <Text style={{ color: "#525252", fontFamily: "Poppins-Regular" }}>
                Pas de compte?
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SignUp");
                }}
              >
                <Text style={{ color: "#febbba", fontWeight: 500 }}>
                  Créez-en un
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  tips: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    marginTop: 25,
  },
  checkbox: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },

  register: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
});

export default HomeScreen;
