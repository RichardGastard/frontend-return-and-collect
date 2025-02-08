import { useState } from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { useTogglePasswordVisibility } from "hook/useTogglePasswordVisibility";
import CustomButton from "@/components/CustomButton";

import Checkbox from "expo-checkbox"; // because Checkbox has been removed from react-native
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

function HomeScreen({ navigation }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  const handleLoginSubmit = () => {
    fetch("http://192.168.1.170:3000/users/signin", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.result);
      });
    console.log(email);
  };

  // KEYBOARD AVOIDING VIEW
  // HIDE THE PASSWORD WITH DOT

  // CREATE FUNCTION TO CONNECT USER
  // CREATE FUNCTION TO CREATE USER

  // IMPORT FONTS (PUBLIC SANS BOLD & POPPINS)``
  // IMPORT CONNECTION WITH GOOGLE

  const handleRememberMe = () => {
    if (!isChecked) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView
            style={{ overflow: "visible" }}
            keyboardDismissMode="interactive"
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.logoView}>
              <Image
                source={require("../assets/logo-without-bg.png")}
                style={styles.logo}
              />
            </View>
            <View>
              <View style={styles.header}>
                <Text style={styles.title}>Connexion</Text>
                <Text style={styles.description}>
                  Bienvenue, entrez vos informations
                </Text>
              </View>
              <View style={styles.inputs}>
                <View>
                  <Text style={{ fontSize: 16, color: "#525252" }}>Email</Text>
                  <TextInput
                    onChangeText={(value) => setEmail(value)}
                    value={email}
                    placeholder="Email..."
                    style={styles.input}
                    keyboardType="email-address"
                  />
                </View>
                <View>
                  <View>
                    <Text style={{ fontSize: 16, color: "#525252" }}>
                      Mot de passe
                    </Text>
                    <TextInput
                      onChangeText={(value) => setPassword(value)}
                      value={password}
                      placeholder="Mot de passe..."
                      style={styles.input}
                      secureTextEntry={passwordVisibility}
                    />
                    <Pressable
                      onPress={handlePasswordVisibility}
                      style={styles.icon}
                    >
                      <MaterialCommunityIcons
                        name={rightIcon}
                        size={22}
                        color="#aaa"
                      />
                    </Pressable>
                  </View>
                </View>
              </View>
              <View style={styles.tips}>
                <View style={styles.checkbox}>
                  <Checkbox
                    value={isChecked}
                    onValueChange={() => handleRememberMe()}
                  />
                  <Text
                    style={{ opacity: isChecked ? 1 : 0.2, color: "#525252" }}
                  >
                    Se souvenir de moi
                  </Text>
                </View>
                <TouchableOpacity>
                  <Text style={{ color: "#ff5252", opacity: 0.8 }}>
                    Mot de passe oublié ?
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.connection}>
                <CustomButton onPressFunction={() => handleLoginSubmit()}>
                  Se connecter
                </CustomButton>
              </View>

              <View style={styles.register}>
                <Text style={{ color: "#525252" }}>Pas de compte?</Text>
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
              <View style={styles.footer}>
                <Text style={{ color: "#525252", opacity: 0.4 }}>
                  Made in 🇫🇷
                </Text>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffbf0",
    padding: 20,
  },
  image: {
    flex: 1,
    backgroundColor: "#fffbf0",
    opacity: 30,
  },
  logo: {
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
    marginLeft: 10,
  },
  title: {
    fontSize: 36,
    color: "#525252",
  },
  description: {
    color: "#525252",
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
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  input: {
    borderColor: "#525252",
    borderWidth: 1,
    borderRadius: 5,
    height: 35,
    paddingHorizontal: 10,
  },
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
  connection: {
    width: "97%",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 30,
  },
  connectionButton: {
    backgroundColor: "#febbba",
    height: 45,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  register: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  footer: {
    alignItems: "center",
    marginTop: 70,
  },
  passwordInput: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    right: 10,
    top: 25,
  },
});

export default HomeScreen;
