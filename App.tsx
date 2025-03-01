import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { StyleSheet } from "react-native";

import HomeScreen from "screens/HomeScreen";
import SignUpScreen from "./screens/SignUpScreen";
import UserSelectSizeScreen from "screens/UserSelectSizeScreen";
import UserAccountScreen from "./screens/UserAccountScreen";
import CoordinatesScreen from "./screens/CoordinatesScreen";
import Payment from "screens/Payment";
import ValidationScreen from "screens/ValidationScreen";
import PickerLoader from "screens/PickerLoader";
import UserCurrentPositionScreen from "screens/UserCurrentPositionScreen";
import WhatCanYouCarry from "screens/WhatCanYouCarry";
import PickerPaymentMethodScreen from "screens/PickerPaymentMethodsScreen";
import UserFollowPickerScreen from "screens/UserFollowPickerScreen";
import UserPickerFound from "screens/UserPickerFound";
import UserRatePickerScreen from "screens/UserRatePickerScreen";
import UserChangePaymentScreen from "screens/UserChangePaymentScreen";
import PickerIsHereScreen from "screens/PickerIsHereScreen";
import SignUpSuccessScreen from "screens/SignUpSuccessScreen";
import UserActivityScreen from "screens/UserActivityScreen";
import PickFoundScreen from "screens/PickFoundScreen"

// Redux store configuration
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store/store";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur"; // ajouté pour la tab bar
import { enableScreens } from "react-native-screens";

// NEW IMPORT
import { useFonts } from "expo-font";
import AddressScreen from "screens/AddressScreen";

enableScreens();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Return"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "Return") {
            iconName = "package";
          } else if (route.name === "Historique") {
            iconName = "history";
          } else if (route.name === "Profil") {
            iconName = "account-cog";
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        animation: "shift",
        tabBarActiveTintColor: "#ff5252",
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontFamily: "Poppins-Regular",
        },
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { position: "absolute" },
        // tabBarBadge: route.name === "Package" ? 5 : null,
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
      <Tab.Screen name="Historique" component={UserActivityScreen} />
      <Tab.Screen name="Return" component={UserSelectSizeScreen} />
      <Tab.Screen name="Profil" component={UserAccountScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  const [fontLoaded] = useFonts({
    "Public-Sans-Bold": require("./assets/fonts/Public-Sans-Bold.ttf"), // for title
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"), // for text
  });

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              gestureDirection: "horizontal",
            }}
          >
            {/* LET'S TRY IF CHANGE */}
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="UserAccount" component={UserAccountScreen} />
            <Stack.Screen
              name="PickerPayment"
              component={PickerPaymentMethodScreen}
            />
            <Stack.Screen
              name="UserFollowPicker"
              component={UserFollowPickerScreen}
            />
            <Stack.Screen name="Coordinates" component={CoordinatesScreen} />
            <Stack.Screen name="Address" component={AddressScreen} />
            <Stack.Screen name="Payment" component={Payment} />
            <Stack.Screen
              name="SignUpCongrats"
              component={SignUpSuccessScreen}
            />
            <Stack.Screen name="Validation" component={ValidationScreen} />
            <Stack.Screen name="Carry" component={WhatCanYouCarry} />
            <Stack.Screen name="PickFoundScreen" component={PickFoundScreen} />
            <Stack.Screen
              name="UserSelectSize"
              component={UserSelectSizeScreen}
            />
            <Stack.Screen name="PickerLoader" component={PickerLoader} />
            <Stack.Screen name="UserPickerFound" component={UserPickerFound} />
            <Stack.Screen
              name="UserCurrentPosition"
              component={UserCurrentPositionScreen}
            />
            <Stack.Screen
              name="UserRatePicker"
              component={UserRatePickerScreen}
            />
            <Stack.Screen
              name="UserChangePayment"
              component={UserChangePaymentScreen}
            />
            <Stack.Screen name="PickerIsHere" component={PickerIsHereScreen} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
