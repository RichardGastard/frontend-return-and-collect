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
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import ArrowBack from "@/components/ArrowBack";

import Input from "@/components/Input";
import HomeScreen from "./HomeScreen";
import Loader from "@/components/Loader";

function PickerLoader({ navigation }) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Recherche de votre collecteur</Text>
            <Loader />
          </View>
          <View style={styles.cancelButton}>
            <CustomButton
              children="Annuler"
              onPressFunction={() => navigation.goBack()}
              backgroundColor="#ff5252"
              width={200}
            />
          </View>
          <View style={styles.footer}>
            <Text style={{ color: "#525252", opacity: 0.4 }}>Made in 🇫🇷</Text>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffbf0",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: "15%",
    gap: 100,
  },
  title: {
    fontSize: 36,
    color: "#525252",
    fontWeight: "bold",
    textAlign: "center",
  },
  cancelButton: {
    alignSelf: "center",
    marginTop: "30%",
    shadowColor: "#000",
    opacity: 0.8,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  footer: {
    alignSelf: "center",
    position: "absolute",
    bottom: 10,
  },
});

export default PickerLoader;
