import Layout from "@/components/Layout";
import Input from "@/components/Input";
import CustomButton from "@/components/CustomButton";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import useKeyboardHeight from "react-native-use-keyboard-height";

const GOOGLE_MAPS_APIKEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_APIKEY;

function PickerChangeAddressScreen({ navigation }) {
  const [newAdress, setNewAdress] = useState<string>("");
  const [copyNewAdress, setCopyNewAdress] = useState<string>("");

const keyboardHeight = useKeyboardHeight();

  return (
    <Layout
      title="Changement d'Adresse"
      description="Remplissez les champs ci-dessous"
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
                    <CustomButton onPressFunction={() => {
            navigation.navigate("UserAccountScreen", console.log("Votre adresse à bien été changée"));
          }}>Validez</CustomButton>
                    </View>
                    </ScrollView>
    </KeyboardAvoidingView>
    </Layout>
    )
}

{/* <GooglePlacesAutocomplete
        placeholder="Votre adresse ..."
        fetchDetails={true}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: "fr",
        }}
        debounce={500}
        styles={{
          listView: {
            zIndex: 1000,
            height: 400,
          },
          textInput: {
            height: 50,
            color: "#525252",
            fontSize: 16,
            borderWidth: 1,
            borderColor: "#52525250",
            backgroundColor: "#fffbf0",
          },
        }}
      ></GooglePlacesAutocomplete>  */}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffbf0",

  },
  newad:{
    marginTop: 30,
  }
})




export default PickerChangeAddressScreen