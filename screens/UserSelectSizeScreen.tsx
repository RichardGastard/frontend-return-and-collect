import { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

import WheelPicker from "@/components/WheelPicker";
import { useSwipe } from "hook/useSwipe";
import Layout from "@/components/Layout";
import CustomButton from "@/components/CustomButton";

function UserSelectSizeScreen({ navigation }) {
  const [selectedIndex, setSelectedIndex] = useState(1);

  /* -------------- */
  /* Handle swiping */
  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 3);

  function onSwipeLeft() {
    navigation.navigate("Profil");
  }

  function onSwipeRight() {
    navigation.navigate("Commandes");
  }

  function handleSubmit() {
    navigation.navigate("UserCurrentPosition");
  }

  const optionsData = [
    {
      titre: "Petit",
      description: "Boîte à chaussure",
      // imageUrl: "../assets/logo-simple.svg",
      imageUrl: require("../assets/logo-without-bg-without-text.png"),
    },
    {
      titre: "Moyen",
      description: "Micro-onde",
      // imageUrl: "../assets/logo-simple.svg",
      imageUrl: require("../assets/logo-without-bg-without-text.png"),
    },
    {
      titre: "Large",
      description: "Armoire",
      // imageUrl: "../assets/logo-simple.svg",
      imageUrl: require("../assets/logo-without-bg-without-text.png"),
    },
    {
      titre: "Très large",
      description: "Camion",
      // imageUrl: "../assets/logo-simple.svg",
      imageUrl: require("../assets/logo-without-bg-without-text.png"),
    },
  ];

  return (
    <Layout
      title="Sélection"
      description="Quelle est la taille de votre paquet ?"
    >
      <View
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{ marginTop: "15%" }}
      >
        <WheelPicker
          selectedIndex={selectedIndex}
          options={optionsData}
          itemHeight={180}
          visibleRest={1}
          itemTextStyle={{ fontFamily: "Poppins-Regular" }}
          scaleFunction={(x: number) => 1.5 ** -x}
          rotationFunction={(x: number) => 1 - Math.pow(1 / 2, x)}
          opacityFunction={(x: number) => Math.pow(1 / 3, x)}
          onChange={(index) => {
            setSelectedIndex(index);
          }}
        ></WheelPicker>
        <View
          style={{
            marginBottom: "70%",
            justifyContent: "flex-start",
          }}
        >
          <CustomButton onPressFunction={() => handleSubmit()}>
            Sélectionner
          </CustomButton>
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffbf0",
    padding: 20,
  },
  image: {
    flex: 1,
    backgroundColor: "#fffbf0",
    opacity: 30,
  },
  submitButton: {
    backgroundColor: "#febbba",
    height: 45,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  selectView: {
    marginTop: 10,
    display: "flex",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "red",
    height: "90%",
  },
  header: {
    marginLeft: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    color: "#525252",
  },
  description: {
    color: "#525252",
  },
  footer: {
    alignItems: "center",
  },
});

export default UserSelectSizeScreen;
