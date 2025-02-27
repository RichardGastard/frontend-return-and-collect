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

function PickerChangePasswordScreen({ navigation }) {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [copyNewPassword, setCopyNewPassword] = useState<string>("");

const keyboardHeight = useKeyboardHeight();

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




export default PickerChangePasswordScreen