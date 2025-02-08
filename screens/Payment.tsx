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
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Payment({ navigation }) {
  const [cardNumber, setcardNumber] = useState<number>();
  const [expirationDate, setExpirationDate] = useState<number>();
  const [securityNumber, setSecurityNumber] = useState<number>();

  const handleSubmit = () => {
    console.log();
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View style={styles.topButtons}>
            <ArrowBack></ArrowBack>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("");
              }}
            >
              <Text style={{ fontSize: 16, color: "#525252" }}>
                Passer cette étape
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.header}>
            <Text style={styles.title}>Informations de paiemment</Text>
            <TouchableOpacity style={styles.container}></TouchableOpacity>
          </View>
          <View style={styles.inputs}>
            <View>
              <Text style={{ fontSize: 16, color: "#525252" }}>
                Numéro de carte
              </Text>
              <TextInput
                keyboardType="numeric"
                onChangeText={(value) => setcardNumber(parseInt(value))}
                value={cardNumber}
                placeholder="XXXX XXXX XXXX XXXX"
                style={styles.input}
              />
            </View>
            <View style={styles.smallInputAlign}>
              <View>
                <Text style={{ fontSize: 16, color: "#525252" }}>
                  date d'expiration
                </Text>
                <TextInput
                  onChangeText={(value) => setExpirationDate(parseInt(value))}
                  value={expirationDate}
                  placeholder="XX/XX"
                  style={styles.smallInput}
                />
              </View>
              <View>
                <Text style={{ fontSize: 16, color: "#525252" }}>CVV</Text>
                <TextInput
                  onChangeText={(value) => setSecurityNumber(parseInt(value))}
                  value={securityNumber}
                  placeholder="XXX"
                  style={styles.smallInput}
                />
              </View>
            </View>
            <View style={styles.ValidateButton}>
              <CustomButton onPressFunction={() => handleSubmit()}>
                Valider les informations
              </CustomButton>
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
  header: {},

  topButtons: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  title: {
    paddingTop: 50,
    paddingBottom: 10,
    textAlign: "center",
    fontSize: 36,
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
    paddingBottom: 50,
  },
  input: {
    borderColor: "#525252",
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
    paddingHorizontal: 10,
  },
  smallInputAlign: {
    borderColor: "#525252",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  smallInput: {
    borderColor: "#525252",
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
    paddingHorizontal: 10,
    width: 150,
  },
  ValidateButton: {
    width: "97%",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 30,
    paddingTop: 50,
  },
});

export default Payment;
