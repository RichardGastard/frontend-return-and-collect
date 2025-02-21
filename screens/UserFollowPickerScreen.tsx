import { useState, useRef } from "react";
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
import Map from "@/components/Map";

import { SafeAreaView } from "react-native-safe-area-context";
import ArrowBack from "@/components/ArrowBack";
import Card from "@/components/Card";
import CustomButton from "@/components/CustomButton";

function UserFollowPickerScreen() {
  return (
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
          <View>
            <View style={styles.header}>
              <ArrowBack></ArrowBack>
              <Text style={styles.title}>Suivi du Collecteur</Text>
            </View>
          </View>
          <View style={styles.card}>
            <Card
              image={require("assets/chien.png")}
              name={"BOB"}
              ratedStars={2.55}
              numberOfDeliveries={"xDeliveries"}
              vehicle={"scooter"}
            />
          </View>
          <View style={styles.map}>
            <Map
              pickerPosition={{ latitude: 43.26855, longitude: 5.385144 }}
            ></Map>
          </View>
          <View style={styles.code}>
            <CustomButton onPressFunction={() => console.log('ça continue')}>Secret Code</CustomButton>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
    marginTop: 30,
    alignItems: "center",
  },
  map: {
    marginTop: 30,
  },
    code: {
  marginTop: 60, 
  }
});

export default UserFollowPickerScreen;
