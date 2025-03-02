// COMPONENTS
import Layout from "@/components/Layout";
import CustomButton from "@/components/CustomButton";

import { useSwipe } from "hook/useSwipe";

import { useDispatch } from "react-redux";
import { View } from "react-native";

import { logOff } from "../src/reducers/users";

function UserAccountScreen({ navigation }) {
  const dispatch = useDispatch();

  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 3);

  function onSwipeLeft() {}

  function onSwipeRight() {
    navigation.navigate("Return");
  }

  function handleLogOff() {
    // TODO : Regarder en dessous la proposition
    // if (window.confirm("Voulez-vous vraiment vous déconnecter ?")) {
    //   dispatch(logOff());
    //   navigation.navigate("LogIn");
    // }
    dispatch(logOff());
    navigation.navigate("Home");
  }
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
            navigation.navigate("UserChangePaiement");
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
