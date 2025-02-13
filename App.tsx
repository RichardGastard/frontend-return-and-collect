import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { StyleSheet } from "react-native";

import HomeScreen from "./screens/HomeScreen";
import SignUp from "./screens/SignUp";
import UserSelectSizeScreen from "screens/UserSelectSizeScreen";
import Account from "./screens/Account";
import CoordinatesScreen from "./screens/CoordinatesScreen"
import Payment from "screens/Payment";
import ValidationScreen from "screens/ValidationScreen";

import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import users from "./reducers/users";


import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur"; // ajouté pour la tab bar
import { enableScreens } from "react-native-screens";

enableScreens();

const reducers = combineReducers({
  users,
});

const persistConfig = { key: "applicationName", storage: AsyncStorage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

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
        animation: "shift",
        tabBarActiveTintColor: "#ff5252",
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
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Package" component={UserSelectSizeScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
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
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Account" component={Account} />
            <Stack.Screen name="Coordinates" component={CoordinatesScreen}/>
            <Stack.Screen name ="Payment" component={Payment}/>
            <Stack.Screen name ="Validation" component={ValidationScreen}/> 
            <Stack.Screen
              name="UserSelectSize"
              component={UserSelectSizeScreen}
              options={{
                animation: "slide_from_right",
              }}
            />
            <Stack.Screen
              name="TabNavigator"
              component={TabNavigator}
              options={{
                animation: "slide_from_right",
                animationTypeForReplace: "push",
              }}/>
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
