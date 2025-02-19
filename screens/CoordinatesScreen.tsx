// COMPONENTS
import Layout from "@/components/Layout";
import Input from "@/components/Input";
import DropdownMenu from "@/components/DropdownMenu";

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
  KeyboardEvent,
} from "react-native";

import useKeyboardHeight from "react-native-use-keyboard-height";

import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "@/components/CustomButton";

function CoordinatesScreen({ navigation }) {
  const [firstname, setFirstname] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [zipcode, setZipcode] = useState<string>("");
  const [numberstreet, setNumberstreet] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [userType, setUserType] = useState<string>("");

  const keyboardHeight = useKeyboardHeight();

  return (
    <Layout
      title="Coordonnées"
      description="Choisissez un profil et remplir les informations"
      arrowBack
      arrowSkip="Payment"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        // keyboardVerticalOffset={keyboardHeight}
      >
        <ScrollView
          style={{ overflow: "visible" }}
          // keyboardDismissMode="interactive"
          // keyboardShouldPersistTaps="handled"
        >
          <DropdownMenu
            onChange={(value) => setUserType(value)}
            options={["Utilisateur", "Collecteur"]}
            placeholder="Sélectionnez un profil..."
          />
          <Input
            label="Prenom"
            keyboardType="none"
            onChangeText={(value) => setFirstname(value)}
            value={firstname}
          />
          <Input
            label="Nom"
            keyboardType="none"
            onChangeText={(value) => setName(value)}
            value={name}
          />
          <Input
            label="Mobile"
            keyboardType="numeric"
            onChangeText={(value) => setPhone(value)}
            value={phone}
          />
          <View style={styles.title}>
            <Text
              style={{
                fontSize: 36,
                color: "#525252",
                fontFamily: "Public-Sans-Bold",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 12,
                },
                shadowOpacity: 0.3,
                shadowRadius: 16.0,

                elevation: 24,
              }}
            >
              Adresse
            </Text>
            <Text
              style={{
                color: "#525252",
                fontSize: 15,
                opacity: 0.7,
                fontFamily: "Poppins-Regular",
              }}
            >
              Ajoutez votre adresse de résidence 🏠
            </Text>
          </View>
          <Input label="Adresse complète" />
          <Input label="Code postal" />
          <Input label="Ville" />

          <CustomButton
            onPressFunction={() => {
              navigation.navigate("");
            }}
          >
            Suivant
          </CustomButton>
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>

    // <SafeAreaView style={styles.container}>
    //   <KeyboardAvoidingView
    //     behavior={Platform.OS === "ios" ? "padding" : "height"}
    //     style={{ flex: 1 }}
    //     // keyboardVerticalOffset={keyboardHeight}
    //   >
    //     <ScrollView
    //       style={{ overflow: "visible" }}
    //       keyboardDismissMode="interactive"
    //       keyboardShouldPersistTaps="handled"
    //     >
    //       <View>
    //         <View style={styles.header}>
    //           <ArrowBack></ArrowBack>
    //           <Text style={styles.title}>Coordonnées</Text>
    //         </View>
    //         <View style={styles.dropDown}>
    //           <DropdownMenu
    //             onChange={(value) => setUserType(value)}
    //             options={["Utilisateur", "Collecteur"]}
    //             placeholder="Sélectionnez un profil..."
    //           />
    //         </View>
    //         <View style={styles.inputContainer}>
    //           <Input
    //             label="Prenom"
    //             keyboardType="none"
    //             onChangeText={(value) => setFirstname(value)}
    //             value={firstname}
    //           />
    //           <Input
    //             label="Nom"
    //             keyboardType="none"
    //             onChangeText={(value) => setName(value)}
    //             value={name}
    //           />
    //           <Input
    //             label="Mobile"
    //             keyboardType="none"
    //             onChangeText={(value) => setPhone(value)}
    //             value={phone}
    //           />
    //         </View>

    //         <View style={styles.adress}>
    //           <Text style={styles.adtext}>Adresse</Text>
    //         </View>

    //         <View style={styles.adInput}>
    //           <Input
    //             label="Numero, Rue"
    //             keyboardType="none"
    //             onChangeText={(value) => setNumberstreet(value)}
    //             value={numberstreet}
    //           />
    //           <Input
    //             label="Code Postale"
    //             keyboardType="none"
    //             onChangeText={(value) => setZipcode(value)}
    //             value={zipcode}
    //           />
    //           <Input
    //             label="Ville"
    //             keyboardType="none"
    //             onChangeText={(value) => setCity(value)}
    //             value={city}
    //           />
    //         </View>
    //       </View>

    //       <View style={styles.submitbtn}>
    //         <TouchableOpacity
    //           style={styles.submitButton}
    //           onPress={() => navigation.navigate("Account")}
    //         >
    //           <Text style={{ color: "white" }}>S'enregistrer</Text>
    //         </TouchableOpacity>
    //       </View>
    //     </ScrollView>
    //   </KeyboardAvoidingView>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffbf0",
    padding: 20,
  },
  Input: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    right: 10,
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
    alignItems: "center",
    flexDirection: "row",
  },
  // title: {
  //   fontSize: 36,
  //   color: "#525252",
  //   marginLeft: 50,
  // },
  description: {
    color: "#525252",
  },
  inputContainer: {
    marginTop: 20,
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

    elevation: 24,
  },
  adress: {
    alignItems: "center",
  },
  adtext: {
    paddingTop: 30,
    fontSize: 24,
    color: "#525252",
  },
  input: {
    borderColor: "#525252",
    borderWidth: 1,
    borderRadius: 5,
    height: 35,
    paddingHorizontal: 10,
  },
  submitbtn: {
    width: "97%",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 30,
  },
  submitButton: {
    backgroundColor: "#febbba",
    height: 45,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 55,
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "30%",
  },
  adInput: {
    marginTop: 10,
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

    elevation: 24,
  },
  dropDown: {
    marginTop: 15,
  },
  title: {
    marginTop: 10,
    alignItems: "center",
  },
  skip: {
    borderWidth: 1,
    alignItems: "flex-end",
    position: "absolute",
  },
});

export default CoordinatesScreen;
