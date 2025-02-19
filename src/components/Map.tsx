import React, { useEffect, useRef, useState } from "react";
import { Dimensions, DimensionValue, StyleSheet } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export type Coordinates = {
  latitude: number;
  longitude: number;
};

type MapProps = {
  dedeliveryPosition?: Coordinates;
  pickerPosition?: Coordinates;
  height?: DimensionValue;
  width?: DimensionValue;
};

const GOOGLE_MAPS_APIKEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_APIKEY;

export default function Map({
  dedeliveryPosition,
  pickerPosition,
  height = (Dimensions.get("window").height * 40) / 100,
  width = (Dimensions.get("window").width * 90) / 100,
}: MapProps) {
  const [location, setLocation] = useState<Coordinates>({
    latitude: 48.66667,
    longitude: 2.333333,
  });

  // Référence à la MapView, liée avec le props "ref" de Mapview
  const mapViewRef = useRef<MapView>(null);
  const mapViewDirectionsRef = useRef<MapViewDirections>(null);

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

  // Lorsque la position est acquise, la MapView se focalise sur la position
  useEffect(() => {
    if (dedeliveryPosition) {
      let deltaMax = 0.005;
      let barycentre = { ...dedeliveryPosition };
      if (pickerPosition && dedeliveryPosition) {
        barycentre.latitude =
          (dedeliveryPosition.latitude + dedeliveryPosition.latitude) / 2;
        barycentre.longitude =
          (dedeliveryPosition.longitude + dedeliveryPosition.longitude) / 2;
        deltaMax = Math.max(
          Math.abs(dedeliveryPosition.latitude - dedeliveryPosition.latitude) *
            1.3,
          deltaMax
        );
        deltaMax = Math.max(
          Math.abs(pickerPosition.longitude - dedeliveryPosition.longitude) *
            1.3,
          deltaMax
        );
      }
      
      // On force l'update après un certain temps
      setTimeout(() => {
        mapViewRef.current?.animateToRegion(
          {
            ...barycentre,
            latitudeDelta: deltaMax,
            longitudeDelta: deltaMax,
          },
          1000
        );
        mapViewDirectionsRef.current?.forceUpdate();
      }, 200);
    }
  }, [dedeliveryPosition]);

  // TODO : Mettre des images/icons pour les markers
  return (
    <MapView
      ref={mapViewRef}
      style={[styles.map, { height, width }]}
      mapType={"standard"}
      initialRegion={{
        latitude: 48.66667,
        longitude: 2.333333,
        latitudeDelta: 1,
        longitudeDelta: 1.0,
      }}
      showsBuildings={false}
      showsUserLocation={true}
      // rotateEnabled={false}
    >
      <Marker coordinate={dedeliveryPosition}>
        <MaterialCommunityIcons name="human-greeting" size={48} color="black" />
      </Marker>
      {pickerPosition && (
        <>
          {/* TODO: Changer les MaterialIcons en Image */}
          <Marker coordinate={pickerPosition}>
            <MaterialCommunityIcons
              name="human-dolly"
              size={48}
              color="black"
            />
          </Marker>
          {location && (
            <MapViewDirections
              ref={mapViewDirectionsRef}
              origin={dedeliveryPosition}
              destination={pickerPosition}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="blue"
            />
          )}
        </>
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#ddd",
  },
});
