import { View, StyleSheet, ScrollView } from "react-native";
import Map from "@/components/Map";
import CustomButton from "@/components/CustomButton";
import Layout from "@/components/Layout";
import * as Location from "expo-location";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { DeliveryStatus } from "@/utils/enums";
import { unloadDelivery } from "@/reducers/deliveries";
import { LatitudeLongitude } from "@/utils/distance";
import { useEffect, useState } from "react";

function PickerGoToUnloadScreen({ navigation }) {
  const [location, setLocation] = useState<LatitudeLongitude>(null);
  const deliveryData = useAppSelector((state) => state.deliveries.value);

  const dispatch = useAppDispatch();

  // Demande d'autorisation d'accès à la position
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      }
    })();
  }, []);

  function handleUnload() {
    fetch(process.env.EXPO_PUBLIC_BACKEND_URL + "/deliveries/status", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        deliveryId: deliveryData.deliveryId,
        status: DeliveryStatus.DELIVERED,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        dispatch(unloadDelivery());
        navigation.navigate("PickerTabNavigator");
      });
  }

  return (
    <Layout
      title="Déposer le colis"
      description="Aller au point de dépôt"
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
            unloadPosition={{ longitude: 2.349, latitude: 48.854 }}
          ></Map>
          <CustomButton onPressFunction={() => handleUnload()}>
            Valider la délivraison
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

export default PickerGoToUnloadScreen;
