import { View, StyleSheet, ScrollView } from "react-native";
import Map, { Coordinates } from "@/components/Map";
import CustomButton from "@/components/CustomButton";
import Layout from "@/components/Layout";
import Input from "@/components/Input";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import * as Location from "expo-location";
import { LatitudeLongitude } from "@/utils/distance";
import { DeliveryStatus } from "@/utils/enums";

function PickerGoToLocationScreen({ navigation }) {
  const [location, setLocation] = useState<LatitudeLongitude>(null);
  const [secretCode, setSecretCode] = useState<string>("");
  const deliveryData = useAppSelector((state) => state.deliveries.value);

  // Demande d'autorisation d'accès à la position
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        Location.watchPositionAsync({ timeInterval: 1000, distanceInterval: 50 }, (location) => {
          setLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
          fetch(
            process.env.EXPO_PUBLIC_BACKEND_URL +
              "/deliveries/updatePickerPosition/",
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                deliveryId: deliveryData.deliveryId,
                latitude: location.coords?.latitude ?? 0,
                longitude: location.coords?.longitude ?? 0,
              }),
            }
          )
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              console.log("Position updated");
            });
        });
      }
    })();
  }, []);

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
          fetch(process.env.EXPO_PUBLIC_BACKEND_URL + "/deliveries/status", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              deliveryId: deliveryData.deliveryId,
              status: DeliveryStatus.IN_TRANSIT,
            }),
          })
            .then((response) => response.json())
            .then((res) => {
              if (res.result) {
                navigation.navigate("PickerGoToUnload");
              }
            });
        } else {
          alert("Le code est erroné");
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
            pickerPosition={location}
            dedeliveryPosition={deliveryData.pickupPosition}
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
