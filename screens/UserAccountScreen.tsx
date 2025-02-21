// COMPONENTS
import Layout from "@/components/Layout";
import CustomButton from "@/components/CustomButton";

import { useSwipe } from "hook/useSwipe";

import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import useKeyboardHeight from "react-native-use-keyboard-height";

import { SafeAreaView } from "react-native-safe-area-context";

function UserAccountScreen({ navigation }) {
  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 3);

  function onSwipeLeft() {}

  function onSwipeRight() {
    navigation.navigate("Return");
  }
  return (
    <Layout title="Compte" description="Vous pouvez modifier les informations">
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
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({});

export default UserAccountScreen;
