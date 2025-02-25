// COMPONENTS
import Layout from "@/components/Layout";
import CustomButton from "@/components/CustomButton";
import DropdownMenu from "@/components/DropdownMenu";
import WheelPicker from "@/components/WheelPicker";

import { useSwipe } from "hook/useSwipe";

import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";

const packageOptions = [
  { id: "S", name: "Petit" },
  { id: "M", name: "Moyen" },
  { id: "L", name: "Large" },
];

// TODO : Improve screen maybe on wheel picker

function PickerHomeScreen({ navigation }) {
  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 3);
  const [pickerVehicle, setPickerVehicle] = useState<string>("");
  const [isAvailable, setIsAvailable] = useState<boolean>(false);

  const [selectedIndex, setSelectedIndex] = useState(1);

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
    navigation.navigate("Return");
  }

  function onSwipeRight() {}
  return (
    <Layout
      title="Disponibilité"
      description="Vous pouvez mettre les informations pour votre délivraison"
      arrowSkip="Home"
    >
      <View
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1, gap: 15 }}>
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
                  Quel type colis pouvez-vous transporter ?
                </Text>
              </View>
              <WheelPicker
                selectedIndex={selectedIndex}
                options={optionsData}
                itemHeight={160}
                visibleRest={1}
                itemTextStyle={{ fontFamily: "Poppins-Regular" }}
                scaleFunction={(x: number) => 1.5 ** -x}
                rotationFunction={(x: number) => 1 - Math.pow(1 / 2, x)}
                opacityFunction={(x: number) => Math.pow(1 / 3, x)}
                onChange={(index) => {
                  setSelectedIndex(index);
                  console.log(optionsData[selectedIndex].titre);
                }}
              ></WheelPicker>
            </View>
          )}
          {pickerVehicle && (
            <View>
              <CustomButton
                backgroundColor={isAvailable ? "#08CC0A85" : "#525252"}
                onPressFunction={() => {
                  setIsAvailable(!isAvailable);
                  console.log('ADD navigation.navigate("...")');
                }}
              >
                Je suis disponible
              </CustomButton>
            </View>
          )}
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({});

export default PickerHomeScreen;
