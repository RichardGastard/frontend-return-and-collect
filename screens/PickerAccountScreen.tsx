// COMPONENTS
import Layout from "@/components/Layout";
import CustomButton from "@/components/CustomButton";

import { useSwipe } from "hook/useSwipe";

import { View, StyleSheet } from "react-native";

import { useDispatch } from "react-redux";
import { logOff } from "@/reducers/users";

function PickerAccountScreen({ navigation }) {
  const dispatch = useDispatch();

  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 3);

  function onSwipeLeft() {}

  function onSwipeRight() {
    navigation.navigate("Collect");
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
        style={{
          height: "70%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CustomButton
          width={"75%"}
          onPressFunction={() => {
            navigation.navigate("PickerChangePassword");
          }}
        >
          Votre mot de passe
        </CustomButton>
        <CustomButton
          width={"75%"}
          onPressFunction={() => {
            navigation.navigate("PickerChangeAddress");
          }}
        >
          Votre adresse
        </CustomButton>
        <CustomButton
          width={"75%"}
          onPressFunction={() => {
            navigation.navigate("PickerChangePayment");
          }}
        >
          Votre compte bancaire
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
