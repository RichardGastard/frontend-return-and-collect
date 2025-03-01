import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import { useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

function ValidationScreen({ navigation }) {
  // useEffect permettant la redirection automatique au bout de 7 secondes (Ecran à redéfinir peut-être).
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Home");
    }, 7000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ScrollView
          style={{ overflow: "visible" }}
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
        ></ScrollView>
        <View style={styles.logoView}>
          <Image
            source={require("../assets/logo-without-bg.png")}
            style={styles.logo}
          />
        </View>
        <View style={styles.redirectionText}>
          <Text style={{ color: "#525252", fontSize: 20 }}>
            Votre compte à bien été créé !
          </Text>

          <Text style={{ color: "#525252", fontSize: 14, opacity: 0.6 }}>
            Vous allez être redirigé vers l'écran principal
          </Text>
        </View>
        <View style={styles.footer}>
          <Text style={{ color: "#525252", opacity: 0.4 }}>Made in 🇫🇷</Text>
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
  logoView: {
    alignItems: "center",
  },

  logo: {
    width: 300,
    height: 300,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16.0,

    elevation: 24,
  },

  redirectionText: {
    flexDirection: "column",
    justifyContent: "space-around",
    height: 120,
    alignItems: "center",
  },
  footer: {
    alignContent: "flex-end",
    alignItems: "center",
    marginTop: 150,
  },
});

export default ValidationScreen;
