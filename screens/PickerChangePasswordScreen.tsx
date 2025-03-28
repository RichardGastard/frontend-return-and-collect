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
import { useSwipe } from "hook/useSwipe";

function PickerChangePasswordScreen({ navigation }) {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [copyNewPassword, setCopyNewPassword] = useState<string>("");
  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 3);

  function onSwipeLeft() {}

  function onSwipeRight() {
    navigation.goBack();
  }

  const keyboardHeight = useKeyboardHeight();

  return (
    <Layout
      title="Changement de votre mot de passe"
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
          <View
            style={styles.container}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <View style={styles.oldAddress}>
              <Input
                label="Ancien mot de passe"
                keyboardType="none"
                onChangeText={(value) => setOldPassword(value)}
                value={oldPassword}
              />
            </View>
            <View style={styles.newAddress}>
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
            <CustomButton
              onPressFunction={() => {
                navigation.navigate("PickerTabNavigator");
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
  oldAddress: {
    marginTop: 30,
    borderBottomWidth: 0.3,
    borderBottomColor: "#52525250",
    height: 90,
  },
  newAddress: {
    marginTop: 30,
  },
});

export default PickerChangePasswordScreen;
