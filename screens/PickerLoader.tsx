import { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import Loader from "@/components/Loader";
import Layout from "@/components/Layout";

function PickerLoader({ navigation }) {
  const [suspension, setSuspension] = useState<string>("");

  useEffect(() => {
    if (suspension.length <= 3) {
      setTimeout(() => {
        setSuspension(suspension + ".");
      }, 1000);
    } else {
      setSuspension("");
    }
  }, [suspension]);

  return (
    <Layout
      title={`Recherche de votre collecteur ${suspension}`}
      description="Cela peut prendre quelques instants"
      footer
    >
      <View style={styles.loader}>
        <Loader />
      </View>
      <View style={styles.cancelButton}>
        <CustomButton
          children="Annuler"
          onPressFunction={() => navigation.goBack()}
          backgroundColor="#ff5252"
          width={200}
        />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  loader: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.7,
    shadowRadius: 32.0,

    elevation: 24,
  },
  cancelButton: {
    alignSelf: "center",
    marginTop: "30%",
    shadowColor: "#000",
    opacity: 0.8,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
});

export default PickerLoader;
