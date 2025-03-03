// COMPONENTS
import Layout from "@/components/Layout";
import { useSwipe } from "hook/useSwipe";
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Dimensions,
} from "react-native";

import OrderCard from "@/components/OrderCard";
import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";

function UserActivityScreen({ navigation }) {
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
    navigation.navigate("Return");
  }

  useEffect(() => {
    fetch(
      process.env.EXPO_PUBLIC_BACKEND_URL +
        "/deliveries/activity/" +
        userData.token
    )
      .then((response) => response.json())
      .then((data) => {
        setDeliveriesData(data.deliveries);
      });
  }, [refreshing]);

  const deliveryCards = deliveriesData.map((delivery, i) => {
    const collector = delivery.pickerId
      ? delivery.pickerId.firstName +
        " " +
        delivery.pickerId.lastName.charAt(0).toUpperCase() +
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

  function onSwipeRight() {}
  return (
    <Layout
      title="Historique"
      description="Vous pouvez retrouver l'ensemble de vos commandes"
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
          <View style={{ flex: 1, gap: 15 }}>{deliveryCards}</View>
        </ScrollView>
        <View style={{ height: 65 }}></View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({});

export default UserActivityScreen;
