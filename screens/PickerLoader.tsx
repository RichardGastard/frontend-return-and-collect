// COMPONENT
import Loader from "@/components/Loader";
import Layout from "@/components/Layout";

import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import CustomButton from "@/components/CustomButton";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadDelivery, unloadDelivery } from "@/reducers/deliveries";
import { DeliveryStatus } from "@/utils/enums";
import { useFocusEffect } from "@react-navigation/native";

function PickerLoader({ navigation }) {
  const [suspension, setSuspension] = useState<string>("");

  // Data from redux store
  const userData = useAppSelector((state) => state.users.value);
  const deliveryStoreData = useAppSelector((state) => state.deliveries.value);

  // Ref to deliveryId to get the update id on dismount
  const deliveryIdRef = useRef<string | null>(null);

  const dispatch = useAppDispatch();

  // Loader
  useEffect(() => {
    if (suspension.length <= 3) {
      setTimeout(() => {
        setSuspension(suspension + ".");
      }, 1000);
    } else {
      setSuspension("");
    }
  }, [suspension]);

  // Workaround to use deliveryId on dismount
  useEffect(() => {
    deliveryIdRef.current = deliveryStoreData.deliveryId;
  }, [deliveryStoreData.deliveryId]);

  // Manage delivery
  useEffect(() => {
    // Create the delivery first
    fetch(process.env.EXPO_PUBLIC_BACKEND_URL + "/deliveries/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: userData.token,
        description: "Pas de description",
        pickupAddress: deliveryStoreData.pickupAddress,
        pickupPosition: deliveryStoreData.pickupPosition,
        volume: deliveryStoreData.volume,
        size: deliveryStoreData.size,
      }),
    })
      .then((response) => response.json())
      .then((deliveryData) => {
        dispatch(
          loadDelivery({
            deliveryId: deliveryData.data._id,
            pickupAddress: deliveryData.data.deliveryAddress,
          })
        );
      });

    // On dismount, cancel delivery
    return () => {
      fetch(process.env.EXPO_PUBLIC_BACKEND_URL + "/deliveries/status", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: userData.token,
          deliveryId: deliveryIdRef.current,
          status: DeliveryStatus.CANCELED
        }),
      })
        .then((response) => response.json())
        .then(() => {
          dispatch(unloadDelivery());
        });
    };
  }, []);

  async function lookForPicker() {
    const response = await fetch(
      process.env.EXPO_PUBLIC_BACKEND_URL +
        "/deliveries/info/" +
        deliveryIdRef.current
    );

    const data = await response.json();
    if (data.delivery.status !== "LOOKING_FOR_PICKER") {
      navigation.navigate("UserFollowPicker");
    }
    return data;
  }

  useFocusEffect(
    React.useCallback(() => {
      const interval = setInterval(() => {
        lookForPicker();
      }, 3000);
      return () => {
        clearInterval(interval)
      };
    }, [deliveryStoreData])
  );

  return (
    <Layout
      title={`Recherche de votre collecteur ${suspension}`}
      description="Cela peut prendre quelques instants"
      footer
    >
      <View style={styles.loader}>
        <Loader />
      </View>
      <View style={styles.cancelButton}>
        <CustomButton
          children="Annuler"
          onPressFunction={() => navigation.goBack()}
          backgroundColor="#ff5252"
          width={200}
        />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  loader: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.7,
    shadowRadius: 32.0,

    elevation: 24,
  },
  cancelButton: {
    alignSelf: "center",
    marginTop: "30%",
    shadowColor: "#000",
    opacity: 0.8,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
});

export default PickerLoader;
