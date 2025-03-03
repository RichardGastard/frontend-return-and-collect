import { View, StyleSheet, ScrollView } from "react-native";
import Map from "@/components/Map";
import Card from "@/components/Card";
import CustomButton from "@/components/CustomButton";
import Layout from "@/components/Layout";

function UserFollowPickerScreen() {
  return (
    <Layout
      title="Suivi du collecteur"
      description="Suivez en temps réel votre délivraison"
      arrowBack
      footer
    >
      <ScrollView
        style={{ overflow: "visible" }}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Card
            //TODO : Real informations
            image={require("assets/livreur-4.jpg")}
            name={"Bob"}
            ratedStars={2.55}
            numberOfDeliveries={"498 deliveries"}
            vehicle={"scooter"}
          />
        </View>
        <View style={styles.map}>
          <Map
            pickerPosition={{ latitude: 43.26855, longitude: 5.385144 }}
          ></Map>
          <CustomButton onPressFunction={() => console.log("ça continue")}>
            Secret Code
          </CustomButton>
        </View>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffbf0",
    padding: 20,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    fontSize: 36,
    color: "#525252",
    marginLeft: 30,
  },
  card: {
    marginTop: 0,
    alignItems: "center",
  },
  map: {
    marginTop: 20,
  },
});

export default UserFollowPickerScreen;
