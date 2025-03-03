import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";

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

function PickerFoundScreen({ navigation }) {
  const userData = useAppSelector((state) => {
    return state.users.value;
  });

  // const [delivery, setDelivery] = useState<DeliveryData[]>([]);
  const [delivery, setDelivery] = useState<any>([]);

  useEffect(() => {
    fetch(
      process.env.EXPO_PUBLIC_BACKEND_URL + "/deliveries/isLookingForPicker"
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        const deliveryData = data.deliveries.map((data, i) => {
          setDelivery([...delivery, data]);
          // deliveryData.distance = 10;
          // deliveryData.orderNumber = i;
          // setDelivery([...delivery, data]);
        });
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
          console.log("NAVIGATE VERS LA PAGE D'APRES");
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
          orderNumber={data._id.substring(0, 5)}
          user={data.senderId.firstName} // RECUPERER LE FIRSTNAME SUR LA USER DB
          packageSize={data.size}
          distance={data.pickupAddress}
          price={data.price}
          status={false}
          onAccept={() => handleAcceptDelivery(data._id)}
        />
      </>
    );
  });
  return (
    <Layout footer title="Livraisons disponibles" arrowBack>
      <View style={styles.container}>
        {deliveryCard}
        {/* <UserDeliveryCard
          orderNumber={12424242}
          user={"BOB"} // RECUPERER LE FIRSTNAME SUR LA USER DB
          packageSize={"Petit"}
          distance={"34"}
          price={30}
        />
        <UserDeliveryCard
          orderNumber={12424242}
          user={"BOB"} // RECUPERER LE FIRSTNAME SUR LA USER DB
          packageSize={"Petit"}
          distance={"34"}
          price={30}
        /> */}
      </View>
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
