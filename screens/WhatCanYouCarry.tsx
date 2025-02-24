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

import { useDispatch } from "react-redux";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import DropdownMenu from "@/components/DropdownMenu";
import ArrowBack from "@/components/ArrowBack";
import Input from "@/components/Input";
import CustomButton from "@/components/CustomButton";
import Logo from "@/components/Logo";
import { pickerProfile } from "@/reducers/pickers";

function WhatCanYouCarry({ navigation }) {
  const [profileName, setProfileName] = useState("");
  const [selectedFromValue, setSelectedFromValue] = useState("");
  const [selectedToValue, setSelectedToValue] = useState("");

  const options = [
    "tout petit colis (jusqu'à 1 litre)",
    "Petit colis (de 1 à 4 litres)",
    "Moyen colis (de 5 à 10 litres)",
    "Grand colis (de 10 à 20 litres)",
    "très grand colis (plus de 20 litres)",
  ];

  const dispatch = useDispatch();

  const handleFromSubmit = (value) => {
    setSelectedFromValue(value);
  };

  const handleToSubmit = (value) => {
    setSelectedToValue(value);
  };

  const handleValidateSubmit = () => {
    dispatch(
      pickerProfile({
        pickerProfilName: profileName,
        pickerFromCapacity: selectedFromValue,
        pickerToCapacity: selectedToValue,
      })
    );
    navigation.navigate("PickerPayment");
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ArrowBack></ArrowBack>
          <Logo size="large" label="logo-full.png"></Logo>
          <Input
            label="Nom de profil"
            onChangeText={(e) => setProfileName(e)}
            value={profileName}
          />
          <View>
            <Text style={{ color: "#525252" }}>Vous pouvez transporter</Text>
          </View>
          <DropdownMenu
            options={options}
            placeholder="De"
            onChange={handleFromSubmit}
          />
          <DropdownMenu
            options={options}
            placeholder="à"
            onChange={handleToSubmit}
          />
          <View style={styles.connection}>
            <CustomButton
              children="Valider"
              onPressFunction={() => {
                handleValidateSubmit();
              }}
            />
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
  connection: {
    width: "100%",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 70,
  },
});

export default WhatCanYouCarry;
