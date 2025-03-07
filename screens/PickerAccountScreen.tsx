// COMPONENTS
import Layout from "@/components/Layout";
import CustomButton from "@/components/CustomButton";

import { useSwipe } from "hook/useSwipe";

import { View, StyleSheet, Alert } from "react-native";

import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { logOff } from "@/reducers/users";

function PickerAccountScreen({ navigation }) {
  const [connected, setConnected] = useState<boolean>(true);
  const dispatch = useDispatch();

  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 3);

  function onSwipeLeft() {}

  function onSwipeRight() {
    navigation.navigate("Collect");
  }

  function handleLogOff() {
    Alert.alert(
      "Êtes vous sûr de vouloir vous deconnecter ?",
      'En cliquant sur "Se déconnecter" vous serez redirigé vers la page de connexion',
      [
        {
          text: "Se déconnecter",
          style: "destructive",
          onPress: () => {
            setConnected(!connected);
          },
        },
        {
          text: "Annuler",
        },
      ]
    );
  }

  useEffect(() => {
    if (!connected) {
      dispatch(logOff());
      navigation.navigate("Home");
    }
  }, [connected]);

  return (
    <Layout
      title="Paramètres du compte"
      description="Vous pouvez modifier vos informations"
      footer
    >
      <View
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{
          height: "70%",
          alignItems: "center",
        }}
      >
        <CustomButton
          width={"90%"}
          onPressFunction={() => {
            navigation.navigate("PickerChangePassword");
          }}
        >
          Mot de passe
        </CustomButton>
        <CustomButton
          width={"90%"}
          onPressFunction={() => {
            navigation.navigate("PickerChangeAddress");
          }}
        >
          Adresse
        </CustomButton>
        <CustomButton
          width={"90%"}
          onPressFunction={() => {
            navigation.navigate("PickerChangePayment");
          }}
        >
          Compte bancaire
        </CustomButton>

        <View
          style={{
            marginTop: "20%",
            width: "50%",
          }}
        >
          <CustomButton
            onPressFunction={handleLogOff}
            backgroundColor="#ff5252"
          >
            Se déconnecter
          </CustomButton>
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({});

export default PickerAccountScreen;
