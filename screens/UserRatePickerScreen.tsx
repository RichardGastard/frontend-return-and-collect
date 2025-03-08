import { useState, useRef, useEffect } from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  KeyboardEvent,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import Layout from "@/components/Layout";
import RatingStars from "@/components/RatingStars";
import { useAppSelector } from "@/store/hooks";

function UserRatePickerScreen() {
  const [name, setName] = useState<string>("Bob");
  const [image, setImage] = useState<string>();
  const [rate, setRate] = useState<number>();
  const [time, setTime] = useState<string>();
  const [packageNumber, setPackageNumber] = useState<number>(35);

  const reviewData = useAppSelector((state) => state.reviews.value);
  const userData = useAppSelector((state) => state.users.value);

  useEffect(() => {
    fetch(
      process.env.EXPO_PUBLIC_BACKEND_URL +
        "/deliveries/info/" +
        reviewData.deliveryId
    )
      .then((response) => response.json())
      .then((data) => {
        setName(data.delivery.pickerId.firstName);
      });
  }, []);

  function handleRatePicker() {
    fetch(process.env.EXPO_PUBLIC_BACKEND_URL + "/reviews/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: userData.token,
        deliveryId: reviewData.deliveryId,
        rating: rate,
        comment: "None",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log("Success");
        } else {
          console.log("No success");
        }
      });
  }
  return (
    <Layout
      title={`Notez ${name}`}
      description="Comment s'est passée la délivraison ?"
      arrowBack
      arrowSkip=""
      footer
    >
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          // keyboardVerticalOffset={keyboardHeight}
        >
          <ScrollView
            style={{ overflow: "visible" }}
            keyboardDismissMode="interactive"
            keyboardShouldPersistTaps="handled"
          >
            <Image
              source={require("assets/livreur-4.jpg")}
              style={{
                width: 250,
                height: 250,
                borderRadius: 200,
                alignSelf: "center",
                marginTop: 25,
                shadowOffset: {
                  width: 250,
                  height: 250,
                },
                shadowColor: "#525252",
              }}
            />
            <View style={styles.rating}>
              <RatingStars onPress={(value) => setRate(value)} />
            </View>
            <View style={styles.btn}>
              <CustomButton onPressFunction={() => handleRatePicker()}>
                {rate === 5
                  ? `C'était top, merci ${name} !! 🔥`
                  : rate === 3 || rate === 4
                  ? `Merci ${name} 👍`
                  : rate === 2 || rate === 1
                  ? `Service à améliorer 💩`
                  : `Envoyer`}
              </CustomButton>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffbf0",
  },
  name: {
    alignItems: "center",
  },
  prenom: {
    fontSize: 30,
  },
  rating: {
    alignItems: "center",
    marginTop: 25,
  },
  pkg: {
    alignItems: "center",
    marginTop: 10,
  },
  package: {
    fontSize: 18,
  },
  time: {
    alignItems: "center",
    marginTop: 10,
  },
  btn: {
    marginTop: 30,
  },
});

export default UserRatePickerScreen;
