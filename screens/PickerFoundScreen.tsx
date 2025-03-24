import Layout from "@/components/Layout";
import { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import UserDeliveryCard from "@/components/UserDeliveryCard";
import { computeDistanceInMeters, LatitudeLongitude } from "@/utils/distance";

import * as Location from "expo-location";
import { loadDelivery } from "@/reducers/deliveries";

type DeliveryData = {
  _id: number;
  senderId: string;
  pickerId: string;
  distance: string;
  price: number;
};

function PickerFoundScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [location, setLocation] = useState<LatitudeLongitude>(null);
  const userData = useAppSelector((state) => {
    return state.users.value;
  });

  // const [delivery, setDelivery] = useState<DeliveryData[]>([]);
  const [delivery, setDelivery] = useState<any>([]);

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

  useEffect(() => {
    fetch(
      process.env.EXPO_PUBLIC_BACKEND_URL + "/deliveries/isLookingForPicker"
    )
      .then((response) => response.json())
      .then((data) => {
        const deliveryData = data.deliveries;
        setTimeout(() => {
          setDelivery(deliveryData);
        }, 100);
      });
  }, [refreshing]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleAcceptDelivery = (deliveryId: string) => {
    //Accepte la livraison trouvée
    fetch(process.env.EXPO_PUBLIC_BACKEND_URL + "/deliveries/assign", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        deliveryId,
        token: userData.token,
        pickerPosition: location,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            loadDelivery({
              deliveryId: data.data.deliveryId,
              pickupAddress: data.data.pickupAddress,
              pickupPosition: data.data.pickupPosition,
              volume: data.data.volume,
              size: data.data.size,
            })
          );
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
    let distance = "0m";
    if (data.pickupPosition) {
      const distanceComputed = computeDistanceInMeters(
        data.pickupPosition,
        location
      );
      if (distanceComputed.kilometers > 0) {
        distance = distanceComputed.kilometers.toLocaleString() + " km";
      } else {
        distance = distanceComputed.meters.toLocaleString() + " m";
      }
    }
    return (
      // <TouchableOpacity onPress={() => console.log("CLICKED")}>
      <UserDeliveryCard
        key={i}
        orderNumber={data._id.substring(0, 5)}
        user={data.senderId.firstName} // RECUPERER LE FIRSTNAME SUR LA USER DB
        packageSize={data.size}
        distance={distance}
        price={data.price}
        status={false}
        onAccept={() => handleAcceptDelivery(data._id)}
      />
    );
  });
  return (
    <Layout
      footer
      title="Livraisons disponibles"
      description="Cliquez pour accepter une délivraison"
      arrowBack
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>{deliveryCard}</View>
      </ScrollView>
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
