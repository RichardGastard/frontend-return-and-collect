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
} from "react-native";

import useKeyboardHeight from "react-native-use-keyboard-height";

import { SafeAreaView } from "react-native-safe-area-context";

function Account({ navigation }) {
  const [userIsSelected, setUserIsSelected] = useState<boolean>(false);
  const [pickerIsSelected, setPickerIsSelected] = useState<boolean>(false);
  const [isDisable, setIsDisable] = useState<boolean>(false); // pour avoir l'apparition du bouton suivant

  // permet de ne pas perdre le bouton en cas de changement de l'utilisateur
  useEffect(() => {
    if (pickerIsSelected && userIsSelected) {
      setPickerIsSelected(!pickerIsSelected);
    }
  }, [userIsSelected]);

  useEffect(() => {
    if (pickerIsSelected && userIsSelected) {
      setUserIsSelected(!userIsSelected);
    }
  }, [pickerIsSelected]);

  // La ScrollView est encore présente mais ne sert à rien
  return (
    <SafeAreaView style={styles.container}>
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
        <View style={styles.header}>
          <Text style={styles.title}>Compte</Text>
          <Text style={{ color: "#525252" }}>Je suis ...</Text>
        </View>
        <View style={styles.userChoice}>
          {/* Fonction qui permet de switcher l'aspect que l'utilisateur */}
          <TouchableOpacity
            onPress={() => {
              setUserIsSelected(!userIsSelected);
              if (pickerIsSelected) {
                setIsDisable(isDisable);
              } else {
                setIsDisable(!isDisable);
              }
            }}
            style={{
              backgroundColor: userIsSelected ? "#febbba" : "#525252",
              height: "30%",
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Text style={{ color: "#fffbf0" }}>Utilisateur</Text>
            <Text
              style={{ opacity: userIsSelected ? 0.7 : 0, color: "#525252" }}
            >
              Je vais envoyer des colis
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setPickerIsSelected(!pickerIsSelected);
              if (userIsSelected) {
                setIsDisable(isDisable);
              } else {
                setIsDisable(!isDisable);
              }
            }}
            style={{
              backgroundColor: pickerIsSelected ? "#febbba" : "#525252",
              height: "30%",
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Text style={{ color: "#fffbf0" }}>Collecteur</Text>
            <Text
              style={{
                opacity: pickerIsSelected ? 0.7 : 0,
                color: "#525252",
              }}
            >
              Je vais réceptionner des colis
            </Text>
          </TouchableOpacity>
        </View>
        {(isDisable && pickerIsSelected) || userIsSelected ? (
          <View style={styles.next}>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => {
                console.log("LA SUITE EST A FAIRE !!");
              }}
            >
              <Text style={{ color: "white" }}>Suivant</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.next}>
            <Text style={{ color: "white" }}>Suivant</Text>
          </View>
        )}
      </ScrollView>
      <View style={styles.footer}>
        <Text style={{ color: "#525252", opacity: 0.4 }}>Made in 🇫🇷</Text>
      </View>
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
  userChoice: {
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 45,
    height: "20%",
    width: "100%",
  },
  logo: {
    aspectRatio: 1,
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
  next: {
    width: "97%",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 60,
  },
  nextButton: {
    backgroundColor: "#febbba",
    height: 45,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    bottom: 0,
    marginInline: "auto",
  },
});

export default Account;
