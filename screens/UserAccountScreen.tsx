// COMPONENTS
import Layout from "@/components/Layout";
import CustomButton from "@/components/CustomButton";

import { useState } from "react";
import { useEffect } from "react";

import { useSwipe } from "hook/useSwipe";

import { useDispatch } from "react-redux";
import { View, Alert } from "react-native";

import { logOff } from "../src/reducers/users";

function UserAccountScreen({ navigation }) {
  const dispatch = useDispatch();

  const [connected, setConnected] = useState<boolean>(true);

  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 3);

  function onSwipeLeft() {}

  function onSwipeRight() {
    navigation.navigate("Return");
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
          style: "cancel",
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
        style={{ height: "70%", alignItems: "center" }}
      >
        <CustomButton
          width={"90%"}
          onPressFunction={() => {
            navigation.navigate("UserChangePassword");
          }}
        >
          Mot de passe
        </CustomButton>
        <CustomButton
          width={"90%"}
          onPressFunction={() => {
            navigation.navigate("UserChangeAddress");
          }}
        >
          Adresse
        </CustomButton>
        <CustomButton
          width={"90%"}
          onPressFunction={() => {
            navigation.navigate("UserChangePayment");
          }}
        >
          Moyen de paiement
        </CustomButton>

        <View
          style={{
            marginTop: "20%",
            width: "100%",
            alignItems: "center",
          }}
        >
          <CustomButton
            width={"50%"}
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

export default UserAccountScreen;
