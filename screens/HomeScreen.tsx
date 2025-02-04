import { useState } from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  Image,
  ScrollView,
} from "react-native";
import _FontAwesome from "react-native-vector-icons/FontAwesome";
const FontAwesome = _FontAwesome as unknown as React.ElementType;

import InputText from "@/components/InputText";

import Checkbox from "expo-checkbox"; // because Checkbox has been removed from react-native
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

function HomeScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [pwdVisible, setPwdVisible] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleSubmit = () => {
    console.log(email);
  };

  // KEYBOARD AVOIDING VIEW
  // HIDE THE PASSWORD WITH DOT => CHECK

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
       <SafeAreaView style= {styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{flex:1}}
        >
          <ScrollView
          style={{overflow: "visible"}}
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
                <Text style={{ fontSize: 16, color: "#525252" }}>
                  Mot de passe
                </Text>
                <View style={styles.passwordInput}>
                <TextInput
                  onChangeText={(value) => setPassword(value)}
                  secureTextEntry={!pwdVisible}
                  value={password}
                  placeholder="Mot de passe..."
                  style={{
                    flex: 1,
                    borderColor: "#525252",
                    borderWidth: 1,
                    borderRadius: 5,
                    height: 35,
                    paddingHorizontal: 10,
                  }}
                />
                <View style={{position: "absolute",right: 10,}}>
                  {pwdVisible ? (
                    <FontAwesome size={22} name="eye" onPress={()=>{setPwdVisible(!pwdVisible)}}></FontAwesome >
                  ) : (
                    <FontAwesome size={22} name="eye-slash" onPress={()=>{setPwdVisible(!pwdVisible)}}></FontAwesome>
                  )}
                  </View>
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
              <TouchableOpacity
                style={styles.connectionButton}
                onPress={() => handleSubmit()}
              >
                <Text style={{ color: "white" }}>Se connecter</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.register}>
              <Text style={{ color: "#525252" }}>Pas de compte?</Text>
              <TouchableOpacity>
                <Text style={{ color: "#febbba", fontWeight: 500 }}>
                  Créez-en un
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.footer}>
              <Text style={{ color: "#525252", opacity: 0.4 }}>Made in 🇫🇷</Text>
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
    flexDirection: "row",
    alignItems: "center"
  },
});

export default HomeScreen;
