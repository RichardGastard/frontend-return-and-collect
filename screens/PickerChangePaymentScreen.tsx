import Layout from "@/components/Layout";
import CustomButton from "@/components/CustomButton";
import CreditCard from "@/components/CreditCard";

import { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import useKeyboardHeight from "react-native-use-keyboard-height";
import BankAccount from "@/components/BankAccount";

function PickerChangePaymentScreen({ navigation }) {

  const keyboardHeight = useKeyboardHeight();

  return (
    <Layout
      title="Changement moyen de payement"
      description="Rajoutez un moyen de payement"
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
            <View style={{flex: 1}}>
            <BankAccount
            bankName={"NOM DE LA BANQUE"}
            name={"HOURSELLE Marc"}
            iban={"FRXX XXXX XXXX XXXX XXXX XXXX XXXX XXX"}
            bic={"SogeXXX"}
            status={true}>
            </BankAccount>
               <View style={styles.addbtn}>
            <CustomButton
              onPressFunction={() => {
                navigation.navigate(
                  "PickerNewPayment",
                );
              }}
            >
              Ajoutez un nouveau compte bancaire
            </CustomButton>
            </View>
              <View style={styles.submitbtn}>
            <CustomButton
              onPressFunction={() => {
                navigation.navigate(
                  "UserAccountScreen",
                  console.log("Votre compte a bien été changé")
                );
              }}
            >
              Validez
            </CustomButton>
            </View>
              </View>
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
 submitbtn: {
    marginTop: 10,
 },
addbtn: {

},

});

export default PickerChangePaymentScreen;
