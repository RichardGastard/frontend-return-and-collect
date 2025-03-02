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

function UserChangeAdressScreen({ navigation }) {
  const [oldAdress, setOldAdress] = useState<string>("");
  const [newAdress, setNewAdress] = useState<string>("");
  const [copyNewAdress, setCopyNewAdress] = useState<string>("");

  const keyboardHeight = useKeyboardHeight();

  return (
    <Layout
      title="Changement d'adresse"
      description=""
      footer
      arrowBack
      arrowSkip=""
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
                label="Ancienne adresse"
                keyboardType="none"
                onChangeText={(value) => setOldAdress(value)}
                value={oldAdress}
              />
            </View>
            <View style={styles.newad}>
              <Input
                label="Nouvelle Adresse"
                keyboardType="none"
                onChangeText={(value) => setNewAdress(value)}
                value={newAdress}
              />
              <Input
                label="Copiez la Nouvelle Adresse"
                keyboardType="none"
                onChangeText={(value) => setCopyNewAdress(value)}
                value={copyNewAdress}
              />
            </View>
            <CustomButton
              onPressFunction={() => {
                navigation.navigate(
                  "UserAccountScreen",
                  console.log("Votre adresse à bien été changée")
                );
              }}
            >
              Validez
            </CustomButton>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffbf0",
  },
  oldad: {
    marginTop: 30,
    borderBottomWidth: 1,
    height: 90,
  },
  newad: {
    marginTop: 30,
  },
});

export default UserChangeAdressScreen;
