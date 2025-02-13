import React from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";

// création de constantes pour avoir l'autocomplétion à l'appel du composant
const logoNames = ["logo-simple.png", "logo-full.png"] as const;

const logoSizes = ["large", "small"] as const;

// création d'URI car le require dans Image n'accepte que le static
const logos: Record<LogoProps["label"], any> = {
  "logo-simple.png": require("../../assets/logo-simple.png"),
  "logo-full.png": require("../../assets/logo-full.png"),
};

// typage des props
type LogoProps = {
  label?: (typeof logoNames)[number]; // type number car vscode l'interprête ainsi idk pourquoi
  width?: number;
  height?: number;
  size: (typeof logoSizes)[number];
};

export default function Logo({ size, label, ...props }: LogoProps) {
  return (
    <View style={styles.container}>
      <Image
        source={logos[label] || logos["logo-full.png"]}
        style={size === "large" ? styles.large : styles.small} // condition pour adapter la taille du logo en fonction du type indiqué
        {...props}
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
  },
  large: {
    width: 350,
    height: 350,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16.0,

    elevation: 24,
  },
  small: {
    height: 150,
    width: 150,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16.0,
    elevation: 24,
  },
});
