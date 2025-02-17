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
import ArrowBack from "@/components/ArrowBack";
import "react-native-get-random-values";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const GOOGLE_MAPS_APIKEY = "AIzaSyBAOlvP2wDhH_L_nljgCslBYcFptmRTtfM";

export default function UserCurrentPositionScreen({ navigation }) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View style={styles.back}>
            <ArrowBack></ArrowBack>
          </View>
          <Text style={styles.title}>Planifier votre délivraison</Text>
          <View style={styles.container}>
            <Map></Map>

            <View style={styles.form}>
              <GooglePlacesAutocomplete
                placeholder="Addresse de délivraison"
                onPress={(data, details = null) => {
                  console.log(data, details);
                }}
                query={{
                  key: GOOGLE_MAPS_APIKEY,
                  language: "en",
                }}
                debounce={500}
                styles={{
                  textInputContainer: {
                    backgroundColor: "#fffbf0",
                    borderWidth: 1,
                    borderRadius: 3,
                    borderColor: "#525252",
                  },
                  textInput: {
                    backgroundColor: "#fffbf0",
                    borderRadius: 3,
                  },
                }}
              />
              <Input label="Etage" />

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
    paddingBlock: 20,
    width: "100%",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 30,
    height: "40%",
  },
  footer: {
    alignItems: "center",
    marginTop: 20,
  },
  back: {
    position: "absolute",
    top: -5,
    left: 15,
    zIndex: 1000,
  },
});
