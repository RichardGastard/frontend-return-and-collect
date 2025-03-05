import Layout from "@/components/Layout";
import CustomButton from "@/components/CustomButton";
import CreditCard from "@/components/CreditCard";

import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import useKeyboardHeight from "react-native-use-keyboard-height";
import BankAccount from "@/components/BankAccount";
import { useSwipe } from "hook/useSwipe";

function PickerChangePaymentScreen({ navigation }) {
  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 3);

  function onSwipeLeft() {}

  function onSwipeRight() {
    navigation.goBack();
  }

  const keyboardHeight = useKeyboardHeight();

  const [bankName, setbankName] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [iban, setIban] = useState<string>("");
  const [bic, setBic] = useState<string>("");




  useEffect(() => {
      fetch(process.env.EXPO_PUBLIC_BACKEND_URL +"/payments/accountInfos/")
        .then((response) => response.json())
        .then((data) => {
          setbankName(data.creditMethod.bankName);
          setName(data.creditMethod.name);
          setIban(data.creditMethod.iban);
          setBic(data.creditMethod.bic);
        });
    }, []);

  return (
    <Layout
      title="Moyen de paiement"
      description="Ajoutez, modifiez un moyen de paiement"
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
            <View style={{ flex: 1 }}>
              <BankAccount
                bankName={bankName}
                name={name}
                iban={iban}
                bic={bic}
                status={true}
              ></BankAccount>

              <CustomButton
                onPressFunction={() => {
                  navigation.navigate("PickerNewPayment");
                }}
              >
                Ajoutez un nouveau compte bancaire
              </CustomButton>

              <CustomButton
                onPressFunction={() => {
                  navigation.navigate(
                    "PickerAccountScreen",
                    console.log("Votre compte bancaire a bien été changé")
                  );
                }}
              >
                Validez
              </CustomButton>
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
  addbtn: {},
});

export default PickerChangePaymentScreen;
