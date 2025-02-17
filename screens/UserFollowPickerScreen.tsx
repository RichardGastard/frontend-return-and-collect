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
              <Text style={styles.title}>Suivi du Picker</Text>
            </View>
          </View>
            <View style={styles.card}>
          <Card image={require("assets/chien.png")} name={"BOB"} ratedStars={2.55} numberOfDeliveries={"xDeliveries"}  vehicle={"scooter"}/>
          </View>
          <View style={styles.map}>
            <Map pickerPosition={{latitude:43.266382, longitude:5.397543}}></Map>
          </View>
          <View style={styles.code}>
            <Text>Code Secret</Text>
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
    flexDirection: "row"
  },
  title: {
    fontSize: 36,
    color: "#525252",
    marginLeft: 50,
  },
  card: {
    marginTop: 30,
    alignItems: "center",
  },
  map: {
    marginTop: 30,
  },
  code: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 70,
    borderWidth: 1,
    width: 200,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#A65AAD"
  }
});


export default UserFollowPickerScreen;