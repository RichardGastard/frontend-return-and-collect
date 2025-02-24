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
import ArrowBack from "@/components/ArrowBack";
import CustomButton from "@/components/CustomButton";
import Layout from "@/components/Layout";
import RatingStars from "@/components/RatingStars";

function UserRatePickerScreen() {
  const [name, setName] = useState<string>("MOMO");
  const [image, setImage] = useState<string>();
  const [rate, setRate] = useState<number>();
  const [time, setTime] = useState<string>();
  const [packageNumber, setPackageNumber] = useState<number>(35);

  useEffect(() => {
    fetch("http://192.168.1.119:3000/users/pickerInfo/_id")
      .then((response) => response.json())
      .then((data) => {
        setName(data.firstName + data.lastName.charAt(0));
        setRate(data.rating);
        setTime("");
        setPackageNumber(0);
      });
  }, []);

  return (
    <Layout
      title="Evaluation"
      description="Evaluez le collecteur"
      arrowBack
      arrowSkip=""
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
            <View style={styles.name}>
              <Text style={styles.prenom}>{name}</Text>
            </View>
            <Image
              source={require("assets/chien.png")}
              style={{
                width: 300,
                height: 300,
                borderRadius: 200,
                alignSelf: "center",
                marginTop: 25,
              }}
            />
            <View style={styles.rating}>
              <RatingStars onPress={() => console.log()} />
            </View>
            <View style={styles.pkg}>
              <Text style={styles.package}>
                Numero de Paquet: {packageNumber}
              </Text>
            </View>
            <View style={styles.time}>
              <MaterialCommunityIcons
                name="timer-outline"
                size={40}
                color="#febbba"
              ></MaterialCommunityIcons>
            </View>
            <CustomButton>Rate</CustomButton>
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
    padding: 20,
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
});

export default UserRatePickerScreen;
