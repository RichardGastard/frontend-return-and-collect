// COMPONENTS
import Layout from "@/components/Layout";
import CustomButton from "@/components/CustomButton";

import { useState } from "react";
import {
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
          <View style={styles.container}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    height: "80%",
    justifyContent: "center",
  },
});

export default SignUpSuccessScreen;
