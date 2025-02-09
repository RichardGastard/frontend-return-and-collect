import React from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";

// création de constantes pour avoir l'autocomplétion à l'appel du composant
const logoNames = [
  "logo-without-bg.png",
  "logo-without-bg-without-text.png",
  "logo.png",
] as const;

const logoTypes = ["header", "footer"] as const;

// création d'URI car le require dans Image n'accepte que le static
const logos: Record<LogoProps["label"], any> = {
  "logo-without-bg.png": require("../../assets/logo-without-bg.png"),
  "logo-without-bg-without-text.png": require("../../assets/logo-without-bg-without-text.png"),
  "logo.png": require("../../assets/logo.png"),
};

// typage des props
type LogoProps = {
  label?: (typeof logoNames)[number]; // type number car vscode l'interprête ainsi idk pourquoi
  width?: number;
  height?: number;
  type: (typeof logoTypes)[number];
};

// pas utilisé mais pourrait servir pour placer le logo à la place idéale
const windowWidth: number = Dimensions.get("window").width;
const windowHeight: number = Dimensions.get("window").height;

export default function Logo({
  label = "logo-without-bg.png",
  type,
}: LogoProps) {
  return (
    <View style={styles.container}>
      <Image
        source={logos[label] || logos["logo-without-bg.png"]}
        style={type === "header" ? styles.header : styles.footer} // condition pour adapter la taille du logo en fonction du type indiqué
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    opacity: 30,
    alignContent: "center",
    alignItems: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16.0,

    elevation: 24,
  },
  header: {
    width: 150,
    height: 150,
  },
  footer: {
    height: 50,
    width: 50,
  },
});
