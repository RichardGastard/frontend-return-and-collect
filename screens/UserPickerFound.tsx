import Layout from "@/components/Layout";
import UserPickerCard from "@/components/UserPickerCard";
import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

function UserPickerFound({ navigation }) {

  const [name, setName] = useState<string>("Jacky C");
  const [image, setImage] = useState<string>();
  const [rating, setRating] = useState<number>(4);
  const [timeRemaining, setTimeRemaining] = useState<string>("à définir");
  const [distanceRemaining, setDistanceRemaining] =
    useState<string>("à définir");
  const [numberOfDeliveries, setNumberOfDeliveries] = useState<number>(3);





  useEffect(() => {
    fetch(process.env.EXPO_PUBLIC_BACKEND_URL +"/users/pickerInfo/")
      .then((response) => response.json())
      .then((data) => {
        setName(data.firstName + data.lastName.charAt(0));
        setRating(data.rating);
        setDistanceRemaining(data.distanceRemaining);
        setTimeRemaining(data.timeRemaining);
        setNumberOfDeliveries(data.numberOfDeliveries);
      });
  }, []);

  return (
    <Layout footer title="Votre livreur" arrowBack>
      <View style={{ height: "80%" }}>
        <UserPickerCard
          numberOfDeliveries={numberOfDeliveries}
          image={image}
          name={name}
          ratedStars={rating}
          timeRemaining="à définir"
          distanceRemaining="à définir"
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 150 : 80}
          style={{ flex: 1 }}
        ></KeyboardAvoidingView>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({});

export default UserPickerFound;
