import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
} from "react-native";

import CustomButton from "@/components/CustomButton";
import { useAppSelector } from "@/store/hooks";
import UserDeliveryCard from "@/components/UserDeliveryCard";

type DeliveryData = {
  orderNumber: number;
  senderId: string;
  size: string;
  distance: string;
  price: number;
};

function PickFoundScreen({ navigation }) {
  const userData = useAppSelector((state) => {
    state.users.value;
  });

  const [delivery, setDelivery] = useState<DeliveryData[]>([]);

  useEffect(() => {
    fetch(
      process.env.EXPO_PUBLIC_BACKEND_URL + "/deliveries/isLookingForPicker"
    )
      .then((response) => response.json())
      .then((data) => {
        const deliveryData = data.deliveries.map((data, i) => {
          data.distance = 10;
          data.orderNumber = i;
        });
        setDelivery(deliveryData);
      });
  }, []);

  const handleAcceptDelivery = (deliveryId) => {
    //Accepte la livraison trouvée
    fetch(process.env.EXPO_PUBLIC_BACKEND_URL + "/deliveries/assign", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ deliveryId, token: userData.token }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          navigation.navigate("?");
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
      <>
        <UserDeliveryCard
          key={i}
          orderNumber={data.orderNumber}
          user={data.senderId}
          packageSize={data.size}
          distance={data.distance}
          price={data.price}
          status={true}
        />
        <CustomButton
          backgroundColor="#2dd91a"
          children="Accepter"
          onPressFunction={() => {
            handleAcceptDelivery(data.orderNumber);
          }}
          width={110}
          height={30}
        ></CustomButton>
        <CustomButton
          backgroundColor="#eb4334"
          children="Refuser"
          onPressFunction={() => {
            handleDenyDelivery(data.orderNumber);
          }}
          width={100}
          height={30}
        ></CustomButton>
      </>
    );
  });
  return (
    <Layout footer title="Livraisons disponibles" arrowBack>
      <View style={styles.container}>
        {deliveryCard}
        <View style={styles.Btns}></View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  Btns: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
  },
});

export default PickFoundScreen;
