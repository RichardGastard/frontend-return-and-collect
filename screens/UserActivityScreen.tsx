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
import OrderCard from "@/components/OrderCard";

function UserActivityScreen({ navigation }) {
  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 3);

  function onSwipeLeft() {
    navigation.navigate("Return");
  }

  function onSwipeRight() {}
  return (
    <Layout
      title="Historique"
      description="Vous pouvez retrouver l'ensemble de vos commandes"
    >
      <View
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ flex: 1, gap: 15 }}>
            <OrderCard
              orderNumber={395885}
              location="3 rue des baies, 34555 CEDEX"
              collector="Bob"
              status
              price={3.4}
              date="05/09/2024"
            ></OrderCard>
            <OrderCard
              orderNumber={23525}
              location="23 avenue du général leclerc, 750001 Paris"
              collector="Bob"
              price={1.99}
              date="21/02/2025"
            ></OrderCard>
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({});

export default UserActivityScreen;
