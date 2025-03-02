// COMPONENTS
import Layout from "@/components/Layout";
import CustomButton from "@/components/CustomButton";
import DropdownMenu from "@/components/DropdownMenu";
import WheelPicker from "@/components/WheelPicker";

import { useSwipe } from "hook/useSwipe";

import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";

import { useAppSelector } from "@/store/hooks";

// TODO : Improve screen maybe on wheel picker

function PickerHomeScreen({ navigation }) {
  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 3);
  const [pickerVehicle, setPickerVehicle] = useState<string>("");
  const [isAvailable, setIsAvailable] = useState<boolean>(false);

  const [selectedIndex, setSelectedIndex] = useState(1);

  const userData = useAppSelector((state) => state.users.value);

  const optionsData = [
    {
      titre: "Seulement petit",
      //description: "Boîte à chaussure",
      // imageUrl: "../assets/logo-simple.svg",
      //imageUrl: require("../assets/logo-without-bg-without-text.png"),
    },
    {
      titre: "Jusqu'à moyen",
      //description: "Micro-onde",
      // imageUrl: "../assets/logo-simple.svg",
      //imageUrl: require("../assets/logo-without-bg-without-text.png"),
    },
    {
      titre: "Jusqu'à grand",
      //description: "Armoire",
      // imageUrl: "../assets/logo-simple.svg",
      //imageUrl: require("../assets/logo-without-bg-without-text.png"),
    },
  ];

  function onSwipeLeft() {
    navigation.navigate("Profil");
  }

  function onSwipeRight() {
    navigation.navigate("Historique");
  }

  function makePickerAvailable() {
    fetch(process.env.EXPO_PUBLIC_BACKEND_URL + "/users/", {
      method: "PUT",
      body: JSON.stringify({
        token: userData.token,
        isAvailable: true,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((data) => {
        // Envoie vers la page Account pour l'utilisateur puisse commpléter son profil
        if (data.result) {
          navigation.navigate("PickerFoundScreen");
        }
      });
  }
  return (
    <Layout
      title="Disponibilité"
      description="Vous pouvez mettre les informations pour votre délivraison"
    >
      <View
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{ flex: 1 }}
      >
        <View style={{ gap: 15 }}>
          <DropdownMenu
            options={["Vélo 🚲", "Scooter 🛵", "Voiture 🚗", "Camion 🚛"]}
            placeholder={"Choisissez votre moyen de transport..."}
            onChange={(val) => setPickerVehicle(val)}
          />
          {pickerVehicle.length > 0 && (
            <View>
              <View>
                <Text
                  style={{
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                    color: "#525252",
                    marginLeft: "1%",
                  }}
                >
                  Quel type de colis pouvez-vous transporter ?
                </Text>
              </View>
              <WheelPicker
                selectedIndex={selectedIndex}
                options={optionsData}
                itemHeight={145}
                visibleRest={1}
                itemTextStyle={{ fontFamily: "Poppins-Regular" }}
                scaleFunction={(x: number) => 1.5 ** -x}
                rotationFunction={(x: number) => 1 - Math.pow(1 / 2, x)}
                opacityFunction={(x: number) => Math.pow(1 / 3, x)}
                onChange={(index) => {
                  setSelectedIndex(index);
                }}
              ></WheelPicker>
            </View>
          )}
          {pickerVehicle && (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={isAvailable ? styles.available : styles.notAvailable}
              >
                <CustomButton
                  backgroundColor={isAvailable ? "#08CC0A60" : "#525252"}
                  onPressFunction={() => {
                    setIsAvailable(!isAvailable);
                    makePickerAvailable();
                  }}
                >
                  {isAvailable ? "Disponible" : "Non disponible"}
                </CustomButton>
              </View>
            </View>
          )}
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  notAvailable: {
    flex: 1,
    width: "50%",
    shadowColor: "#000",
    opacity: 0.8,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.4,
    shadowRadius: 16.0,

    elevation: 24,
  },
  available: {
    flex: 1,
    width: "50%",
    shadowColor: "#08CC0A",
    opacity: 0.8,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.55,
    shadowRadius: 8.0,

    elevation: 24,
  },
});

export default PickerHomeScreen;
