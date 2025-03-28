import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import users from "../reducers/users";
import deliveries from "../reducers/deliveries";
import reviews from "../reducers/reviews";

const reducers = combineReducers({
  users,
  deliveries,
  reviews,
});

const persistConfig = { key: "applicationName", storage: AsyncStorage };

export const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Get the type of our store variable
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const persistor = persistStore(store);
