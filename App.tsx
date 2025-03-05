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
import PickerFoundScreen from "screens/PickerFoundScreen";

import PickerAccountScreen from "screens/PickerAccountScreen";
import UserChangeAdressScreen from "screens/UserChangeAddressScreen";
import UserChangePasswordScreen from "screens/UserChangePasswordScreen";
import PickerChangePasswordScreen from "screens/PickerChangePasswordScreen";
import PickerChangeAddressScreen from "screens/PickerChangeAddressScreen";
import PickerChangePaymentScreen from "screens/PickerChangePaymentScreen";
import PickerNewPayementScreen from "screens/PickerNewPaymentScreen";
import PickerHomeScreen from "screens/PickerHomeScreen";
import AddressScreen from "screens/AddressScreen";
import PickerActivityScreen from "screens/PickerActivityScreen";
import PickerGoToLocationScreen from "screens/PickerGoToLocationScreen";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store/store";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur"; // ajouté pour la tab bar
import { enableScreens } from "react-native-screens";

// NEW IMPORT
import { useFonts } from "expo-font";

enableScreens();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const PickerTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Collect"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";
          if (route.name === "Collect") {
            iconName = "package";
          } else if (route.name === "Profil") {
            iconName = "account-cog";
          } else if (route.name === "Historique") {
            iconName = "history";
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
      <Tab.Screen name="Historique" component={PickerActivityScreen} />
      <Tab.Screen name="Collect" component={PickerHomeScreen} />
      <Tab.Screen name="Profil" component={PickerAccountScreen} />
    </Tab.Navigator>
  );
};

const UserTabNavigator = () => {
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
        //tabBarBadge: route.name === "Historique" ? 5 : null,
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

            {/* PICKER SCREENS */}
            <Stack.Screen name="PickerHome" component={PickerHomeScreen} />
            <Stack.Screen
              name="PickerFoundScreen"
              component={PickerFoundScreen}
            />
            <Stack.Screen
              name="PickerTabNavigator"
              component={PickerTabNavigator}
            />
            <Stack.Screen
              name="PickerGoToLocation"
              component={PickerGoToLocationScreen}
            />
            {/* USER SCREENS */}
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="UserAccount" component={UserAccountScreen} />
            <Stack.Screen
              name="PickerPayment"
              component={PickerPaymentMethodScreen}
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
            <Stack.Screen
              name="UserSelectSize"
              component={UserSelectSizeScreen}
            />
            <Stack.Screen name="PickerLoader" component={PickerLoader} />
            <Stack.Screen
              name="UserCurrentPosition"
              component={UserCurrentPositionScreen}
            />
            <Stack.Screen name="PickerIsHere" component={PickerIsHereScreen} />
            <Stack.Screen
              name="UserRatePicker"
              component={UserRatePickerScreen}
            />
            <Stack.Screen
              name="UserChangePayment"
              component={UserChangePaymentScreen}
            />
            <Stack.Screen
              name="UserFollowPicker"
              component={UserFollowPickerScreen}
            />
            <Stack.Screen
              name="UserChangeAddress"
              component={UserChangeAdressScreen}
            />
            <Stack.Screen
              name="UserChangePassword"
              component={UserChangePasswordScreen}
            />
            <Stack.Screen name="UserPickerFound" component={UserPickerFound} />
            <Stack.Screen
              name="PickerAccount"
              component={PickerAccountScreen}
            />
            <Stack.Screen
              name="PickerChangePassword"
              component={PickerChangePasswordScreen}
            />
            <Stack.Screen
              name="PickerChangeAddress"
              component={PickerChangeAddressScreen}
            />
            <Stack.Screen
              name="PickerChangePayment"
              component={PickerChangePaymentScreen}
            />
            <Stack.Screen
              name="PickerNewPayment"
              component={PickerNewPayementScreen}
            />
            <Stack.Screen
              name="UserTabNavigator"
              component={UserTabNavigator}
            />
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
