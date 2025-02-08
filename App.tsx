import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import HomeScreen from "./screens/HomeScreen";
import SignUp from "./screens/SignUp";
import UserSelectSizeScreen from "screens/UserSelectSizeScreen";
import Account from "./screens/Account";

import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import users from "./reducers/users";
import Payment from "screens/Payment";

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

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
          
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name ="Payment" component={Payment}/>
            <Stack.Screen name="Account" component={Account} />
            
            <Stack.Screen
              name="UserSelectSize"
              component={UserSelectSizeScreen}
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
