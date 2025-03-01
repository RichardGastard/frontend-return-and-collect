// COMPONENTS
import Layout from "@/components/Layout";
import OrderCard from "@/components/OrderCard";

import { useSwipe } from "hook/useSwipe";

import { View, StyleSheet, ScrollView } from "react-native";

function PickerActivityScreen({ navigation }) {
  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 3);

  function onSwipeLeft() {
    navigation.navigate("Collect");
  }

  function onSwipeRight() {}
  return (
    <Layout
      title="Historique"
      description="Vous pouvez retrouver l'ensemble de vos commandes prises en charge"
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

export default PickerActivityScreen;
