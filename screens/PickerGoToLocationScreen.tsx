import { View, StyleSheet, ScrollView } from "react-native";
import Map from "@/components/Map";
import CustomButton from "@/components/CustomButton";
import Layout from "@/components/Layout";
import Input from "@/components/Input";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";

function PickerGoToLocationScreen() {
  const [secretCode, setSecretCode] = useState<string>("");
  const deliveryData = useAppSelector((state) => state.deliveries.value);

  function handleCodeSubmission() {
    fetch(
      process.env.EXPO_PUBLIC_BACKEND_URL + "/deliveries/checkSecretCode/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deliveryId: deliveryData.deliveryId,
          secretCode,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log("OK  ! Faire le screen pour confirmer la délivraison");
        } else {
          console.log("Mauvais code");
        }
      });
  }

  return (
    <Layout
      title="Rejoindre le colis"
      description="Aller au point de rendez-vous"
      arrowBack
      footer
    >
      <ScrollView
        style={{ overflow: "visible" }}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.map}>
          <Map
            pickerPosition={{ latitude: 43.26855, longitude: 5.385144 }}
          ></Map>
          <Input
            label="Code secret"
            keyboardType="none"
            onChangeText={(value) => setSecretCode(value)}
            value={secretCode}
          ></Input>
          <CustomButton onPressFunction={() => handleCodeSubmission()}>
            Valider le code secret
          </CustomButton>
        </View>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffbf0",
    padding: 20,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    fontSize: 36,
    color: "#525252",
    marginLeft: 30,
  },
  card: {
    marginTop: 0,
    alignItems: "center",
  },
  map: {
    marginTop: 20,
    gap: 20,
  },
});

export default PickerGoToLocationScreen;
