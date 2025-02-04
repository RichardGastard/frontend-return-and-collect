import { useState, useRef } from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";

import InputText from "@/components/InputText";

import Checkbox from "expo-checkbox"; // because Checkbox has been removed from react-native
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

function SignUp({ navigation }) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const confirmPassword = useRef<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleSubmit = () => {
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
        <View style={styles.logoView}>
          <Image
            source={require("../assets/logo-without-bg.png")}
            style={styles.logo}
          />
        </View>
        <View>
          <View style={styles.header}>
            <Text style={styles.title}>Inscription</Text>
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
              <Text style={{ fontSize: 16, color: "#525252" }}>
                Mot de passe
              </Text>
              <TextInput
                onChangeText={(value) => setPassword(value)}
                value={password}
                placeholder="Mot de passe..."
                style={styles.input}
              />
            </View>
            <View>
              <Text style={{ fontSize: 16, color: "#525252" }}>
                Confirmation mot de passe
              </Text>
              <TextInput
                onChangeText={(value) => setPassword(value)}
                value={password}
                placeholder="Confirmation..."
                style={styles.input}
              />
            </View>
          </View>
          <View style={styles.connection}>
            <TouchableOpacity
              style={styles.connectionButton}
              onPress={() => {
                navigation.navigate("Account");
              }}
            >
              <Text style={{ color: "white" }}>Suivant</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footer}>
            <Text style={{ color: "#525252", opacity: 0.4 }}>Made in 🇫🇷</Text>
          </View>
        </View>
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
});

export default SignUp;
