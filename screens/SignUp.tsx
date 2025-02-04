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
  Keyboard,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTogglePasswordVisibility } from "hook/useTogglePasswordVisibility";
import { useToggleConfirmPasswordVisibility } from "hook/useToggleConfirmPasswordVisibility";

function SignUp({ navigation }) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  const { confirmPasswordVisibility, icon, handleConfirmPasswordVisibility } =
    useToggleConfirmPasswordVisibility();

  const handleSubmit = () => {
    console.log(email);
  };

  return (
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
              <Text style={styles.title}>Inscription</Text>
            </View>
            <View style={styles.inputContainer}>
              <View>
                <Text style={{ fontSize: 16, color: "#525252" }}>Email</Text>
                <TextInput
                  onChangeText={(value) => setEmail(value)}
                  value={email}
                  placeholder="Email..."
                  style={styles.input}
                  keyboardType="email-address"
                  autoComplete="email"
                />
              </View>

              <View>
                <Text style={{ fontSize: 16, color: "#525252" }}>
                  Mot de passe
                </Text>
                <View style={styles.passwordInput}>
                  <TextInput
                    onChangeText={(value) => setPassword(value)}
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
              <View>
                <Text style={{ fontSize: 16, color: "#525252" }}>
                  Confirmation mot de passe
                </Text>
                <View style={styles.passwordInput}>
                  <TextInput
                    onChangeText={(value) => setConfirmPassword(value)}
                    value={confirmPassword}
                    placeholder="Confirmation..."
                    style={{
                      flex: 1,
                      borderColor: "#525252",
                      borderWidth: 1,
                      borderRadius: 5,
                      height: 35,
                      paddingHorizontal: 10,
                    }}
                    secureTextEntry={confirmPasswordVisibility}
                  />
                  <Pressable
                    onPress={handleConfirmPasswordVisibility}
                    style={styles.icon}
                  >
                    <MaterialCommunityIcons
                      name={icon}
                      size={22}
                      color="#aaa"
                    />
                  </Pressable>
                </View>
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
  passwordInput: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    right: 10,
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
  inputContainer: {
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
  footer: {
    alignItems: "center",
    marginTop: 70,
  },
});

export default SignUp;
