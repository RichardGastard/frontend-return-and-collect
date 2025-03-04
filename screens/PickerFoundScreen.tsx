import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";

import { useAppSelector } from "@/store/hooks";
import UserDeliveryCard from "@/components/UserDeliveryCard";
import { computeDistanceInMeters, LatitudeLongitude } from "@/utils/distance";

import * as Location from "expo-location";

type DeliveryData = {
  _id: number;
  senderId: string;
  pickerId: string;
  distance: string;
  price: number;
};

function PickerFoundScreen({ navigation }) {
  const [location, setLocation] = useState<LatitudeLongitude>(null);
  const userData = useAppSelector((state) => {
    return state.users.value;
  });

  // const [delivery, setDelivery] = useState<DeliveryData[]>([]);
  const [delivery, setDelivery] = useState<any>([]);

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

  useEffect(() => {
    // TODO : IMPORTANT
    fetch(
      process.env.EXPO_PUBLIC_BACKEND_URL + "/deliveries/isLookingForPicker"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const deliveryData = data.deliveries.map((delivery, i) => {
          delivery.distance = computeDistanceInMeters(
            data.pickupPosition,
            location
          );
          delivery.orderNumber = i;
        });
        setDelivery([deliveryData]);
      });
  }, []);

  const handleAcceptDelivery = (deliveryId: string) => {
    //Accepte la livraison trouvée
    fetch(process.env.EXPO_PUBLIC_BACKEND_URL + "/deliveries/assign", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ deliveryId, token: userData.token }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          navigation.navigate("PickerGoToLocation");
        }
      });
  };

  // Refuse une livraison
  const handleDenyDelivery = (deliveryId) => {
    setDelivery(
      delivery.filter((data, i) => {
        return data.orderNumber !== deliveryId;
      })
    );
  };

  const deliveryCard = delivery.map((data, i) => {
    return (
      <UserDeliveryCard
        key={i}
        orderNumber={data._id.substring(0, 5)}
        user={data.senderId.firstName} // RECUPERER LE FIRSTNAME SUR LA USER DB
        packageSize={data.size}
        distance={data.pickupAddress}
        price={data.price}
        status={false}
        onAccept={() => handleAcceptDelivery(data._id)}
      />
    );
  });
  return (
    <Layout footer title="Livraisons disponibles" arrowBack>
      <View style={styles.container}>{deliveryCard}</View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginBottom: "15%",
    gap: 15,
  },
  Btns: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
  },
});

export default PickerFoundScreen;
