import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import CustomButton from "@/components/CustomButton";
import Map, { Coordinates } from "@/components/Map";
import Layout from "@/components/Layout";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import "react-native-get-random-values";

const GOOGLE_MAPS_APIKEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_APIKEY;

export default function UserCurrentPositionScreen({ navigation }) {
  const [isMapVisible, setIsMapVisible] = useState<boolean>(false);
  const [dedeliveryLocation, setDeliveryLocation] = useState<Coordinates>({
    latitude: undefined,
    longitude: undefined,
  });

  return (
    <Layout
      title="Planifier votre délivraison"
      arrowBack
      description="Saisissez votre adresse"
    >
      <GooglePlacesAutocomplete
        placeholder="Votre adresse ..."
        fetchDetails={true}
        onPress={(data, details) => {
          setIsMapVisible(true);
          setDeliveryLocation({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
          });
        }}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: "fr",
        }}
        debounce={500}
        styles={{
          listView: {
            zIndex: 1000,
            height: 400,
          },
          textInput: {
            // height: 50,
            color: "#525252",
            fontSize: 16,
            borderWidth: 1,
            borderColor: "#52525250",
            backgroundColor: "#fffbf0",
          },
        }}
      ></GooglePlacesAutocomplete>
      <View>
        {isMapVisible && <Map dedeliveryPosition={dedeliveryLocation}></Map>}
        <View style={{ marginBottom: "10%" }}>
          <CustomButton
            onPressFunction={() => {
              navigation.navigate("PickerLoader");
            }}
          >
            Venez chercher mon colis
          </CustomButton>
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
  },
});
