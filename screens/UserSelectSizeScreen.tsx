import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

import WheelPicker from "@/components/WheelPicker";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

function UserSelectSizeScreen() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  function handleSubmit() {
    // TODO: Faire un navigation.navigate vers la page d'après
  }

  const optionsData = [
    {
      titre: "Petit",
      description: "Boîte à chaussure",
      imageUrl: "../assets/logo-without-bg-without-text.png",
    },
    {
      titre: "Moyen",
      description: "Micro-onde",
      imageUrl: "../assets/logo-without-bg-without-text.png",
    },
    {
      titre: "Large",
      description: "Armoire",
      imageUrl: "../assets/logo-without-bg-without-text.png",
    },
    {
      titre: "Très large",
      description: "Camion",
      imageUrl: "../assets/logo-without-bg-without-text.png",
    },
  ];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View>
          <View style={styles.header}>
            <Text style={styles.title}>Selection</Text>
            <Text style={styles.description}>
              Quelle est la taille de votre paquet ?
            </Text>
          </View>
          <WheelPicker
            selectedIndex={selectedIndex}
            options={optionsData}
            // Option 1
            itemHeight={200}
            visibleRest={1}
            // Option 2
            //  itemHeight={130}
            //  visibleRest={2}
            itemTextStyle={{ fontFamily: "poppins" }}
            scaleFunction={(x: number) => 1.5 ** -x}
            rotationFunction={(x: number) => 1 - Math.pow(1 / 2, x)}
            opacityFunction={(x: number) => Math.pow(1 / 3, x)}
            onChange={(index) => {
              setSelectedIndex(index);
            }}
          ></WheelPicker>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => handleSubmit()}
          >
            <Text style={{ color: "white" }}>Sélectionner</Text>
          </TouchableOpacity>
          <View style={styles.footer}>
            <Text style={{ color: "#525252", opacity: 0.4, marginBlock: 20 }}>
              Made in 🇫🇷
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
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
    // overflow: "scroll"
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
    // marginTop: 20,
  },
});

export default UserSelectSizeScreen;
