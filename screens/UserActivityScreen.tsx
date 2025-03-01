// COMPONENTS
import Layout from "@/components/Layout";
import { useSwipe } from "hook/useSwipe";
import { View, StyleSheet, ScrollView } from "react-native";

import OrderCard from "@/components/OrderCard";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";

function UserActivityScreen({ navigation }) {
  const [deliveriesData, setDeliveriesData] = useState([]);
  const userData = useAppSelector((state) => state.users.value);

  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 3);

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
        console.log(data.deliveries);
      });
  }, []);

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
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ flex: 1, gap: 15 }}>
            <OrderCard
              orderNumber={395885}
              location="3 rue des baies, 34555 CEDEX"
              collector="Bob"
              status
              price={3.4}
              date="2024-05-09"
            ></OrderCard>
            <OrderCard
              orderNumber={23525}
              location="23 avenue du général leclerc, 750001 Paris"
              collector="Bob"
              price={1.99}
              date="2025-01-02"
            ></OrderCard>
            {deliveryCards}
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({});

export default UserActivityScreen;
