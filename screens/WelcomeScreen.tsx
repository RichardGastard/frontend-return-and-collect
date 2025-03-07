import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { KeyboardAvoidingView } from "react-native";
import Loader from "@/components/Loader";
import { useAppSelector } from "@/store/hooks";

function WelcomeScreen({ navigation }) {
  const [name, setName] = useState<String>("");
  const [catchySentence, setCatchySentence] = useState<String>("");
  

const userData = useAppSelector((state) => state.users.value)

// Ecran temporaire redirige en fonction de qui se connecte : l'utilisateur ou livreur.

useEffect(() => {
  // Mettre à jour les états immédiatement
  if (userData.userType === "PICKER") {
    setName(userData.firstName);
    setCatchySentence("Prêt pour effectuer une livraison ?");
  } else {
    setName(userData.firstName);
    setCatchySentence("Vous avez un colis à retourner ?");
  }

  // Définir un délai pour la navigation
  const timer = setTimeout(() => {
    if (userData.userType === "PICKER") {
      navigation.navigate("PickerTabNavigator");
    } else {
      navigation.navigate("UserTabNavigator");
    }
  }, 5000);

  return () => clearTimeout(timer);
}, [userData, navigation]);

  return (
    <Layout title="Bienvenue" footer>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 200 : 0}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Text
              style={{
                
                fontSize: 20,
                color: "#525252",
                opacity: 0.8,
                fontFamily: "Poppins-Regular",
                borderBottomWidth: 0.3
              }}
            >
              {name}
            </Text>
            <Loader></Loader>
            <Text
              style={{
                fontSize: 16,
                color: "#525252",
                opacity: 0.8,
                fontFamily: "Poppins-Regular",
              }}
            >
              {catchySentence}
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    
    alignItems:"center",
    flex: 1,
    backgroundColor: "#fffbf0",
    padding: 0
  },
  logoView: {
    alignItems: "center",
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

  redirectionText: {
    flexDirection: "column",
    justifyContent: "space-around",
    height: 120,
    alignItems: "center",
  },
  footer: {
    alignContent: "flex-end",
    alignItems: "center",
    marginTop: 150,
  },
});

export default WelcomeScreen;
