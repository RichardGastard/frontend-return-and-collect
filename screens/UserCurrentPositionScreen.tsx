import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
} from "react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Input from "@/components/Input";
import CustomButton from "@/components/CustomButton";
import Map from "@/components/Map";
import DropdownMenu from "@/components/DropdownMenu";

export default function UserCurrentPositionScreen({ navigation }) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <Text style={styles.title}>Planifier votre délivraison</Text>
          <View style={styles.container}>
            <Map
              pickerPosition={{ latitude: 48.867, longitude: 2.313333 }}
            ></Map>

            <Input label="Numéro, rue" />
            <Input label="Ville" />
            <Input label="Code postal" />
            <Input label="Etage" />

            <View style={styles.form}>
              <CustomButton
                onPressFunction={() => {
                  navigation.navigate("TabNavigator");
                }}
              >
                Venez chercher mon colis
              </CustomButton>
            </View>

            <View style={styles.footer}>
              <Text style={{ color: "#525252", opacity: 0.4 }}>Made in 🇫🇷</Text>
            </View>
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: "#525252",
    alignSelf: "center",
    fontWeight: 600,
    fontFamily: "",
  },
  input: {
    borderColor: "#525252",
    borderWidth: 1,
    borderRadius: 5,
    height: 35,
    paddingHorizontal: 10,
  },
  form: {
    width: "100%",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 30,
  },
  footer: {
    alignItems: "center",
    marginTop: 20,
  },
});
