import Layout from "@/components/Layout";
import Input from "@/components/Input";
import CustomButton from "@/components/CustomButton";

import { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import useKeyboardHeight from "react-native-use-keyboard-height";

function UserChangePasswordScreen({ navigation }) {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [copyNewPassword, setCopyNewPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

const keyboardHeight = useKeyboardHeight();

// const verifyOldPassword = async () => {
//     try {
//       const response = await fetch(process.env.EXPO_PUBLIC_BACKEND_URL + "/users", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ oldPassword }),
//     });

//       const data = await response.json();

//       if (!response.ok || !data.success) {
//         setError("L'ancien mot de passe est incorrect.");
//         return false;
//       }

//       return true
//     } catch (error) {
//         console.error("Erreur lors de la vérification du mot de passe :", error);
//         setError("Une erreur est survenue. Veuillez réessayer.");
//         return false;
//       }
//     };
     
  return (
    <Layout
      title="Changement mot de passe"
      description="Remplissez les champs ci-dessous"
      footer
      arrowBack
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
        <View style={styles.container}>
            <View style={styles.oldad}>
                    <Input
                      label="Ancien mot de passe"
                      keyboardType="none"
                      onChangeText={(value) => setOldPassword(value)}
                      value={oldPassword}
                    />
                    </View>
                    <View style={styles.newad}>
                    <Input
                      label="Nouveau mot de passe"
                      keyboardType="none"
                      onChangeText={(value) => setNewPassword(value)}
                      value={newPassword}
                    />
                    <Input
                      label="Confirmation mot de passe"
                      keyboardType="none"
                      onChangeText={(value) => setCopyNewPassword(value)}
                      value={copyNewPassword}
                    />
                    </View>
                    <CustomButton onPressFunction={() => {
            navigation.navigate("UserAccountScreen", console.log("Votre Mot de passe à bien été changée"));
          }}>Validez</CustomButton>
                    </View>
                    </ScrollView>
            </KeyboardAvoidingView>
        </Layout>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffbf0",

  },
  oldad:{
    marginTop: 30,
    borderBottomWidth: 1,
    height: 90,
  },
  newad:{
    marginTop: 30,
  }
})




export default UserChangePasswordScreen