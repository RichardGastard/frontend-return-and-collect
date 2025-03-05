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

function UserChangePaiementScreen({ navigation }) {

  const keyboardHeight = useKeyboardHeight();

  const [bankName, setbankName] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [creditCardNumber, setCreditCardNumber] = useState<string>("");
  const [expirationDate, setExpirationDate] = useState<string>("");

  useEffect(() => {
        fetch(process.env.EXPO_PUBLIC_BACKEND_URL +"/payments/cardInfos/")
          .then((response) => response.json())
          .then((data) => {
            setbankName(data.paymentMethod.bankName);
            setName(data.paymentMethod.name);
            setCreditCardNumber(data.paymentMethod.creditCardNumber);
            setExpirationDate(data.paymentMethod.expirationDate);
          });
      }, []);

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
            <View style={{flex: 1, gap: 15,}}>
              <CreditCard
              name={name}
                bankName={bankName}
                cardNumber={creditCardNumber}
                expirationdate={expirationDate}
                status = {true}
              ></CreditCard>
               <View style={styles.addbtn}>
            <CustomButton
              onPressFunction={() => {
                navigation.navigate(
                  "Payment",
                );
              }}
            >
              Ajoutez une nouvelle carte
            </CustomButton>
            </View>
              <View style={styles.submitbtn}>
            <CustomButton
              onPressFunction={() => {
                navigation.navigate(
                  "UserAccountScreen",
                  console.log("Votre moyen de paiement à bien étè changé")
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

export default UserChangePaiementScreen;
