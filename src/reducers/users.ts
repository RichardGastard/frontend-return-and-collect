import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "@/store/store";

export type UserState = {
  value: {
    email: string | null;
    isLoggedIn: Boolean;
    token: string | null;
    firstName: string | null;
    address: string | null;
    userType: string | null;
    isAvailable: boolean | null;
  };
};

const initialState: UserState = {
  value: {
    email: null,
    isLoggedIn: false,
    token: null,
    firstName: null,
    address: null,
    userType: null,
    isAvailable: false,
  },
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<any>) => {
      state.value.email = action.payload.email;
      state.value.isLoggedIn = true;
      state.value.token = action.payload.token;
      state.value.firstName = action.payload.firstName;
      state.value.address = action.payload.address;
      state.value.userType = action.payload.userType;
      state.value.isAvailable = false;
    },
    changeUserInfo: (state, action: PayloadAction<any>) => {
      state.value.email = action.payload.email;
      state.value.firstName = action.payload.firstName;
      state.value.address = action.payload.address;
    },
    logOff: (state, action: PayloadAction<void>) => {
      state.value.email = null;
      state.value.isLoggedIn = false;
      state.value.token = null;
      state.value.firstName = null;
      state.value.address = null;
      state.value.isAvailable = false;
    },
    updateAvailability: (state, action: PayloadAction<boolean>) => {
      state.value.isAvailable = !state.value.isAvailable;
    },
  },
});

export const { logIn, changeUserInfo, logOff, updateAvailability } =
  userSlice.actions;

export const selectUserData = (state: RootState) => state.users.value;

export default userSlice.reducer;
