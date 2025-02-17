import React, { ReactNode } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import ArrowBack from "./ArrowBack";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

// TODO : ajouter les props tabBar, swipeLeft, swipeRight

type LayoutProps = {
  title?: string;
  description?: string;
  footer?: boolean; // mettre footer si on souhaite qu'il apparaisse
  arrowBack?: boolean;
  logo?: boolean;
  children?: ReactNode; // permet de mettre d'imbriquer les composants
};

function Layout({
  title,
  description,
  footer,
  arrowBack,
  logo,
  children,
}: LayoutProps) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {arrowBack && (
          <View style={styles.arrow}>
            <ArrowBack />
          </View>
        )}

        {logo && (
          <View style={styles.logo}>
            <Image
              source={require("../../assets/logo-simple.png")}
              style={{ width: 100, height: 100 }}
            ></Image>
          </View>
        )}

        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>

        {/* Permet d'ajouter des composants dans le Layout*/}
        <View style={styles.content}>{children}</View>

        {footer && (
          <View style={styles.footer}>
            <Text>Made in 🇫🇷</Text>
          </View>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffbf0",
  },
  arrow: {
    position: "absolute",
    marginTop: "20%",
    marginLeft: "5%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16.0,

    elevation: 24,
  },
  logo: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
    marginTop: "14%",
  },
  header: {
    alignItems: "center",
    marginTop: "21%",
    width: "95%",
    alignSelf: "center",
    gap: 7,
  },
  title: {
    fontSize: 36,
    color: "#525252",
    fontFamily: "Public-Sans-Bold",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.4,
    shadowRadius: 16.0,

    elevation: 24,
  },
  description: {
    color: "#525252",
    fontSize: 15,
    opacity: 0.7,
    fontFamily: "Poppins-Regular",
  },
  content: {
    padding: 20,
  },
  footer: {
    opacity: 0.4,
    color: "#525252",
    width: "100%",
    alignItems: "center",
    bottom: "3%",
    position: "absolute",
  },
});

export default Layout;
