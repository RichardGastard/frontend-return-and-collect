import { View, StyleSheet, ScrollView } from "react-native";
import Map from "@/components/Map";
import Card from "@/components/Card";
import CustomButton from "@/components/CustomButton";
import Layout from "@/components/Layout";

import CustomModal from "@/components/CustomModal";
import { LatitudeLongitude } from "@/utils/distance";

import { useAppSelector } from "@/store/hooks";

import { useEffect, useState } from "react";

function UserFollowPickerScreen() {
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);

  const [pickerFirstname, setPickerFirstname] = useState<string>("");
  const [pickerNumberOfDeliveries, setPickerNumberOfDeliveries] =
    useState<string>(null);
  const [pickerNumberOfRating, setPickerNumberOfRating] =
    useState<number>(null);
  const [pickerRating, setPickerRating] = useState<number>(null);
  const [pickerTransportType, setPickerTransportType] = useState<string>("");

  const [dedeliveryPosition, setDedeliveryPosition] =
    useState<LatitudeLongitude>(null);
  const [pickerPosition, setPickerPosition] = useState<LatitudeLongitude>(null);
  const [userSecretCode, setUserSecretCode] = useState<string>("");

  const deliveryData = useAppSelector((state) => state.deliveries.value);

  useEffect(() => {
    fetch(
      process.env.EXPO_PUBLIC_BACKEND_URL +
        "/reviews/meanRating/" +
        deliveryData.pickerId
    )
      .then((response) => response.json())
      .then((data) => {
        setPickerRating(data.meanRating);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(
        process.env.EXPO_PUBLIC_BACKEND_URL +
          "/deliveries/info/" +
          deliveryData.deliveryId
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.delivery.pickupPosition && data.delivery.pickerPosition) {
            setDedeliveryPosition(data.delivery.pickupPosition);
            setPickerPosition(data.delivery.pickerPosition);
            setPickerFirstname(data.delivery.pickerId.firstName);
            setPickerNumberOfDeliveries(
              data.delivery.pickerId.numberOfDeliveries
            );
            setPickerTransportType(data.delivery.pickerId.transportType);
            setPickerNumberOfDeliveries(data.delivery.pickerId.numberOfRatings);
            setUserSecretCode(data.delivery.secretCode);
          }
        });
      //TODO : setInterval plus lent pour
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout
      title="Suivi du collecteur"
      description="Suivez en temps réel votre délivraison"
      arrowSkip="UserTabNavigator"
      footer
    >
      <ScrollView
        style={{ overflow: "visible" }}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Card
            //TODO : Real informations
            image={require("assets/livreur-4.jpg")}
            name={pickerFirstname}
            ratedStars={pickerRating}
            numberOfDeliveries={pickerNumberOfDeliveries}
            vehicle={pickerTransportType}
          />
        </View>
        <View style={styles.map}>
          <Map
            pickerPosition={pickerPosition}
            dedeliveryPosition={dedeliveryPosition}
          ></Map>
          <CustomButton
            onPressFunction={() => {
              setModalIsVisible(!modalIsVisible);
            }}
          >
            Code secret
          </CustomButton>
          <CustomModal
            isVisible={modalIsVisible}
            title="Votre code secret"
            onClose={() => setModalIsVisible(false)}
            code={userSecretCode}
          >
            <CustomButton
              onPressFunction={() => setModalIsVisible(false)}
              width={100}
            >
              Fermer
            </CustomButton>
          </CustomModal>
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
  },
});

export default UserFollowPickerScreen;
