// COMPONENTS
import Layout from "@/components/Layout";
import CustomButton from "@/components/CustomButton";

import { useRef, useState } from "react";
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
      description="Vous pouvez modifier les informations"
    >
      <View
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{ height: "70%" }}
      >
        <CustomButton
          onPressFunction={() => {
            navigation.navigate("UserChangePassword");
          }}
        >
          Votre mot de passe
        </CustomButton>
        <CustomButton
          onPressFunction={() => {
            navigation.navigate("UserChangeAddress");
          }}
        >
          Votre adresse
        </CustomButton>
        <CustomButton
          onPressFunction={() => {
            navigation.navigate("UserChangePayment");
          }}
        >
          Votre moyen de paiement
        </CustomButton>

        <View
          style={{
            marginTop: "20%",
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

export default UserAccountScreen;
