import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
  value: {
    email: string | null;
    isLoggedIn: Boolean;
  };
};

const initialState: UserState = {
  value: {
    email: null,
    isLoggedIn: false,
  },
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<string>) => {
      state.value.email = action.payload;
      state.value.isLoggedIn = true;
    },
    logOff: (state, action: PayloadAction<void>) => {
      state.value.email = null;
      state.value.isLoggedIn = false;
    },
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
