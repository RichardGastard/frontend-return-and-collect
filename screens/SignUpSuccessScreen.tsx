// COMPONENTS
import Layout from "@/components/Layout";
import Input from "@/components/Input";
import DropdownMenu from "@/components/DropdownMenu";
import CustomButton from "@/components/CustomButton";

import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";

import useKeyboardHeight from "react-native-use-keyboard-height";

// TODO: Adjust the keyboard avoiding view

function SignUpSuccessScreen({ navigation }) {
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
      title="Félicitations"
      description="Votre inscription est complète"
      footer
    >
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
          <View
            style={{
              alignSelf: "center",
              height: "80%",
              justifyContent: "center",
            }}
          >
            <Image
              source={require("../assets/Return-and-collect-loader.gif")}
              style={{
                width: 300,
                height: 300,
                alignSelf: "center",
                paddingBottom: 0,
              }}
            />

            <CustomButton
              onPressFunction={() => {
                navigation.navigate("Home");
              }}
            >
              Page de connexion
            </CustomButton>
          </View>
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

export default SignUpSuccessScreen;
