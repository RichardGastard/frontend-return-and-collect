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
import Input from "@/components/Input";

import useKeyboardHeight from "react-native-use-keyboard-height";

import HomeScreen from "screens/HomeScreen";
import UserSelectSizeScreen from "screens/UserSelectSizeScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTogglePasswordVisibility } from "hook/useTogglePasswordVisibility";
import { useToggleConfirmPasswordVisibility } from "hook/useToggleConfirmPasswordVisibility";
// NEW IMPORTS //
import { BlurView } from "expo-blur"; // ajouté pour la tab bar
import Animated, {
  interpolate,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated"; //  mettre de l'effet dans les changements
import { enableScreens } from "react-native-screens";

function Coordinates({ navigation }) {
  const [firstname, setFirstname] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [zipcode, setZipcode] = useState<string>("");
  const [numberstreet, setNumberstreet] = useState<string>("");
  const [city, setCity] = useState<string>("");

  const keyboardHeight = useKeyboardHeight();


  const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Package") {
            iconName = "package";
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        animation: "fade",
        tabBarActiveTintColor: "#ff5252",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { position: "absolute" },
        tabBarBackground: () => (
          <BlurView
            tint="light"
            intensity={100}
            style={StyleSheet.absoluteFill}
          />
        ),
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Package" component={UserSelectSizeScreen} />
    </Tab.Navigator>
  );
};

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={keyboardHeight}
      >
        <ScrollView
          style={{ overflow: "visible" }}
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
        >
          <View>
            <View style={styles.header}>
              <Text style={styles.title}>Coordonnées</Text>
            </View>
            <View style={styles.inputContainer}>             
              <Input label="Prenom" keyboardType="none" />
              <Input label="Nom" keyboardType="none" />
              <Input label="Mobile" keyboardType="none" />
            </View>

            <View style={styles.adress}>
              <Text style={styles.adtext}>Adresse</Text>
            </View>

            <View style={styles.inputContainer}>
              <Input label="Num, Rue" keyboardType="none" />
              <Input label="Code Postale" keyboardType="none" />
              <Input label="Ville" keyboardType="none" />
            </View>
              </View>

            <View style={styles.submitbtn}>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() =>
                  navigation.navigate("Account")
                }
              >
                <Text style={{ color: "white" }}>S'enregistrer</Text>
              </TouchableOpacity>
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

  Input: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    right: 10,
  },
  logo: {
    aspectRatio: 1,
    width: 300,
    height: 300,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16.0,

    elevation: 24,
  },
  logoView: {
    alignItems: "center",
  },
  header: {
    alignItems: "center"
  },
  title: {
    fontSize: 36,
    color: "#525252",
  },
  description: {
    color: "#525252",
  },
  inputContainer: {
    marginTop: 35,
    width: "97%",
    justifyContent: "space-between",
    marginRight: "auto",
    marginLeft: "auto",
    gap: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  adress: {
    alignItems: "center"
  },
  adtext: {
    paddingTop: 20,
    fontSize: 24,
    color: "#525252",
  },
  input: {
    borderColor: "#525252",
    borderWidth: 1,
    borderRadius: 5,
    height: 35,
    paddingHorizontal: 10,
  },
  submitbtn: {
    width: "97%",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 30,
  },
  submitButton: {
    backgroundColor: "#febbba",
    height: 45,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "30%",
  },
});

export default Coordinates;