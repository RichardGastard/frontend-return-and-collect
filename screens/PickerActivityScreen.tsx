// COMPONENTS
import Layout from "@/components/Layout";
import OrderCard from "@/components/OrderCard";
import { useAppSelector } from "@/store/hooks";

import { useSwipe } from "hook/useSwipe";
import { useCallback, useEffect, useState } from "react";

import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";

function PickerActivityScreen({ navigation }) {
  const [deliveriesData, setDeliveriesData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const userData = useAppSelector((state) => state.users.value);

  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 3);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  function onSwipeLeft() {
    navigation.navigate("Collect");
  }

  function onSwipeRight() {}

  useEffect(() => {
    fetch(
      process.env.EXPO_PUBLIC_BACKEND_URL +
        "/deliveries/pickerActivity/" +
        userData.token
    )
      .then((response) => response.json())
      .then((data) => {
        setDeliveriesData(data.deliveries);
      });
  }, [refreshing]);

  const deliveryCards = deliveriesData
    .sort((a, b) => {
      return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
    })
    .map((delivery, i) => {
      const collector = delivery.senderId
        ? delivery.senderId.firstName +
          " " +
          delivery.senderId.lastName.charAt(0).toUpperCase() +
          "."
        : "Collecteur non trouvé";
      return (
        <OrderCard
          key={i}
          orderNumber={delivery._id.substring(0, 5)}
          location={delivery.pickupAddress}
          collector={collector}
          status={delivery === "DELIVERED"}
          price={delivery.price}
          date={delivery.createdAt.split("T")[0]}
        ></OrderCard>
      );
    });

  return (
    <Layout
      title="Historique"
      description="Vous pouvez retrouver l'ensemble de vos commandes prises en charge"
    >
      <View
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}
          keyboardShouldPersistTaps="handled"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            ></RefreshControl>
          }
        >
          {deliveryCards}
        </ScrollView>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({});

export default PickerActivityScreen;
